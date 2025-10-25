# User Flow Diagram

Visual guide to using TrueView Camera

## Main User Flows

### Flow 1: Quick Photo Capture
```
[Open App] → [Home Screen]
    ↓
[Tap "Open Camera"]
    ↓
[Camera Screen] ← Grant Permissions
    ↓
[Adjust Settings]
  - Select Filter
  - Toggle Flash
  - Switch Camera
    ↓
[Tap Capture Button]
    ↓
[Photo Captured]
    ↓
[Auto Enhancement Applied]
    ↓
[Saved to Gallery] ✓
    ↓
[Option: Edit or Share]
```

### Flow 2: Auto-Capture Mode
```
[Camera Screen]
    ↓
[Tap Auto-Capture Icon 🎯]
    ↓
[Point at Subject]
    ↓
[Wait for Focus]
  ↓               ↓
[Not Focused] → [Keep Adjusting]
  ↓
[Focused & Stable]
  ↓
[Auto Capture!] ✓
  ↓
[Photo Saved]
```

### Flow 3: Countdown Timer
```
[Camera Screen]
    ↓
[Tap Timer Icon ⏱️]
    ↓
[3... 2... 1...] (Visual Countdown)
    ↓
[Photo Captured] ✓
    ↓
[Saved to Gallery]
```

### Flow 4: Edit & Share
```
[Gallery] or [After Capture]
    ↓
[Tap Photo]
    ↓
[Edit Screen]
    ↓
[Apply Filter]
  - Scroll filters
  - Tap to apply
    ↓
[Adjust Settings]
  - Brightness: +/-
  - Contrast: +/-
  - Saturation: +/-
    ↓
[Choose Action]
  ↓           ↓
[Save] ✓  [Share]
            ↓
      [Select Platform]
       - Instagram
       - Facebook
       - Twitter
       - etc.
            ↓
      [Shared!] ✓
```

### Flow 5: AI Generation
```
[Home Screen]
    ↓
[Tap "AI Image & Video"]
    ↓
[AI Generate Screen]
    ↓
[Select Type]
  - Image
  - Video
    ↓
[Enter Prompt]
  "A beautiful sunset..."
    ↓
[Tap Generate]
    ↓
[Wait for Generation]
  (Progress indicator)
    ↓
[View Result]
    ↓
[Edit & Share] ✓
```

## Screen Navigation Map

```
┌─────────────────────────────────────────────┐
│                                             │
│              HOME SCREEN                    │
│                                             │
│  ┌───────────────┐  ┌──────────────┐      │
│  │ Open Camera   │  │ View Gallery │      │
│  └───────┬───────┘  └──────┬───────┘      │
│          │                  │               │
│  ┌───────▼──────────┐       │               │
│  │ AI Image & Video │       │               │
│  └──────────────────┘       │               │
│                              │               │
└──────────────────────────────┼───────────────┘
                               │
      ┌────────────────────────┼────────────────┐
      │                        │                │
      ▼                        ▼                │
┌─────────────┐         ┌─────────────┐        │
│             │         │             │        │
│   CAMERA    │         │   GALLERY   │        │
│   SCREEN    │◄────────┤   SCREEN    │        │
│             │         │             │        │
│  - Capture  │         │  - Grid     │        │
│  - Record   │         │  - Tap Edit │        │
│  - Filters  │         └──────┬──────┘        │
│  - Timer    │                │               │
│  - Auto     │                │               │
└──────┬──────┘                │               │
       │                       │               │
       │    ┌──────────────────▼───────┐       │
       │    │                          │       │
       └───►│      EDIT SCREEN         │       │
            │                          │       │
            │  - Apply Filters         │       │
            │  - Adjust Settings       │       │
            │  - Share Socially        │       │
            │  - Save                  │       │
            └──────────────────────────┘       │
                                               │
      ┌────────────────────────────────────────┘
      │
      ▼
┌─────────────────┐
│                 │
│  AI GENERATE    │
│    SCREEN       │
│                 │
│  - Text Input   │
│  - Image/Video  │
│  - Generate     │
│  - View Result  │
└─────────┬───────┘
          │
          │ (Generated content)
          │
          ▼
    [Edit Screen]
```

## Feature Access Points

### Camera Controls (In Camera Screen)

```
┌──────────────────────────────────────┐
│  ✕   ⚡   🎯                Top Bar   │
│ Exit Flash Auto                      │
├──────────────────────────────────────┤
│                                      │
│       [Camera View Area]             │
│                                      │
│    [Real-time Filter Preview]        │
│                                      │
├──────────────────────────────────────┤
│ ┌──────────────────────────────────┐ │
│ │ None | Vivid | Warm | Cool | BW  │ │  Filters
│ └──────────────────────────────────┘ │
├──────────────────────────────────────┤
│                                      │
│  🔄          ⚪  🔴          ⏱️     │  Bottom
│ Flip      Photo Video       Timer   │
│                                      │
└──────────────────────────────────────┘
```

### Edit Screen Layout

```
┌──────────────────────────────────────┐
│           [Photo Display]            │
│                                      │
│         [Edited Preview]             │
│                                      │
├──────────────────────────────────────┤
│ Filters:                             │
│ ┌──────────────────────────────────┐ │
│ │ 📷 🌈 🔥 ❄️ ⬛ 📜 ⚡ 🌿       │ │
│ └──────────────────────────────────┘ │
├──────────────────────────────────────┤
│ Adjustments:                         │
│  ☀️ Brightness:  [ - ▓▓▓▓░░ + ]     │
│  🎭 Contrast:    [ - ▓▓▓░░░ + ]     │
│  🌈 Saturation:  [ - ▓▓▓▓░░ + ]     │
├──────────────────────────────────────┤
│ Share:                               │
│ 📷 👍 🐦 👻 🎵 💬 💬 ⋯            │
├──────────────────────────────────────┤
│     [💾 Save]      [✕ Cancel]       │
└──────────────────────────────────────┘
```

## Permission Flow

```
[App Opens]
    ↓
[Request Camera Permission]
    ↓
  ┌─────────┴─────────┐
  │                   │
[Allow]           [Deny]
  │                   │
  ▼                   ▼
[Request Media]   [Show Error]
[Library Perm]    [Go Back]
  │
  ▼
[Request Mic]
[Permission]
  │
  ▼
[All Permissions]
[Granted] ✓
  │
  ▼
[Camera Ready]
```

## Data Flow: Photo Capture

```
User Action
    ↓
[Tap Capture]
    ↓
Camera API
    ↓
[Take Picture]
    ↓
Raw Image Data
    ↓
SkinToneProcessor
    ↓
[Enhance Image]
  - Analyze skin tone
  - Apply compensation
  - Adjust contrast
    ↓
Enhanced Image
    ↓
MediaLibrary API
    ↓
[Save to Gallery]
    ↓
Success Callback
    ↓
[Show Alert]
[Option to Edit]
```

## AI Generation Flow

```
User Input
    ↓
[Enter Prompt]
"A sunset over mountains"
    ↓
AIService
    ↓
Check Server
  ↓         ↓
[Local]  [Cloud]
  ↓         ↓
HTTP      API
POST      Call
  ↓         ↓
[Server]  [HuggingFace]
Process   Process
  ↓         ↓
  └────┬────┘
       ↓
Generated Image/Video
       ↓
[Display Result]
       ↓
[Save or Edit]
```

## Auto-Capture Decision Tree

```
[Face Detected?]
  ↓         ↓
 Yes        No
  ↓         ↓
[Calculate] [Skip]
[Focus Score]
  ↓
[Score > 0.85?]
  ↓         ↓
 Yes        No
  ↓         ↓
[Add to]   [Reset]
[History]  [History]
  ↓
[3 Frames Stable?]
  ↓         ↓
 Yes        No
  ↓         ↓
[CAPTURE!] [Wait]
  ↓
[Reset History]
```

## State Management

```
Component State (useState)
    ↓
Local State
  - UI state
  - Form inputs
  - Temporary data
    ↓
Screen Navigation
    ↓
Route Params
  - Pass data between screens
    ↓
Persistent Storage
  - Camera settings
  - User preferences
  - Saved photos (MediaLibrary)
```

## Error Handling Flow

```
[Action Attempted]
    ↓
  Try...
    ↓
  ┌────┴────┐
  │         │
Success   Error
  │         │
  ▼         ▼
[Continue] [Catch]
           │
           ▼
        [Log Error]
           │
           ▼
        [Show Alert]
           │
           ▼
        [Provide Options]
         - Retry
         - Go Back
         - Cancel
```

---

## Quick Reference: Icon Meanings

| Icon | Meaning | Location |
|------|---------|----------|
| ✕ | Exit/Close | Top left (Camera) |
| ⚡ | Flash Toggle | Top bar (Camera) |
| 🎯 | Auto-Capture | Top bar (Camera) |
| 🔄 | Flip Camera | Bottom left (Camera) |
| ⏱️ | Countdown Timer | Bottom right (Camera) |
| ⚪ | Photo Button | Bottom center (Camera) |
| 🔴 | Video Button | Bottom center (Camera) |
| 📷 | Instagram | Share panel |
| 👍 | Facebook | Share panel |
| 🐦 | Twitter | Share panel |
| 💾 | Save | Edit screen |
| ✕ | Cancel | Edit screen |
| ☀️ | Brightness | Adjustments |
| 🎭 | Contrast | Adjustments |
| 🌈 | Saturation | Adjustments |

---

## Tips for Best Results

### For Best Skin Tone Results
1. Use good, even lighting
2. Allow auto-capture to find optimal focus
3. Try different filters (Warm often works well)
4. Adjust brightness if needed

### For Auto-Capture
1. Stay still after pointing camera
2. Wait for 🎯 icon to activate
3. Ensure face is clearly visible
4. Good lighting helps detection

### For AI Generation
1. Be specific in prompts
2. Include lighting/style details
3. Try example prompts first
4. Be patient (may take 30-60 seconds)

---

*These flows represent the complete user experience of TrueView Camera*
