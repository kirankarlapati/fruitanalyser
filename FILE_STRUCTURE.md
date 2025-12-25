# FoodFresh - Complete File Structure

```
FoodFresh-App/
│
├── 📄 Documentation Files
│   ├── README.md                      # Main documentation (comprehensive)
│   ├── QUICKSTART.md                  # 5-minute setup guide
│   ├── ARCHITECTURE.md                # System design and architecture
│   ├── DEVELOPMENT.md                 # Development guide and workflow
│   ├── VERIFICATION.md                # Setup verification checklist
│   ├── PROJECT_COMPLETE.md            # Project completion summary
│   ├── CONTRIBUTING.md                # Contribution guidelines
│   └── LICENSE                        # MIT License
│
├── 🔧 Configuration Files
│   ├── .gitignore                     # Git ignore rules
│   ├── .env.example                   # Environment variables template
│   ├── package.json                   # Root package file
│   ├── setup.sh                       # Unix setup script
│   └── setup.ps1                      # Windows setup script
│
├── 🤖 ML Model
│   └── foodfresh_weights.weights.h5   # Trained CNN model weights
│
├── 📱 FRONTEND (React + Material-UI)
│   ├── frontend/
│   │   ├── public/                    # Static assets (auto-created)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   │   ├── ImageUploader.jsx  # Drag-and-drop upload
│   │   │   │   └── ResultDisplay.jsx  # Prediction results display
│   │   │   │
│   │   │   ├── pages/
│   │   │   │   ├── HomePage.jsx       # Upload/scan page
│   │   │   │   ├── HistoryPage.jsx    # Scan history table
│   │   │   │   └── InsightsPage.jsx   # Analytics dashboard
│   │   │   │
│   │   │   ├── services/
│   │   │   │   └── api.js             # API integration layer
│   │   │   │
│   │   │   ├── App.jsx                # Main app component
│   │   │   ├── main.jsx               # React entry point
│   │   │   └── index.css              # Global styles
│   │   │
│   │   ├── index.html                 # HTML template
│   │   ├── vite.config.js             # Vite build configuration
│   │   ├── package.json               # Frontend dependencies
│   │   ├── .env                       # Frontend environment vars
│   │   └── node_modules/              # Dependencies (auto-created)
│   │
│
├── 🖥️ BACKEND (Node.js + Express)
│   ├── backend/
│   │   ├── models/
│   │   │   └── Prediction.js          # MongoDB schema
│   │   │
│   │   ├── routes/
│   │   │   ├── upload.js              # POST /api/upload
│   │   │   ├── history.js             # GET /api/history
│   │   │   └── insights.js            # GET /api/insights
│   │   │
│   │   ├── uploads/                   # Uploaded images (auto-created)
│   │   ├── server.js                  # Main server file
│   │   ├── package.json               # Backend dependencies
│   │   ├── .env                       # Backend environment vars
│   │   └── node_modules/              # Dependencies (auto-created)
│   │
│
├── 🧠 ML SERVICE (Python + Flask)
│   └── ml-service/
│       ├── app.py                     # Flask application
│       ├── config.py                  # Model configuration
│       ├── requirements.txt           # Python dependencies
│       ├── .env                       # ML service environment vars
│       ├── venv/                      # Virtual environment (optional)
│       └── __pycache__/               # Python cache (auto-created)
│
└── 📊 DATABASE (MongoDB)
    └── (External service, not in project files)
        └── mongodb://localhost:27017/foodfresh
            └── predictions collection
```

## 📊 File Count Summary

### Total Files: 38+
- Documentation: 8 files
- Configuration: 5 files
- Frontend: 12+ files
- Backend: 8+ files
- ML Service: 5 files

### Lines of Code (Approximate)

| Component    | Files | Lines | Language   |
|--------------|-------|-------|------------|
| Frontend     | 12    | 2,000 | JavaScript |
| Backend      | 8     | 800   | JavaScript |
| ML Service   | 3     | 250   | Python     |
| Documentation| 8     | 3,000 | Markdown   |
| **Total**    | **31**| **6,050** | -      |

## 🗂️ Directory Purpose

### `/frontend` - React Application
**Purpose**: User interface layer
**Technologies**: React 18, Material-UI v5, Vite
**Port**: 3000
**Key Features**:
- Image upload with preview
- Results visualization
- History management
- Analytics dashboards

### `/backend` - API Gateway
**Purpose**: Business logic and API routing
**Technologies**: Node.js, Express, Mongoose
**Port**: 5000
**Key Features**:
- REST API endpoints
- File upload handling
- Database operations
- ML service orchestration

### `/ml-service` - Machine Learning
**Purpose**: AI predictions
**Technologies**: Python, Flask, TensorFlow
**Port**: 5001
**Key Features**:
- Model loading
- Image preprocessing
- CNN inference
- Confidence scoring

## 📋 File Descriptions

### Root Level

| File | Purpose |
|------|---------|
| `README.md` | Complete project documentation |
| `QUICKSTART.md` | 5-minute setup guide |
| `ARCHITECTURE.md` | System design details |
| `DEVELOPMENT.md` | Developer guidelines |
| `VERIFICATION.md` | Setup checklist |
| `PROJECT_COMPLETE.md` | Completion summary |
| `CONTRIBUTING.md` | Contribution guide |
| `LICENSE` | MIT license |
| `.gitignore` | Git exclusions |
| `.env.example` | Environment template |
| `package.json` | Root dependencies |
| `setup.sh` | Unix setup script |
| `setup.ps1` | Windows setup script |
| `foodfresh_weights.weights.h5` | Model weights |

### Frontend Files

| File | Purpose | Lines |
|------|---------|-------|
| `App.jsx` | Main app with routing | ~80 |
| `main.jsx` | React entry point | ~10 |
| `Navbar.jsx` | Navigation component | ~70 |
| `ImageUploader.jsx` | Upload interface | ~120 |
| `ResultDisplay.jsx` | Results display | ~150 |
| `HomePage.jsx` | Main upload page | ~60 |
| `HistoryPage.jsx` | History table | ~180 |
| `InsightsPage.jsx` | Analytics charts | ~250 |
| `api.js` | API services | ~60 |
| `index.css` | Global styles | ~20 |
| `vite.config.js` | Build config | ~15 |
| `package.json` | Dependencies | ~50 |

### Backend Files

| File | Purpose | Lines |
|------|---------|-------|
| `server.js` | Main server | ~80 |
| `Prediction.js` | Database model | ~30 |
| `upload.js` | Upload route | ~100 |
| `history.js` | History route | ~80 |
| `insights.js` | Analytics route | ~120 |
| `package.json` | Dependencies | ~40 |

### ML Service Files

| File | Purpose | Lines |
|------|---------|-------|
| `app.py` | Flask application | ~180 |
| `config.py` | Configuration | ~30 |
| `requirements.txt` | Dependencies | ~10 |

## 🔄 Auto-Generated Directories

These directories are created automatically:

```
frontend/
├── node_modules/     # ~300 MB (npm dependencies)
└── build/           # ~2 MB (production build)

backend/
├── node_modules/     # ~100 MB (npm dependencies)
└── uploads/         # Variable (uploaded images)

ml-service/
├── venv/            # ~500 MB (Python virtual env)
└── __pycache__/     # ~1 MB (Python cache)
```

## 📦 Package Dependencies

### Frontend (`frontend/package.json`)
```json
{
  "@mui/material": "^5.15.3",
  "@mui/icons-material": "^5.15.3",
  "react": "^18.2.0",
  "react-router-dom": "^6.21.1",
  "recharts": "^2.10.3",
  "react-dropzone": "^14.2.3",
  "axios": "^1.6.2"
}
```

### Backend (`backend/package.json`)
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.3",
  "multer": "^1.4.5-lts.1",
  "axios": "^1.6.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

### ML Service (`ml-service/requirements.txt`)
```
flask==3.0.0
flask-cors==4.0.0
tensorflow==2.15.0
pillow==10.1.0
numpy==1.26.2
python-dotenv==1.0.0
```

## 🎯 File Priorities for Learning

If you're new to the project, read files in this order:

1. ✅ `PROJECT_COMPLETE.md` - Overview
2. ✅ `QUICKSTART.md` - Setup
3. ✅ `README.md` - Full documentation
4. ✅ `frontend/src/App.jsx` - Frontend structure
5. ✅ `backend/server.js` - Backend structure
6. ✅ `ml-service/app.py` - ML service
7. ✅ `ARCHITECTURE.md` - System design
8. ✅ `DEVELOPMENT.md` - Development guide

## 🔍 Finding Specific Code

### Need to modify upload UI?
→ `frontend/src/components/ImageUploader.jsx`

### Need to change API endpoints?
→ `backend/routes/*.js`

### Need to adjust model?
→ `ml-service/app.py`

### Need to modify database schema?
→ `backend/models/Prediction.js`

### Need to update charts?
→ `frontend/src/pages/InsightsPage.jsx`

## 📝 Documentation Files

| File | Audience | Purpose |
|------|----------|---------|
| `README.md` | Everyone | Complete guide |
| `QUICKSTART.md` | Beginners | Fast setup |
| `ARCHITECTURE.md` | Developers | System design |
| `DEVELOPMENT.md` | Contributors | Dev workflow |
| `VERIFICATION.md` | Setup users | Checklist |
| `CONTRIBUTING.md` | Contributors | Guidelines |
| `PROJECT_COMPLETE.md` | Students/Portfolio | Summary |

## 🚀 Next Steps

1. **Read**: `PROJECT_COMPLETE.md`
2. **Setup**: Follow `QUICKSTART.md`
3. **Verify**: Use `VERIFICATION.md`
4. **Develop**: Reference `DEVELOPMENT.md`
5. **Deploy**: Follow README deployment section

---

**Complete project structure ready for development and deployment! 🎉**
