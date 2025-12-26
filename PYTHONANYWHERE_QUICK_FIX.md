# ⚡ Quick Fix for PythonAnywhere Disk Quota Error

## 🎯 The Problem
You got: `OSError: [Errno 122] Disk quota exceeded`

This happens because Prisma tries to install Node.js which takes ~200MB, but PythonAnywhere free tier only has 512MB total.

---

## ✅ Solution: Install in Correct Order

### Option 1: Automated Script (Recommended)

```bash
cd ~/diary-app/backend
source venv/bin/activate
python install_optimized.py
```

This script will:
- ✅ Install nodejs-bin first (prevents quota errors)
- ✅ Install all dependencies in correct order
- ✅ Generate Prisma client
- ✅ Clean up caches automatically
- ✅ Show disk usage summary

---

### Option 2: Manual Installation

```bash
cd ~/diary-app/backend
source venv/bin/activate

# IMPORTANT: Install nodejs-bin FIRST!
pip install nodejs-bin

# Then install other packages
pip install Flask Flask-Cors firebase-admin python-dotenv Werkzeug Pillow gunicorn

# Install Prisma LAST
pip install prisma

# Generate Prisma client (should work now!)
python -m prisma generate

# Clean up to save space
pip cache purge
```

---

## 🧹 If You Still Get Quota Error

### Clean Everything First

```bash
# Remove old Prisma cache
rm -rf ~/.cache/prisma-python

# Remove pip cache
rm -rf ~/.cache/pip

# Clean venv cache
find ~/diary-app/backend/venv -type f -name "*.pyc" -delete
find ~/diary-app/backend/venv -type d -name "__pycache__" -delete

# Check disk usage
quota
```

### Then Try Again

```bash
cd ~/diary-app/backend
source venv/bin/activate

# Install with no cache
pip install --no-cache-dir nodejs-bin
pip install --no-cache-dir prisma
python -m prisma generate

# Clean immediately
pip cache purge
```

---

## 📊 Check Disk Usage

```bash
# See total quota
quota

# See what's using space
du -sh ~/diary-app
du -sh ~/.cache
du -sh ~/diary-app/backend/venv

# Find large files
find ~ -type f -size +10M -exec ls -lh {} \;
```

---

## 🎯 Expected Disk Usage After Fix

| Component | Size |
|-----------|------|
| Virtual environment | ~60-80MB |
| Prisma cache | ~40-60MB |
| Your code | ~5MB |
| **Total** | ~105-145MB |
| **Free space** | ~370MB |

---

## 🔄 After Successful Installation

```bash
# Setup database
python -m prisma db push

# Test the app
python app.py
```

Then configure your WSGI file and reload the web app!

---

## 💡 Why This Works

**Problem:** Prisma's default installation uses `nodeenv` which downloads and extracts Node.js source code (~150MB)

**Solution:** `nodejs-bin` provides pre-compiled Node.js binaries (~40MB) which Prisma can use instead

**Result:** Saves ~110MB of disk space! 🎉

---

## 🆘 Still Having Issues?

### Error: "nodejs-bin installation failed"

Try:
```bash
pip install --upgrade pip
pip install nodejs-bin==18.17.1
```

### Error: "Prisma generate still fails"

Try:
```bash
# Set environment variable to use nodejs-bin
export PRISMA_CLI_BINARY_TARGETS="native"
python -m prisma generate
```

### Error: "Out of space during pip install"

Clean more aggressively:
```bash
# Remove all caches
rm -rf ~/.cache/*

# Remove old logs
rm -rf ~/.local/share/jupyter
rm -rf ~/.ipython

# Try minimal install
pip install --no-cache-dir --no-deps nodejs-bin
pip install --no-cache-dir --no-deps prisma
```

---

## 📚 Full Documentation

For complete deployment guide, see:
- `PYTHONANYWHERE_OPTIMIZED.md` - Full optimized deployment guide
- `PYTHONANYWHERE_DEPLOYMENT.md` - Original deployment guide

---

## ✅ Quick Checklist

- [ ] Activate virtual environment
- [ ] Install nodejs-bin FIRST
- [ ] Install other dependencies
- [ ] Install Prisma LAST
- [ ] Generate Prisma client
- [ ] Clean pip cache
- [ ] Check disk usage with `quota`
- [ ] Setup database with `prisma db push`
- [ ] Configure WSGI file
- [ ] Reload web app

---

**Good luck! 🚀**

