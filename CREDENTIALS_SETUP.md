# 🔑 Credentials Setup Guide

## ✅ Current Status

**Backend Server:** ✅ Running on http://localhost:8000  
**Frontend Server:** ⚠️ Needs to be started manually

---

## 📝 Where to Paste Your Credentials

### 1️⃣ **Backend Database Configuration**

**File:** `backend/.env`

```env
DATABASE_URL="postgresql://user:password@localhost/diary?sslmode=require"
FIREBASE_CREDENTIALS_PATH="./firebase-credentials.json"
UPLOAD_DIR="./uploads"
```

**What to change:**
- Replace the entire `DATABASE_URL` value with your **NeonDB connection string**
- Get it from: https://console.neon.tech → Your Project → Connection Details
- Example: `postgresql://username:password@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require`

---

### 2️⃣ **Backend Firebase Admin SDK**

**File:** `backend/firebase-credentials.json` (create this file)

Copy the example file and replace with your credentials:
```bash
cd backend
copy firebase-credentials.example.json firebase-credentials.json
```

Then edit `firebase-credentials.json` with your Firebase Admin SDK JSON:
- Get it from: Firebase Console → Project Settings → Service Accounts → Generate New Private Key
- Download the JSON file and copy its entire content to `backend/firebase-credentials.json`

---

### 3️⃣ **Frontend Firebase Web App Configuration**

**File:** `frontend/.env`

```env
VITE_FIREBASE_API_KEY=demo_api_key
VITE_FIREBASE_AUTH_DOMAIN=demo-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=demo-project
VITE_FIREBASE_STORAGE_BUCKET=demo-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_API_URL=http://localhost:8000
```

**What to change:**
- Get credentials from: Firebase Console → Project Settings → General → Your Apps → Web App
- Click "Config" to see the configuration object
- Replace each value:
  - `apiKey` → `VITE_FIREBASE_API_KEY`
  - `authDomain` → `VITE_FIREBASE_AUTH_DOMAIN`
  - `projectId` → `VITE_FIREBASE_PROJECT_ID`
  - `storageBucket` → `VITE_FIREBASE_STORAGE_BUCKET`
  - `messagingSenderId` → `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `appId` → `VITE_FIREBASE_APP_ID`
- Keep `VITE_API_URL=http://localhost:8000` as is

---

## 🚀 How to Start the Servers

### Backend (Already Running ✅)
The backend is currently running on http://localhost:8000

If you need to restart it:
```powershell
cd backend
venv\Scripts\activate
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend (Start in a New Terminal)
Open a **new PowerShell terminal** and run:
```powershell
cd frontend
npm run dev
```

The frontend will start on http://localhost:5173

---

## 🔧 After Pasting Credentials

### Run Database Migration
After pasting your NeonDB credentials in `backend/.env`:
```powershell
cd backend
venv\Scripts\activate
$env:PATH = "venv\Scripts;$env:PATH"
python -m prisma db push
```

This will create the necessary database tables.

---

## 📋 Quick Checklist

- [ ] Paste NeonDB connection string in `backend/.env`
- [ ] Create `backend/firebase-credentials.json` with Firebase Admin SDK
- [ ] Update all 6 Firebase values in `frontend/.env`
- [ ] Run `prisma db push` in backend
- [ ] Start frontend server with `npm run dev`
- [ ] Open http://localhost:5173 in your browser

---

## 🎯 Summary

**3 Files to Edit:**
1. `backend/.env` - Database connection
2. `backend/firebase-credentials.json` - Firebase Admin (create this file)
3. `frontend/.env` - Firebase Web App config

Once you paste these credentials and run the database migration, your diary app will be fully functional! 🎉

