# Installation Guide - TrueView Camera

This guide provides detailed installation and setup instructions for TrueView Camera, including native dependencies and TensorFlow Lite integration.

## Table of Contents

- [Prerequisites](#prerequisites)
- [System Requirements](#system-requirements)
- [Installation Steps](#installation-steps)
- [Native Setup](#native-setup)
- [TensorFlow Lite Models](#tensorflow-lite-models)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Tools

#### macOS (for iOS development)
- **macOS** 12.0 (Monterey) or later
- **Xcode** 14.0 or later
- **Command Line Tools**: `xcode-select --install`
- **CocoaPods**: `sudo gem install cocoapods`
- **Homebrew** (optional but recommended)

#### Windows/Linux (for Android development)
- **Node.js** 16.x or later
- **npm** or **yarn**
- **Java Development Kit (JDK)** 17
- **Android Studio** Arctic Fox or later
- **Android SDK** with API 33+

#### All Platforms
- **Git**
- **Node.js** 16.x or later
- **npm** or **yarn**
- **Watchman** (recommended): `brew install watchman` (macOS)

---

## System Requirements

### Minimum Requirements
- **Node.js**: 16.x
- **React Native**: 0.72.x
- **iOS**: 13.0+
- **Android**: API 24 (Android 7.0)+

### Recommended
- **Node.js**: 18.x LTS
- **RAM**: 8GB+ (16GB for iOS simulator)
- **Storage**: 10GB+ free space
- **iOS**: 14.0+
- **Android**: API 28 (Android 9.0)+

---

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/detroitjosh/True-view-camera.git
cd True-view-camera
```

### 2. Install Node Dependencies

```bash
# Using npm
npm install --legacy-peer-deps

# Or using yarn
yarn install
```

> **Note**: The `--legacy-peer-deps` flag is required due to some peer dependency conflicts in the current package ecosystem.

### 3. Generate Native Directories

If the `ios/` and `android/` directories don't exist, generate them:

```bash
npx expo prebuild
```

This will:
- Create iOS Xcode project
- Create Android Gradle project
- Configure permissions and plugins
- Link native modules

---

## Native Setup

### iOS Setup (macOS only)

#### 1. Install CocoaPods Dependencies

```bash
cd ios
pod install
cd ..
```

If you encounter errors, try:

```bash
cd ios
pod deintegrate
pod install
cd ..
```

#### 2. Configure Xcode Project

1. Open `ios/TrueViewCamera.xcworkspace` in Xcode (NOT .xcodeproj)
2. Select a development team in Signing & Capabilities
3. Change bundle identifier if needed
4. Select a target device or simulator

#### 3. Add Frame Processor Files to Xcode

1. In Xcode, right-click on `TrueViewCamera` folder
2. Select "Add Files to TrueViewCamera..."
3. Navigate to `ios/FrameProcessorPlugins/`
4. Select both `.swift` and `.m` files
5. Check "Copy items if needed"
6. Check your target
7. Click "Add"

#### 4. Enable Swift Bridging (if needed)

If prompted to create a bridging header, click "Create Bridging Header".

Verify `TrueViewCamera-Bridging-Header.h` exists in the project.

#### 5. Build and Run

```bash
# Run on simulator
npm run ios

# Or in Xcode
# Press Cmd + R
```

### Android Setup

#### 1. Install Android SDK Components

Open Android Studio and install:
- Android SDK Platform 33
- Android SDK Build-Tools 33.0.0
- Android Emulator
- Android SDK Platform-Tools

#### 2. Configure Environment Variables

Add to `~/.bashrc`, `~/.zshrc`, or equivalent:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Apply changes:
```bash
source ~/.bashrc  # or ~/.zshrc
```

#### 3. Accept Android Licenses

```bash
cd android
./gradlew --version
yes | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --licenses
cd ..
```

#### 4. Build and Run

```bash
# Start Metro bundler in one terminal
npm start

# In another terminal, run Android
npm run android

# Or build manually
cd android
./gradlew assembleDebug
cd ..
```

---

## TensorFlow Lite Models

### Download Face Detection Model

TrueView Camera uses TensorFlow Lite for fast, on-device face detection. You need to download a TFLite model.

#### Recommended: BlazeFace

```bash
cd assets/models

# Download BlazeFace (recommended for auto-capture)
curl -L https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite -o blaze_face.tflite

cd ../..
```

#### Alternative Models

See `assets/models/README.md` for more model options including:
- MobileNet SSD Face Detection
- MediaPipe Face Detection
- COCO SSD for person detection

### Integrate Model with Native Code

#### iOS (Swift)

Edit `ios/FrameProcessorPlugins/FaceDetectionFrameProcessorPlugin.swift`:

```swift
import TensorFlowLite

let modelPath = Bundle.main.path(forResource: "blaze_face", ofType: "tflite")!
let interpreter = try Interpreter(modelPath: modelPath)
```

#### Android (Java)

Edit `android/app/src/main/java/com/trueviewcamera/frameprocessor/FaceDetectionFrameProcessorPlugin.java`:

```java
import org.tensorflow.lite.Interpreter;

AssetFileDescriptor fileDescriptor = context.getAssets().openFd("blaze_face.tflite");
ByteBuffer model = loadModelFile(fileDescriptor);
Interpreter interpreter = new Interpreter(model);
```

---

## Troubleshooting

### Common Issues

#### 1. "Command not found: pod"

**Solution**:
```bash
sudo gem install cocoapods
```

#### 2. "Unable to resolve module"

**Solution**:
```bash
# Clear caches
npm start -- --reset-cache

# Or
rm -rf node_modules
npm install --legacy-peer-deps
```

#### 3. "Build failed with exception" (Android)

**Solution**:
```bash
cd android
./gradlew clean
cd ..
npm run android
```

#### 4. "No matching version found for expo-gl-cpp"

**Solution**: Already fixed in `package.json`. Use `npm install --legacy-peer-deps`.

#### 5. "React Native Camera Permissions Denied"

**Solution**: Uninstall and reinstall the app. Permissions are set at install time.

#### 6. iOS Build Error: "Cycle in dependencies"

**Solution**:
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

#### 7. Metro Bundler Issues

**Solution**:
```bash
# Kill Metro
pkill -f metro

# Restart
npm start -- --reset-cache
```

### Getting Help

- **Documentation**: [DOCUMENTATION.md](DOCUMENTATION.md)
- **GitHub Issues**: [Report a bug](https://github.com/detroitjosh/True-view-camera/issues)
- **Discussions**: [GitHub Discussions](https://github.com/detroitjosh/True-view-camera/discussions)

---

## Next Steps

After successful installation:

1. **Run the App**: `npm run ios` or `npm run android`
2. **Test Camera**: Open camera and verify permissions
3. **Test Auto-Capture**: Enable auto-capture and point at a face
4. **Review Documentation**: See [README.md](README.md) for usage guide
5. **Contribute**: See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## Development Build

For development with hot reload:

```bash
# Install Expo development client
npx expo install expo-dev-client

# Run development build
npx expo run:ios --configuration Debug
# or
npx expo run:android --variant debug
```

---

## Production Build

### iOS

```bash
# Archive for App Store
cd ios
xcodebuild -workspace TrueViewCamera.xcworkspace \
  -scheme TrueViewCamera \
  -configuration Release \
  -archivePath build/TrueViewCamera.xcarchive \
  archive
```

### Android

```bash
# Build release APK
cd android
./gradlew assembleRelease

# APK location: android/app/build/outputs/apk/release/app-release.apk
```

For signed APKs, see [React Native documentation](https://reactnative.dev/docs/signed-apk-android).

---

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.
