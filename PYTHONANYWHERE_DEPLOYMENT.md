# 🚀 PythonAnywhere Deployment Guide

Complete guide to deploy your Personal Diary Flask backend on PythonAnywhere.

## 📋 Prerequisites

- ✅ PythonAnywhere account (free tier works!)
- ✅ GitHub repository with your code
- ✅ NeonDB PostgreSQL database (or any PostgreSQL provider)
- ✅ Firebase Admin SDK credentials JSON

---

## 🔧 Step 1: Setup PythonAnywhere Account

1. **Sign up at [PythonAnywhere](https://www.pythonanywhere.com)**
   - Free tier: `yourusername.pythonanywhere.com`
   - Paid tier: Custom domain support

2. **Verify your account** via email

---

## 📦 Step 2: Upload Your Code

### Option A: Clone from GitHub (Recommended)

1. **Open a Bash console** in PythonAnywhere (from Dashboard)

2. **Clone your repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/personal-diary-app.git
   cd personal-diary-app/backend
   ```

### Option B: Upload Files Manually

1. Go to **Files** tab in PythonAnywhere
2. Create directory: `/home/YOUR_USERNAME/diary-app/backend`
3. Upload all backend files

---

## 🐍 Step 3: Create Virtual Environment

In the Bash console:

```bash
cd ~/personal-diary-app/backend

# Create virtual environment
python3.11 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip
```

---

## 📚 Step 4: Install Dependencies

```bash
# Make sure you're in the backend directory with venv activated
pip install -r requirements.txt

# Generate Prisma client
python -m prisma generate
```

**Note:** If you get errors with `prisma`, you may need to install additional dependencies:
```bash
pip install prisma --upgrade
```

---

## 🔐 Step 5: Configure Environment Variables

1. **Create `.env` file:**
   ```bash
   nano .env
   ```

2. **Add your configuration:**
   ```env
   DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
   FIREBASE_CREDENTIALS_PATH="./firebase-credentials.json"
   UPLOAD_DIR="./uploads"
   ```

3. **Save and exit:** Press `Ctrl+X`, then `Y`, then `Enter`

---

## 🔥 Step 6: Add Firebase Credentials

1. **Create the credentials file:**
   ```bash
   nano firebase-credentials.json
   ```

2. **Paste your Firebase Admin SDK JSON:**
   - Get from Firebase Console → Project Settings → Service Accounts
   - Generate New Private Key
   - Copy the entire JSON content

3. **Save and exit:** Press `Ctrl+X`, then `Y`, then `Enter`

4. **Set proper permissions:**
   ```bash
   chmod 600 firebase-credentials.json
   ```

---

## 📁 Step 7: Create Upload Directory

```bash
mkdir -p uploads
chmod 755 uploads
```

---

## 🗄️ Step 8: Setup Database

```bash
# Make sure venv is activated
source venv/bin/activate

# Push database schema to NeonDB
python -m prisma db push
```

---

## 🌐 Step 9: Configure Web App

1. **Go to Web tab** in PythonAnywhere Dashboard

2. **Click "Add a new web app"**

3. **Choose:**
   - Manual configuration
   - Python 3.11

4. **Configure Source Code:**
   - Source code: `/home/YOUR_USERNAME/personal-diary-app/backend`

5. **Configure Virtual Environment:**
   - Virtual env: `/home/YOUR_USERNAME/personal-diary-app/backend/venv`

---

## ⚙️ Step 10: Configure WSGI File

1. **Click on WSGI configuration file link** (in Web tab)

2. **Delete all content** and replace with:

```python
import sys
import os
from pathlib import Path

# Add your project directory to the sys.path
project_home = '/home/YOUR_USERNAME/personal-diary-app/backend'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Load environment variables
from dotenv import load_dotenv
env_path = Path(project_home) / '.env'
load_dotenv(dotenv_path=env_path)

# Import Flask app
from app import app as application
from app import prisma

# Connect to database
try:
    prisma.connect()
    print("✅ Database connected")
except Exception as e:
    print(f"⚠️ Database connection error: {e}")
```

3. **Replace `YOUR_USERNAME`** with your actual PythonAnywhere username

4. **Save the file**

---

## 📂 Step 11: Configure Static Files

1. **In Web tab**, scroll to **Static files** section

2. **Add static file mapping:**
   - URL: `/uploads`
   - Directory: `/home/YOUR_USERNAME/personal-diary-app/backend/uploads`

---

## 🔄 Step 12: Reload Web App

1. **Scroll to top** of Web tab
2. **Click green "Reload" button**
3. **Wait for reload** to complete

---

## ✅ Step 13: Test Your API

1. **Visit your API:**
   ```
   https://YOUR_USERNAME.pythonanywhere.com/
   ```

2. **You should see:**
   ```json
   {"message": "Personal Diary API", "status": "running"}
   ```

3. **Check error log** if something goes wrong:
   - Web tab → Log files → Error log

---

## 🎨 Step 14: Update Frontend Configuration

Update your frontend `.env` file:

```env
VITE_API_URL=https://YOUR_USERNAME.pythonanywhere.com
```

Redeploy your frontend (Vercel/Netlify) with the new API URL.

---

## 🔧 Troubleshooting

### Database Connection Issues

**Error:** "Can't reach database server"

**Solution:**
1. Check DATABASE_URL in `.env`
2. Ensure NeonDB allows connections from PythonAnywhere IPs
3. Verify SSL mode is set correctly

### Prisma Issues

**Error:** "Client hasn't been generated"

**Solution:**
```bash
source venv/bin/activate
python -m prisma generate
```

### Import Errors

**Error:** "No module named 'flask'"

**Solution:**
```bash
source venv/bin/activate
pip install -r requirements.txt
```

### Firebase Errors

**Error:** "Firebase credentials not found"

**Solution:**
1. Check `firebase-credentials.json` exists
2. Verify path in `.env` file
3. Check file permissions: `chmod 600 firebase-credentials.json`

### CORS Errors

**Error:** "CORS policy blocked"

**Solution:**
- Update `app.py` CORS configuration to include your frontend domain
- Add your Vercel/Netlify URL to allowed origins

---

## 📝 Maintenance

### View Logs

```bash
# Error log
tail -f /var/log/YOUR_USERNAME.pythonanywhere.com.error.log

# Server log  
tail -f /var/log/YOUR_USERNAME.pythonanywhere.com.server.log
```

### Update Code

```bash
cd ~/personal-diary-app/backend
git pull origin main
source venv/bin/activate
pip install -r requirements.txt
python -m prisma generate
```

Then reload the web app from the Web tab.

### Database Migrations

```bash
cd ~/personal-diary-app/backend
source venv/bin/activate
python -m prisma db push
```

---

## 🎉 Success!

Your Flask backend is now live on PythonAnywhere!

**API URL:** `https://YOUR_USERNAME.pythonanywhere.com`

Test all endpoints and enjoy your deployed diary app! 📖✨

