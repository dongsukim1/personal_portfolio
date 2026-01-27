# ONNX Model Demo Setup Instructions

## 1. Install Dependencies

First, install the required ONNX Runtime package:

```bash
npm install onnxruntime-web
```

## 2. Prepare Your ONNX Model

1. **Convert your model to ONNX format** (if not already):
   - For PyTorch: Use `torch.onnx.export()`
   - For TensorFlow: Use `tf2onnx`
   - For scikit-learn: Use `skl2onnx`

2. **Optimize your model for web** (optional but recommended):
   ```bash
   python -m onnxruntime.tools.convert_onnx_models_to_ort --optimization_level all your-model.onnx
   ```

3. **Place your model file** in `public/models/your-model.onnx`

## 3. Configure Your Model

Update the `onnxDemoConfig` in `src/config.js`:

```javascript
export const onnxDemoConfig = {
  title: "Your Model Demo",
  description: "Description of what your model does",
  modelUrl: "/models/your-model.onnx",
  inputName: "input", // Check your model's input tensor name
  outputName: "output", // Check your model's output tensor name
  inputSize: 224, // Your model's expected input size (e.g., 224x224)
  classes: [
    "Class 1",
    "Class 2", 
    "Class 3",
    // Add all your model's class labels
  ]
};
```

## 4. Find Your Model's Input/Output Names

Use this Python script to inspect your ONNX model:

```python
import onnx

model = onnx.load("your-model.onnx")

print("Input names:")
for input in model.graph.input:
    print(f"  {input.name}: {input.type}")

print("Output names:")
for output in model.graph.output:
    print(f"  {output.name}: {output.type}")
```

## 5. Enable Demo for Specific Projects

Add your project repository names to `projectsWithOnnxDemo` in `src/config.js`:

```javascript
export const projectsWithOnnxDemo = [
  "your-ml-project-repo-name",
  "another-ml-project",
];
```

## 6. Model Requirements

Your ONNX model should:
- Accept image input (RGB, normalized 0-1)
- Have input shape: `[1, 3, height, width]` (batch, channels, height, width)
- Output classification probabilities or logits
- Be optimized for web (< 50MB recommended)

## 7. Supported Image Formats

The demo supports:
- JPG/JPEG
- PNG  
- GIF
- WebP

## 8. Example Model Conversion (PyTorch)

```python
import torch
import torch.onnx

# Load your trained model
model = YourModel()
model.load_state_dict(torch.load('model.pth'))
model.eval()

# Create dummy input
dummy_input = torch.randn(1, 3, 224, 224)

# Export to ONNX
torch.onnx.export(
    model,
    dummy_input,
    "your-model.onnx",
    export_params=True,
    opset_version=11,
    do_constant_folding=True,
    input_names=['input'],
    output_names=['output'],
    dynamic_axes={
        'input': {0: 'batch_size'},
        'output': {0: 'batch_size'}
    }
)
```

## 9. Testing

1. Start your development server: `npm start`
2. Navigate to a project with `hasOnnxDemo: true`
3. Click "Try AI Demo" button
4. Upload an image and verify predictions

## 10. Deployment Notes

- Ensure your ONNX model file is included in your build
- Consider using a CDN for large model files
- Test loading times on slower connections
- The model downloads once and runs entirely in the browser

## Troubleshooting

**Model won't load:**
- Check file path in `modelUrl`
- Verify model is in `public/models/` directory
- Check browser console for errors

**Wrong predictions:**
- Verify `inputSize` matches your model's expected input
- Check `classes` array order matches your model's output
- Ensure image preprocessing matches training preprocessing

**Performance issues:**
- Optimize model with ONNX Runtime tools
- Reduce model size if possible
- Consider using quantized models