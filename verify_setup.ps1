# Personal Diary App - Setup Verification Script
# Run this script to verify all files are in place

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Personal Diary App - Setup Verification" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check Backend Files
Write-Host "Checking Backend Files..." -ForegroundColor Yellow
$backendFiles = @(
    "backend\main.py",
    "backend\schema.prisma",
    "backend\requirements.txt",
    "backend\.env.example"
)

foreach ($file in $backendFiles) {
    if (Test-Path $file) {
        Write-Host "  [OK] $file" -ForegroundColor Green
    } else {
        Write-Host "  [MISSING] $file" -ForegroundColor Red
        $allGood = $false
    }
}

# Check Frontend Files
Write-Host ""
Write-Host "Checking Frontend Files..." -ForegroundColor Yellow
$frontendFiles = @(
    "frontend\package.json",
    "frontend\index.html",
    "frontend\vite.config.js",
    "frontend\src\main.jsx",
    "frontend\src\App.jsx",
    "frontend\src\api.js",
    "frontend\src\components\Login.jsx",
    "frontend\src\components\DiaryApp.jsx",
    "frontend\src\components\NewEntryForm.jsx",
    "frontend\src\components\DiaryEntry.jsx"
)

foreach ($file in $frontendFiles) {
    if (Test-Path $file) {
        Write-Host "  [OK] $file" -ForegroundColor Green
    } else {
        Write-Host "  [MISSING] $file" -ForegroundColor Red
        $allGood = $false
    }
}

# Check Documentation
Write-Host ""
Write-Host "Checking Documentation..." -ForegroundColor Yellow
$docFiles = @(
    "README.md",
    "SETUP_GUIDE.md",
    "ARCHITECTURE.md",
    "TROUBLESHOOTING.md",
    "NEXT_STEPS.md"
)

foreach ($file in $docFiles) {
    if (Test-Path $file) {
        Write-Host "  [OK] $file" -ForegroundColor Green
    } else {
        Write-Host "  [MISSING] $file" -ForegroundColor Red
        $allGood = $false
    }
}

# Check for configuration files that need to be created
Write-Host ""
Write-Host "Checking Configuration Files (to be created by you)..." -ForegroundColor Yellow

if (Test-Path "backend\.env") {
    Write-Host "  [OK] backend\.env exists" -ForegroundColor Green
} else {
    Write-Host "  [TODO] backend\.env - Copy from .env.example and configure" -ForegroundColor Magenta
}

if (Test-Path "frontend\.env") {
    Write-Host "  [OK] frontend\.env exists" -ForegroundColor Green
} else {
    Write-Host "  [TODO] frontend\.env - Copy from .env.example and configure" -ForegroundColor Magenta
}

# Check if Node.js is installed
Write-Host ""
Write-Host "Checking Prerequisites..." -ForegroundColor Yellow

try {
    $nodeVersion = node --version 2>$null
    Write-Host "  [OK] Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  [MISSING] Node.js not installed - Download from https://nodejs.org/" -ForegroundColor Red
    $allGood = $false
}

try {
    $pythonVersion = python --version 2>$null
    Write-Host "  [OK] Python installed: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "  [MISSING] Python not installed" -ForegroundColor Red
    $allGood = $false
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
if ($allGood) {
    Write-Host "All core files are in place!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Read NEXT_STEPS.md for setup instructions" -ForegroundColor White
    Write-Host "2. Set up Firebase and NeonDB accounts" -ForegroundColor White
    Write-Host "3. Configure .env files" -ForegroundColor White
    Write-Host "4. Install dependencies and run the app" -ForegroundColor White
} else {
    Write-Host "Some files are missing. Please check the errors above." -ForegroundColor Red
}
Write-Host "========================================" -ForegroundColor Cyan

