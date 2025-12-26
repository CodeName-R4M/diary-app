# 📖 Personal Diary Application

A beautiful, secure personal diary application with React frontend, FastAPI backend, Firebase authentication, and NeonDB database.

## ✨ Features

- 🔐 **Secure Google Authentication** via Firebase
- 📝 **Rich Diary Entries** with text and images
- 🎨 **Beautiful Diary-themed UI** with handwritten fonts
- 🔒 **Complete Privacy** - Users can only see their own entries
- 📸 **Image Upload** - Add photos to your diary entries
- 💾 **Persistent Storage** - All data stored in NeonDB PostgreSQL
- 🚀 **Fast & Modern** - Built with React + Vite and FastAPI

## 🏗️ Tech Stack

### Frontend
- React 18
- Vite
- Firebase Authentication
- Axios for API calls
- Custom CSS with diary theme

### Backend
- FastAPI (Python)
- Prisma ORM
- NeonDB (PostgreSQL)
- Firebase Admin SDK
- File upload handling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **Python** (v3.9 or higher) - [Download here](https://www.python.org/)
3. **Firebase Account** - [Create here](https://firebase.google.com/)
4. **NeonDB Account** - [Create here](https://neon.tech/)

## 🚀 Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Google Authentication**:
   - Go to Authentication → Sign-in method
   - Enable Google provider
4. Get your Firebase config:
   - Go to Project Settings → General
   - Scroll to "Your apps" and create a Web app
   - Copy the configuration values
5. Generate Firebase Admin SDK credentials:
   - Go to Project Settings → Service Accounts
   - Click "Generate new private key"
   - Save the JSON file as `firebase-credentials.json` in the `backend` folder

### 2. NeonDB Setup

1. Go to [NeonDB Console](https://console.neon.tech/)
2. Create a new project
3. Copy the connection string (it looks like: `postgresql://user:password@host/database?sslmode=require`)

### 3. Backend Setup

```bash
# Navigate to backend directory
cd diary-app/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env  # On Windows
# cp .env.example .env  # On macOS/Linux

# Edit .env file and add your NeonDB connection string
# DATABASE_URL="your_neondb_connection_string"

# Place your firebase-credentials.json in the backend folder

# Generate Prisma client
prisma generate

# Run database migrations
prisma db push

# Start the backend server
uvicorn main:app --reload --port 8000
```

The backend will run on `http://localhost:8000`

### 4. Frontend Setup

```bash
# Open a new terminal
# Navigate to frontend directory
cd diary-app/frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env  # On Windows
# cp .env.example .env  # On macOS/Linux

# Edit .env file and add your Firebase config values
```

Edit `frontend/.env`:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:8000
```

```bash
# Start the frontend development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🎯 Usage

1. Open `http://localhost:5173` in your browser
2. Click "Sign in with Google"
3. After authentication, you'll see your personal diary
4. Click "Write Today's Entry" to create a new entry
5. Add a title (optional), write your thoughts, and upload an image (optional)
6. Click "Save Entry" to save your diary entry
7. View all your entries on the main page
8. Only you can see your entries - complete privacy guaranteed! 🔒

## 📁 Project Structure

```
diary-app/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── schema.prisma           # Prisma schema
│   ├── requirements.txt        # Python dependencies
│   ├── .env                    # Environment variables
│   ├── firebase-credentials.json  # Firebase admin credentials
│   └── uploads/                # Uploaded images folder
└── frontend/
    ├── src/
    │   ├── components/         # React components
    │   ├── App.jsx            # Main app component
    │   ├── firebase.js        # Firebase config
    │   └── api.js             # API client
    ├── package.json           # Node dependencies
    └── .env                   # Environment variables
```

## 🔒 Security Features

- ✅ Firebase JWT token verification on all API requests
- ✅ User isolation - strict checks ensure users can only access their own data
- ✅ Secure file uploads with user-specific naming
- ✅ CORS protection
- ✅ Environment variable protection

## 🎨 UI Features

- Beautiful diary-themed design with handwritten fonts
- Responsive layout for mobile and desktop
- Smooth animations and transitions
- Image preview before upload
- Loading states and error handling

## 📝 License

This project is open source and available for personal use.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

---

Made with ❤️ for keeping your memories safe and private

