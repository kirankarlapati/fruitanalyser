from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow import keras
import os
from dotenv import load_dotenv
import io

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
IMG_SIZE = 224
CLASS_NAMES = ['Fresh', 'Semi-Spoiled', 'Spoiled']
MODEL_PATH = '../foodfresh_weights.weights.h5'

# Load model
print("="*60)
print("Loading TensorFlow model...")
try:
    # Create model architecture
    model = keras.Sequential([
        keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(IMG_SIZE, IMG_SIZE, 3)),
        keras.layers.MaxPooling2D((2, 2)),
        keras.layers.Conv2D(64, (3, 3), activation='relu'),
        keras.layers.MaxPooling2D((2, 2)),
        keras.layers.Conv2D(128, (3, 3), activation='relu'),
        keras.layers.MaxPooling2D((2, 2)),
        keras.layers.Flatten(),
        keras.layers.Dense(128, activation='relu'),
        keras.layers.Dropout(0.5),
        keras.layers.Dense(len(CLASS_NAMES), activation='softmax')
    ])
    
    # Load weights
    model.load_weights(MODEL_PATH)
    print(f"Model loaded successfully from {MODEL_PATH}")
    print("="*60)
except Exception as e:
    print(f"Error loading model: {str(e)}")
    print("="*60)
    model = None

def preprocess_image(image_file):
    """
    Preprocess image for model prediction
    """
    try:
        # Open and validate image
        img = Image.open(io.BytesIO(image_file.read()))
        
        # Convert to RGB if needed
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize to model input size
        img = img.resize((IMG_SIZE, IMG_SIZE))
        
        # Convert to numpy array and normalize
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        return img_array
    except Exception as e:
        raise ValueError(f"Error preprocessing image: {str(e)}")

def predict_freshness(image_array):
    """
    Predict food freshness using the trained model
    """
    if model is None:
        # Fallback to demo predictions if model not loaded
        return generate_demo_prediction()
    
    try:
        # Make prediction
        predictions = model.predict(image_array, verbose=0)
        predicted_class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class_idx])
        
        # Get all class probabilities
        probabilities = {
            CLASS_NAMES[i]: float(predictions[0][i])
            for i in range(len(CLASS_NAMES))
        }
        
        return {
            'prediction': CLASS_NAMES[predicted_class_idx],
            'confidence': confidence,
            'probabilities': probabilities
        }
    except Exception as e:
        raise ValueError(f"Error during prediction: {str(e)}")

def generate_demo_prediction():
    """
    Fallback demo predictions when model not loaded
    """
    import random
    # Simulate realistic predictions
    predictions = []
    for _ in range(3):
        predictions.append(random.random())
    
    # Normalize to sum to 1
    total = sum(predictions)
    predictions = [p / total for p in predictions]
    
    # Get predicted class and confidence
    predicted_class_idx = predictions.index(max(predictions))
    confidence = predictions[predicted_class_idx]
    
    # Get all class probabilities
    probabilities = {
        CLASS_NAMES[i]: predictions[i]
        for i in range(len(CLASS_NAMES))
    }
    
    return {
        'prediction': CLASS_NAMES[predicted_class_idx],
        'confidence': confidence,
        'probabilities': probabilities
    }

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'message': 'ML Service is running with TensorFlow' if model else 'Model not loaded'
    }), 200

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict food freshness from uploaded image
    """
    try:
        # Check if image file is present
        if 'image' not in request.files:
            return jsonify({
                'error': 'No image file provided'
            }), 400
        
        image_file = request.files['image']
        
        # Check if file is empty
        if image_file.filename == '':
            return jsonify({
                'error': 'No image file selected'
            }), 400
        
        # Preprocess image
        image_array = preprocess_image(image_file)
        
        
        # Make prediction
        result = predict_freshness(image_array)
        
        # Format response
        label = result['prediction']
        confidence = result['confidence'] * 100
        all_predictions = {k: v * 100 for k, v in result['probabilities'].items()}
        
        print(f"Prediction made: {label} ({confidence:.2f}%)")
        
        return jsonify({
            'label': label,
            'confidence': round(confidence, 2),
            'all_predictions': all_predictions
        }), 200
        
    except ValueError as ve:
        return jsonify({
            'error': str(ve)
        }), 400
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        return jsonify({
            'error': 'Internal server error during prediction'
        }), 500

@app.route('/', methods=['GET'])
def index():
    """Root endpoint"""
    return jsonify({
        'service': 'FoodFresh ML Service',
        'version': '1.0.0',
        'status': 'running',
        'model_loaded': model is not None
    }), 200

if __name__ == '__main__':
    port = int(os.getenv('ML_PORT', 5001))
    print("\n" + "="*60)
    print("ML Service starting on port " + str(port) + "...")
    print("TensorFlow Model: " + ("Loaded" if model else "Using Demo Mode"))
    print("="*60 + "\n")
    app.run(host='0.0.0.0', port=port, debug=False)
