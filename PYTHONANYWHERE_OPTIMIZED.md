# 🚀 PythonAnywhere Deployment - Disk Space Optimized

**Problem:** PythonAnywhere free tier has 512MB disk quota, and Prisma can use 200MB+  
**Solution:** Optimized installation process that reduces Prisma to ~100MB

---

## 📊 Disk Space Breakdown

| Component | Normal | Optimized |
|-----------|--------|-----------|
| Prisma + Node | ~200MB | ~80MB |
| Python packages | ~50MB | ~30MB |
| Your code | ~5MB | ~5MB |
| Uploads | Variable | Variable |
| **Total** | ~255MB | ~115MB |

---

## ⚡ Quick Setup (Optimized)

### Step 1: Clone Repository

```bash
cd ~
git clone https://github.com/YOUR_USERNAME/personal-diary-app.git
cd personal-diary-app/backend
```

### Step 2: Create Virtual Environment

```bash
python3.11 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies (IMPORTANT ORDER!)

```bash
# Install nodejs-bin FIRST (this prevents disk quota errors)
pip install nodejs-bin

# Install other packages
pip install Flask Flask-Cors firebase-admin python-dotenv Werkzeug Pillow gunicorn

# Install Prisma LAST
pip install prisma
```

### Step 4: Generate Prisma Client

```bash
# This should work now with nodejs-bin
python -m prisma generate
```

**If you still get "Disk quota exceeded"**, continue to the cleanup section below.

---

## 🧹 Disk Space Cleanup (If Needed)

If you get disk quota errors, run these commands:

### Clean pip cache
```bash
pip cache purge
```

### Clean Prisma cache (after generation)
```bash
# Remove source files (keep only binaries)
rm -rf ~/.cache/prisma-python/nodeenv/src

# Remove npm modules (not needed after generation)
rm -rf ~/.cache/prisma-python/nodeenv/lib/node_modules/npm
```

### Clean Python cache
```bash
find ~/personal-diary-app/backend/venv -type f -name "*.pyc" -delete
find ~/personal-diary-app/backend/venv -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null
```

### Check disk usage
```bash
du -sh ~/personal-diary-app/backend/venv
du -sh ~/.cache/prisma-python
quota
```

---

## 🔧 Alternative: Use Setup Script

We've created an automated script:

```bash
cd ~/personal-diary-app/backend
chmod +x setup_pythonanywhere.sh
./setup_pythonanywhere.sh
```

This script:
1. ✅ Installs nodejs-bin first
2. ✅ Installs all dependencies
3. ✅ Generates Prisma client
4. ✅ Cleans up caches automatically
5. ✅ Shows disk usage summary

---

## 📝 Complete Deployment Steps

### 1. Setup Environment Variables

```bash
cd ~/personal-diary-app/backend
nano .env
```

Add:
```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
FIREBASE_CREDENTIALS_PATH="./firebase-credentials.json"
UPLOAD_DIR="./uploads"
```

Save: `Ctrl+X`, `Y`, `Enter`

### 2. Add Firebase Credentials

```bash
nano firebase-credentials.json
```

Paste your Firebase Admin SDK JSON, then save.

```bash
chmod 600 firebase-credentials.json
```

### 3. Create Upload Directory

```bash
mkdir -p uploads
chmod 755 uploads
```

### 4. Initialize Database

```bash
source venv/bin/activate
python -m prisma db push
```

### 5. Configure Web App

1. Go to **Web** tab in PythonAnywhere
2. Click **Add a new web app**
3. Choose **Manual configuration** → **Python 3.11**
4. Set **Source code**: `/home/YOUR_USERNAME/personal-diary-app/backend`
5. Set **Virtual env**: `/home/YOUR_USERNAME/personal-diary-app/backend/venv`

### 6. Configure WSGI File

Click on WSGI configuration file, delete all content, and add:

```python
import sys
import os
from pathlib import Path

# Add project directory
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
    print(f"⚠️ Database error: {e}")
```

**Replace `YOUR_USERNAME`** with your actual PythonAnywhere username!

### 7. Configure Static Files

In Web tab, under **Static files**:
- URL: `/uploads`
- Directory: `/home/YOUR_USERNAME/personal-diary-app/backend/uploads`

### 8. Reload Web App

Click the green **Reload** button at the top of the Web tab.

---

## 🆘 Troubleshooting Disk Quota Issues

### Error: "Disk quota exceeded" during `prisma generate`

**Solution 1: Install nodejs-bin first**
```bash
pip install nodejs-bin
pip install prisma
python -m prisma generate
```

**Solution 2: Clean before installing**
```bash
# Remove old caches
rm -rf ~/.cache/prisma-python
rm -rf ~/.cache/pip

# Try again
pip install nodejs-bin
pip install prisma
python -m prisma generate
```

**Solution 3: Minimal installation**
```bash
# Install only what you need
pip install --no-cache-dir nodejs-bin
pip install --no-cache-dir prisma
python -m prisma generate

# Clean immediately after
pip cache purge
```

### Check what's using space

```bash
# Check total usage
quota

# Check specific directories
du -sh ~/personal-diary-app
du -sh ~/.cache
du -sh ~/personal-diary-app/backend/venv

# Find large files
find ~ -type f -size +10M -exec ls -lh {} \;
```

### Free up space

```bash
# Remove pip cache
pip cache purge

# Remove old Python bytecode
find ~ -type f -name "*.pyc" -delete
find ~ -type d -name "__pycache__" -delete

# Remove Prisma source (after generation)
rm -rf ~/.cache/prisma-python/nodeenv/src
```

---

## 📊 Monitor Disk Usage

Add this to your bash profile for easy monitoring:

```bash
echo "alias diskusage='quota && echo && du -sh ~/personal-diary-app && du -sh ~/.cache'" >> ~/.bashrc
source ~/.bashrc
```

Now you can run `diskusage` anytime to check.

---

## ✅ Verification

Test your API:

```bash
curl https://YOUR_USERNAME.pythonanywhere.com/
```

Should return:
```json
{"message": "Personal Diary API", "status": "running"}
```

---

## 🎯 Expected Final Disk Usage

After optimization:
- **Virtual environment**: ~60-80MB
- **Prisma cache**: ~40-60MB  
- **Your code**: ~5MB
- **Total**: ~105-145MB
- **Remaining**: ~370MB for uploads and data

---

## 💡 Pro Tips

1. **Always install nodejs-bin first** before Prisma
2. **Clean caches immediately** after successful installation
3. **Monitor disk usage** regularly with `quota`
4. **Keep uploads small** - compress images before upload
5. **Delete old entries** with images to free space

---

## 🔄 Updating Your App

```bash
cd ~/personal-diary-app/backend
git pull origin main
source venv/bin/activate

# Only install new packages if requirements changed
pip install -r requirements.txt

# Regenerate Prisma if schema changed
python -m prisma generate
python -m prisma db push

# Clean up
pip cache purge
```

Then reload your web app from the Web tab.

---

## 🎉 Success!

Your optimized Flask + Prisma backend is now running on PythonAnywhere with minimal disk usage!

**API URL:** `https://YOUR_USERNAME.pythonanywhere.com`

