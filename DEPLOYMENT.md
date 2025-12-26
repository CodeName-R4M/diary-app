# 🚀 Deployment Guide - Personal Diary App

This guide will help you deploy both the frontend and backend of your Personal Diary application.

## 📋 Prerequisites

Before deploying, make sure you have:
- ✅ A GitHub account
- ✅ Firebase project with Google Authentication enabled
- ✅ PostgreSQL database (NeonDB, Supabase, or similar)
- ✅ Firebase Admin SDK credentials JSON file

---

## 🔧 Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit: Personal Diary App"
```

### 1.2 Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `personal-diary-app` (or your preferred name)
3. **DO NOT** initialize with README, .gitignore, or license (we already have these)

### 1.3 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/personal-diary-app.git
git branch -M main
git push -u origin main
```

---

## 🎨 Step 2: Deploy Frontend

You can deploy the frontend to **Vercel** (recommended) or **Netlify**.

### Option A: Deploy to Vercel (Recommended)

1. **Go to [Vercel](https://vercel.com)** and sign in with GitHub

2. **Import your repository:**
   - Click "Add New Project"
   - Select your `personal-diary-app` repository
   - Vercel will auto-detect it's a Vite project

3. **Configure the project:**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. **Add Environment Variables:**
   Go to Project Settings > Environment Variables and add:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_URL=https://your-backend-url.com
   ```
   ⚠️ **Note:** You'll update `VITE_API_URL` after deploying the backend

5. **Deploy:** Click "Deploy"

### Option B: Deploy to Netlify

1. **Go to [Netlify](https://netlify.com)** and sign in with GitHub

2. **Import your repository:**
   - Click "Add new site" > "Import an existing project"
   - Select your repository

3. **Configure build settings:**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`

4. **Add Environment Variables:**
   Go to Site Settings > Environment Variables and add the same variables as Vercel

5. **Deploy:** Click "Deploy site"

---

## 🔧 Step 3: Deploy Backend

You can deploy the backend to **Railway** (recommended), **Render**, or **Heroku**.

### Option A: Deploy to Railway (Recommended)

1. **Go to [Railway](https://railway.app)** and sign in with GitHub

2. **Create a new project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `personal-diary-app` repository

3. **Configure the service:**
   - Railway will auto-detect Python
   - **Root Directory:** Set to `backend`

4. **Add Environment Variables:**
   In Railway project settings, add:
   ```
   DATABASE_URL=your_neondb_connection_string
   FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
   UPLOAD_DIR=./uploads
   PORT=8000
   ```

5. **Add Firebase Credentials:**
   - In Railway, go to your service settings
   - Add a new variable called `FIREBASE_CREDENTIALS_JSON`
   - Paste the entire contents of your `firebase-credentials.json` file
   - Add a start script that creates the file from the environment variable

6. **Deploy:** Railway will automatically deploy

7. **Get your backend URL:** Copy the generated URL (e.g., `https://your-app.railway.app`)

### Option B: Deploy to Render

1. **Go to [Render](https://render.com)** and sign in with GitHub

2. **Create a new Web Service:**
   - Click "New +" > "Web Service"
   - Connect your repository
   - Select your repository

3. **Configure the service:**
   - **Name:** `diary-app-backend`
   - **Root Directory:** `backend`
   - **Environment:** Python 3
   - **Build Command:** `pip install -r requirements.txt && python -m prisma generate`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Add Environment Variables:**
   ```
   DATABASE_URL=your_neondb_connection_string
   FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
   UPLOAD_DIR=./uploads
   PYTHON_VERSION=3.11
   ```

5. **Deploy:** Click "Create Web Service"

### Option C: Deploy to Heroku

1. **Install Heroku CLI** and login:
   ```bash
   heroku login
   ```

2. **Create a new Heroku app:**
   ```bash
   cd backend
   heroku create your-diary-backend
   ```

3. **Add PostgreSQL database:**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```
   Or use your existing NeonDB connection string

4. **Set environment variables:**
   ```bash
   heroku config:set DATABASE_URL="your_neondb_connection_string"
   heroku config:set FIREBASE_CREDENTIALS_PATH="./firebase-credentials.json"
   heroku config:set UPLOAD_DIR="./uploads"
   ```

5. **Deploy:**
   ```bash
   git subtree push --prefix backend heroku main
   ```

---

## 🔗 Step 4: Connect Frontend to Backend

After deploying the backend:

1. **Copy your backend URL** (e.g., `https://your-app.railway.app`)

2. **Update frontend environment variable:**
   - Go to your Vercel/Netlify project settings
   - Update `VITE_API_URL` to your backend URL
   - Redeploy the frontend

---

## 🔐 Step 5: Configure Firebase for Production

1. **Go to Firebase Console** > Authentication > Settings > Authorized Domains

2. **Add your frontend domain:**
   - Add your Vercel/Netlify domain (e.g., `your-app.vercel.app`)

3. **Update CORS settings in backend** (if needed):
   The backend is already configured to accept requests from any origin in development.
   For production, you may want to restrict this.

---

## ✅ Step 6: Verify Deployment

1. **Visit your frontend URL**
2. **Try to sign in with Google**
3. **Create a diary entry**
4. **Upload an image**
5. **Verify everything works!**

---

## 🔄 Continuous Deployment

Both Vercel/Netlify and Railway/Render support automatic deployments:

- **Every push to `main` branch** will trigger a new deployment
- **Pull requests** will create preview deployments
- **Environment variables** are preserved across deployments

---

## 📝 Important Notes

### Security Considerations

1. **Never commit sensitive files:**
   - `.env` files are in `.gitignore`
   - `firebase-credentials.json` is in `.gitignore`
   - Always use environment variables for secrets

2. **Firebase credentials on backend:**
   - For Railway/Render, you may need to encode the JSON as a base64 string
   - Or use their secret file upload features

3. **Database backups:**
   - NeonDB provides automatic backups
   - Consider setting up regular backup schedules

### File Uploads

- Uploaded images are stored in the `uploads/` directory
- For production, consider using cloud storage (AWS S3, Cloudinary, etc.)
- Current setup stores files on the server filesystem

---

## 🆘 Troubleshooting

### Frontend Issues

**Problem:** "Failed to fetch" errors
- **Solution:** Check that `VITE_API_URL` is set correctly and backend is running

**Problem:** Firebase authentication not working
- **Solution:** Verify all Firebase environment variables are set correctly
- Check that your domain is authorized in Firebase Console

### Backend Issues

**Problem:** Database connection errors
- **Solution:** Verify `DATABASE_URL` is correct and database is accessible
- Check that SSL mode is set correctly for your database provider

**Problem:** Firebase Admin SDK errors
- **Solution:** Ensure `firebase-credentials.json` is properly configured
- Verify the service account has the correct permissions

**Problem:** "Module not found" errors
- **Solution:** Make sure all dependencies are in `requirements.txt`
- Run `pip install -r requirements.txt` locally to verify

---

## 🎉 Success!

Your Personal Diary app is now deployed and accessible worldwide!

**Frontend URL:** `https://your-app.vercel.app`
**Backend URL:** `https://your-backend.railway.app`

Enjoy your deployed diary application! 📖✨

