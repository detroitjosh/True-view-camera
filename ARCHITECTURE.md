# Architecture Overview

This document explains the technical architecture of TrueView Camera.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Mobile App (React Native + Expo)        │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Screens    │  │  Components  │  │   Services   │    │
│  │              │  │              │  │              │    │
│  │ - Home       │  │ - Camera     │  │ - AI         │    │
│  │ - Camera     │  │ - Filters    │  │ - Media      │    │
│  │ - Edit       │  │ - Effects    │  │ - Share      │    │
│  │ - AI Gen     │  │ - Social     │  │              │    │
│  │ - Gallery    │  │ - Controls   │  │              │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Core Utilities                          │  │
│  │  - SkinToneProcessor   - AutoCaptureDetector        │  │
│  │  - Image Manipulation  - Face Detection             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Expo Native Modules                       │  │
│  │  - Camera  - MediaLibrary  - ImageManipulator       │  │
│  │  - FileSystem  - Sharing  - AV                      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  AI Server (Optional)                       │
│                     Node.js + Express                       │
│                                                             │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐          │
│  │  Image     │  │   Video    │  │   Image    │          │
│  │ Generation │  │ Generation │  │  Editing   │          │
│  └────────────┘  └────────────┘  └────────────┘          │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │        Python AI Models (subprocess)                 │  │
│  │  - Stable Diffusion  - Segmentation  - Enhancement  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Optional: External APIs
                              ▼
                    ┌──────────────────┐
                    │  Cloud AI APIs   │
                    │  - HuggingFace   │
                    │  - Stability AI  │
                    └──────────────────┘
```

## Component Hierarchy

```
App (Navigation)
│
├── HomeScreen
│   └── Feature cards and navigation
│
├── CameraScreen
│   ├── Camera (Expo)
│   ├── CameraControls
│   │   ├── Capture button
│   │   ├── Record button
│   │   ├── Flash toggle
│   │   ├── Camera flip
│   │   ├── Countdown
│   │   └── Auto-capture
│   ├── FilterSelector
│   └── CountdownOverlay
│
├── EditScreen
│   ├── Image display
│   ├── FilterSelector
│   ├── EffectsPanel
│   │   ├── Brightness
│   │   ├── Contrast
│   │   └── Saturation
│   └── SocialSharePanel
│
├── AIGenerateScreen
│   ├── Type selector (Image/Video)
│   ├── Prompt input
│   ├── Generate button
│   └── Result display
│
└── GalleryScreen
    └── Photo grid (FlatList)
```

## Data Flow

### Photo Capture Flow

```
User taps capture
     │
     ▼
Camera.takePictureAsync()
     │
     ▼
SkinToneProcessor.enhanceImage()
     │
     ▼
MediaLibrary.saveToLibraryAsync()
     │
     ▼
Show success + navigate to Edit
```

### Auto-Capture Flow

```
Camera detects faces
     │
     ▼
onFacesDetected callback
     │
     ▼
AutoCaptureDetector.checkFocus(faces)
     │
     ├─ Not in focus → Continue monitoring
     │
     └─ In focus → takePicture()
```

### AI Generation Flow

```
User enters prompt
     │
     ▼
AIService.generateImage(prompt)
     │
     ├─ Check local server
     │  └─ POST /generate/image
     │
     └─ Fallback to cloud API
        └─ HuggingFace API
     │
     ▼
Display generated image
     │
     ▼
Navigate to Edit screen
```

## Key Technologies

### Mobile App Stack

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform and native module provider
  - expo-camera: Camera access
  - expo-media-library: Photo/video storage
  - expo-image-manipulator: Image editing
  - expo-sharing: Native share sheet
- **React Navigation**: Screen navigation
- **TensorFlow.js**: Optional ML capabilities

### Server Stack (Optional)

- **Node.js**: Runtime
- **Express**: Web framework
- **Python**: AI model runtime
  - PyTorch: Deep learning framework
  - Diffusers: Stable Diffusion pipelines
  - Transformers: NLP and vision models

## File Organization

```
src/
├── screens/          # Full-screen views
│   ├── HomeScreen.js
│   ├── CameraScreen.js
│   ├── EditScreen.js
│   ├── AIGenerateScreen.js
│   └── GalleryScreen.js
│
├── components/       # Reusable UI components
│   ├── CameraControls.js
│   ├── CountdownOverlay.js
│   ├── FilterSelector.js
│   ├── EffectsPanel.js
│   └── SocialSharePanel.js
│
├── utils/           # Helper functions and classes
│   ├── SkinToneProcessor.js
│   └── AutoCaptureDetector.js
│
├── services/        # External API integrations
│   └── AIService.js
│
└── constants/       # App-wide constants
    └── index.js
```

## State Management

Currently uses **React Hooks** (useState, useEffect, useRef) for local state.

For larger apps, consider:
- Redux/Redux Toolkit
- MobX
- Zustand
- React Context for global state

## Performance Considerations

### Image Processing
- Use native modules when possible (expo-image-manipulator)
- Offload heavy processing to worker threads
- Implement progressive loading for large images
- Cache processed images

### Camera
- Use lower preview resolution for real-time filters
- Debounce face detection callbacks
- Optimize filter rendering with memoization

### AI Features
- Queue requests to prevent memory issues
- Use lower resolution for faster generation
- Implement request cancellation
- Show progress indicators

## Security & Privacy

### Data Flow
- All images stay on device by default
- AI server only processes data when explicitly requested
- No automatic cloud uploads
- Clear user consent for all operations

### Permissions
- Camera: Required for photo/video capture
- Media Library: Required to save and load media
- Microphone: Required for video recording

## Extending the App

### Adding a New Filter

1. Add to `src/constants/index.js`:
```javascript
export const FILTERS = {
  // ...
  MY_FILTER: 'my_filter',
};
```

2. Update `FilterSelector.js` with new filter button

3. Implement filter logic in `EditScreen.js`

### Adding a New Screen

1. Create `src/screens/MyScreen.js`
2. Add route to `App.js`:
```javascript
<Stack.Screen name="MyScreen" component={MyScreen} />
```
3. Navigate from any screen:
```javascript
navigation.navigate('MyScreen', { params });
```

### Adding AI Features

1. Add endpoint to `server/server.js`
2. Add method to `src/services/AIService.js`
3. Call from UI component

## Testing Strategy

### Unit Tests
- Utils: SkinToneProcessor, AutoCaptureDetector
- Services: AIService API calls

### Integration Tests
- Navigation flow
- Camera permissions
- Image save/load

### E2E Tests (Detox)
- Complete photo capture flow
- Filter application
- Social sharing

## Deployment

### Mobile App
1. Configure app.json (bundleIdentifier, package)
2. Build with EAS: `eas build`
3. Submit to stores: `eas submit`

### AI Server
1. Deploy to cloud (AWS, GCP, Azure)
2. Set up model storage (S3, GCS)
3. Configure environment variables
4. Set up HTTPS and authentication

---

For more details, see [DOCUMENTATION.md](DOCUMENTATION.md)
