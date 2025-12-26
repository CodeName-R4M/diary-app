# ⚡ PythonAnywhere Quick Commands

Copy and paste these commands directly into your PythonAnywhere bash console.

---

## 🚀 Complete Setup (Copy All at Once)

```bash
# Navigate to backend
cd ~/diary-app/backend
source venv/bin/activate

# Fix Prisma 403 error
export PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
echo 'export PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1' >> ~/.bashrc

# Generate Prisma client
python -m prisma generate

# Create .env file (you'll need to edit this with your credentials)
cat > .env << 'EOF'
DATABASE_URL="postgresql://user:password@host.neon.tech/database?sslmode=require"
FIREBASE_CREDENTIALS_PATH="./firebase-credentials.json"
UPLOAD_DIR="./uploads"
EOF

echo "⚠️  IMPORTANT: Edit .env file with your actual DATABASE_URL"
echo "Run: nano .env"
```

---

## 📝 Step-by-Step Commands

### 1. Fix Prisma 403 Error

```bash
cd ~/diary-app/backend
source venv/bin/activate
export PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
python -m prisma generate
```

### 2. Create .env File

```bash
nano .env
```

Paste this and **replace with your actual credentials**:
```
DATABASE_URL="postgresql://user:password@host.neon.tech/database?sslmode=require"
FIREBASE_CREDENTIALS_PATH="./firebase-credentials.json"
UPLOAD_DIR="./uploads"
```

Save: `Ctrl+X`, then `Y`, then `Enter`

### 3. Add Firebase Credentials

```bash
nano firebase-credentials.json
```

Paste your Firebase Admin SDK JSON, then save (`Ctrl+X`, `Y`, `Enter`)

```bash
chmod 600 firebase-credentials.json
```

### 4. Setup Database

```bash
export PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
python -m prisma db push
```

### 5. Create Upload Directory

```bash
mkdir -p uploads
chmod 755 uploads
```

### 6. Test Everything

```bash
# Test Prisma import
python -c "from prisma import Prisma; print('✅ Prisma works!')"

# Test database connection
python -c "from prisma import Prisma; p = Prisma(); p.connect(); print('✅ Database connected!'); p.disconnect()"

# Test Flask app
python -c "from app import app; print('✅ Flask app works!')"
```

---

## 🌐 WSGI Configuration

Go to **Web** tab → Click on **WSGI configuration file** → Delete all content → Paste this:

```python
import sys
import os
from pathlib import Path

# Fix for Prisma 403 error
os.environ['PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING'] = '1'

# Add project directory (REPLACE YOUR_USERNAME!)
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

**⚠️ REPLACE `YOUR_USERNAME` with your actual PythonAnywhere username!**

---

## 📁 Static Files Configuration

In **Web** tab, scroll to **Static files** section:

Click **Add a new static file mapping**:
- **URL:** `/uploads`
- **Directory:** `/home/YOUR_USERNAME/diary-app/backend/uploads`

**⚠️ REPLACE `YOUR_USERNAME`!**

---

## 🔄 Reload Web App

In **Web** tab, click the big green **Reload** button at the top.

---

## ✅ Test Your API

```bash
curl https://YOUR_USERNAME.pythonanywhere.com/
```

Should return:
```json
{"message": "Personal Diary API", "status": "running"}
```

---

## 🧹 Cleanup Commands (Save Disk Space)

```bash
# Clean pip cache
pip cache purge

# Clean Prisma cache
rm -rf ~/.cache/prisma-python/nodeenv/src
rm -rf ~/.cache/prisma-python/nodeenv/lib/node_modules/npm

# Clean Python cache
find ~/diary-app/backend/venv -type f -name "*.pyc" -delete
find ~/diary-app/backend/venv -type d -name "__pycache__" -delete

# Check disk usage
quota
du -sh ~/diary-app
```

---

## 📊 Monitoring Commands

```bash
# Check disk quota
quota

# Check directory sizes
du -sh ~/diary-app
du -sh ~/.cache
du -sh ~/diary-app/backend/venv

# View error logs
tail -f /var/log/YOUR_USERNAME.pythonanywhere.com.error.log

# View server logs
tail -f /var/log/YOUR_USERNAME.pythonanywhere.com.server.log
```

---

## 🔄 Update Your App

```bash
cd ~/diary-app
git pull origin main
cd backend
source venv/bin/activate

# If requirements changed
pip install -r requirements.txt

# If schema changed
export PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
python -m prisma generate
python -m prisma db push

# Clean up
pip cache purge
```

Then reload web app from Web tab.

---

## 🆘 Troubleshooting Commands

### Prisma Issues

```bash
# Regenerate Prisma client
export PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
python -m prisma generate

# Reset database (⚠️ DELETES ALL DATA!)
python -m prisma db push --force-reset
```

### Database Issues

```bash
# Test connection
python -c "from prisma import Prisma; p = Prisma(); p.connect(); print('Connected!'); p.disconnect()"

# Check DATABASE_URL
cat .env | grep DATABASE_URL
```

### Import Issues

```bash
# Test imports
python -c "from app import app; print('Flask OK')"
python -c "from prisma import Prisma; print('Prisma OK')"
python -c "import firebase_admin; print('Firebase OK')"
```

### Permission Issues

```bash
# Fix permissions
chmod 600 firebase-credentials.json
chmod 755 uploads
chmod +x *.sh
```

---

## 💡 Useful Aliases

Add these to `~/.bashrc`:

```bash
# Add to bashrc
cat >> ~/.bashrc << 'EOF'

# Prisma alias
alias prisma="PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 python -m prisma"

# Disk usage alias
alias diskusage='quota && echo && du -sh ~/diary-app && du -sh ~/.cache'

# Activate venv alias
alias venv='source ~/diary-app/backend/venv/bin/activate'

# View logs alias
alias errorlog='tail -f /var/log/*.error.log'
alias serverlog='tail -f /var/log/*.server.log'

EOF

# Reload bashrc
source ~/.bashrc
```

Now you can use:
```bash
venv              # Activate virtual environment
prisma generate   # Generate Prisma client
prisma db push    # Push database schema
diskusage         # Check disk usage
errorlog          # View error logs
serverlog         # View server logs
```

---

## 🎯 Quick Checklist

- [ ] Clone repository
- [ ] Create virtual environment
- [ ] Install dependencies
- [ ] Set `PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1`
- [ ] Generate Prisma client
- [ ] Create `.env` file
- [ ] Add `firebase-credentials.json`
- [ ] Push database schema
- [ ] Create `uploads` directory
- [ ] Configure WSGI file
- [ ] Configure static files
- [ ] Reload web app
- [ ] Test API endpoint

---

**All commands ready to copy and paste! 🚀**

