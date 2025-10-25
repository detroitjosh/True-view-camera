# TrueView Camera - Inclusive Camera App

An inclusive mobile camera app optimized for darker skin tones with AI-powered features.

## ✨ Features

### 🎨 Skin-Tone Optimized Capture
- Adaptive exposure compensation for darker skin tones
- Enhanced local tone mapping
- Color-accurate representation based on Real Tone principles
- HDR-style capture for better dynamic range

### 📸 Smart Camera Features
- **Auto-Capture**: Automatically takes photos when subject is in focus
- **Countdown Timer**: Self-timer with visual countdown
- **Real-time Filters**: Live preview with multiple filter options
- **Photo & Video**: Support for both photos and video recording
- **Flash Control**: Toggle flash on/off

### 🤖 AI-Powered Generation
- **Text-to-Image**: Generate images from text descriptions
- **Text-to-Video**: Create short videos from prompts
- **Background Replacement**: AI-powered background editing
- **Image Retouching**: Enhance photos while preserving natural skin tones

### 🎭 Filters & Effects Library
- **Preset Filters**: Vivid, Warm, Cool, B&W, Vintage, Dramatic, Natural
- **Manual Adjustments**: 
  - Brightness control
  - Contrast adjustment
  - Saturation tuning
- **Real-time Preview**: See effects before applying

### 🌐 Easy Social Sharing
Share directly to:
- Instagram
- Facebook
- Twitter
- Snapchat
- TikTok
- WhatsApp
- Messenger
- And more via native share sheet

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Studio (for emulator)
- Physical device with Expo Go app (recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/detroitjosh/True-view-camera.git
cd True-view-camera
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Start the app:
```bash
npm start
```

5. Open in Expo Go:
   - Scan the QR code with your phone's camera (iOS) or Expo Go app (Android)
   - Or press `i` for iOS simulator or `a` for Android emulator

### Optional: AI Server Setup

For AI image and video generation features:

1. Navigate to server directory:
```bash
cd server
npm install
```

2. Start the server:
```bash
npm start
```

See [server/README.md](server/README.md) for detailed AI setup instructions.

## 📱 Usage

### Taking Photos
1. Open the app and tap "Open Camera"
2. Adjust settings (flash, filters)
3. Tap the large white button to capture
4. Use countdown timer (⏱️) for timed shots
5. Enable auto-capture (🎯) for automatic focus-based capture

### Recording Videos
1. In camera mode, tap the red record button
2. Tap again to stop recording
3. Videos are automatically saved to your gallery

### Editing Photos
1. Tap a photo in the gallery or after capture
2. Apply filters from the filter selector
3. Adjust brightness, contrast, and saturation
4. Save or share to social media

### AI Generation
1. Tap "AI Image & Video" from home
2. Choose image or video mode
3. Enter a descriptive prompt
4. Tap "Generate"
5. Edit and share the generated content

## 🏗️ Project Structure

```
True-view-camera/
├── App.js                 # Main app entry point
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── .env.example          # Environment variables template
├── src/
│   ├── screens/          # App screens
│   │   ├── HomeScreen.js
│   │   ├── CameraScreen.js
│   │   ├── EditScreen.js
│   │   ├── AIGenerateScreen.js
│   │   └── GalleryScreen.js
│   ├── components/       # Reusable components
│   │   ├── CameraControls.js
│   │   ├── CountdownOverlay.js
│   │   ├── FilterSelector.js
│   │   ├── EffectsPanel.js
│   │   └── SocialSharePanel.js
│   ├── utils/           # Utility functions
│   │   ├── SkinToneProcessor.js
│   │   └── AutoCaptureDetector.js
│   └── services/        # External services
│       └── AIService.js
├── server/              # Optional AI server
│   ├── server.js
│   ├── package.json
│   └── README.md
└── assets/              # Images and icons
```

## 🔧 Configuration

### Camera Settings (.env)
```env
DEFAULT_EXPOSURE_COMPENSATION=0.5
AUTO_CAPTURE_DELAY=3000
HDR_ENABLED=true
SKIN_TONE_ENHANCEMENT=true
```

### AI Service (.env)
```env
AI_SERVER_URL=http://localhost:3001
HUGGINGFACE_API_KEY=your_key_here
```

## 🎨 Skin Tone Technology

This app implements principles from Google's Real Tone research:

1. **Adaptive Exposure**: Automatically adjusts exposure based on detected skin tones
2. **Local Tone Mapping**: Preserves details in both highlights and shadows
3. **Color Accuracy**: Ensures natural and accurate skin tone representation
4. **Enhanced Dynamic Range**: HDR-style capture for better results

### How It Works
- Uses face detection to identify subjects
- Analyzes skin tone distribution
- Applies adaptive exposure compensation (+0.3 to +0.5 EV for darker tones)
- Enhances local contrast while preserving texture
- Adjusts color temperature for natural warmth

## 🔒 Privacy & Ethics

- **Local Processing**: Heavy AI inference can run entirely on-device
- **Opt-in Features**: AI features are optional and require explicit user action
- **No Data Collection**: No images or prompts are stored or transmitted without permission
- **Transparent Permissions**: Clear explanations for camera and media library access
- **User Control**: Full control over image processing and sharing

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test on both iOS and Android
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Real Tone research for skin tone imaging principles
- Expo team for excellent mobile development framework
- Open source AI community for models and tools
- Contributors and testers who help improve the app

## 📞 Support

- Report bugs: [GitHub Issues](https://github.com/detroitjosh/True-view-camera/issues)
- Feature requests: [GitHub Discussions](https://github.com/detroitjosh/True-view-camera/discussions)

## 🗺️ Roadmap

- [ ] Advanced skin tone detection with ML
- [ ] More filter presets
- [ ] Video editing features
- [ ] Cloud backup option
- [ ] Collaborative editing
- [ ] AR effects
- [ ] Advanced HDR processing
- [ ] Portrait mode with depth effects

---

Made with ❤️ for inclusive representation
