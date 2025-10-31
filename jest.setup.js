// Jest setup file

// Mock react-native-vision-camera
jest.mock('react-native-vision-camera', () => ({
  Camera: 'Camera',
  useCameraDevices: jest.fn(() => ({ back: {}, front: {} })),
  useFrameProcessor: jest.fn((fn) => fn),
  requestCameraPermission: jest.fn(() => Promise.resolve('granted')),
  requestMicrophonePermission: jest.fn(() => Promise.resolve('granted')),
}));

// Mock react-native-reanimated
global.__reanimatedWorkletInit = jest.fn();

jest.mock('react-native-reanimated', () => ({
  ...jest.requireActual('react-native-reanimated/mock'),
  runOnJS: jest.fn((fn) => fn),
}));

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

