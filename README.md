# Personal Diary App

A full-stack diary application with **Neon Auth Google Sign-In** integration.

## Tech Stack

**Backend**: FastAPI, Uvicorn, Prisma ORM, PostgreSQL (NeonDB), JWT
**Frontend**: React 18, Vite, Axios, React Router
**Authentication**: Neon Auth with Google OAuth 2.0

## Quick Start (Local Development)

### Backend Setup

1. Navigate to backend directory:
   ```
   cd backend
   ```

2. Create virtual environment:
   ```
   python -m venv venv
   ```

3. Activate virtual environment:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Update `.env` file with **your Neon Auth OAuth credentials**:
   ```
   NEON_AUTH_CLIENT_ID=your-client-id
   NEON_AUTH_CLIENT_SECRET=your-client-secret
   ```
   Get these from your Neon Auth Dashboard > Applications > OAuth Settings

6. Run database migrations (Prisma):
   ```
   python -m prisma migrate dev
   ```

7. Start backend:
   ```
   python main.py
   ```
   Backend runs at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Update `.env` file with **your Neon Auth Client ID**:
   ```
   VITE_NEON_AUTH_CLIENT_ID=your-client-id
   ```

4. Start development server:
   ```
   npm run dev
   ```
   Frontend runs at `http://localhost:5173`

## Authentication Flow

### Google Sign-In via Neon Auth

1. User clicks "Sign in with Google" button on Login page
2. Redirected to Neon Auth Google login (`/neondb/auth/oauth/authorize`)
3. User authenticates with Google account
4. Neon Auth redirects back to frontend callback URL with authorization code
5. Backend exchanges code for access token and ID token
6. Backend creates/finds user in database
7. Access token stored in localStorage and used for API requests

### Alternative: Token Paste

For testing or advanced users, can paste a valid Neon Auth token directly.

## API Endpoints

- `GET /api/auth/callback?code=CODE` - Handle OAuth callback
- `GET /api/auth/me` - Get current user info
- `GET /api/diary/entries` - Get all diary entries
- `POST /api/diary/entries` - Create new entry (with optional image)
- `DELETE /api/diary/entries/{id}` - Delete entry

## Key Files

- **Backend**: `backend/main.py` - FastAPI app with OAuth callback handler
- **Frontend**: `frontend/src/App.jsx` - React Router setup with auth callback route
- **Login Component**: `frontend/src/components/Login.jsx` - Google Sign-In button
- **Auth Callback**: `frontend/src/components/AuthCallback.jsx` - Handles OAuth redirect

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://...
NEON_JWKS_URL=https://.../.well-known/jwks.json
NEON_ISS=https://.../auth
NEON_AUTH_CLIENT_ID=your-client-id
NEON_AUTH_CLIENT_SECRET=your-client-secret
VITE_NEON_AUTH_REDIRECT_URI=http://localhost:5173/auth/callback
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
VITE_NEON_AUTH_AUTHORIZE_URL=https://.../oauth/authorize
VITE_NEON_AUTH_CLIENT_ID=your-client-id
VITE_NEON_AUTH_REDIRECT_URI=http://localhost:5173/auth/callback
```

## Features

- 🔐 Google Sign-In via Neon Auth
- 📝 Create, read, delete diary entries
- 🖼️ Optional image uploads with entries
- 🔒 Private entries (only accessible by owner)
- 📱 Responsive design
- 🚀 JWT-based session management

