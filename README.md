hey # 🍎 FoodFresh - AI-Powered Food Freshness Detection System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)
![Material-UI](https://img.shields.io/badge/Material--UI-5.15.3-007FFF?logo=mui)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![Python](https://img.shields.io/badge/Python-Flask-3776AB?logo=python)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.15.0-FF6F00?logo=tensorflow)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

**FoodFresh** is a modern, full-stack web application that uses deep learning to determine whether food items are **Fresh**, **Semi-Spoiled**, or **Spoiled** based on uploaded images. The system provides instant analysis with confidence scores, maintains a history of scans, and offers comprehensive analytics.

This project demonstrates:
- ✅ Full-stack development with modern technologies
- ✅ AI/ML integration with TensorFlow/Keras
- ✅ Microservices architecture
- ✅ Material Design UI/UX principles
- ✅ Production-ready code structure

## ✨ Features

### 🔍 Core Features
- **AI-Powered Analysis**: Custom-trained CNN model for accurate food freshness detection
- **Real-time Predictions**: Instant analysis with confidence scores
- **Image Upload**: Drag-and-drop interface with preview
- **History Tracking**: Complete scan history with filtering options
- **Analytics Dashboard**: Comprehensive insights with interactive charts
- **Responsive Design**: Mobile-first, works on all devices
- **Material UI**: Clean, modern interface following Google Material Design

### 📊 Analytics Features
- Distribution charts by status
- Average confidence metrics
- Time-series trend analysis
- Quick statistics dashboard
- Scan frequency insights

## 🏗️ Architecture

```
┌─────────────────┐
│  React + MUI    │  ← Frontend (Port 3000)
│   (Frontend)    │
└────────┬────────┘
         │ HTTP/REST
         ↓
┌─────────────────┐
│  Node.js +      │  ← Backend API Gateway (Port 5000)
│    Express      │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ↓         ↓
┌────────┐ ┌──────────────┐
│MongoDB │ │ Python Flask │  ← ML Service (Port 5001)
│        │ │  ML Server   │
└────────┘ └──────┬───────┘
                  │
                  ↓
           ┌──────────────┐
           │ TensorFlow   │
           │ CNN Model    │
           │ (.weights.h5)│
           └──────────────┘
```

### Architecture Principles

1. **Separation of Concerns**: Each layer has a distinct responsibility
2. **Microservices**: ML service is isolated for scalability
3. **API Gateway Pattern**: Backend acts as a secure gateway
4. **Stateless Services**: Easy to scale horizontally
5. **Database Abstraction**: MongoDB for flexible data storage

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI framework
- **Material-UI (MUI) v5** - Component library
- **React Router v6** - Navigation
- **React Dropzone** - File upload
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Multer** - File upload handling
- **Mongoose** - MongoDB ODM
- **Axios** - HTTP client

### ML Service
- **Python 3.8+** - Programming language
- **Flask** - Web framework
- **TensorFlow 2.15** - Deep learning framework
- **Keras** - Neural network API
- **Pillow** - Image processing
- **NumPy** - Numerical computations

### Database
- **MongoDB** - NoSQL database

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **MongoDB** (v5.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **npm** or **yarn** - Package managers (comes with Node.js)

### Verify Installations

```bash
# Check Node.js version
node --version

# Check Python version
python --version

# Check MongoDB is running
mongo --version

# Check npm version
npm --version
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/foodfresh-app.git
cd FoodFresh-App
```

### 2. Install All Dependencies

You can install all dependencies at once:

```bash
npm run install-all
```

Or install individually:

#### Install Root Dependencies
```bash
npm install
```

#### Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

#### Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

#### Install ML Service Dependencies
```bash
cd ml-service
pip install -r requirements.txt
cd ..
```

Or use a virtual environment (recommended):

```bash
cd ml-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

## ⚙️ Configuration

### 1. Environment Variables

#### Backend (.env)
Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/foodfresh
ML_SERVICE_URL=http://localhost:5001
NODE_ENV=development
UPLOAD_DIR=./uploads
```

#### Frontend (.env)
Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000
```

#### ML Service (.env)
Create a `.env` file in the `ml-service` folder:

```env
ML_PORT=5001
MODEL_WEIGHTS_PATH=../foodfresh_weights.weights.h5
```

### 2. MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Start MongoDB service
# On macOS/Linux:
sudo systemctl start mongod

# On Windows:
net start MongoDB
```

**Option 2: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in `backend/.env`

### 3. Model Weights

Ensure your trained model weights file `foodfresh_weights.weights.h5` is in the root directory.

**Important**: The ML service expects a specific CNN architecture. If your model has a different architecture, update the `create_model()` function in `ml-service/app.py` to match your model.

## 🏃 Running the Application

### Option 1: Run All Services Together (Recommended)

```bash
# From the root directory
npm run dev
```

This will start:
- Frontend at `http://localhost:3000`
- Backend at `http://localhost:5000`
- ML Service at `http://localhost:5001`

### Option 2: Run Services Individually

**Terminal 1 - MongoDB**
```bash
# Make sure MongoDB is running
mongod
```

**Terminal 2 - ML Service**
```bash
cd ml-service
source venv/bin/activate  # If using virtual environment
python app.py
```

**Terminal 3 - Backend**
```bash
cd backend
npm run dev
```

**Terminal 4 - Frontend**
```bash
cd frontend
npm start
```

### Verify Services

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **ML Service**: http://localhost:5001
- **ML Health Check**: http://localhost:5001/health

## 📁 Project Structure

```
FoodFresh-App/
├── frontend/                   # React + MUI Frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ImageUploader.jsx
│   │   │   └── ResultDisplay.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── HistoryPage.jsx
│   │   │   └── InsightsPage.jsx
│   │   ├── services/          # API services
│   │   │   └── api.js
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                    # Node.js + Express Backend
│   ├── models/                # MongoDB models
│   │   └── Prediction.js
│   ├── routes/                # API routes
│   │   ├── upload.js
│   │   ├── history.js
│   │   └── insights.js
│   ├── uploads/               # Uploaded images (auto-created)
│   ├── server.js              # Main server file
│   └── package.json
│
├── ml-service/                 # Python Flask ML Service
│   ├── app.py                 # Flask application
│   ├── config.py              # Configuration
│   ├── requirements.txt       # Python dependencies
│   └── .env
│
├── foodfresh_weights.weights.h5  # Trained model weights
├── package.json               # Root package.json
├── .gitignore
├── .env.example
└── README.md
```

## 📡 API Documentation

### Backend API Endpoints

#### 1. Upload Image
```http
POST /api/upload
Content-Type: multipart/form-data

Body:
- image: File (required)

Response:
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "image_url": "/uploads/image.jpg",
    "label": "Fresh",
    "confidence": 92.34,
    "all_predictions": {
      "Fresh": 92.34,
      "Semi-Spoiled": 5.21,
      "Spoiled": 2.45
    },
    "timestamp": "2025-12-25T10:30:00.000Z"
  }
}
```

#### 2. Get History
```http
GET /api/history?label=Fresh&limit=50&skip=0

Response:
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 100,
    "limit": 50,
    "skip": 0,
    "hasMore": true
  }
}
```

#### 3. Get Insights
```http
GET /api/insights

Response:
{
  "success": true,
  "data": {
    "overview": {
      "totalScans": 150,
      "recentScans": 23,
      "labelCounts": {...},
      "labelPercentages": {...},
      "avgConfidence": {...}
    },
    "timeSeries": [...],
    "hourDistribution": {...}
  }
}
```

#### 4. Delete History Item
```http
DELETE /api/history/:id

Response:
{
  "success": true,
  "message": "Prediction deleted successfully"
}
```

### ML Service Endpoints

#### 1. Predict
```http
POST /predict
Content-Type: multipart/form-data

Body:
- image: File (required)

Response:
{
  "label": "Fresh",
  "confidence": 92.34,
  "all_predictions": {
    "Fresh": 92.34,
    "Semi-Spoiled": 5.21,
    "Spoiled": 2.45
  }
}
```

#### 2. Health Check
```http
GET /health

Response:
{
  "status": "healthy",
  "model_loaded": true
}
```

## 📸 Screenshots

### Home Page - Upload
![Home Page](docs/screenshots/home.png)

### Results Display
![Results](docs/screenshots/results.png)

### History Dashboard
![History](docs/screenshots/history.png)

### Analytics & Insights
![Insights](docs/screenshots/insights.png)

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the frontend**:
```bash
cd frontend
npm run build
```

2. **Deploy** to Vercel:
```bash
npm install -g vercel
vercel
```

Or Netlify:
```bash
npm install -g netlify-cli
netlify deploy
```

### Backend Deployment (Heroku/Railway)

1. **Prepare for deployment**:
   - Ensure all environment variables are set
   - Update CORS settings if needed

2. **Deploy to Heroku**:
```bash
cd backend
heroku create foodfresh-backend
git push heroku main
```

### ML Service Deployment (Docker)

1. **Create Dockerfile** (in ml-service folder):
```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
COPY ../foodfresh_weights.weights.h5 /app/

CMD ["python", "app.py"]
```

2. **Build and run**:
```bash
docker build -t foodfresh-ml .
docker run -p 5001:5001 foodfresh-ml
```

### Database (MongoDB Atlas)

Use MongoDB Atlas for production:
1. Create cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist IP addresses
3. Update connection string in backend `.env`

## 🐛 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running:
```bash
sudo systemctl start mongod
```

#### 2. ML Service Model Loading Error
```
Error loading model: Unable to open file
```
**Solution**: 
- Check `MODEL_WEIGHTS_PATH` in `.env`
- Ensure `.weights.h5` file exists
- Verify model architecture matches in `app.py`

#### 3. Frontend Cannot Connect to Backend
```
Network Error
```
**Solution**:
- Verify backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Ensure CORS is properly configured

#### 4. Python Dependencies Installation Error
```
Error: Microsoft Visual C++ 14.0 is required
```
**Solution** (Windows):
- Install [Visual C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)

#### 5. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution**:
```bash
# Find and kill the process
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Debug Mode

Enable debug logging:

**Backend**:
```env
NODE_ENV=development
```

**ML Service**:
```python
app.run(debug=True)
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Kiran karlapati** - (https://github.com/kirankarlapati)
- **Akshatha Reddy Bolla** - (https://github.com/AkshathaBolla)

## 🙏 Acknowledgments

- TensorFlow team for the amazing ML framework
- Material-UI team for the beautiful components
- MongoDB for the flexible database
- All contributors and supporters

## 📞 Support

For support, email karlapatikiran@gmail.com or akshathabolla@gmail.com or open an issue in the repository.

---

<div align="center">
  <p>Made with ❤️ for the AI and Food Safety Community</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
#   f r u i t a n a l y s e r  
 