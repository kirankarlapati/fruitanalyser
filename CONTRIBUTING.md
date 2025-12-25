# Contributing to FoodFresh

First off, thank you for considering contributing to FoodFresh! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## 📜 Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code:

- Be respectful and inclusive
- Be patient and welcoming
- Be thoughtful and constructive
- Focus on what is best for the community

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details**:
  - OS (Windows/macOS/Linux)
  - Node.js version
  - Python version
  - Browser (for frontend issues)

**Bug Report Template**:
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., Windows 11]
- Node: [e.g., v18.0.0]
- Python: [e.g., 3.9.0]
- Browser: [e.g., Chrome 120]
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear title**
- **Provide detailed description**
- **Explain why** this enhancement would be useful
- **Include examples** if applicable

**Feature Request Template**:
```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives considered**
Other solutions or features you've considered.

**Additional context**
Any other context or screenshots.
```

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `documentation` - Documentation improvements

### Types of Contributions

#### Frontend (React + MUI)
- UI/UX improvements
- New components
- Performance optimization
- Accessibility features

#### Backend (Node.js + Express)
- API enhancements
- Database optimization
- Security improvements
- Error handling

#### ML Service (Python + Flask)
- Model improvements
- New preprocessing techniques
- Performance optimization
- Additional predictions

#### Documentation
- README improvements
- API documentation
- Code comments
- Tutorial creation

## 💻 Development Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/foodfresh-app.git
   cd foodfresh-app
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/foodfresh-app.git
   ```

4. **Install dependencies**
   ```bash
   npm run install-all
   ```

5. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

6. **Set up environment**
   ```bash
   # Copy .env.example files
   cp .env.example backend/.env
   cp .env.example frontend/.env
   cp .env.example ml-service/.env
   ```

## 🔄 Pull Request Process

### Before Submitting

1. **Test your changes**
   - Run the application
   - Test all affected features
   - Check for console errors
   - Verify database operations

2. **Follow code style**
   - Run linters
   - Format code properly
   - Follow naming conventions

3. **Update documentation**
   - Update README if needed
   - Add code comments
   - Update API docs if applicable

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat(component): add new feature"
   ```

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples**:
```bash
feat(upload): add drag-and-drop preview
fix(api): resolve MongoDB connection timeout
docs(readme): update installation steps
style(button): improve spacing and colors
refactor(history): optimize database query
test(ml): add unit tests for preprocessing
chore(deps): update React to v18.2.0
```

### Submitting Pull Request

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template

3. **PR Title Format**
   ```
   [Type] Brief description
   
   Examples:
   [Feature] Add user authentication
   [Fix] Resolve image upload error
   [Docs] Update API documentation
   ```

4. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   - [ ] Tested locally
   - [ ] Added unit tests
   - [ ] Updated documentation
   
   ## Screenshots (if applicable)
   
   ## Related Issues
   Closes #123
   ```

5. **Wait for review**
   - Address reviewer comments
   - Make requested changes
   - Push updates to same branch

6. **After approval**
   - Maintainers will merge
   - Delete your branch
   - Pull latest changes

## 📐 Coding Standards

### JavaScript/React

**Naming Conventions**:
```javascript
// Components: PascalCase
const ImageUploader = () => { ... }

// Functions: camelCase
const handleUpload = () => { ... }

// Constants: UPPER_SNAKE_CASE
const API_URL = 'http://localhost:5000';

// Files: PascalCase for components, camelCase for utilities
ImageUploader.jsx
apiHelper.js
```

**Component Structure**:
```javascript
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

/**
 * Component description
 * @param {Object} props - Component props
 */
const MyComponent = ({ prop1, prop2 }) => {
  // 1. State declarations
  const [state, setState] = useState(null);
  
  // 2. Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // 3. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 4. Render
  return (
    <Box>
      <Typography>{prop1}</Typography>
    </Box>
  );
};

export default MyComponent;
```

**API Calls**:
```javascript
// Use async/await
const fetchData = async () => {
  try {
    const response = await api.getData();
    setData(response.data);
  } catch (error) {
    console.error('Error:', error);
    setError(error.message);
  }
};
```

### Node.js/Express

**Route Structure**:
```javascript
const express = require('express');
const router = express.Router();

/**
 * Route description
 * @route GET /api/endpoint
 * @returns {Object} Response data
 */
router.get('/', async (req, res) => {
  try {
    // Validation
    if (!req.query.id) {
      return res.status(400).json({ error: 'ID required' });
    }
    
    // Business logic
    const data = await Model.find({ _id: req.query.id });
    
    // Response
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

**Error Handling**:
```javascript
// Always use try-catch
try {
  // Code
} catch (error) {
  console.error('Context:', error);
  res.status(500).json({ error: 'User-friendly message' });
}
```

### Python/Flask

**Code Style** (PEP 8):
```python
# Imports
import os
from flask import Flask, request, jsonify

# Constants
IMG_SIZE = 224
CLASS_NAMES = ['Fresh', 'Semi-Spoiled', 'Spoiled']

# Functions
def preprocess_image(image_file):
    """
    Preprocess image for model inference.
    
    Args:
        image_file: Uploaded image file
        
    Returns:
        np.array: Preprocessed image array
    """
    # Function logic
    return processed_image

# Routes
@app.route('/predict', methods=['POST'])
def predict():
    """Predict food freshness from image."""
    try:
        # Validation
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        # Processing
        result = process_image(request.files['image'])
        
        # Response
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

### Database

**Model Structure**:
```javascript
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  // Field definitions with validation
  field1: {
    type: String,
    required: true,
    trim: true
  },
  field2: {
    type: Number,
    min: 0,
    max: 100
  }
}, {
  timestamps: true  // Adds createdAt, updatedAt
});

// Add indexes
schema.index({ field1: 1 });

module.exports = mongoose.model('Model', schema);
```

## 🧪 Testing Guidelines

### Manual Testing

Before submitting:
1. Test the feature/fix works
2. Test edge cases
3. Test error handling
4. Check console for errors
5. Verify database operations

### Automated Testing (Future)

```javascript
// Example unit test structure
describe('ImageUploader', () => {
  it('should upload image successfully', async () => {
    const file = new File([''], 'test.jpg');
    const result = await uploadImage(file);
    expect(result.success).toBe(true);
  });
  
  it('should handle upload errors', async () => {
    const result = await uploadImage(null);
    expect(result.error).toBeDefined();
  });
});
```

## 📚 Documentation

### Code Comments

```javascript
/**
 * Function description
 * 
 * @param {string} param1 - Description
 * @param {Object} param2 - Description
 * @returns {Promise<Object>} Description
 */
const myFunction = async (param1, param2) => {
  // Implementation
};
```

### README Updates

When adding features:
1. Update feature list
2. Add usage examples
3. Update API documentation
4. Add screenshots if UI changes

### API Documentation

Document new endpoints:
```markdown
#### Endpoint Name
\```http
POST /api/endpoint

Body:
{
  "field": "value"
}

Response:
{
  "success": true,
  "data": {}
}
\```
```

## 🎨 UI/UX Guidelines

### Material Design

- Follow MUI component guidelines
- Use consistent spacing (8px grid)
- Maintain color scheme
- Ensure accessibility (WCAG 2.1)

### Responsive Design

- Test on mobile, tablet, desktop
- Use MUI breakpoints
- Ensure touch-friendly targets (48px min)

## 📋 Checklist Before Submitting

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No console errors/warnings
- [ ] Tested locally
- [ ] Commits follow convention
- [ ] PR description filled out

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Mentioned in project updates

## ❓ Questions?

- Check existing issues
- Read documentation
- Ask in discussions
- Contact maintainers

Thank you for contributing to FoodFresh! 🙏
