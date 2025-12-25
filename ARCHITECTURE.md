# Architecture Documentation

## System Overview

FoodFresh implements a microservices architecture with clear separation between the frontend, backend API gateway, ML service, and database layers.

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                          │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  React + Material-UI Frontend (Port 3000)               │ │
│  │  - Image Upload UI                                       │ │
│  │  - Results Display                                       │ │
│  │  - History Dashboard                                     │ │
│  │  - Analytics Charts                                      │ │
│  └─────────────────────────────────────────────────────────┘ │
└────────────────────────┬─────────────────────────────────────┘
                         │ HTTPS/REST API
                         ↓
┌──────────────────────────────────────────────────────────────┐
│                    API GATEWAY LAYER                          │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Node.js + Express Backend (Port 5000)                  │ │
│  │  - Request Validation                                    │ │
│  │  - File Upload (Multer)                                  │ │
│  │  - Business Logic                                        │ │
│  │  - Authentication (future)                               │ │
│  └───────────────┬──────────────────────┬──────────────────┘ │
└──────────────────┼──────────────────────┼────────────────────┘
                   │                      │
          ┌────────┴────────┐    ┌───────┴────────┐
          │ HTTP Request    │    │ MongoDB Query  │
          ↓                      ↓
┌──────────────────────┐  ┌──────────────────────┐
│   ML SERVICE LAYER   │  │   DATABASE LAYER     │
│                      │  │                      │
│  Python Flask        │  │  MongoDB             │
│  (Port 5001)         │  │  (Port 27017)        │
│  ┌────────────────┐  │  │  ┌────────────────┐ │
│  │ Image          │  │  │  │ predictions    │ │
│  │ Preprocessing  │  │  │  │ collection     │ │
│  └────────────────┘  │  │  └────────────────┘ │
│  ┌────────────────┐  │  │                      │
│  │ TensorFlow     │  │  │                      │
│  │ CNN Model      │  │  │                      │
│  └────────────────┘  │  │                      │
│  ┌────────────────┐  │  │                      │
│  │ Prediction     │  │  │                      │
│  │ Logic          │  │  │                      │
│  └────────────────┘  │  │                      │
└──────────────────────┘  └──────────────────────┘
```

## Component Details

### 1. Frontend Layer (React + MUI)

**Technology**: React 18, Material-UI v5, Vite

**Responsibilities**:
- User interface rendering
- Image upload handling
- Results visualization
- State management
- Routing

**Key Components**:
- `HomePage.jsx` - Upload interface
- `HistoryPage.jsx` - Scan history table
- `InsightsPage.jsx` - Analytics dashboard
- `ImageUploader.jsx` - Drag-and-drop component
- `ResultDisplay.jsx` - Prediction results

**Data Flow**:
1. User uploads image
2. Component sends to Backend API
3. Receives prediction results
4. Displays with confidence scores

### 2. Backend API Gateway (Node.js + Express)

**Technology**: Node.js, Express, Multer, Mongoose

**Responsibilities**:
- API endpoint exposure
- Request validation
- File upload management
- ML service orchestration
- Database operations
- Error handling
- CORS management

**API Routes**:
```
POST   /api/upload     - Upload and analyze image
GET    /api/history    - Get scan history
GET    /api/insights   - Get analytics data
DELETE /api/history/:id - Delete history item
```

**Security Features**:
- File type validation
- File size limits
- CORS configuration
- Request sanitization

### 3. ML Service Layer (Python + Flask)

**Technology**: Python, Flask, TensorFlow, Keras, Pillow

**Responsibilities**:
- Model loading and management
- Image preprocessing
- Inference execution
- Confidence calculation
- Result formatting

**Model Architecture**:
```python
Input (224x224x3)
    ↓
Conv2D (32 filters) + ReLU
    ↓
MaxPooling2D
    ↓
Conv2D (64 filters) + ReLU
    ↓
MaxPooling2D
    ↓
Conv2D (128 filters) + ReLU
    ↓
MaxPooling2D
    ↓
Conv2D (128 filters) + ReLU
    ↓
MaxPooling2D
    ↓
Flatten
    ↓
Dropout (0.5)
    ↓
Dense (512) + ReLU
    ↓
Dense (3) + Softmax
    ↓
Output [Fresh, Semi-Spoiled, Spoiled]
```

**Image Processing Pipeline**:
1. Receive image file
2. Convert to RGB if needed
3. Resize to 224x224
4. Normalize pixel values (0-1)
5. Add batch dimension
6. Run inference
7. Extract predictions

### 4. Database Layer (MongoDB)

**Technology**: MongoDB, Mongoose ODM

**Schema Design**:
```javascript
Prediction {
  _id: ObjectId,
  image_url: String,
  label: String (enum: ['Fresh', 'Semi-Spoiled', 'Spoiled']),
  confidence: Number (0-100),
  all_predictions: Object,
  timestamp: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `label` (for filtering)
- `timestamp` (for sorting)

## Data Flow

### Upload & Prediction Flow

```
1. User uploads image via frontend
       ↓
2. Frontend sends FormData to Backend
   POST /api/upload
       ↓
3. Backend (Multer) saves file locally
       ↓
4. Backend forwards image to ML Service
   POST http://localhost:5001/predict
       ↓
5. ML Service:
   - Preprocesses image
   - Runs CNN inference
   - Returns predictions
       ↓
6. Backend saves result to MongoDB
       ↓
7. Backend returns complete result to Frontend
       ↓
8. Frontend displays result with visualization
```

### History Retrieval Flow

```
1. User navigates to History page
       ↓
2. Frontend requests history
   GET /api/history?label=Fresh&limit=50
       ↓
3. Backend queries MongoDB
       ↓
4. Backend returns array of predictions
       ↓
5. Frontend renders in MUI Table
```

### Analytics Flow

```
1. User navigates to Insights page
       ↓
2. Frontend requests analytics
   GET /api/insights
       ↓
3. Backend aggregates data from MongoDB
   - Calculate totals
   - Group by label
   - Time series analysis
       ↓
4. Backend returns structured insights
       ↓
5. Frontend renders charts using Recharts
```

## Deployment Architecture

### Development
```
localhost:3000 → Frontend (Vite dev server)
localhost:5000 → Backend (Node.js)
localhost:5001 → ML Service (Flask)
localhost:27017 → MongoDB
```

### Production
```
Vercel/Netlify → Frontend (Static hosting)
Heroku/Railway → Backend (Containerized)
Cloud Run/Lambda → ML Service (Serverless)
MongoDB Atlas → Database (Managed)
```

## Scalability Considerations

### Horizontal Scaling
- **Frontend**: CDN distribution (Cloudflare, CloudFront)
- **Backend**: Multiple instances behind load balancer
- **ML Service**: Autoscaling containers (Kubernetes)
- **Database**: MongoDB replica sets

### Performance Optimization
- **Frontend**: Code splitting, lazy loading
- **Backend**: Connection pooling, caching (Redis)
- **ML Service**: Model optimization, GPU inference
- **Database**: Indexes, query optimization

### Caching Strategy
```
Browser Cache → Static assets (frontend)
    ↓
CDN Cache → Built frontend files
    ↓
Redis Cache → Frequently accessed predictions
    ↓
MongoDB → Persistent storage
```

## Security Architecture

### Authentication (Future Enhancement)
```
User Login → JWT Token Generation
    ↓
Token stored in httpOnly cookie
    ↓
Every request includes token
    ↓
Backend validates token
    ↓
Access granted/denied
```

### Data Security
- **In Transit**: HTTPS/TLS encryption
- **At Rest**: MongoDB encryption
- **Uploads**: File type validation, virus scanning
- **API**: Rate limiting, CORS

## Monitoring & Logging

### Application Monitoring
- **Frontend**: Error tracking (Sentry)
- **Backend**: Request logging (Morgan)
- **ML Service**: Prediction metrics
- **Database**: Query performance

### Health Checks
```
GET /health → Backend status
GET /health → ML service status
MongoDB connection status
```

## Technology Decisions

### Why React + MUI?
- Rich component library
- Material Design principles
- Excellent documentation
- Active community

### Why Node.js Backend?
- JavaScript everywhere
- Non-blocking I/O
- Large ecosystem (npm)
- Easy integration with frontend

### Why Separate ML Service?
- Language-specific optimization (Python for ML)
- Independent scaling
- Technology isolation
- Easy model updates

### Why MongoDB?
- Flexible schema
- JSON-like documents
- Easy integration with Node.js
- Scalability

## Future Enhancements

1. **Authentication & Authorization**
   - User registration/login
   - JWT-based auth
   - Role-based access control

2. **Real-time Features**
   - WebSocket for live updates
   - Notification system

3. **Advanced ML**
   - Model versioning
   - A/B testing
   - Continuous learning

4. **Mobile App**
   - React Native
   - Camera integration

5. **API Gateway**
   - Kong or AWS API Gateway
   - Advanced rate limiting
   - API analytics
