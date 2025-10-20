# Screenshots Guide

This guide explains how to capture effective screenshots for TrueView Camera.

## Why Screenshots Matter

Good screenshots:
- Show app features clearly
- Demonstrate UI/UX quality
- Help users understand functionality
- Increase download conversion

## Required Screenshots

### 1. Home Screen
**Shows**: Main landing page with feature overview
- Take on device with good lighting
- Ensure all buttons are visible
- Show app name and branding

### 2. Camera Interface
**Shows**: Camera view with controls
- Use a real subject (person or object)
- Show all camera controls
- Demonstrate filter preview
- Capture both photo and video modes

### 3. Auto-Capture Demo
**Shows**: Auto-capture feature in action
- Show focus indicator
- Demonstrate countdown timer
- Include visual feedback

### 4. Filter Showcase
**Shows**: Multiple filters on same photo
- Use a portrait photo (preferably darker skin tone)
- Show before/after comparison
- Display filter names

### 5. Edit Screen
**Shows**: Photo editing interface
- Show adjustment sliders
- Display current values
- Include save/share buttons

### 6. AI Generation
**Shows**: AI image/video generation
- Show prompt input
- Display generated result
- Include generation progress

### 7. Gallery View
**Shows**: Photo grid
- Show multiple photos
- Demonstrate organization
- Include navigation elements

### 8. Social Sharing
**Shows**: Share options
- Display all platform icons
- Show share sheet
- Include platform variety

## Screenshot Specifications

### iOS App Store
- Required sizes: 
  - 6.5" (1284 x 2778 px) - iPhone 14 Pro Max
  - 5.5" (1242 x 2208 px) - iPhone 8 Plus
- Format: PNG or JPEG
- Max 10 screenshots per language
- No transparency

### Google Play Store
- Recommended size: 1080 x 1920 px
- Format: PNG or JPEG
- Max 8 screenshots per language
- 24-bit PNG (no alpha)

### GitHub/Website
- 1920 x 1080 px (landscape) for README hero
- 750 x 1334 px (portrait) for feature showcase
- Format: PNG with compression

## Taking Screenshots

### On Physical Device

**iOS:**
1. Open app on iPhone
2. Navigate to desired screen
3. Press Volume Up + Side Button
4. Screenshots saved to Photos

**Android:**
1. Open app on Android device
2. Navigate to desired screen
3. Press Power + Volume Down
4. Screenshots saved to Gallery

### On Simulator/Emulator

**iOS Simulator:**
1. Run app in Xcode simulator
2. Navigate to desired screen
3. Cmd + S to save screenshot
4. Automatically saved to Desktop

**Android Emulator:**
1. Run app in Android Studio emulator
2. Navigate to desired screen
3. Click camera icon in emulator toolbar
4. Screenshots saved to Desktop

### Using Expo

```bash
# Start Expo
npm start

# On device, shake phone
# Tap "Take Screenshot"
# Screenshot saved to Expo servers
# Download from Expo dashboard
```

## Editing Screenshots

### Tools
- **Figma**: Professional mockups
- **Sketch**: macOS design tool
- **Photoshop**: Advanced editing
- **Preview (Mac)**: Basic editing
- **GIMP**: Free alternative

### Best Practices

1. **Consistent Framing**
   - Use device frames for context
   - Maintain consistent margins
   - Align elements properly

2. **Annotations**
   - Add arrows to highlight features
   - Use callout text sparingly
   - Keep text readable

3. **Privacy**
   - Blur personal information
   - Use test/demo accounts
   - Avoid sensitive data

4. **Quality**
   - Use high resolution
   - Avoid compression artifacts
   - Test on different displays

5. **Branding**
   - Include app logo/name
   - Use brand colors
   - Maintain visual consistency

## Screenshot Organization

```
screenshots/
├── ios/
│   ├── 01-home.png
│   ├── 02-camera.png
│   ├── 03-filters.png
│   ├── 04-edit.png
│   └── 05-share.png
├── android/
│   ├── 01-home.png
│   ├── 02-camera.png
│   └── ...
└── marketing/
    ├── hero.png
    ├── feature-showcase.png
    └── comparison.png
```

## Creating App Store Graphics

### App Preview Video (Optional)
- Duration: 15-30 seconds
- Show key features in action
- Add background music
- Include captions
- Export in required format

### Feature Graphic (Android)
- Size: 1024 x 500 px
- Highlight main features
- Use app screenshots
- Add compelling text
- Match brand style

## Automated Screenshots

For future automation:

```javascript
// Using Detox E2E testing
describe('Screenshots', () => {
  it('should capture home screen', async () => {
    await device.takeScreenshot('01-home');
  });
  
  it('should capture camera screen', async () => {
    await element(by.id('camera-button')).tap();
    await device.takeScreenshot('02-camera');
  });
});
```

## Checklist

Before submitting to stores:

- [ ] All required sizes captured
- [ ] Screenshots show real features
- [ ] No placeholder content
- [ ] Privacy compliance (no personal data)
- [ ] Proper naming convention
- [ ] Optimized file sizes
- [ ] Tested on different devices
- [ ] Reviewed by team
- [ ] Compressed for web use
- [ ] Added to repository

## Resources

- [Apple Screenshot Guidelines](https://developer.apple.com/app-store/product-page/)
- [Google Play Asset Guidelines](https://support.google.com/googleplay/android-developer/answer/9866151)
- [Expo Screenshot Tools](https://docs.expo.dev/workflow/publishing/)

---

Great screenshots = More downloads! 📸✨
