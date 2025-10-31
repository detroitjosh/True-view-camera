# AI Server for TrueView Camera

This server provides AI-powered image and video generation capabilities for the TrueView Camera app.

## Features

- **Text-to-Image Generation**: Create images from text prompts
- **Text-to-Video Generation**: Generate short videos from descriptions
- **Image-to-Video Generation**: Animate static images with AI-powered motion
- **Multi-Image Movies**: Create personalized movies from multiple photos
- **Avatar Animation**: Bring portraits to life with facial animation
- **Background Replacement**: AI-powered background editing
- **Image Retouching**: Enhance photos while preserving natural skin tones

## Setup

### Prerequisites

- Node.js 16+ and npm
- Python 3.8+ (for AI models)
- GPU with CUDA support (recommended for faster generation)
- At least 8GB RAM (16GB+ recommended)

### Installation

1. Install Node.js dependencies:
```bash
cd server
npm install
```

2. Install Python dependencies (for AI models):
```bash
pip install torch torchvision diffusers transformers accelerate
```

### Configuration

Create a `.env` file in the server directory:

```env
PORT=3001
MODEL_PATH=./models
DEVICE=cuda  # or 'cpu' if no GPU
```

### Running the Server

```bash
npm run start
```

Or with auto-reload:
```bash
npm run dev
```

## AI Model Integration

### Option 1: Local Stable Diffusion (Recommended for Privacy)

Install Stable Diffusion locally:

```python
from diffusers import StableDiffusionPipeline
import torch

model_id = "stabilityai/stable-diffusion-2-1"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe = pipe.to("cuda")
```

For image-to-video animation, install Stable Video Diffusion:

```python
from diffusers import StableVideoDiffusionPipeline
import torch

model_id = "stabilityai/stable-video-diffusion-img2vid"
pipe = StableVideoDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe = pipe.to("cuda")
```

For avatar animation, consider models like:
- **SadTalker**: Talking head generation from a single image
- **First Order Motion Model**: Transfer motion from driving video
- **Wav2Lip**: Lip-sync animation

### Option 2: HuggingFace Inference API

Set up your HuggingFace API key in the mobile app's `.env`:
```
HUGGINGFACE_API_KEY=your_key_here
```

### Option 3: Other APIs

- **Replicate**: Fast cloud inference
- **Stability AI**: Official Stable Diffusion API
- **OpenAI DALL-E**: High-quality image generation

## API Endpoints

### Health Check
```
GET /health
```

### Generate Image
```
POST /generate/image
Body: {
  "prompt": "A beautiful sunset",
  "negative_prompt": "blurry, low quality",
  "num_inference_steps": 30,
  "guidance_scale": 7.5
}
```

### Generate Video
```
POST /generate/video
Body: {
  "prompt": "A person walking in a park",
  "num_frames": 16,
  "fps": 8
}
```

### Replace Background
```
POST /edit/background
Body: {
  "image_uri": "file://...",
  "background_prompt": "tropical beach"
}
```

### Retouch Image
```
POST /edit/retouch
Body: {
  "image_uri": "file://..."
}
```

### Generate Video from Image
```
POST /generate/image-to-video
Body: {
  "image_uri": "file://path/to/image.jpg",
  "prompt": "smooth zoom in motion",
  "duration": 3,
  "motion_type": "auto",
  "fps": 24
}
```

### Generate Slideshow/Movie from Multiple Images
```
POST /generate/slideshow
Body: {
  "image_uris": ["file://image1.jpg", "file://image2.jpg", ...],
  "duration_per_image": 3,
  "transition_type": "fade",
  "fps": 24,
  "include_motion": true
}
```

### Animate Avatar
```
POST /generate/animate-avatar
Body: {
  "image_uri": "file://path/to/portrait.jpg",
  "motion_prompt": "speaking with natural expressions"
}
```

## Performance Optimization

- Use GPU acceleration when available
- Implement request queuing for multiple concurrent requests
- Cache generated images
- Use lower resolution for faster previews
- Optimize model loading (keep models in memory)

## Privacy & Security

- All processing can be done locally
- No data is sent to external servers unless using cloud APIs
- Images are not stored permanently
- Clear temporary files after processing
- Respect user privacy preferences

## Troubleshooting

### Out of Memory Errors
- Reduce image resolution
- Use CPU instead of GPU
- Increase system swap space
- Use quantized models

### Slow Generation
- Ensure GPU is being used
- Reduce number of inference steps
- Use smaller models
- Batch multiple requests

## License

See main project LICENSE file.
