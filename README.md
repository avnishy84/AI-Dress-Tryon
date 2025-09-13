# AI Dress Try-On Web Application

A modern web application that allows users to virtually try on any dress using advanced AI technology. The app uses Google Gemini 2.5 Flash Image Preview for intelligent image analysis and dress try-on generation.

## 🌟 Features

- **AI-Powered Dress Try-On**: Upload your photo and any dress image to see how you'd look
- **Smart Image Analysis**: Google Gemini 2.5 Flash Image Preview analyzes user photos and dress images
- **AI-Generated Results**: Advanced AI generates detailed try-on descriptions and recommendations
- **Dress Suggestions**: Get AI-powered dress recommendations based on your style
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **Drag & Drop Upload**: Easy image upload with drag and drop functionality
- **Multiple Formats**: Supports JPG, PNG, and WebP image formats

## 🚀 Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Dropzone** - File upload with drag & drop
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Google Gemini 2.5 Flash Image Preview** - AI image analysis and dress try-on generation
- **Multer** - File upload handling
- **Sharp** - Image processing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Google Gemini API Key** - Get from [Google AI Studio](https://makersuite.google.com/app/apikey)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-dress-tryon
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cd server
   cp env.example .env
   ```
   
   Edit the `.env` file with your API key:
   ```env
   # Google Gemini API Configuration
   GOOGLE_API_KEY=your_google_gemini_api_key_here
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   MAX_FILE_SIZE=10485760
   UPLOAD_DIR=uploads
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

This will start both the frontend (React) and backend (Node.js) servers concurrently:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Production Mode
```bash
# Build the frontend
npm run build

# Start the backend
cd server
npm start
```

## 📁 Project Structure

```
ai-dress-tryon/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js         # Main app component
│   │   ├── index.js       # Entry point
│   │   └── index.css      # Global styles
│   ├── package.json
│   └── tailwind.config.js
├── server/                # Node.js backend
│   ├── services/          # Business logic
│   │   ├── geminiService.js
│   │   ├── bananaService.js
│   │   └── imageService.js
│   ├── uploads/           # Uploaded images
│   ├── results/           # Generated results
│   ├── index.js           # Server entry point
│   ├── package.json
│   └── env.example
├── package.json           # Root package.json
└── README.md
```

## 🔧 API Endpoints

### Health Check
- `GET /api/health` - Check if the API is running

### File Upload
- `POST /api/upload/user` - Upload user photo
- `POST /api/upload/dress` - Upload dress image

### AI Processing
- `POST /api/tryon` - Generate dress try-on
- `POST /api/suggestions` - Get dress suggestions

## 🎨 Usage

1. **Upload Your Photo**: Drag and drop or click to upload a clear photo of yourself
2. **Upload Dress Image**: Upload any dress image you want to try on
3. **Generate Try-On**: Click the "Generate Dress Try-On" button
4. **View Results**: See your AI-generated dress try-on result
5. **Get Suggestions**: Use the suggestions feature for more dress recommendations

## 🔑 API Keys Setup

### Google Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file as `GOOGLE_API_KEY`

## 🎯 Features in Detail

### AI Image Analysis
- **User Photo Analysis**: Analyzes body type, pose, and current clothing
- **Dress Analysis**: Examines style, color, fit, and design
- **Compatibility Check**: Determines how well the dress would suit the user

### Smart Suggestions
- **Occasion-Based**: Get suggestions for specific events
- **Style Preferences**: Filter by color, style, and budget
- **Personalized**: Based on your body type and preferences

### Image Processing
- **Format Support**: JPG, PNG, WebP
- **Size Optimization**: Automatic resizing and compression
- **Quality Enhancement**: AI-powered image enhancement

## 🐛 Troubleshooting

### Common Issues

1. **API Key Errors**
   - Ensure your API keys are correctly set in the `.env` file
   - Check that the keys have the necessary permissions

2. **File Upload Issues**
   - Make sure the uploads directory exists
   - Check file size limits (default: 10MB)
   - Verify supported image formats

3. **Port Conflicts**
   - Change the PORT in `.env` if 5000 is already in use
   - Update the proxy in `client/package.json` if needed

### Development Tips

- Use browser dev tools to check network requests
- Check server logs for detailed error messages
- Ensure all dependencies are installed correctly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini 2.5 Flash Image Preview** for advanced image analysis and dress try-on generation
- **React** and **Tailwind CSS** for the beautiful UI
- **Open source community** for the amazing tools and libraries

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information
4. Contact the development team

---

**Happy Dress Trying! 👗✨**
