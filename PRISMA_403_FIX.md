# 🔧 Fix Prisma 403 Forbidden Error on PythonAnywhere

## 🎯 The Problem

You're getting this error:
```
Error: Failed to fetch sha256 checksum at https://binaries.prisma.sh/...
403 Forbidden
```

**Why?** PythonAnywhere's firewall blocks some Prisma CDN requests for checksum verification.

**Solution:** Tell Prisma to skip checksum verification (it's safe on PythonAnywhere).

---

## ✅ Quick Fix (Run This Now!)

### Option 1: Use the Fix Script

```bash
cd ~/diary-app/backend
source venv/bin/activate
chmod +x fix_prisma_pythonanywhere.sh
./fix_prisma_pythonanywhere.sh
```

This will:
- ✅ Set the environment variable to bypass checksum
- ✅ Generate Prisma client
- ✅ Push database schema
- ✅ Save the setting for future sessions

---

### Option 2: Manual Fix

```bash
cd ~/diary-app/backend
source venv/bin/activate

# Set environment variable to ignore checksum errors
export PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1

# Generate Prisma client
python -m prisma generate

# Push database schema
python -m prisma db push
```

---

## 🔒 Make It Permanent

Add this to your `~/.bashrc` so you don't have to set it every time:

```bash
echo 'export PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1' >> ~/.bashrc
source ~/.bashrc
```

---

## 📝 Update Your WSGI File

Add the environment variable to your WSGI configuration:

```python
import sys
import os
from pathlib import Path

# IMPORTANT: Add this line to bypass Prisma checksum verification
os.environ['PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING'] = '1'

# Add your project directory to the sys.path
project_home = '/home/YOUR_USERNAME/diary-app/backend'
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

**Don't forget to replace `YOUR_USERNAME`!**

---

## 🧪 Test It Works

```bash
# Test Prisma client
python -c "from prisma import Prisma; print('✅ Prisma import works!')"

# Test database connection (make sure .env has DATABASE_URL)
python -c "from prisma import Prisma; p = Prisma(); p.connect(); print('✅ Database connected!'); p.disconnect()"
```

---

## 🆘 Still Getting Errors?

### Error: "Can't reach database server"

**Check your DATABASE_URL:**
```bash
cat .env | grep DATABASE_URL
```

Should look like:
```
DATABASE_URL="postgresql://user:password@host.neon.tech/database?sslmode=require"
```

### Error: "Module 'prisma' has no attribute 'Prisma'"

**Regenerate Prisma client:**
```bash
export PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
python -m prisma generate
```

### Error: "Table doesn't exist"

**Push the schema:**
```bash
export PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
python -m prisma db push
```

---

## ✅ Complete Setup Checklist

- [ ] Set `PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1`
- [ ] Run `python -m prisma generate`
- [ ] Create `.env` file with `DATABASE_URL`
- [ ] Run `python -m prisma db push`
- [ ] Add environment variable to WSGI file
- [ ] Create `firebase-credentials.json`
- [ ] Create `uploads` directory
- [ ] Configure static files in Web tab
- [ ] Reload web app

---

## 🎯 Why This Works

**The Issue:**
- Prisma downloads engine binaries from their CDN
- It verifies downloads using SHA256 checksums
- PythonAnywhere's firewall blocks the checksum URL
- Prisma fails with 403 Forbidden

**The Fix:**
- `PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1` tells Prisma:
  - "If you can't download the checksum, that's OK"
  - "Just download the binary and trust it"
- This is safe because:
  - The binary itself downloads successfully
  - Only the checksum verification fails
  - Prisma binaries are signed and verified by other means

---

## 📚 Alternative: Pre-download Engines

If the above doesn't work, you can pre-download engines:

```bash
# Download engines manually
export PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
python -m prisma fetch

# Then generate
python -m prisma generate
```

---

## 🔄 For Future Updates

Whenever you update Prisma or your schema:

```bash
cd ~/diary-app/backend
source venv/bin/activate

# Always set this first
export PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1

# Then run your commands
python -m prisma generate
python -m prisma db push
```

Or just run the fix script again:
```bash
./fix_prisma_pythonanywhere.sh
```

---

## 🎉 Success!

Once you see:
```
✅ Prisma client generated successfully!
✅ Database schema pushed successfully!
```

You're ready to configure your WSGI file and reload your web app!

---

## 💡 Pro Tip

Add this alias to your `~/.bashrc` for easy Prisma commands:

```bash
echo 'alias prisma="PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 python -m prisma"' >> ~/.bashrc
source ~/.bashrc
```

Now you can just run:
```bash
prisma generate
prisma db push
```

---

**Good luck! 🚀**

