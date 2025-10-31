# TrueView Camera - Inclusive Camera App

<div align="center">

📷 **An inclusive mobile camera app optimized for darker skin tones with AI-powered features**

[![CI/CD](https://github.com/detroitjosh/True-view-camera/actions/workflows/ci.yml/badge.svg)](https://github.com/detroitjosh/True-view-camera/actions/workflows/ci.yml)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](DOCUMENTATION.md) • [Contributing](CONTRIBUTING.md)

</div>

---

## 🌟 Overview

TrueView Camera is a comprehensive mobile camera application built with **React Native Vision Camera** and **TensorFlow Lite** for fast, low-latency AI-powered face detection and auto-capture. Designed with inclusivity at its core, it provides superior image quality for darker skin tones with face-region adaptive exposure/gamma/contrast adjustment.

## ✨ Features

### 🎨 **Skin-Tone Optimized Imaging**
- **Adaptive Exposure**: Automatically adjusts exposure based on detected skin tones (+0.3 to +0.5 EV for darker skin)
- **Face-Region Processing**: Targeted gamma, contrast, and exposure adjustments for face regions
- **Enhanced Dynamic Range**: HDR-style capture preserves details in highlights and shadows
- **Color Accuracy**: Natural skin tone representation across all complexions
- **Local Tone Mapping**: Preserves texture while enhancing contrast

### 📸 **Smart Camera with TFLite AI**
- **Real-time Face Detection**: Native TensorFlow Lite frame processors for low-latency detection
- **Auto-Capture**: Automatically takes photos when face detection passes confidence threshold (no user action)
- **Fast Frame Processing**: Native implementation ensures minimal latency
- **Countdown Timer**: 3-second visual countdown for perfect selfies
- **Real-time Filters**: Live preview with 8+ filter options
- **Photo & Video**: High-quality photo capture and video recording
- **Dual Camera Support**: Front and back camera with smooth switching

### 🤖 **AI-Powered Creation**
- **Text-to-Image Generation**: Create images from text descriptions using Stable Diffusion
- **Text-to-Video Generation**: Generate short videos from prompts
- **Background Replacement**: AI-powered background editing
- **Smart Retouching**: Enhance photos while preserving natural features

### 🎭 **Filters & Effects**
**Preset Filters:**
- Original, Vivid, Warm, Cool
- Black & White, Vintage, Dramatic, Natural

**Manual Adjustments:**
- Brightness (0-200%)
- Contrast (0-200%)
- Saturation (0-200%)

### 🌐 **Easy Social Sharing**
One-tap sharing to:
- Instagram • Facebook • Twitter
- Snapchat • TikTok • WhatsApp
- Messenger • and more

## 🚀 Quick Start

### Prerequisites

This app uses **React Native Vision Camera** with native TensorFlow Lite integration, requiring native code compilation.

```bash
# Required tools
- Node.js 16+ and npm
- Xcode 14+ (for iOS)
- Android Studio (for Android)
- CocoaPods (for iOS dependencies)

# Install React Native CLI
npm install -g react-native-cli

# Install CocoaPods (macOS only)
sudo gem install cocoapods
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/detroitjosh/True-view-camera.git
   cd True-view-camera
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Generate native directories (if not present)**
   ```bash
   npx expo prebuild
   ```

4. **Install iOS dependencies (macOS only)**
   ```bash
   cd ios
   pod install
   cd ..
   ```

5. **Configure environment** (optional)
   ```bash
   cp .env.example .env
   # Edit .env with your API keys if using AI features
   ```

### Running the App

#### iOS

```bash
# Run on iOS simulator
npm run ios

# Or using Xcode:
# 1. Open ios/TrueViewCamera.xcworkspace in Xcode
# 2. Select a simulator or device
# 3. Press Run (Cmd + R)
```

#### Android

```bash
# Start Metro bundler
npm start

# In another terminal, run Android
npm run android

# Or using Android Studio:
# 1. Open the android folder in Android Studio
# 2. Wait for Gradle sync to complete
# 3. Select a device or emulator
# 4. Press Run
```

### Development Build

For development with native modules:

```bash
# Install Expo development client
npx expo install expo-dev-client

# Create development build
npx expo run:ios    # for iOS
npx expo run:android # for Android
```

### Optional: AI Server Setup

For AI image and video generation:

```bash
cd server
npm install
npm start
```

See [server/README.md](server/README.md) for detailed setup.

## 📱 Usage

### Taking Photos
1. Tap **"Open Camera"** from home screen
2. Use camera controls:
   - **Large white button**: Take photo
   - **Red button**: Record video
   - **⚡**: Toggle flash
   - **🔄**: Switch camera (front/back)
   - **⏱️**: Start countdown timer
   - **🎯**: Enable auto-capture mode
3. Select filter from bottom carousel
4. Photo saved automatically to gallery

### Auto-Capture Mode
1. Enable auto-capture (🎯 icon turns red)
2. Point camera at subject
3. App automatically captures when subject is in focus and stable
4. Perfect for group photos and action shots

### Editing Photos
1. Tap photo from gallery or after capture
2. Choose from 8+ preset filters
3. Adjust brightness, contrast, saturation with +/- controls
4. Tap **Save** or share directly to social media

### AI Generation
1. Tap **"AI Image & Video"** from home
2. Select Image or Video mode
3. Enter descriptive prompt (e.g., "A sunset over mountains")
4. Tap **Generate** and wait
5. Edit and share generated content

**Note**: AI features require server setup or API keys. See [DOCUMENTATION.md](DOCUMENTATION.md).

## 🏗️ Project Structure

```
True-view-camera/
├── src/
│   ├── screens/           # App screens
│   │   ├── HomeScreen.js          # Main landing page
│   │   ├── CameraScreen.js        # Camera interface
│   │   ├── EditScreen.js          # Photo editor
│   │   ├── AIGenerateScreen.js    # AI generation
│   │   └── GalleryScreen.js       # Photo gallery
│   ├── components/        # UI components
│   │   ├── CameraControls.js      # Camera buttons
│   │   ├── CountdownOverlay.js    # Timer display
│   │   ├── FilterSelector.js      # Filter carousel
│   │   ├── EffectsPanel.js        # Adjustment controls
│   │   └── SocialSharePanel.js    # Share buttons
│   ├── utils/            # Utilities
│   │   ├── SkinToneProcessor.js   # Skin tone enhancement
│   │   └── AutoCaptureDetector.js # Focus detection
│   └── services/         # External services
│       └── AIService.js           # AI API integration
├── server/               # Optional AI server
│   ├── server.js         # Express server
│   └── README.md         # Server documentation
├── App.js               # Main app entry
├── app.json             # Expo configuration
└── package.json         # Dependencies
```

## 🎨 Technology Stack

**Mobile App:**
- React Native (bare workflow with Expo modules)
- React Native Vision Camera (camera pipeline & frame processing)
- TensorFlow Lite (native face detection)
- React Navigation
- Expo modules (Media Library, File System, Image Manipulator)

**Native Frame Processors:**
- iOS: Swift + TensorFlow Lite Swift
- Android: Java + TensorFlow Lite Android

**AI Server (Optional):**
- Node.js + Express
- Python (for AI models)
- Stable Diffusion
- HuggingFace Transformers

## 🔧 Configuration

### Camera Settings
Edit `.env` to customize:
```env
DEFAULT_EXPOSURE_COMPENSATION=0.5    # Exposure boost for darker skin
AUTO_CAPTURE_DELAY=3000              # Auto-capture delay in ms
HDR_ENABLED=true                     # Enable HDR mode
SKIN_TONE_ENHANCEMENT=true           # Apply skin tone processing
```

### AI Services
```env
AI_SERVER_URL=http://localhost:3001
HUGGINGFACE_API_KEY=your_key_here
STABLE_DIFFUSION_API_KEY=your_key_here
```

## 📚 Documentation

- **[Full Documentation](DOCUMENTATION.md)** - Comprehensive guide
- **[Server Setup](server/README.md)** - AI server configuration
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Ways to Contribute
- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- 🎨 Design improvements
- 💻 Code contributions
- 🧪 Testing and feedback

## 🔒 Privacy & Ethics

- **Local-First**: Heavy processing can run entirely on-device
- **No Data Collection**: No images or data transmitted without permission
- **Transparent Permissions**: Clear explanations for all permissions
- **User Control**: Full control over image processing and sharing
- **Ethical AI**: Responsible use of AI technology

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Real Tone** - Research on inclusive imaging
- **Expo Team** - Excellent mobile development framework
- **Open Source AI Community** - Models and tools
- **Contributors** - Everyone who helps improve this project

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/detroitjosh/True-view-camera/issues)
- **Discussions**: [GitHub Discussions](https://github.com/detroitjosh/True-view-camera/discussions)

## 🗺️ Roadmap

- [x] Core camera functionality
- [x] Skin tone optimization
- [x] Auto-capture feature
- [x] Filter library
- [x] Social sharing
- [x] AI generation framework
- [ ] Advanced ML-based skin detection
- [ ] Video editing features
- [ ] Cloud backup option
- [ ] AR effects
- [ ] Advanced HDR processing
- [ ] Multi-language support

---

<div align="center">

**Made with ❤️ for inclusive representation**

⭐ Star this repo if you find it useful!

</div>
