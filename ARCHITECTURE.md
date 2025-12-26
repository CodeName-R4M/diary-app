# 🏗️ Application Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                     http://localhost:5173                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ React App (Vite)
                             │
        ┌────────────────────┴────────────────────┐
        │                                         │
        │         FIREBASE AUTH                   │
        │    (Google Sign-In)                     │
        │                                         │
        └────────────────────┬────────────────────┘
                             │
                             │ JWT Token
                             │
        ┌────────────────────▼────────────────────┐
        │                                         │
        │         FASTAPI BACKEND                 │
        │      http://localhost:8000              │
        │                                         │
        │  ┌─────────────────────────────────┐   │
        │  │  Token Verification             │   │
        │  │  (Firebase Admin SDK)           │   │
        │  └─────────────────────────────────┘   │
        │                                         │
        │  ┌─────────────────────────────────┐   │
        │  │  API Endpoints                  │   │
        │  │  - POST /api/diary/entries      │   │
        │  │  - GET  /api/diary/entries      │   │
        │  │  - GET  /api/diary/entries/:id  │   │
        │  │  - DELETE /api/diary/entries/:id│   │
        │  └─────────────────────────────────┘   │
        │                                         │
        │  ┌─────────────────────────────────┐   │
        │  │  File Upload Handler            │   │
        │  │  (Saves to ./uploads/)          │   │
        │  └─────────────────────────────────┘   │
        │                                         │
        └────────────────────┬────────────────────┘
                             │
                             │ Prisma ORM
                             │
        ┌────────────────────▼────────────────────┐
        │                                         │
        │         NEONDB (PostgreSQL)             │
        │                                         │
        │  ┌─────────────────────────────────┐   │
        │  │  Table: diary_entries           │   │
        │  │  - id (UUID)                    │   │
        │  │  - user_id (String)             │   │
        │  │  - title (String?)              │   │
        │  │  - content (String)             │   │
        │  │  - image_url (String?)          │   │
        │  │  - created_at (DateTime)        │   │
        │  │  - updated_at (DateTime)        │   │
        │  └─────────────────────────────────┘   │
        │                                         │
        └─────────────────────────────────────────┘
```

## Data Flow

### 1. User Authentication Flow
```
User clicks "Sign in with Google"
    ↓
Firebase Auth popup opens
    ↓
User selects Google account
    ↓
Firebase returns JWT token
    ↓
Frontend stores token
    ↓
Token sent with every API request
```

### 2. Create Diary Entry Flow
```
User fills form (text + optional image)
    ↓
Frontend creates FormData
    ↓
POST request to /api/diary/entries
    ↓
Backend verifies JWT token
    ↓
Backend extracts user_id from token
    ↓
If image exists:
    - Save to ./uploads/
    - Generate unique filename
    ↓
Backend creates database entry
    ↓
Prisma saves to NeonDB
    ↓
Response sent to frontend
    ↓
Frontend refreshes entry list
```

### 3. View Diary Entries Flow
```
User opens diary app
    ↓
GET request to /api/diary/entries
    ↓
Backend verifies JWT token
    ↓
Backend extracts user_id
    ↓
Prisma queries: WHERE userId = user_id
    ↓
Only user's entries returned
    ↓
Frontend displays entries
```

### 4. Security: User Isolation
```
Every API request:
    ↓
Extract JWT token from Authorization header
    ↓
Verify token with Firebase Admin SDK
    ↓
Extract user_id from verified token
    ↓
Use user_id in database queries
    ↓
STRICT CHECK: Ensure data belongs to user
    ↓
Return 403 if user tries to access others' data
```

## Technology Stack Details

### Frontend Technologies
- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Firebase SDK**: Client-side authentication
- **Axios**: HTTP client for API calls
- **CSS3**: Custom styling with diary theme

### Backend Technologies
- **FastAPI**: Modern Python web framework
- **Uvicorn**: ASGI server
- **Prisma**: Type-safe ORM
- **Firebase Admin SDK**: Server-side token verification
- **Pydantic**: Data validation
- **Aiofiles**: Async file operations

### Database
- **NeonDB**: Serverless PostgreSQL
- **Prisma Schema**: Database modeling

### Authentication
- **Firebase Authentication**: OAuth provider
- **Google OAuth**: Sign-in method
- **JWT Tokens**: Stateless authentication

## Security Features

### 1. Authentication
- Firebase JWT tokens for all requests
- Token verification on every API call
- Automatic token refresh

### 2. Authorization
- User ID extracted from verified token
- Database queries filtered by user ID
- Strict ownership checks before any operation

### 3. Data Privacy
- Users can ONLY see their own entries
- No endpoint to list all users or all entries
- 403 Forbidden if accessing others' data

### 4. File Security
- Files named with user ID prefix
- Stored in backend folder (not publicly accessible)
- Served through authenticated API

### 5. Environment Security
- Sensitive data in .env files
- .env files in .gitignore
- Firebase credentials not committed

## API Endpoints

### POST /api/diary/entries
- **Auth**: Required
- **Body**: FormData (content, title?, image?)
- **Returns**: Created diary entry
- **Security**: Entry saved with authenticated user's ID

### GET /api/diary/entries
- **Auth**: Required
- **Returns**: Array of user's diary entries
- **Security**: Only returns authenticated user's entries

### GET /api/diary/entries/{entry_id}
- **Auth**: Required
- **Returns**: Single diary entry
- **Security**: 403 if entry doesn't belong to user

### DELETE /api/diary/entries/{entry_id}
- **Auth**: Required
- **Returns**: Success message
- **Security**: 403 if entry doesn't belong to user
- **Side Effect**: Deletes associated image file

## File Structure

```
diary-app/
├── backend/
│   ├── main.py              # FastAPI app & endpoints
│   ├── schema.prisma        # Database schema
│   ├── requirements.txt     # Python dependencies
│   ├── .env                 # Environment variables
│   ├── firebase-credentials.json  # Firebase admin key
│   ├── uploads/             # User uploaded images
│   └── check_setup.py       # Setup verification script
│
└── frontend/
    ├── public/              # Static assets
    ├── src/
    │   ├── components/
    │   │   ├── Login.jsx           # Login page
    │   │   ├── DiaryApp.jsx        # Main app
    │   │   ├── NewEntryForm.jsx    # Create entry form
    │   │   └── DiaryEntry.jsx      # Entry display
    │   ├── App.jsx          # Root component
    │   ├── firebase.js      # Firebase config
    │   ├── api.js           # API client
    │   └── main.jsx         # Entry point
    ├── package.json         # Node dependencies
    └── .env                 # Environment variables
```

## Deployment Considerations

### Backend Deployment
- Deploy to: Railway, Render, or Fly.io
- Set environment variables
- Upload firebase-credentials.json securely
- Ensure uploads directory is persistent

### Frontend Deployment
- Deploy to: Vercel, Netlify, or Cloudflare Pages
- Set environment variables
- Update VITE_API_URL to production backend URL
- Update Firebase authorized domains

### Database
- NeonDB is already cloud-hosted
- No additional deployment needed
- Ensure connection string is secure

---

This architecture ensures complete privacy and security for each user's diary entries! 🔒

