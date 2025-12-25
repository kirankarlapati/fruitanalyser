# FoodFresh - Quick Start Guide

## 🚀 5-Minute Setup

### Prerequisites Check
```bash
node --version   # Should be v16+
python --version # Should be 3.8+
mongo --version  # Should be 5.0+
```

### Step 1: Clone & Install
```bash
# Clone repository
git clone <your-repo-url>
cd FoodFresh-App

# Install all dependencies
npm run install-all
```

### Step 2: Configure Environment
```bash
# Backend
cd backend
cp ../.env.example .env
# Edit .env if needed

# Frontend
cd ../frontend
echo "VITE_API_URL=http://localhost:5000" > .env

# ML Service
cd ../ml-service
echo "ML_PORT=5001" > .env
echo "MODEL_WEIGHTS_PATH=../foodfresh_weights.weights.h5" >> .env
cd ..
```

### Step 3: Start MongoDB
```bash
# macOS/Linux
sudo systemctl start mongod

# Windows
net start MongoDB

# Or use MongoDB Compass GUI
```

### Step 4: Run Application
```bash
# From root directory
npm run dev
```

### Step 5: Access Application
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **ML Service**: http://localhost:5001

## 🎯 First Upload

1. Go to http://localhost:3000
2. Drag & drop a food image
3. Click "Analyze Image"
4. View results!

## 📊 Features to Try

1. **Upload Page** - Test food images
2. **History Page** - View all scans
3. **Insights Page** - See analytics

## ⚠️ Common Issues

### MongoDB Not Running
```bash
# Check status
systemctl status mongod

# Start service
sudo systemctl start mongod
```

### Port Already in Use
```bash
# Change port in .env files
# Backend: PORT=5001
# Frontend: (in vite.config.js) port: 3001
```

### ML Model Not Loading
- Verify `foodfresh_weights.weights.h5` exists in root
- Check file path in `ml-service/.env`

## 🆘 Need Help?

Check the full [README.md](README.md) for detailed documentation.
