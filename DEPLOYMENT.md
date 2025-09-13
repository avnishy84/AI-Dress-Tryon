# Deployment Guide for AI Dress Try-On App

This guide covers multiple deployment options for your AI dress try-on application.

## 🚀 Deployment Options

### 1. **Vercel (Recommended for Frontend + API)**

**Pros:** Easy setup, automatic deployments, great for React apps
**Cons:** Serverless functions have time limits

#### Steps:
1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Set environment variables:**
   ```bash
   vercel env add GOOGLE_API_KEY
   # Enter your Google Gemini API key when prompted
   ```

4. **Deploy:**
   ```bash
   vercel --prod
   ```

### 2. **Railway (Recommended for Full-Stack)**

**Pros:** Simple deployment, persistent storage, good for Node.js apps
**Cons:** Paid plans for production

#### Steps:
1. **Connect GitHub repository to Railway**
2. **Set environment variables in Railway dashboard:**
   - `GOOGLE_API_KEY`: Your Google Gemini API key
   - `NODE_ENV`: `production`
3. **Deploy automatically from GitHub**

### 3. **Docker Deployment**

**Pros:** Works anywhere, consistent environment
**Cons:** Requires Docker knowledge

#### Steps:
1. **Build the Docker image:**
   ```bash
   docker build -t ai-dress-tryon .
   ```

2. **Run with environment variables:**
   ```bash
   docker run -p 5000:5000 -e GOOGLE_API_KEY=your_key_here ai-dress-tryon
   ```

3. **Or use Docker Compose:**
   ```bash
   # Create .env file with your API key
   echo "GOOGLE_API_KEY=your_key_here" > .env
   
   # Start the application
   docker-compose up -d
   ```

### 4. **Heroku**

**Pros:** Easy deployment, good free tier
**Cons:** Limited free tier resources

#### Steps:
1. **Install Heroku CLI**
2. **Login and create app:**
   ```bash
   heroku login
   heroku create your-app-name
   ```

3. **Set environment variables:**
   ```bash
   heroku config:set GOOGLE_API_KEY=your_key_here
   heroku config:set NODE_ENV=production
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

### 5. **DigitalOcean App Platform**

**Pros:** Good performance, reasonable pricing
**Cons:** More complex setup

#### Steps:
1. **Connect GitHub repository**
2. **Configure build settings:**
   - Build command: `npm run build`
   - Run command: `npm start`
3. **Set environment variables**
4. **Deploy**

## 🔧 Environment Variables

Make sure to set these environment variables in your deployment platform:

```env
GOOGLE_API_KEY=your_google_gemini_api_key_here
NODE_ENV=production
PORT=5000
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads
```

## 📁 File Structure for Deployment

```
ai-dress-tryon/
├── client/                 # React frontend
├── server/                 # Node.js backend
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose setup
├── vercel.json           # Vercel configuration
├── railway.json          # Railway configuration
├── package.json          # Root package.json
└── README.md
```

## 🚨 Important Notes

### File Storage
- **Vercel/Netlify:** Use external storage (AWS S3, Cloudinary) for uploaded files
- **Railway/Heroku:** Files are stored temporarily, consider external storage for production
- **Docker/VPS:** Local storage works but consider backups

### API Key Security
- Never commit API keys to version control
- Use environment variables in all deployments
- Consider using secret management services

### Performance Considerations
- **Image processing:** Consider using CDN for images
- **File uploads:** Implement file size limits
- **Caching:** Add Redis for session management if needed

## 🔍 Testing Your Deployment

After deployment, test these endpoints:

1. **Health check:** `https://your-app.com/api/health`
2. **Model list:** `https://your-app.com/api/models`
3. **API test:** `https://your-app.com/api/test-gemini`

## 🆘 Troubleshooting

### Common Issues:

1. **Build failures:** Check Node.js version compatibility
2. **API key errors:** Verify environment variables are set correctly
3. **File upload issues:** Check file size limits and storage permissions
4. **CORS errors:** Ensure CORS is configured for your domain

### Debug Commands:

```bash
# Check environment variables
echo $GOOGLE_API_KEY

# Test API connection
curl https://your-app.com/api/test-gemini

# Check build logs
vercel logs
# or
heroku logs --tail
```

## 📈 Scaling Considerations

For production use:
- Use a CDN for static assets
- Implement rate limiting
- Add monitoring and logging
- Consider using a database for user data
- Implement proper error handling and logging

Choose the deployment option that best fits your needs and budget!
