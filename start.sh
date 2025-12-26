#!/bin/sh
set -e

echo "Starting backend build..."

cd backend

echo "Installing Python dependencies..."
python3 -m pip install --upgrade pip
python3 -m pip install -r requirements.txt

echo "Running Prisma generate (if available)..."
python3 -m prisma generate || echo "Prisma generate skipped"

echo "Starting Uvicorn..."
exec python3 -m uvicorn main:app --host 0.0.0.0 --port $PORT
