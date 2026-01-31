import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Modal, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { spacing, animations } from '../theme/tokens';

// Styled components
const StyledDemo = styled.div`
  .drop-zone {
    border: 2px dashed ${({ theme }) => 
      theme.name === 'light' ? 'var(--bs-gray-400)' : 'var(--bs-gray-600)'};
    border-radius: ${spacing.md};
    padding: ${spacing.xxl};
    text-align: center;
    transition: ${animations.transition};
    cursor: pointer;
    
    &:hover, &.drag-over {
      border-color: var(--bs-primary);
      background-color: ${({ theme }) => 
        theme.name === 'light' ? 'var(--bs-light)' : 'var(--bs-dark)'};
    }
  }
  
  .preview-image {
    max-width: 100%;
    max-height: 300px;
    border-radius: ${spacing.sm};
    margin: ${spacing.lg} 0;
  }
  
  .results-container {
    background: ${({ theme }) => 
      theme.name === 'light' ? 'var(--bs-gray-100)' : 'var(--bs-gray-800)'};
    border-radius: ${spacing.md};
    padding: ${spacing.lg};
    margin-top: ${spacing.lg};
  }
  
  .confidence-bar {
    height: 20px;
    background: var(--bs-primary);
    border-radius: ${spacing.xs};
    transition: ${animations.transition};
  }
`;

const ONNXDemo = ({ show, onHide, modelConfig }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  // const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  
  const fileInputRef = useRef(null);
  const sessionRef = useRef(null);

  // Load ONNX model
  const loadModel = useCallback(async () => {
    if (modelLoaded || !show) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Dynamic import to avoid bundling issues
      const ort = await import('onnxruntime-web');
      
      // Configure ONNX Runtime
      ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.16.3/dist/';
      
      // Load the model
      const session = await ort.InferenceSession.create(modelConfig.modelUrl);
      sessionRef.current = session;
      setModelLoaded(true);
    } catch (err) {
      console.error('Failed to load ONNX model:', err);
      setError('Failed to load the AI model. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [modelLoaded, show, modelConfig.modelUrl]);

  // Load model when modal opens
  React.useEffect(() => {
    if (show) {
      loadModel();
    }
  }, [show, loadModel]);

  // Preprocess image for model
  const preprocessImage = async (imageElement) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Resize to model input size
    canvas.width = modelConfig.inputSize;
    canvas.height = modelConfig.inputSize;
    
    // Draw and resize image
    ctx.drawImage(imageElement, 0, 0, modelConfig.inputSize, modelConfig.inputSize);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, modelConfig.inputSize, modelConfig.inputSize);
    const { data } = imageData;
    
    // Convert to tensor format (CHW)
    const tensor = new Float32Array(3 * modelConfig.inputSize * modelConfig.inputSize);
    
    for (let i = 0; i < modelConfig.inputSize * modelConfig.inputSize; i++) {
      tensor[i] = data[i * 4] / 255.0; // R
      tensor[i + modelConfig.inputSize * modelConfig.inputSize] = data[i * 4 + 1] / 255.0; // G  
      tensor[i + 2 * modelConfig.inputSize * modelConfig.inputSize] = data[i * 4 + 2] / 255.0; // B
    }
    
    return tensor;
  };

  // Run inference
  const runInference = async (imageElement) => {
    if (!sessionRef.current) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Dynamic import
      const ort = await import('onnxruntime-web');
      
      // Preprocess image
      const inputTensor = await preprocessImage(imageElement);
      
      // Create tensor
      const tensor = new ort.Tensor('float32', inputTensor, [1, 3, modelConfig.inputSize, modelConfig.inputSize]);
      
      // Run inference
      const results = await sessionRef.current.run({ [modelConfig.inputName]: tensor });
      const output = results[modelConfig.outputName];
      
      // Process results
      const predictions = Array.from(output.data)
        .map((confidence, index) => ({
          class: modelConfig.classes[index],
          confidence: confidence,
        }))
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 5); // Top 5 predictions
      
      setPredictions(predictions);
    } catch (err) {
      console.error('Inference failed:', err);
      setError('Failed to process the image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }
    
    setSelectedImage(file);
    setError(null);
    setPredictions(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      
      // Create image element for inference
      const img = new Image();
      img.onload = () => runInference(img);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // File input handler
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Reset demo
  const resetDemo = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setPredictions(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <Icon icon="mdi:brain" className="me-2" />
          {modelConfig.title}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <StyledDemo>
          <Container>
            {/* Model Loading */}
            {!modelLoaded && (
              <Alert variant="info" className="text-center">
                <Spinner animation="border" size="sm" className="me-2" />
                Loading AI model... This may take a moment.
              </Alert>
            )}
            
            {/* Error Display */}
            {error && (
              <Alert variant="danger">
                <Icon icon="mdi:alert-circle" className="me-2" />
                {error}
              </Alert>
            )}
            
            {/* Description */}
            <p className="text-center mb-4">{modelConfig.description}</p>
            
            {/* File Drop Zone */}
            {modelLoaded && (
              <div
                className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Icon icon="mdi:cloud-upload" size="3rem" className="mb-3" />
                <h5>Drop an image here or click to select</h5>
                <p className="text-muted">Supports JPG, PNG, GIF formats</p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  style={{ display: 'none' }}
                />
              </div>
            )}
            
            {/* Image Preview */}
            {imagePreview && (
              <Row className="mt-4">
                <Col md={6}>
                  <h6>Selected Image:</h6>
                  <img src={imagePreview} alt="Selected" className="preview-image" />
                </Col>
                
                {/* Results */}
                <Col md={6}>
                  {isLoading && (
                    <div className="text-center">
                      <Spinner animation="border" />
                      <p className="mt-2">Processing image...</p>
                    </div>
                  )}
                  
                  {predictions && (
                    <div className="results-container">
                      <h6>Predictions:</h6>
                      {predictions.map((pred, index) => (
                        <div key={index} className="mb-3">
                          <div className="d-flex justify-content-between">
                            <span>{pred.class}</span>
                            <span>{(pred.confidence * 100).toFixed(1)}%</span>
                          </div>
                          <div className="bg-light rounded">
                            <div 
                              className="confidence-bar"
                              style={{ width: `${pred.confidence * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Col>
              </Row>
            )}
          </Container>
        </StyledDemo>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={resetDemo}>
          <Icon icon="mdi:refresh" className="me-1" />
          Reset
        </Button>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ONNXDemo;