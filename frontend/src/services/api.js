const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Upload failed');
  }

  return response.json();
};

export const getHistory = async (label = '', limit = 50, skip = 0) => {
  const params = new URLSearchParams();
  if (label) params.append('label', label);
  params.append('limit', limit);
  params.append('skip', skip);

  const response = await fetch(`${API_URL}/api/history?${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch history');
  }

  return response.json();
};

export const getInsights = async () => {
  const response = await fetch(`${API_URL}/api/insights`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch insights');
  }

  return response.json();
};

export const deleteHistoryItem = async (id) => {
  const response = await fetch(`${API_URL}/api/history/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete item');
  }

  return response.json();
};

export const getImageUrl = (imagePath) => {
  return `${API_URL}${imagePath}`;
};
