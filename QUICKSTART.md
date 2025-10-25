# Quick Start Guide - TrueView Camera

Get up and running with TrueView Camera in 5 minutes!

## Prerequisites Check

Before you begin, make sure you have:

- [ ] **Node.js** 16 or higher - [Download](https://nodejs.org/)
- [ ] **npm** or **yarn** package manager
- [ ] A smartphone with **Expo Go** app installed ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- [ ] **Git** for version control

Optional (for simulators):
- [ ] **Xcode** (Mac only, for iOS simulator)
- [ ] **Android Studio** (for Android emulator)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/detroitjosh/True-view-camera.git
cd True-view-camera
```

### 2. Install Dependencies

```bash
npm install
```

This will install all necessary packages including:
- React Native
- Expo SDK
- Navigation libraries
- Camera and media library packages
- And more...

**Expected time**: 2-3 minutes

### 3. Configure Environment (Optional)

For basic usage, no configuration is needed. For AI features:

```bash
cp .env.example .env
# Edit .env with your API keys if needed
```

### 4. Start the Development Server

```bash
npm start
```

You should see:
```
› Metro waiting on exp://192.168.x.x:19000
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

### 5. Open on Your Device

**Option A: Using Expo Go (Recommended)**
1. Open **Expo Go** app on your phone
2. Tap **"Scan QR Code"**
3. Point your camera at the QR code in the terminal
4. Wait for the app to load (first load may take 1-2 minutes)

**Option B: Using Simulator**
- Press `i` for iOS simulator (Mac only)
- Press `a` for Android emulator
- Press `w` for web browser

### 6. Grant Permissions

When the app opens, you'll be asked for:
- ✅ **Camera access** - Required for taking photos/videos
- ✅ **Media library access** - Required for saving photos
- ✅ **Microphone access** - Required for video recording

Tap **"Allow"** for all permissions.

## First Steps

### Take Your First Photo

1. Tap **"Open Camera"** on the home screen
2. Point camera at your subject
3. Tap the large **white button** to take a photo
4. Photo is automatically saved to your gallery!

### Try Auto-Capture

1. In camera view, tap the **🎯 target icon**
2. Point camera at a person's face
3. Stay still - app will auto-capture when in focus
4. Perfect for selfies and group photos!

### Use the Countdown Timer

1. In camera view, tap the **⏱️ timer icon**
2. Get ready - you have 3 seconds!
3. Photo taken automatically

### Apply Filters

1. After taking a photo (or tap a photo in gallery)
2. Scroll through filters at the bottom
3. Tap to apply: Vivid, Warm, Cool, B&W, etc.
4. Adjust brightness, contrast, saturation
5. Tap **Save** or **Share**

### Share to Social Media

1. In edit screen, scroll to "Share" section
2. Tap your platform: Instagram, Facebook, etc.
3. Follow platform's sharing flow

## Troubleshooting

### App won't start?
```bash
# Clear cache and restart
expo start -c
```

### Dependencies issues?
```bash
# Remove and reinstall
rm -rf node_modules
npm install
```

### Permission errors?
- Go to phone Settings → TrueView Camera
- Enable Camera and Photos permissions

### Camera not working?
- Make sure you're testing on a physical device
- Camera doesn't work in web browser
- iOS simulator camera is limited

### QR code not scanning?
- Make sure Expo Go is up to date
- Try typing the URL manually in Expo Go
- Check that phone and computer are on same WiFi network

## Optional: AI Server Setup

For AI image/video generation features:

```bash
# In a new terminal
cd server
npm install
npm start
```

Server runs on `http://localhost:3001`

See [server/README.md](server/README.md) for AI model setup.

## Next Steps

- 📖 Read [DOCUMENTATION.md](DOCUMENTATION.md) for full feature guide
- 🎨 Customize filters and effects
- 🤖 Set up AI features (optional)
- 🌟 Star the repo if you find it useful
- 🤝 Contribute improvements (see [CONTRIBUTING.md](CONTRIBUTING.md))

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/detroitjosh/True-view-camera/issues)
- **Discussions**: [GitHub Discussions](https://github.com/detroitjosh/True-view-camera/discussions)

## Quick Commands Reference

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run android` | Open on Android emulator |
| `npm run ios` | Open on iOS simulator |
| `npm run web` | Open in web browser |
| `npm run server` | Start AI server |

---

🎉 **Congratulations!** You're all set to use TrueView Camera!

Enjoy taking beautiful, inclusive photos! 📷✨
