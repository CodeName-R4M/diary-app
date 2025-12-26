# ✅ Setup Checklist

Use this checklist to track your setup progress.

## Prerequisites

- [ ] **Node.js installed** (v18 or higher)
  - Download: https://nodejs.org/
  - Verify: `node --version` and `npm --version`

- [x] **Python installed** (v3.9 or higher) ✅ Already installed
  - Verify: `python --version`

## Firebase Setup

- [ ] **Create Firebase project**
  - Go to: https://console.firebase.google.com/
  - Click "Add project"
  - Name: "personal-diary" (or your choice)

- [ ] **Enable Google Authentication**
  - Firebase Console → Authentication
  - Click "Get started"
  - Sign-in method → Google → Enable

- [ ] **Get Firebase Web Config**
  - Project Settings → General
  - Your apps → Add web app
  - Copy config values (apiKey, authDomain, etc.)

- [ ] **Download Firebase Admin Credentials**
  - Project Settings → Service Accounts
  - Generate new private key
  - Save as `firebase-credentials.json`
  - Move to `diary-app/backend/` folder

## NeonDB Setup

- [ ] **Create NeonDB account**
  - Go to: https://neon.tech/
  - Sign up (free tier available)

- [ ] **Create database project**
  - Create new project
  - Name: "personal-diary"

- [ ] **Get connection string**
  - Copy PostgreSQL connection string
  - Should include `?sslmode=require`

## Backend Configuration

- [ ] **Navigate to backend folder**
  ```powershell
  cd diary-app\backend
  ```

- [ ] **Create virtual environment**
  ```powershell
  python -m venv venv
  ```

- [ ] **Activate virtual environment**
  ```powershell
  .\venv\Scripts\activate
  ```

- [ ] **Install dependencies**
  ```powershell
  pip install -r requirements.txt
  ```

- [ ] **Create .env file**
  ```powershell
  copy .env.example .env
  ```

- [ ] **Configure .env file**
  - Open `backend\.env` in text editor
  - Add NeonDB connection string to `DATABASE_URL`
  - Verify `FIREBASE_CREDENTIALS_PATH` points to your JSON file

- [ ] **Place firebase-credentials.json**
  - File should be in `backend/` folder
  - Verify path matches .env setting

- [ ] **Generate Prisma client**
  ```powershell
  prisma generate
  ```

- [ ] **Push database schema**
  ```powershell
  prisma db push
  ```

- [ ] **Test backend startup**
  ```powershell
  uvicorn main:app --reload --port 8000
  ```
  - Should see: "Application startup complete"
  - Visit: http://localhost:8000
  - Should see: `{"message": "Personal Diary API", "status": "running"}`

## Frontend Configuration

- [ ] **Open NEW terminal** (keep backend running)

- [ ] **Navigate to frontend folder**
  ```powershell
  cd diary-app\frontend
  ```

- [ ] **Install dependencies**
  ```powershell
  npm install
  ```

- [ ] **Create .env file**
  ```powershell
  copy .env.example .env
  ```

- [ ] **Configure .env file**
  - Open `frontend\.env` in text editor
  - Add all Firebase config values from Firebase Console
  - Set `VITE_API_URL=http://localhost:8000`

- [ ] **Test frontend startup**
  ```powershell
  npm run dev
  ```
  - Should see: "Local: http://localhost:5173"
  - No errors in terminal

## Testing the Application

- [ ] **Open browser**
  - Navigate to: http://localhost:5173

- [ ] **Test login**
  - Click "Sign in with Google"
  - Select Google account
  - Should redirect to diary interface

- [ ] **Test creating entry (text only)**
  - Click "Write Today's Entry"
  - Add title (optional)
  - Write some text
  - Click "Save Entry"
  - Entry should appear in list

- [ ] **Test creating entry (with image)**
  - Click "Write Today's Entry"
  - Write some text
  - Upload an image
  - Click "Save Entry"
  - Entry should appear with image

- [ ] **Verify image upload**
  - Check `backend\uploads\` folder
  - Image file should be there
  - Filename format: `{userId}_{uuid}.{extension}`

- [ ] **Test viewing entries**
  - All your entries should be visible
  - Images should display correctly
  - Dates should be formatted nicely

- [ ] **Test delete entry**
  - Click delete button (🗑️) on an entry
  - Confirm deletion
  - Entry should disappear
  - Image should be removed from uploads folder

- [ ] **Test user isolation**
  - Sign out
  - Sign in with different Google account
  - Should see empty diary (no entries from first user)
  - Create an entry with second user
  - Sign out and sign back in with first user
  - Should NOT see second user's entries

## Verification

- [ ] **Backend running** on http://localhost:8000
- [ ] **Frontend running** on http://localhost:5173
- [ ] **Can sign in with Google**
- [ ] **Can create text entries**
- [ ] **Can upload images**
- [ ] **Images saved in backend/uploads/**
- [ ] **Can view all own entries**
- [ ] **Can delete entries**
- [ ] **Cannot see other users' entries**
- [ ] **No errors in browser console**
- [ ] **No errors in backend terminal**

## Common Issues

If something doesn't work, check:

1. **Both servers running?**
   - Backend on port 8000
   - Frontend on port 5173

2. **Environment variables set?**
   - `backend\.env` has DATABASE_URL
   - `frontend\.env` has all VITE_FIREBASE_* variables

3. **Firebase credentials correct?**
   - `firebase-credentials.json` in backend folder
   - Firebase config in frontend .env matches your project

4. **Database connected?**
   - NeonDB connection string is correct
   - Includes `?sslmode=require`

5. **Dependencies installed?**
   - Backend: `pip install -r requirements.txt`
   - Frontend: `npm install`

For detailed troubleshooting, see `TROUBLESHOOTING.md`

---

## 🎉 When All Checked

Congratulations! Your Personal Diary app is fully functional!

**What you have:**
- ✅ Secure authentication with Google
- ✅ Private diary entries
- ✅ Image upload capability
- ✅ Beautiful diary-themed UI
- ✅ Complete user isolation
- ✅ Production-ready application

**Next steps:**
- Use your diary daily!
- Customize the UI to your liking
- Deploy to production (see README.md)
- Add more features (tags, search, etc.)

---

**Need help?** Check the documentation files:
- `SETUP_GUIDE.md` - Detailed setup instructions
- `TROUBLESHOOTING.md` - Common issues and solutions
- `ARCHITECTURE.md` - How everything works

