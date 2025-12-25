"""
Model configuration and utilities for FoodFresh ML Service
"""

# Image preprocessing settings
IMG_SIZE = 224
IMG_CHANNELS = 3

# Class labels (order must match training)
CLASS_NAMES = ['Fresh', 'Semi-Spoiled', 'Spoiled']

# Color codes for frontend
CLASS_COLORS = {
    'Fresh': 'success',        # Green
    'Semi-Spoiled': 'warning', # Orange
    'Spoiled': 'error'         # Red
}

# Safety advice for each category
SAFETY_ADVICE = {
    'Fresh': 'This food appears fresh and safe to consume. Store properly to maintain freshness.',
    'Semi-Spoiled': 'This food shows signs of aging. Consume soon or consider discarding if smell/texture is off.',
    'Spoiled': 'This food appears spoiled. For safety, it is recommended to discard it.'
}
