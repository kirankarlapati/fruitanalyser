import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Paper,
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import { uploadImage } from '../services/api';

const ImageUploader = ({ onUploadStart, onUploadEnd, onUploadSuccess, onUploadError, loading }) => {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp']
    },
    multiple: false,
    disabled: loading
  });

  const handleUpload = async () => {
    if (!selectedFile) return;

    onUploadStart();
    try {
      const response = await uploadImage(selectedFile);
      onUploadSuccess(response.data);
      setPreview(null);
      setSelectedFile(null);
    } catch (error) {
      onUploadError(error.message || 'Failed to upload image');
    } finally {
      onUploadEnd();
    }
  };

  const handleClear = () => {
    setPreview(null);
    setSelectedFile(null);
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.400',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: isDragActive ? 'action.hover' : 'background.paper',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'action.hover',
          },
          minHeight: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <Box sx={{ width: '100%' }}>
            <img
              src={preview}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: 400,
                objectFit: 'contain',
                borderRadius: 8,
              }}
            />
          </Box>
        ) : (
          <>
            <CloudUploadIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              {isDragActive ? 'Drop your image here' : 'Drag & drop an image here'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              or click to browse
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              Supports: JPG, PNG, GIF, BMP (Max 10MB)
            </Typography>
          </>
        )}
      </Box>

      {selectedFile && (
        <Stack direction="row" spacing={2} sx={{ mt: 3 }} justifyContent="center">
          <Button
            variant="outlined"
            onClick={handleClear}
            disabled={loading}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={loading}
            startIcon={<ImageIcon />}
            size="large"
          >
            Analyze Image
          </Button>
        </Stack>
      )}
    </Paper>
  );
};

export default ImageUploader;
