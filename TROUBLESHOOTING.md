# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### Installation Issues

#### Node.js/npm not found
**Problem**: `npm: command not found` or `node: command not found`

**Solution**:
1. Download Node.js from https://nodejs.org/
2. Install the LTS version
3. Restart your terminal/PowerShell
4. Verify: `node --version` and `npm --version`

#### Python not found
**Problem**: `python: command not found`

**Solution**:
1. Download Python from https://python.org/
2. During installation, check "Add Python to PATH"
3. Restart terminal
4. Verify: `python --version`

---

### Backend Issues

#### Error: "No module named 'fastapi'"
**Problem**: Dependencies not installed

**Solution**:
```powershell
cd diary-app\backend
.\venv\Scripts\activate
pip install -r requirements.txt
```

#### Error: "firebase-credentials.json not found"
**Problem**: Firebase admin credentials missing

**Solution**:
1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key"
3. Save file as `firebase-credentials.json`
4. Move to `diary-app/backend/` folder

#### Error: "DATABASE_URL not set"
**Problem**: Environment variables not configured

**Solution**:
```powershell
cd diary-app\backend
copy .env.example .env
# Edit .env and add your NeonDB connection string
```

#### Error: "Prisma Client not generated"
**Problem**: Prisma client needs to be generated

**Solution**:
```powershell
cd diary-app\backend
.\venv\Scripts\activate
prisma generate
prisma db push
```

#### Error: "Connection to database failed"
**Problem**: Invalid NeonDB connection string or database not accessible

**Solution**:
1. Check your NeonDB connection string in `.env`
2. Ensure it includes `?sslmode=require`
3. Verify your NeonDB project is active
4. Check internet connection

#### Error: "Port 8000 already in use"
**Problem**: Another process is using port 8000

**Solution**:
```powershell
# Option 1: Use different port
uvicorn main:app --reload --port 8001

# Option 2: Find and kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F
```

---

### Frontend Issues

#### Error: "npm install fails"
**Problem**: Network issues or corrupted cache

**Solution**:
```powershell
cd diary-app\frontend
npm cache clean --force
npm install
```

#### Error: "Firebase configuration invalid"
**Problem**: Missing or incorrect Firebase config

**Solution**:
1. Check `frontend/.env` file exists
2. Verify all `VITE_FIREBASE_*` variables are set
3. Ensure values are from Firebase Console → Project Settings
4. Make sure variable names start with `VITE_`

#### Error: "Cannot connect to backend"
**Problem**: Backend not running or wrong URL

**Solution**:
1. Ensure backend is running: `http://localhost:8000`
2. Check `VITE_API_URL` in `frontend/.env`
3. Should be: `VITE_API_URL=http://localhost:8000`
4. Restart frontend dev server after changing .env

#### Error: "Port 5173 already in use"
**Problem**: Another Vite app is running

**Solution**:
```powershell
# Kill the process or use different port
npm run dev -- --port 3000
```

---

### Authentication Issues

#### Error: "Google Sign-In popup blocked"
**Problem**: Browser blocking popups

**Solution**:
1. Allow popups for localhost in browser settings
2. Try signing in again

#### Error: "Firebase: Error (auth/unauthorized-domain)"
**Problem**: Domain not authorized in Firebase

**Solution**:
1. Go to Firebase Console → Authentication → Settings
2. Add `localhost` to Authorized domains
3. Try signing in again

#### Error: "Invalid authentication credentials"
**Problem**: Token expired or invalid

**Solution**:
1. Sign out and sign in again
2. Clear browser cache
3. Check Firebase credentials in backend

---

### API/Request Issues

#### Error: "401 Unauthorized"
**Problem**: Missing or invalid authentication token

**Solution**:
1. Sign out and sign in again
2. Check browser console for errors
3. Verify Firebase token is being sent in requests

#### Error: "403 Forbidden"
**Problem**: Trying to access another user's data

**Solution**:
- This is expected behavior!
- You can only access your own diary entries
- This ensures privacy

#### Error: "CORS policy error"
**Problem**: Backend CORS not configured for frontend URL

**Solution**:
1. Check backend `main.py`
2. Ensure frontend URL is in `allow_origins`
3. Default: `["http://localhost:5173", "http://localhost:3000"]`

---

### File Upload Issues

#### Error: "Failed to upload image"
**Problem**: File too large or wrong format

**Solution**:
1. Ensure image is under 10MB
2. Use common formats: JPG, PNG, GIF
3. Check backend logs for specific error

#### Error: "Image not displaying"
**Problem**: Wrong image URL or file not saved

**Solution**:
1. Check `backend/uploads/` folder exists
2. Verify image file is there
3. Check browser console for 404 errors
4. Ensure `VITE_API_URL` is correct

---

### Database Issues

#### Error: "Prisma migration failed"
**Problem**: Database schema mismatch

**Solution**:
```powershell
cd diary-app\backend
.\venv\Scripts\activate
prisma db push --force-reset
# WARNING: This will delete all data!
```

#### Error: "Table does not exist"
**Problem**: Database not initialized

**Solution**:
```powershell
cd diary-app\backend
.\venv\Scripts\activate
prisma generate
prisma db push
```

---

### Development Issues

#### Frontend changes not reflecting
**Problem**: Browser cache or dev server not reloading

**Solution**:
1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Restart dev server

#### Backend changes not reflecting
**Problem**: Uvicorn not reloading

**Solution**:
1. Ensure using `--reload` flag
2. Restart server manually
3. Check for syntax errors in Python files

---

### Verification Steps

Run these commands to verify your setup:

#### Backend Verification
```powershell
cd diary-app\backend
.\venv\Scripts\activate
python check_setup.py
```

#### Frontend Verification
```powershell
cd diary-app\frontend
npm run dev
# Should start without errors
```

#### Test Backend API
```powershell
# In browser, visit:
http://localhost:8000
# Should see: {"message": "Personal Diary API", "status": "running"}
```

---

### Getting Help

If you're still stuck:

1. **Check the logs**:
   - Backend: Look at terminal where uvicorn is running
   - Frontend: Check browser console (F12)

2. **Verify environment**:
   - Backend: Check `.env` file has correct values
   - Frontend: Check `.env` file has correct Firebase config

3. **Start fresh**:
   - Delete `node_modules` and run `npm install` again
   - Delete `venv` and create new virtual environment
   - Regenerate Prisma client

4. **Check versions**:
   - Node.js: v18 or higher
   - Python: 3.9 or higher
   - npm: 9 or higher

---

## Quick Checklist

Before running the app, ensure:

- [ ] Node.js installed
- [ ] Python installed
- [ ] Firebase project created
- [ ] Google Auth enabled in Firebase
- [ ] Firebase credentials JSON downloaded
- [ ] NeonDB project created
- [ ] Backend `.env` configured
- [ ] Frontend `.env` configured
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Prisma client generated
- [ ] Database schema pushed

---

Still having issues? Double-check the SETUP_GUIDE.md for step-by-step instructions!

