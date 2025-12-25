from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import random
import os
from dotenv import load_dotenv
import io

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# NOTE: TensorFlow removed for Python 3.13 compatibility
# This is a demo mode using random predictions
# For production, use Python 3.10-3.11 with TensorFlow

# Configuration
IMG_SIZE = 224
CLASS_NAMES = ['Fresh', 'Semi-Spoiled', 'Spoiled']

print("="*60)
print("DEMO MODE: Running without TensorFlow")
print("Using simulated predictions for demonstration")
print("For real predictions, use Python 3.10-3.11 with TensorFlow")
print("="*60)

def preprocess_image(image_file):
    """
    Validate the uploaded image
    """
    try:
        # Open and validate image
        img = Image.open(io.BytesIO(image_file.read()))
        
        # Convert to RGB if needed
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize to model input size
        img = img.resize((IMG_SIZE, IMG_SIZE))
        
        return True
    except Exception as e:
        raise ValueError(f"Error preprocessing image: {str(e)}")

def generate_demo_prediction():
    """
    Generate demo predictions for testing
    In production, this would use the actual TensorFlow model
    """
    # Simulate realistic predictions
    predictions = []
    for _ in range(3):
        predictions.append(random.random())
    
    # Normalize to sum to 1
    total = sum(predictions)
    predictions = [p / total for p in predictions]
    
    return predictions

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'mode': 'demo',
        'message': 'Running in demo mode without TensorFlow'
    }), 200

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict food freshness from uploaded image (DEMO MODE)
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
        
        # Validate image
        preprocess_image(image_file)
        
        # Generate demo predictions
        predictions = generate_demo_prediction()
        
        # Get predicted class and confidence
        predicted_class_idx = predictions.index(max(predictions))
        confidence = predictions[predicted_class_idx] * 100
        label = CLASS_NAMES[predicted_class_idx]
        
        # Get all class probabilities
        all_predictions = {
            CLASS_NAMES[i]: predictions[i] * 100 
            for i in range(len(CLASS_NAMES))
        }
        
        print(f"✓ Prediction made: {label} ({confidence:.2f}%)")
        
        return jsonify({
            'label': label,
            'confidence': round(confidence, 2),
            'all_predictions': all_predictions,
            'mode': 'demo'
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
        'mode': 'demo'
    }), 200

if __name__ == '__main__':
    port = int(os.getenv('ML_PORT', 5001))
    print(f"\n🚀 ML Service starting on port {port}...")
    print("📊 Demo mode active - simulated predictions\n")
    app.run(host='0.0.0.0', port=port, debug=False)
