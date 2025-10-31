# Real-Tone Implementation Guide

## Overview

TrueView Camera implements inclusive imaging features based on **Google's Real-Tone** research and the **Monk Skin Tone Scale (MST)**. These features ensure accurate and beautiful representation of all skin tones, with particular focus on darker complexions.

## Table of Contents

1. [What is Real-Tone?](#what-is-real-tone)
2. [Monk Skin Tone Scale](#monk-skin-tone-scale)
3. [Technical Implementation](#technical-implementation)
4. [Features](#features)
5. [Usage Guide](#usage-guide)
6. [API Reference](#api-reference)
7. [Testing & Validation](#testing-and-validation)
8. [Resources](#resources)

---

## What is Real-Tone?

Real-Tone is a computational photography approach developed by Google to address historical biases in camera technology that favored lighter skin tones. Traditional cameras often:
- Underexposed darker skin tones
- Applied incorrect white balance
- Lost detail in shadows
- Created unnatural color reproduction

Our Real-Tone implementation addresses these issues through:
- **Adaptive exposure compensation** based on detected skin tone
- **Enhanced white balance** tuned for diverse complexions
- **Local tone mapping** to preserve detail in shadows and highlights
- **Color accuracy optimization** for natural skin tone representation

### Key Benefits

✅ **Inclusive**: Works for all 10 shades of the Monk Skin Tone Scale  
✅ **Accurate**: Natural color representation across all complexions  
✅ **Detail-preserving**: Maintains texture in both shadows and highlights  
✅ **Automatic**: Smart detection and adjustment with minimal user input  

---

## Monk Skin Tone Scale

The Monk Skin Tone Scale (MST) is a 10-shade scale developed by Dr. Ellis Monk in partnership with Google AI. It provides a more inclusive and accurate way to represent human skin tones compared to traditional scales.

### The 10-Shade Scale

| MST ID | Name | Exposure Boost | Description |
|--------|------|----------------|-------------|
| MST-1 | Very Light | -0.1 EV | Lightest skin tones |
| MST-2 | Light | 0 EV | Light skin tones |
| MST-3 | Light Medium | +0.1 EV | Light-medium skin tones |
| MST-4 | Medium | +0.2 EV | Medium skin tones |
| MST-5 | Medium Tan | +0.25 EV | Medium-tan skin tones |
| MST-6 | Tan | +0.3 EV | Tan skin tones |
| MST-7 | Deep Tan | +0.35 EV | Deep tan skin tones |
| MST-8 | Dark | +0.4 EV | Dark skin tones |
| MST-9 | Very Dark | +0.5 EV | Very dark skin tones |
| MST-10 | Deepest | +0.6 EV | Deepest skin tones |

### Why MST Matters

- **Representation**: More accurately represents diverse populations
- **Fairness**: Reduces bias in AI and imaging systems
- **Standardization**: Provides a common language for skin tone classification
- **Research**: Enables better testing and validation across skin tones

---

## Technical Implementation

### Architecture

```
Camera Capture
    ↓
Face Detection (expo-camera)
    ↓
Skin Tone Analysis (RealToneProcessor)
    ↓
MST Classification (1-10)
    ↓
Optimized Settings Calculation
    ↓
Image Enhancement
    ↓
Final Output
```

### Core Components

#### 1. RealToneProcessor (`/src/utils/RealToneProcessor.js`)

The main processing engine that:
- Classifies skin tones using the Monk Skin Tone Scale
- Calculates adaptive exposure compensation
- Optimizes white balance for natural colors
- Applies local tone mapping for detail preservation

#### 2. RealTonePanel (`/src/components/RealTonePanel.js`)

UI component displaying:
- Real-Tone enable/disable toggle
- Detected skin tone category
- Monk Skin Tone Scale visualization
- Information about Real-Tone features

#### 3. CameraScreen Integration

Enhanced camera screen with:
- Real-time skin tone detection from face data
- Automatic application of optimized settings
- Visual indicator of Real-Tone status
- Access to Real-Tone settings panel

### Processing Pipeline

#### 1. Skin Tone Detection
```javascript
const skinTone = await realToneProcessor.analyzeSkinTone(imageUri);
// Returns: { detected, mstCategory, confidence, rgbAverage, region }
```

#### 2. Settings Optimization
```javascript
const settings = realToneProcessor.getOptimizedSettings(skinTone);
// Returns camera and processing settings optimized for detected skin tone
```

#### 3. Image Enhancement
```javascript
const enhanced = await realToneProcessor.enhanceImage(imageUri, skinTone);
// Applies optimized processing to captured image
```

---

## Features

### 1. Adaptive Exposure Compensation

Automatically adjusts exposure based on detected skin tone:
- **Lighter tones (MST 1-3)**: Minimal or no boost to prevent overexposure
- **Medium tones (MST 4-6)**: Moderate boost (+0.2 to +0.3 EV)
- **Darker tones (MST 7-10)**: Significant boost (+0.35 to +0.6 EV)

This prevents the common issue of darker skin tones appearing underexposed or muddy.

### 2. Enhanced White Balance

Tuned color temperature to prevent:
- Grey/ashy appearance on darker skin
- Unnatural color casts
- Loss of warmth in skin tones

Warmer temperature applied progressively for darker tones to maintain natural appearance.

### 3. Local Tone Mapping

Advanced shadow and highlight processing:
- **Shadow Lift**: Reveals detail in darker areas without washing out
- **Highlight Protection**: Prevents blown-out highlights
- **Midtone Contrast**: Preserves skin texture and detail

### 4. Real-Time Face Detection

Integrates with expo-camera face detection:
- Detects faces in real-time
- Estimates skin tone from face region
- Displays detected MST category
- Updates settings automatically

### 5. Visual Feedback

User interface elements:
- **Real-Tone Indicator**: Shows when Real-Tone is active
- **MST Badge**: Displays detected skin tone category
- **Settings Panel**: Full information and controls
- **Scale Visualization**: Interactive Monk Skin Tone Scale display

---

## Usage Guide

### For Users

#### Enabling Real-Tone

1. Open the Camera screen
2. Look for the ✨ sparkle icon in the top controls
3. Tap to toggle Real-Tone on/off (green = active)
4. When active, a "Real-Tone Active" badge appears

#### Viewing Detected Skin Tone

1. With Real-Tone enabled, tap the green badge or ✨ icon
2. The Real-Tone panel opens showing:
   - Detected skin tone (MST-1 to MST-10)
   - Color swatch of detected tone
   - Exposure compensation being applied
   - Full Monk Skin Tone Scale for reference

#### Taking Photos with Real-Tone

1. Enable Real-Tone (✨ icon)
2. Frame your subject
3. Face detection automatically analyzes skin tone
4. Optimized settings are applied automatically
5. Capture photo normally
6. Enhanced image is saved to gallery

### For Developers

#### Integrating RealToneProcessor

```javascript
import { RealToneProcessor } from './utils/RealToneProcessor';

// Initialize with optional config
const processor = new RealToneProcessor({
  enabled: true,
  adaptiveExposure: true,
  enhancedWhiteBalance: true,
  localToneMapping: true,
  shadowLift: 0.3,
  highlightProtection: 0.2,
});

// Detect skin tone
const skinTone = await processor.analyzeSkinTone(imageUri);

// Get optimized settings
const settings = processor.getOptimizedSettings(skinTone.mstCategory);

// Apply camera settings
camera.setExposureCompensation(settings.exposure);

// Enhance captured image
const enhanced = await processor.enhanceImage(imageUri, skinTone.mstCategory);
```

#### Using RealTonePanel Component

```jsx
import RealTonePanel from './components/RealTonePanel';

<RealTonePanel
  realToneEnabled={true}
  onToggleRealTone={(enabled) => setRealToneEnabled(enabled)}
  detectedSkinTone={MONK_SKIN_TONE_SCALE.MST_6}
  onSettingsChange={(settings) => updateSettings(settings)}
/>
```

---

## API Reference

### RealToneProcessor

#### Constructor
```javascript
new RealToneProcessor(config?: RealToneConfig)
```

**Config Options:**
- `enabled` (boolean): Enable/disable Real-Tone processing
- `adaptiveExposure` (boolean): Enable adaptive exposure compensation
- `enhancedWhiteBalance` (boolean): Enable enhanced white balance
- `localToneMapping` (boolean): Enable local tone mapping
- `shadowLift` (number): Shadow lift amount (0-1)
- `highlightProtection` (number): Highlight protection amount (0-1)
- `warmthMultiplier` (number): Color temperature adjustment multiplier
- `contrastEnhancement` (number): Contrast enhancement factor
- `saturationAdjustment` (number): Saturation adjustment factor

#### Methods

##### `detectSkinToneCategory(rgbAverage: RGB): MSTCategory`
Detects the closest Monk Skin Tone Scale category from RGB values.

**Parameters:**
- `rgbAverage`: Object with `r`, `g`, `b` properties (0-255)

**Returns:** MST category object with id, name, rgb, and exposureBoost

##### `calculateExposureCompensation(mstId: number): number`
Calculates exposure compensation for a given MST ID.

**Parameters:**
- `mstId`: Monk Skin Tone Scale ID (1-10)

**Returns:** Exposure compensation in EV

##### `calculateWhiteBalance(mstId: number): WhiteBalance`
Calculates white balance adjustments for a given MST ID.

**Parameters:**
- `mstId`: Monk Skin Tone Scale ID (1-10)

**Returns:** Object with `temperature` and `tint` adjustments

##### `getOptimizedSettings(skinToneData: MSTCategory): CameraSettings`
Gets comprehensive optimized settings for detected skin tone.

**Parameters:**
- `skinToneData`: MST category object

**Returns:** Complete camera and processing settings

##### `async analyzeSkinTone(imageUri: string, region?: Region): Promise<SkinToneData>`
Analyzes an image to detect skin tone.

**Parameters:**
- `imageUri`: URI of image to analyze
- `region`: Optional region to analyze {x, y, width, height}

**Returns:** Detected skin tone data including MST category and confidence

##### `async enhanceImage(imageUri: string, detectedSkinTone?: MSTCategory): Promise<string>`
Applies Real-Tone enhancements to an image.

**Parameters:**
- `imageUri`: URI of image to enhance
- `detectedSkinTone`: Optional pre-detected skin tone

**Returns:** URI of enhanced image

##### `setEnabled(enabled: boolean): void`
Enables or disables Real-Tone processing.

##### `getConfig(): RealToneConfig`
Returns current configuration.

##### `updateConfig(newConfig: Partial<RealToneConfig>): void`
Updates configuration with new values.

### Constants

#### `MONK_SKIN_TONE_SCALE`
Object containing all 10 MST categories:

```javascript
{
  MST_1: { id: 1, name: 'Very Light', rgb: [250, 240, 230], exposureBoost: -0.1 },
  MST_2: { id: 2, name: 'Light', rgb: [245, 230, 215], exposureBoost: 0 },
  // ... MST_3 through MST_9 ...
  MST_10: { id: 10, name: 'Deepest', rgb: [60, 40, 30], exposureBoost: 0.6 }
}
```

---

## Testing and Validation

### Manual Testing

1. **Diverse Subject Testing**
   - Test with subjects across all 10 MST categories
   - Compare with and without Real-Tone enabled
   - Verify natural color representation

2. **Lighting Conditions**
   - Test in various lighting (bright, dim, mixed)
   - Validate exposure compensation effectiveness
   - Check for highlight/shadow detail preservation

3. **Camera Modes**
   - Test with front and back cameras
   - Verify consistency across camera types
   - Test with flash on/off

### Automated Testing

Create test cases for:
```javascript
describe('RealToneProcessor', () => {
  test('detects MST category correctly', () => {
    const processor = new RealToneProcessor();
    const category = processor.detectSkinToneCategory({ r: 120, g: 85, b: 60 });
    expect(category.id).toBe(8); // MST-8 Dark
  });

  test('calculates correct exposure for dark skin', () => {
    const processor = new RealToneProcessor();
    const exposure = processor.calculateExposureCompensation(9);
    expect(exposure).toBe(0.5); // +0.5 EV for MST-9
  });
});
```

### Validation Metrics

- **Color Accuracy**: Measure color difference (ΔE) from reference
- **Exposure Accuracy**: Histogram analysis for proper exposure
- **Detail Preservation**: Texture and sharpness metrics
- **Consistency**: Verify similar results across captures

---

## Resources

### Research and Background

- [Google Real Tone Research](https://store.google.com/intl/en/ideas/real-tone/)
- [Monk Skin Tone Scale @ Google AI](https://skintone.google/)
- [Consensus and Subjectivity in Skin Tone Annotation](https://research.google/blog/consensus-and-subjectivity-of-skin-tone-annotation-for-ml-fairness/)

### Open Source Tools

- [Skin Tone Classifier (Python)](https://github.com/ChenglongMa/SkinToneClassifier)
- [Real-time Skin Tone Detector](https://github.com/SwarupaMasanam19/real-time-skin-tone-detector)

### Related Technologies

- [Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/)
- [Expo Image Manipulator](https://docs.expo.dev/versions/latest/sdk/imagemanipulator/)
- [TensorFlow.js for React Native](https://www.tensorflow.org/js/tutorials/react_native)

### Academic Papers

- Ellis Monk Jr. et al., "The Monk Skin Tone Scale: A New Standard for Diverse Skin Representation"
- Research on computational photography bias and fairness in AI systems

---

## Future Enhancements

### Planned Features

1. **ML-Based Skin Detection**
   - Integrate TensorFlow.js models for accurate skin pixel detection
   - Real-time skin tone analysis using neural networks
   - Confidence scoring for detection quality

2. **Advanced Tone Mapping**
   - Implement custom shaders using expo-gl
   - HDR-style processing for extreme dynamic range
   - Per-region tone mapping for complex lighting

3. **User Calibration**
   - Allow users to fine-tune settings for their specific skin tone
   - Save personal preferences
   - Community-contributed presets

4. **Validation Tools**
   - Built-in color checker integration
   - Before/after comparison view
   - Color accuracy metrics display

5. **Accessibility**
   - Voice feedback for detected skin tone
   - Accessibility labels for all Real-Tone UI
   - High contrast mode for settings

---

## Contributing

We welcome contributions to improve Real-Tone features! Areas of interest:

- ML model integration for skin tone detection
- Advanced image processing algorithms
- UI/UX improvements
- Testing with diverse subjects
- Documentation and examples

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

---

## License

This implementation is based on open research and principles. The Monk Skin Tone Scale is available under an open license from Google AI.

See [LICENSE](../LICENSE) for project license information.

---

**Made with ❤️ for inclusive representation in photography**
