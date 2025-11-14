# Backend Deployment Guide

## Quick Deploy Options

### Option 1: Railway (Recommended - Easiest)
1. Go to [Railway.app](https://railway.app)
2. Sign up/login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect the backend folder
6. Add environment variable:
   - Key: `ALLOWED_ORIGINS`
   - Value: `https://vector-shift-kab3.vercel.app,http://localhost:3000`
7. Deploy! Railway will give you a URL like `https://your-app.railway.app`

### Option 2: Render
1. Go to [Render.com](https://render.com)
2. Sign up/login with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Settings:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment**: Python 3
6. Add environment variable:
   - Key: `ALLOWED_ORIGINS`
   - Value: `https://vector-shift-kab3.vercel.app,http://localhost:3000`
7. Deploy!

### Option 3: Fly.io
1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. In the backend directory, run: `fly launch`
3. Follow the prompts
4. Set environment variable: `fly secrets set ALLOWED_ORIGINS="https://vector-shift-kab3.vercel.app,http://localhost:3000"`

## After Deployment

Once you have your backend URL (e.g., `https://your-backend.railway.app`):

1. **Update Vercel Environment Variables:**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add: `REACT_APP_BACKEND_URL` = `https://your-backend.railway.app`
   - Redeploy your frontend

2. **Test the connection:**
   - Visit your frontend URL
   - Try submitting a pipeline
   - Check browser console for any CORS errors

## Local Development

For local development, the backend will default to allowing `http://localhost:3000`.

Run locally:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

