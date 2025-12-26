# ⚡ Quick Start Guide - Personal Diary App

## 🎯 What You Have Now

✅ **Profile Dropdown** - Click profile picture to see user details  
✅ **Flask Backend** - Ready for PythonAnywhere deployment  
✅ **FastAPI Backend** - Ready for Railway/Render deployment  
✅ **Deployment Configs** - All files ready for GitHub push and deploy  

---

## 🚀 Run Locally

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Opens at: `http://localhost:5173`

### Backend (Flask - Recommended for PythonAnywhere)
```bash
cd backend
pip install -r requirements.txt
python -m prisma generate
python -m prisma db push
python run_flask.py
```
Opens at: `http://localhost:8000`

### Backend (FastAPI - Alternative)
```bash
cd backend
# Uncomment FastAPI dependencies in requirements.txt first
pip install fastapi uvicorn python-multipart aiofiles pydantic
python -m prisma generate
python -m prisma db push
py -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
Opens at: `http://localhost:8000`

---

## 📤 Deploy to Production

### 1️⃣ Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Personal Diary App with Flask backend"
git remote add origin https://github.com/YOUR_USERNAME/personal-diary-app.git
git branch -M main
git push -u origin main
```

### 2️⃣ Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `frontend`
4. Add environment variables (Firebase config)
5. Deploy!

**See:** [DEPLOYMENT.md](DEPLOYMENT.md) for detailed steps

### 3️⃣ Deploy Backend to PythonAnywhere

1. Go to [pythonanywhere.com](https://pythonanywhere.com)
2. Clone your repository
3. Setup virtual environment
4. Configure WSGI file
5. Add environment variables
6. Reload web app!

**See:** [PYTHONANYWHERE_DEPLOYMENT.md](PYTHONANYWHERE_DEPLOYMENT.md) for detailed steps

---

## 📁 Important Files

### Configuration Files
- `frontend/.env` - Frontend environment variables
- `backend/.env` - Backend environment variables
- `backend/firebase-credentials.json` - Firebase Admin SDK credentials

### Deployment Files
- `frontend/vercel.json` - Vercel deployment config
- `frontend/netlify.toml` - Netlify deployment config
- `backend/wsgi.py` - PythonAnywhere WSGI config
- `backend/railway.json` - Railway deployment config
- `backend/render.yaml` - Render deployment config

### Documentation
- `PYTHONANYWHERE_DEPLOYMENT.md` - PythonAnywhere guide
- `DEPLOYMENT.md` - General deployment guide
- `CREDENTIALS_SETUP.md` - Credentials setup guide
- `backend/README_FLASK.md` - Flask vs FastAPI comparison

---

## 🔐 Environment Variables Needed

### Frontend (.env)
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_URL=http://localhost:8000
```

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
UPLOAD_DIR=./uploads
```

---

## ✨ New Features Added

### 1. Profile Dropdown
- Click profile picture in header
- Shows user details (name, email, ID, join date, etc.)
- Logout button integrated
- Beautiful dropdown animation

**Files:**
- `frontend/src/components/ProfileDropdown.jsx`
- `frontend/src/components/ProfileDropdown.css`

### 2. Flask Backend
- Full Flask conversion from FastAPI
- Compatible with PythonAnywhere
- Same API endpoints
- Synchronous code (easier to debug)

**Files:**
- `backend/app.py` - Main Flask application
- `backend/wsgi.py` - WSGI configuration
- `backend/run_flask.py` - Local run script

### 3. Deployment Configurations
- PythonAnywhere WSGI config
- Vercel/Netlify configs
- Railway/Render configs
- Comprehensive deployment guides

---

## 🎨 Tech Stack

**Frontend:**
- React 18 + Vite
- Firebase Authentication
- Axios for API calls
- Custom CSS with handwritten fonts

**Backend (Flask):**
- Flask 3.0
- Prisma ORM
- PostgreSQL (NeonDB)
- Firebase Admin SDK
- Gunicorn for production

**Backend (FastAPI - Alternative):**
- FastAPI
- Uvicorn
- Same database and auth

---

## 🆘 Common Issues

### "Module not found"
```bash
pip install -r requirements.txt
```

### "Prisma client not generated"
```bash
python -m prisma generate
```

### "Database connection failed"
```bash
# Check .env file has correct DATABASE_URL
python -m prisma db push
```

### "Firebase not initialized"
- Ensure `firebase-credentials.json` exists in backend folder
- Check path in `.env` file

---

## 📚 Next Steps

1. ✅ Test locally (both frontend and backend)
2. ✅ Push to GitHub
3. ✅ Deploy frontend to Vercel
4. ✅ Deploy backend to PythonAnywhere
5. ✅ Update frontend VITE_API_URL with backend URL
6. ✅ Test production deployment
7. ✅ Enjoy your diary app! 📖

---

## 🎉 You're All Set!

Everything is configured and ready to deploy. Follow the guides and you'll have your app live in minutes!

**Happy Journaling! 📖✨**

