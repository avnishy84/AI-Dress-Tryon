const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const geminiService = require('./services/geminiService');
const imageService = require('./services/imageService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
} else {
  app.use(express.static('public'));
}

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 // 10MB default
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, WebP) are allowed!'));
    }
  }
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Dress Try-On API is running' });
});

// Test Gemini API connection
app.get('/api/test-gemini', async (req, res) => {
  try {
    const result = await geminiService.testConnection();
    res.json(result);
  } catch (error) {
    console.error('Error testing Gemini connection:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to test Gemini connection',
      details: error.message 
    });
  }
});

// List available Gemini models (for debugging)
app.get('/api/models', async (req, res) => {
  try {
    const models = await geminiService.listAvailableModels();
    res.json({ 
      success: true, 
      models: models.map(model => ({
        name: model.name,
        supportedMethods: model.supportedGenerationMethods,
        inputTokenLimit: model.inputTokenLimit,
        outputTokenLimit: model.outputTokenLimit
      }))
    });
  } catch (error) {
    console.error('Error listing models:', error);
    res.status(500).json({ 
      error: 'Failed to list models',
      details: error.message 
    });
  }
});

// Upload user photo
app.post('/api/upload/user', upload.single('userPhoto'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const userPhotoPath = req.file.path;
    res.json({ 
      success: true, 
      userPhotoPath: userPhotoPath,
      message: 'User photo uploaded successfully' 
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload user photo' });
  }
});

// Upload dress image
app.post('/api/upload/dress', upload.single('dressImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const dressImagePath = req.file.path;
    res.json({ 
      success: true, 
      dressImagePath: dressImagePath,
      message: 'Dress image uploaded successfully' 
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload dress image' });
  }
});

// Generate dress try-on
app.post('/api/tryon', async (req, res) => {
  try {
    const { userPhotoPath, dressImagePath, style } = req.body;

    if (!userPhotoPath || !dressImagePath) {
      return res.status(400).json({ error: 'Both user photo and dress image are required' });
    }

    // Process images with Gemini Nano
    const processedImages = await geminiService.processImages(userPhotoPath, dressImagePath, style);
    
    // Generate try-on result using Gemini AI
    const tryOnResult = await geminiService.generateTryOnResult(processedImages);
    
    // Save result image
    const resultPath = await imageService.saveResult(tryOnResult);

    res.json({
      success: true,
      resultPath: resultPath,
      message: 'Dress try-on generated successfully'
    });

  } catch (error) {
    console.error('Try-on generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate dress try-on',
      details: error.message,
      suggestion: 'Please check your Google Gemini API key and ensure the server is properly configured'
    });
  }
});

// Get dress suggestions from Gemini
app.post('/api/suggestions', async (req, res) => {
  try {
    const { userPhotoPath, occasion, preferences } = req.body;

    if (!userPhotoPath) {
      return res.status(400).json({ error: 'User photo is required' });
    }

    const suggestions = await geminiService.getDressSuggestions(userPhotoPath, occasion, preferences);
    
    res.json({
      success: true,
      suggestions: suggestions,
      message: 'Dress suggestions generated successfully'
    });

  } catch (error) {
    console.error('Suggestion generation error:', error);
    res.status(500).json({ error: 'Failed to generate dress suggestions' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
  }
  res.status(500).json({ error: error.message });
});

// Catch all handler for React app in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
