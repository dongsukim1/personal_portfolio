import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Modal, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { spacing, animations } from '../theme/tokens';

// ImageNet normalization constants
const IMAGENET_MEAN = [0.485, 0.456, 0.406];
const IMAGENET_STD = [0.229, 0.224, 0.225];
const RESIZE_SHORT_SIDE = 256;

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

// Softmax: convert raw logits to probabilities
const softmax = (logits) => {
  const maxLogit = Math.max(...logits);
  const exps = logits.map((l) => Math.exp(l - maxLogit));
  const sumExps = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sumExps);
};

const ONNXDemo = ({ show, onHide, modelConfig }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
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
      const ort = await import('onnxruntime-web');

      // Point WASM paths to the installed package version via CDN
      ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.23.2/dist/';

      const session = await ort.InferenceSession.create(
        modelConfig.modelUrl,
        { executionProviders: ['wasm'] }
      );
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

  // Preprocess image to match training pipeline exactly:
  // 1. Resize so shortest side = 256 (maintain aspect ratio)
  // 2. Center crop to 224x224
  // 3. Scale to [0,1], normalize with ImageNet mean/std
  // 4. Convert to CHW tensor [1, 3, 224, 224]
  const preprocessImage = (imageElement) => {
    const { naturalWidth: w, naturalHeight: h } = imageElement;
    const cropSize = modelConfig.inputSize; // 224

    // Step 1: Resize so the shorter side is 256px
    const scale = RESIZE_SHORT_SIDE / Math.min(w, h);
    const resizedW = Math.round(w * scale);
    const resizedH = Math.round(h * scale);

    const resizeCanvas = document.createElement('canvas');
    resizeCanvas.width = resizedW;
    resizeCanvas.height = resizedH;
    const resizeCtx = resizeCanvas.getContext('2d');
    resizeCtx.drawImage(imageElement, 0, 0, resizedW, resizedH);

    // Step 2: Center crop to 224x224
    const offsetX = Math.floor((resizedW - cropSize) / 2);
    const offsetY = Math.floor((resizedH - cropSize) / 2);
    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = cropSize;
    cropCanvas.height = cropSize;
    const cropCtx = cropCanvas.getContext('2d');
    cropCtx.drawImage(
      resizeCanvas,
      offsetX, offsetY, cropSize, cropSize,
      0, 0, cropSize, cropSize
    );

    const imageData = cropCtx.getImageData(0, 0, cropSize, cropSize);
    const { data } = imageData;
    const pixelCount = cropSize * cropSize;

    // Steps 3-4: Scale to [0,1], ImageNet normalize, arrange as CHW
    const tensor = new Float32Array(3 * pixelCount);
    for (let i = 0; i < pixelCount; i++) {
      const r = data[i * 4] / 255.0;
      const g = data[i * 4 + 1] / 255.0;
      const b = data[i * 4 + 2] / 255.0;

      tensor[i]                    = (r - IMAGENET_MEAN[0]) / IMAGENET_STD[0]; // R channel
      tensor[i + pixelCount]       = (g - IMAGENET_MEAN[1]) / IMAGENET_STD[1]; // G channel
      tensor[i + 2 * pixelCount]   = (b - IMAGENET_MEAN[2]) / IMAGENET_STD[2]; // B channel
    }

    return tensor;
  };

  // Run inference
  const runInference = async (imageElement) => {
    if (!sessionRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const ort = await import('onnxruntime-web');

      const inputTensor = preprocessImage(imageElement);
      const size = modelConfig.inputSize;
      const tensor = new ort.Tensor('float32', inputTensor, [1, 3, size, size]);

      const results = await sessionRef.current.run({ [modelConfig.inputName]: tensor });
      const output = results[modelConfig.outputName];

      // Apply softmax to raw logits to get probabilities
      const probabilities = softmax(Array.from(output.data));

      const preds = probabilities
        .map((prob, index) => ({
          class: modelConfig.classes[index],
          confidence: prob,
        }))
        .sort((a, b) => b.confidence - a.confidence);

      setPredictions(preds);
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

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);

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

  // Suppress unused var warning — selectedImage is kept in state for future use
  void selectedImage;

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
