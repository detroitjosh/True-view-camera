# TensorFlow Lite Models

This directory contains TensorFlow Lite models for face/person detection used by the native frame processors.

## Models

### Face Detection Models

For production use, download one of these lightweight face detection models:

#### 1. BlazeFace (Recommended)
- **Model**: BlazeFace (Front Camera)
- **Size**: ~130KB
- **Speed**: Very fast (< 2ms on mobile GPU)
- **Accuracy**: Good for frontal faces
- **Download**: 
  ```bash
  # Download from TensorFlow Hub
  curl -L https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite -o blaze_face.tflite
  ```

#### 2. MobileNet SSD Face
- **Model**: MobileNet SSD Face Detection
- **Size**: ~2MB
- **Speed**: Fast (< 10ms on mobile GPU)
- **Accuracy**: High accuracy
- **Download**:
  ```bash
  # From TensorFlow Model Garden
  curl -L https://storage.googleapis.com/download.tensorflow.org/models/tflite/task_library/face_detection/android/face_detection.tflite -o face_detection.tflite
  ```

#### 3. MediaPipe Face Detection
- **Model**: MediaPipe Face Detection (Short Range)
- **Size**: ~1MB
- **Speed**: Very fast
- **Accuracy**: Excellent for close-range
- **Download**:
  ```bash
  curl -L https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite -o mediapipe_face.tflite
  ```

### Person Detection Models

#### COCO SSD MobileNet
- **Model**: COCO SSD MobileNet v1
- **Size**: ~4MB
- **Use**: Full person detection
- **Download**:
  ```bash
  curl -L https://storage.googleapis.com/download.tensorflow.org/models/tflite/coco_ssd_mobilenet_v1_1.0_quant_2018_06_29.zip -o coco_ssd.zip
  unzip coco_ssd.zip
  mv detect.tflite person_detection.tflite
  ```

## Usage

1. Download your preferred model using the commands above
2. Place the `.tflite` file in this directory
3. Update the frame processor code to load the model:
   - iOS: Update `FaceDetectionFrameProcessorPlugin.swift`
   - Android: Update `FaceDetectionFrameProcessorPlugin.java`

## Model Selection Guide

**For Auto-Capture Camera:**
- **Best**: BlazeFace (very fast, low latency)
- **Alternative**: MediaPipe Face Detection

**For General Use:**
- **Best**: MobileNet SSD Face (higher accuracy)
- **For Full Body**: COCO SSD MobileNet

## Performance Tips

1. **Quantization**: Use float16 or int8 quantized models for better performance
2. **GPU Acceleration**: Enable GPU delegates in the frame processor
3. **Resolution**: Process at lower resolution (e.g., 640x480) for faster inference
4. **Frame Skip**: Process every 2-3 frames instead of every frame

## Integration

### iOS
```swift
// In FaceDetectionFrameProcessorPlugin.swift
let modelPath = Bundle.main.path(forResource: "blaze_face", ofType: "tflite")
let interpreter = try Interpreter(modelPath: modelPath)
```

### Android
```java
// In FaceDetectionFrameProcessorPlugin.java
AssetFileDescriptor fileDescriptor = context.getAssets().openFd("blaze_face.tflite");
ByteBuffer model = loadModelFile(fileDescriptor);
Interpreter interpreter = new Interpreter(model);
```

## License

Models are subject to their respective licenses:
- BlazeFace: Apache 2.0
- MobileNet: Apache 2.0
- MediaPipe: Apache 2.0

## References

- [TensorFlow Lite Model Hub](https://www.tensorflow.org/lite/models)
- [MediaPipe Models](https://developers.google.com/mediapipe/solutions/vision/face_detector)
- [TensorFlow Model Garden](https://github.com/tensorflow/models)
