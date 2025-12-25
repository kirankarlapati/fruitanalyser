# FoodFresh - Development Guide

## 🛠️ Development Environment Setup

### Required Tools

1. **Code Editor**: VS Code (recommended)
   - Extensions:
     - ESLint
     - Prettier
     - Python
     - Vetur/Volar
     - MongoDB for VS Code

2. **API Testing**: Postman or Thunder Client

3. **Database GUI**: MongoDB Compass

## 📝 Development Workflow

### 1. Feature Development

#### Frontend (React + MUI)

```bash
cd frontend
npm start
```

**Hot Reload**: Changes auto-refresh

**Component Structure**:
```javascript
// Example: Adding a new component
import React from 'react';
import { Paper, Typography } from '@mui/material';

const MyComponent = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5">My Component</Typography>
    </Paper>
  );
};

export default MyComponent;
```

**Adding New Routes**:
```javascript
// In App.jsx
import NewPage from './pages/NewPage';

<Route path="/newpage" element={<NewPage />} />
```

**API Integration**:
```javascript
// In services/api.js
export const newApiCall = async () => {
  const response = await fetch(`${API_URL}/api/new-endpoint`);
  return response.json();
};
```

#### Backend (Node.js + Express)

```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

**Adding New Endpoints**:

1. Create route file: `routes/newroute.js`
```javascript
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Your logic here
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

2. Register in `server.js`:
```javascript
const newRoute = require('./routes/newroute');
app.use('/api/newroute', newRoute);
```

**Database Operations**:
```javascript
// Using Mongoose
const results = await Prediction.find({ label: 'Fresh' })
  .sort({ timestamp: -1 })
  .limit(10);
```

#### ML Service (Python + Flask)

```bash
cd ml-service
python app.py
```

**Adding New Endpoints**:
```python
@app.route('/new-endpoint', methods=['POST'])
def new_endpoint():
    try:
        # Your logic here
        return jsonify({
            'success': True,
            'data': {}
        }), 200
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500
```

### 2. Testing Strategy

#### Manual Testing

**Test Upload Flow**:
1. Upload image
2. Check console for API calls
3. Verify prediction response
4. Check MongoDB for saved record
5. Verify image saved in uploads/

**Test History Flow**:
1. Navigate to History
2. Apply filters
3. Check pagination
4. Test delete functionality

**Test Insights Flow**:
1. Upload multiple items
2. Check chart rendering
3. Verify calculations
4. Test time ranges

#### API Testing with Postman

**Upload Image**:
```
POST http://localhost:5000/api/upload
Body: form-data
Key: image
Value: [Select file]
```

**Get History**:
```
GET http://localhost:5000/api/history?label=Fresh&limit=10
```

**Get Insights**:
```
GET http://localhost:5000/api/insights
```

### 3. Debugging

#### Frontend Debugging

**React DevTools**:
```bash
# Install extension in Chrome/Firefox
# Inspect component props, state, hooks
```

**Console Logging**:
```javascript
console.log('State:', state);
console.log('API Response:', response);
```

**Network Tab**:
- Monitor API calls
- Check request/response
- Verify status codes

#### Backend Debugging

**Console Logging**:
```javascript
console.log('Request body:', req.body);
console.log('Query params:', req.query);
```

**Morgan Logger** (already configured):
```
GET /api/history 200 45.123 ms - 1234
```

**Error Handling**:
```javascript
try {
  // Your code
} catch (error) {
  console.error('Error:', error);
  res.status(500).json({ error: error.message });
}
```

#### ML Service Debugging

**Flask Debug Mode**:
```python
if __name__ == '__main__':
    app.run(debug=True)  # Auto-reload on changes
```

**Logging**:
```python
print(f"Image shape: {img_array.shape}")
print(f"Predictions: {predictions}")
```

**Test Preprocessing**:
```python
# Add test endpoint
@app.route('/test-image', methods=['POST'])
def test_image():
    img = preprocess_image(request.files['image'])
    return jsonify({
        'shape': img.shape,
        'dtype': str(img.dtype),
        'min': float(np.min(img)),
        'max': float(np.max(img))
    })
```

### 4. Database Management

#### MongoDB Compass

1. Connect to `mongodb://localhost:27017`
2. Navigate to `foodfresh` database
3. View `predictions` collection
4. Run queries manually

#### Command Line

```bash
# Connect to MongoDB
mongo

# Use database
use foodfresh

# Query predictions
db.predictions.find().pretty()

# Count documents
db.predictions.count()

# Find by label
db.predictions.find({ label: 'Fresh' })

# Delete all documents
db.predictions.deleteMany({})
```

### 5. Code Style & Formatting

#### JavaScript/React (ESLint + Prettier)

**.eslintrc.json** (Frontend):
```json
{
  "extends": ["react-app"],
  "rules": {
    "no-console": "warn",
    "react/prop-types": "warn"
  }
}
```

**Format on save** (VS Code settings.json):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

#### Python (PEP 8)

```bash
# Install linters
pip install pylint black

# Format code
black app.py

# Lint code
pylint app.py
```

### 6. Git Workflow

#### Branch Strategy

```bash
# Main branches
main        # Production-ready code
develop     # Development branch

# Feature branches
feature/upload-ui
feature/insights-chart
feature/auth-system

# Bugfix branches
bugfix/upload-error
bugfix/chart-rendering
```

#### Commit Messages

```bash
# Format
type(scope): description

# Examples
feat(frontend): add drag-and-drop upload
fix(backend): resolve MongoDB connection issue
docs(readme): update installation instructions
style(ui): improve button spacing
refactor(api): optimize history query
test(ml): add unit tests for preprocessing
chore(deps): update dependencies
```

#### Typical Workflow

```bash
# Start new feature
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "feat(component): add new feature"

# Push to remote
git push origin feature/new-feature

# Create Pull Request on GitHub
# After review, merge to main
```

### 7. Environment Variables

**Never commit .env files!**

**Local Development**:
```env
# Use localhost
MONGODB_URI=mongodb://localhost:27017/foodfresh
ML_SERVICE_URL=http://localhost:5001
```

**Production**:
```env
# Use production URLs
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/foodfresh
ML_SERVICE_URL=https://ml.yourapp.com
```

### 8. Performance Optimization

#### Frontend

**Code Splitting**:
```javascript
// Lazy load pages
const HistoryPage = React.lazy(() => import('./pages/HistoryPage'));

<Suspense fallback={<CircularProgress />}>
  <HistoryPage />
</Suspense>
```

**Memoization**:
```javascript
import { useMemo, useCallback } from 'react';

const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

**Image Optimization**:
- Compress images before upload
- Use appropriate formats (WebP)
- Implement lazy loading

#### Backend

**Database Indexing**:
```javascript
// In Prediction model
predictionSchema.index({ label: 1 });
predictionSchema.index({ timestamp: -1 });
```

**Caching** (Redis - optional):
```javascript
const redis = require('redis');
const client = redis.createClient();

// Cache frequent queries
app.get('/api/insights', async (req, res) => {
  const cached = await client.get('insights');
  if (cached) return res.json(JSON.parse(cached));
  
  const data = await getInsights();
  await client.setex('insights', 300, JSON.stringify(data));
  res.json(data);
});
```

#### ML Service

**Model Optimization**:
```python
# Use TensorFlow Lite for faster inference
import tensorflow as tf

converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()
```

**Batch Processing**:
```python
# Process multiple images at once
def predict_batch(images):
    processed = [preprocess_image(img) for img in images]
    batch = np.vstack(processed)
    predictions = model.predict(batch)
    return predictions
```

### 9. Common Development Tasks

#### Add New Food Category

1. **Update ML model** to classify new category
2. **Update CLASS_NAMES** in `ml-service/config.py`
3. **Add color mapping** in frontend
4. **Update database enum** in Prediction model
5. **Test with new images**

#### Add User Authentication

1. **Install dependencies**:
```bash
npm install jsonwebtoken bcryptjs
```

2. **Create User model**
3. **Add auth routes** (register, login)
4. **Create auth middleware**
5. **Protect routes**
6. **Add auth context** in frontend
7. **Update UI** with login/logout

#### Add Email Notifications

1. **Install Nodemailer**:
```bash
npm install nodemailer
```

2. **Configure email service**
3. **Create email templates**
4. **Send on spoiled detection**

### 10. Resources

#### Frontend
- React Docs: https://react.dev/
- MUI Components: https://mui.com/components/
- React Router: https://reactrouter.com/

#### Backend
- Express Guide: https://expressjs.com/en/guide/routing.html
- Mongoose Docs: https://mongoosejs.com/docs/
- Node.js Best Practices: https://github.com/goldbergyoni/nodebestpractices

#### ML/Python
- TensorFlow Guide: https://www.tensorflow.org/guide
- Flask Tutorial: https://flask.palletsprojects.com/en/2.3.x/tutorial/
- PIL/Pillow: https://pillow.readthedocs.io/

#### Database
- MongoDB University: https://university.mongodb.com/
- MongoDB Compass: https://www.mongodb.com/products/compass

### 11. Troubleshooting Development Issues

#### Hot Reload Not Working

**Frontend**:
```bash
# Clear cache
rm -rf node_modules/.cache
npm start
```

**Backend**:
```bash
# Check nodemon is installed
npm install -D nodemon
```

#### CORS Errors

**Backend (server.js)**:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

#### Database Connection Issues

```javascript
// Add error handling
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected'))
  .catch(err => console.error('Connection error:', err));
```

## 🎯 Ready to Develop!

You're all set to start developing features for FoodFresh. Remember:

1. **Test locally** before committing
2. **Follow code standards**
3. **Document your changes**
4. **Ask for help** when stuck

Happy coding! 🚀
