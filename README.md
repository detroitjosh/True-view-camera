# TrueView Camera - Inclusive Camera App

<div align="center">

📷 **An inclusive mobile camera app optimized for darker skin tones with AI-powered features**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](DOCUMENTATION.md) • [Contributing](CONTRIBUTING.md)

</div>

---

## 🌟 Overview

TrueView Camera is a comprehensive mobile camera application designed with inclusivity at its core. Building on Google's Real Tone research, it provides superior image quality for darker skin tones while offering advanced AI features, extensive filter options, and seamless social sharing.

## ✨ Features

### 🎨 **Skin-Tone Optimized Imaging**
- **Adaptive Exposure**: Automatically adjusts exposure based on detected skin tones (+0.3 to +0.5 EV for darker skin)
- **Enhanced Dynamic Range**: HDR-style capture preserves details in highlights and shadows
- **Color Accuracy**: Natural skin tone representation across all complexions
- **Local Tone Mapping**: Preserves texture while enhancing contrast

### 📸 **Smart Camera**
- **Auto-Capture**: Automatically takes photos when subject is in focus
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
```bash
# Install Expo CLI globally
npm install -g expo-cli

# Or use npx (no global install needed)
npx expo-cli --version
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/detroitjosh/True-view-camera.git
   cd True-view-camera
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment** (optional)
   ```bash
   cp .env.example .env
   # Edit .env with your API keys if using AI features
   ```

4. **Start the app**
   ```bash
   npm start
   ```

5. **Open on your device**
   - Install **Expo Go** from App Store (iOS) or Play Store (Android)
   - Scan the QR code with your camera (iOS) or Expo Go app (Android)
   - Or press `i` for iOS simulator / `a` for Android emulator

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
- React Native
- Expo (Camera, Media Library, Image Manipulator)
- React Navigation
- TensorFlow.js (for ML features)

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
- **[Roadmap](ROADMAP.md)** - Development roadmap and future plans
- **[Server Setup](server/README.md)** - AI server configuration
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
- **[Privacy Policy](PRIVACY.md)** - Privacy best practices
- **[Inclusivity Guidelines](INCLUSIVITY.md)** - Inclusivity standards
- **[Support](SUPPORT.md)** - Getting help

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
- **Support Guide**: [SUPPORT.md](SUPPORT.md)

## 🗺️ Roadmap

See **[ROADMAP.md](ROADMAP.md)** for detailed development plans.

**Current Status (v1.0 - Complete)**
- [x] Core camera functionality
- [x] Skin tone optimization
- [x] Auto-capture feature
- [x] Filter library
- [x] Social sharing
- [x] AI generation framework

**Next Up (v1.1 - In Progress)**
- [ ] Enhanced CI/CD with comprehensive testing
- [ ] Fairness testing framework
- [ ] Dataset annotation workflows
- [ ] Privacy & inclusivity best practices documentation
- [ ] Community feedback integration

**Future Plans (v1.2+)**
- [ ] Advanced ML-based skin detection with TFLite
- [ ] Video editing features
- [ ] AR effects
- [ ] Multi-language support (i18n)
- [ ] Advanced HDR processing

---

<div align="center">

**Made with ❤️ for inclusive representation**

⭐ Star this repo if you find it useful!

</div>
