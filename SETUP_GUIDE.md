# 🚀 Quick Setup Guide

## Step-by-Step Setup Instructions

### Prerequisites Installation

#### 1. Install Node.js
- Download from: https://nodejs.org/
- Choose LTS version (v18 or higher)
- Verify installation: `node --version` and `npm --version`

#### 2. Python is already installed ✅
- You already have Python installed
- Verify: `python --version`

### Firebase Configuration

#### 1. Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Enter project name: "personal-diary" (or any name)
4. Disable Google Analytics (optional)
5. Click "Create project"

#### 2. Enable Google Authentication
1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Click on "Sign-in method" tab
4. Click on "Google"
5. Toggle "Enable"
6. Select a support email
7. Click "Save"

#### 3. Get Firebase Web Config
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click the web icon `</>`
4. Register app with nickname: "diary-web"
5. Copy the `firebaseConfig` object values
6. You'll need these for `frontend/.env`

#### 4. Get Firebase Admin Credentials
1. Still in Project Settings
2. Go to "Service accounts" tab
3. Click "Generate new private key"
4. Click "Generate key"
5. Save the downloaded JSON file
6. Rename it to `firebase-credentials.json`
7. Move it to `diary-app/backend/` folder

### NeonDB Configuration

#### 1. Create NeonDB Account
1. Go to https://neon.tech/
2. Sign up with GitHub or email
3. Create a new project
4. Name it "personal-diary"
5. Choose a region close to you

#### 2. Get Database Connection String
1. In NeonDB dashboard, click "Connection Details"
2. Copy the connection string
3. It looks like: `postgresql://username:password@host/database?sslmode=require`
4. You'll need this for `backend/.env`

### Backend Setup

```powershell
# Navigate to backend
cd diary-app\backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env

# Edit .env file with your values:
# - Add your NeonDB connection string to DATABASE_URL
# - Verify FIREBASE_CREDENTIALS_PATH points to your JSON file
```

**Edit `backend/.env`:**
```env
DATABASE_URL="postgresql://your_neondb_connection_string_here"
FIREBASE_CREDENTIALS_PATH="./firebase-credentials.json"
UPLOAD_DIR="./uploads"
```

```powershell
# Generate Prisma client
prisma generate

# Push database schema to NeonDB
prisma db push

# Start backend server
uvicorn main:app --reload --port 8000
```

Keep this terminal open! Backend should be running on http://localhost:8000

### Frontend Setup

Open a **NEW terminal** (keep backend running):

```powershell
# Navigate to frontend
cd diary-app\frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env file with your Firebase config values
```

**Edit `frontend/.env`:**
```env
VITE_FIREBASE_API_KEY=your_api_key_from_firebase_config
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:8000
```

```powershell
# Start frontend development server
npm run dev
```

### Testing the Application

1. Open browser to http://localhost:5173
2. Click "Sign in with Google"
3. Choose your Google account
4. You should see the diary interface
5. Click "Write Today's Entry"
6. Add some text and optionally an image
7. Click "Save Entry"
8. Your entry should appear on the main page!

### Troubleshooting

#### Backend Issues
- **Error: Firebase credentials not found**
  - Make sure `firebase-credentials.json` is in the `backend` folder
  
- **Error: Database connection failed**
  - Check your NeonDB connection string in `.env`
  - Make sure it includes `?sslmode=require` at the end

- **Error: Module not found**
  - Make sure virtual environment is activated
  - Run `pip install -r requirements.txt` again

#### Frontend Issues
- **Error: Firebase configuration invalid**
  - Check all Firebase config values in `frontend/.env`
  - Make sure they start with `VITE_`

- **Error: Cannot connect to backend**
  - Make sure backend is running on port 8000
  - Check `VITE_API_URL` in `frontend/.env`

- **npm not found**
  - Install Node.js first
  - Restart your terminal after installation

### File Upload Location

Uploaded images are stored in: `diary-app/backend/uploads/`

Each image is named with the user ID and a unique identifier to prevent conflicts.

### Security Notes

- Never commit `.env` files to git
- Never commit `firebase-credentials.json` to git
- Each user can only see their own diary entries
- All API requests require valid Firebase authentication

---

🎉 **Congratulations!** Your personal diary app is now running!

For detailed information, see the main README.md file.

