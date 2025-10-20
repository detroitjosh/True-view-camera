/**
 * App Constants
 */

// Camera Settings
export const CAMERA_SETTINGS = {
  DEFAULT_EXPOSURE_COMPENSATION: 0.5,
  AUTO_CAPTURE_DELAY: 3000,
  HDR_ENABLED: true,
  SKIN_TONE_ENHANCEMENT: true,
  FOCUS_THRESHOLD: 0.85,
  STABILITY_FRAMES: 3,
};

// Filter Presets
export const FILTERS = {
  NONE: 'none',
  VIVID: 'vivid',
  WARM: 'warm',
  COOL: 'cool',
  BW: 'bw',
  VINTAGE: 'vintage',
  DRAMATIC: 'dramatic',
  NATURAL: 'natural',
};

// Skin Tone Processing
export const SKIN_TONE_CONFIG = {
  VERY_DARK: { min: 0, max: 100, exposureBoost: 0.5 },
  DARK: { min: 100, max: 150, exposureBoost: 0.3 },
  MEDIUM: { min: 150, max: 200, exposureBoost: 0.1 },
  LIGHT: { min: 200, max: 255, exposureBoost: 0 },
};

// Social Media Platforms
export const SOCIAL_PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: '📷' },
  { id: 'facebook', name: 'Facebook', icon: '👍' },
  { id: 'twitter', name: 'Twitter', icon: '🐦' },
  { id: 'snapchat', name: 'Snapchat', icon: '👻' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬' },
  { id: 'messenger', name: 'Messenger', icon: '💬' },
];

// Colors
export const COLORS = {
  PRIMARY: '#e94560',
  SECONDARY: '#0f3460',
  BACKGROUND: '#1a1a2e',
  DARK: '#16213e',
  TEXT: '#fff',
  TEXT_SECONDARY: '#b8b8d1',
  BORDER: 'rgba(255, 255, 255, 0.1)',
  OVERLAY: 'rgba(0, 0, 0, 0.5)',
};

// API Endpoints
export const API_ENDPOINTS = {
  HEALTH: '/health',
  GENERATE_IMAGE: '/generate/image',
  GENERATE_VIDEO: '/generate/video',
  REPLACE_BACKGROUND: '/edit/background',
  RETOUCH: '/edit/retouch',
};

// App Info
export const APP_INFO = {
  NAME: 'TrueView Camera',
  VERSION: '1.0.0',
  DESCRIPTION: 'Inclusive camera app for darker skin tones',
  GITHUB: 'https://github.com/detroitjosh/True-view-camera',
};
