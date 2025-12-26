# 🔄 Flask Backend - Personal Diary API

This directory contains **TWO versions** of the backend:

## 📁 Available Versions

### 1. **Flask Version** (app.py) - ✅ Recommended for PythonAnywhere
- **File:** `app.py`
- **Run:** `python run_flask.py` or `python app.py`
- **Deploy to:** PythonAnywhere, Heroku, any WSGI server
- **Pros:** 
  - Simple deployment on PythonAnywhere
  - Synchronous, easier to debug
  - Widely supported
  - Lower resource usage

### 2. **FastAPI Version** (main.py) - ✅ Recommended for Railway/Render
- **File:** `main.py`
- **Run:** `uvicorn main:app --reload --host 0.0.0.0 --port 8000`
- **Deploy to:** Railway, Render, Vercel, modern cloud platforms
- **Pros:**
  - Async/await support
  - Automatic API documentation (Swagger UI)
  - Better performance for high concurrency
  - Modern Python features

---

## 🚀 Quick Start

### Using Flask (PythonAnywhere)

```bash
# Install dependencies
pip install -r requirements.txt

# Generate Prisma client
python -m prisma generate

# Setup database
python -m prisma db push

# Run the server
python run_flask.py
```

Server runs at: `http://localhost:8000`

### Using FastAPI (Railway/Render)

```bash
# Install FastAPI dependencies (uncomment in requirements.txt)
pip install fastapi uvicorn python-multipart aiofiles pydantic

# Generate Prisma client
python -m prisma generate

# Setup database
python -m prisma db push

# Run the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Server runs at: `http://localhost:8000`

---

## 📊 Feature Comparison

| Feature | Flask (app.py) | FastAPI (main.py) |
|---------|----------------|-------------------|
| Google Auth | ✅ | ✅ |
| Create Entry | ✅ | ✅ |
| Get Entries | ✅ | ✅ |
| Delete Entry | ✅ | ✅ |
| Image Upload | ✅ | ✅ |
| CORS Support | ✅ | ✅ |
| Auto Docs | ❌ | ✅ (Swagger UI) |
| Async Support | ❌ | ✅ |
| PythonAnywhere | ✅ Easy | ⚠️ Complex |
| Railway/Render | ✅ | ✅ Easy |

---

## 🌐 API Endpoints

Both versions support the same endpoints:

### Public Endpoints
- `GET /` - API status

### Protected Endpoints (Require Authentication)
- `POST /api/diary/entries` - Create diary entry
- `GET /api/diary/entries` - Get all user entries
- `GET /api/diary/entries/{id}` - Get specific entry
- `DELETE /api/diary/entries/{id}` - Delete entry

### Static Files
- `GET /uploads/{filename}` - Serve uploaded images

---

## 🔐 Authentication

Both versions use Firebase Admin SDK for authentication:

1. Client sends Firebase ID token in Authorization header
2. Backend verifies token with Firebase Admin SDK
3. Extracts user ID from verified token
4. Uses user ID for database operations

**Header format:**
```
Authorization: Bearer <firebase_id_token>
```

---

## 📦 Dependencies

### Flask Version
```
Flask>=3.0.0
Flask-Cors>=4.0.0
prisma>=0.12.0
firebase-admin>=6.4.0
python-dotenv>=1.0.0
Werkzeug>=3.0.0
Pillow>=10.0.0
gunicorn>=21.2.0
```

### FastAPI Version
```
fastapi>=0.115.0
uvicorn[standard]>=0.32.0
python-multipart>=0.0.6
prisma>=0.12.0
firebase-admin>=6.4.0
python-dotenv>=1.0.0
pydantic>=2.10.0
aiofiles>=23.2.1
Pillow>=10.0.0
```

---

## 🚀 Deployment

### PythonAnywhere (Flask)
See [PYTHONANYWHERE_DEPLOYMENT.md](../PYTHONANYWHERE_DEPLOYMENT.md)

### Railway/Render (FastAPI or Flask)
See [DEPLOYMENT.md](../DEPLOYMENT.md)

---

## 🔧 Configuration

Both versions use the same `.env` file:

```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
FIREBASE_CREDENTIALS_PATH="./firebase-credentials.json"
UPLOAD_DIR="./uploads"
```

---

## 🆘 Troubleshooting

### "Module not found" errors
```bash
pip install -r requirements.txt
```

### "Client hasn't been generated"
```bash
python -m prisma generate
```

### "Database connection failed"
- Check DATABASE_URL in `.env`
- Verify database is accessible
- Run `python -m prisma db push`

### "Firebase not initialized"
- Check `firebase-credentials.json` exists
- Verify path in `.env`
- Ensure valid Firebase Admin SDK credentials

---

## 📝 Switching Between Versions

### To use Flask:
1. Use `app.py`
2. Install Flask dependencies
3. Run with `python run_flask.py`

### To use FastAPI:
1. Use `main.py`
2. Install FastAPI dependencies
3. Run with `uvicorn main:app --reload`

**Both versions can coexist!** Just use different files.

---

## 🎯 Which Version Should I Use?

**Choose Flask if:**
- ✅ Deploying to PythonAnywhere
- ✅ Want simpler deployment
- ✅ Prefer synchronous code
- ✅ Don't need auto-generated docs

**Choose FastAPI if:**
- ✅ Deploying to Railway/Render/Vercel
- ✅ Want automatic API documentation
- ✅ Need async/await support
- ✅ Want better performance for high traffic

---

Made with ❤️ for diary enthusiasts

