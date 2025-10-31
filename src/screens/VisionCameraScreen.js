import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { runOnJS } from 'react-native-reanimated';
import * as MediaLibrary from 'expo-media-library';
import { SkinToneProcessor } from '../utils/SkinToneProcessor';
import CameraControls from '../components/CameraControls';
import CountdownOverlay from '../components/CountdownOverlay';

const { width, height } = Dimensions.get('window');

export default function VisionCameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState('back');
  const [flash, setFlash] = useState('off');
  const [isRecording, setIsRecording] = useState(false);
  const [autoCaptureEnabled, setAutoCaptureEnabled] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('none');
  const [detectionResult, setDetectionResult] = useState(null);
  
  const cameraRef = useRef(null);
  const devices = useCameraDevices();
  const device = cameraType === 'back' ? devices.back : devices.front;
  const skinToneProcessor = useRef(new SkinToneProcessor());

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      const microphonePermission = await Camera.requestMicrophonePermission();
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
      
      setHasPermission(
        cameraPermission === 'granted' && 
        microphonePermission === 'granted' && 
        mediaStatus === 'granted'
      );
    })();
  }, []);

  // Frame processor for real-time face detection
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    
    if (autoCaptureEnabled) {
      // Call native TFLite frame processor
      // const result = detectFaces(frame);
      
      // For now, simulate detection with a placeholder
      const mockResult = {
        faces: [],
        width: frame.width,
        height: frame.height,
        detectionTime: 0
      };
      
      // Update state on JS thread
      runOnJS(handleDetectionResult)(mockResult);
    }
  }, [autoCaptureEnabled]);

  const handleDetectionResult = (result) => {
    setDetectionResult(result);
    
    // Auto-capture logic
    if (autoCaptureEnabled && result.faces && result.faces.length > 0) {
      // Check if face detection confidence is high enough
      const highConfidenceFaces = result.faces.filter(face => face.confidence > 0.85);
      
      if (highConfidenceFaces.length > 0) {
        // Trigger capture
        takePicture();
        setAutoCaptureEnabled(false); // Disable after capture
      }
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto({
          qualityPrioritization: 'quality',
          flash: flash,
          enableAutoStabilization: true,
        });
        
        // Apply skin-tone enhancement
        const enhancedPhoto = await skinToneProcessor.current.enhanceImage(`file://${photo.path}`);
        
        // Save to library
        await MediaLibrary.saveToLibraryAsync(enhancedPhoto || `file://${photo.path}`);
        
        Alert.alert('Success', 'Photo saved to gallery!', [
          { text: 'OK' },
          { text: 'Edit', onPress: () => navigation.navigate('Edit', { imageUri: enhancedPhoto || `file://${photo.path}` }) }
        ]);
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const startRecording = async () => {
    if (cameraRef.current && !isRecording) {
      try {
        setIsRecording(true);
        const video = await cameraRef.current.startRecording({
          flash: flash,
          onRecordingFinished: async (video) => {
            await MediaLibrary.saveToLibraryAsync(`file://${video.path}`);
            Alert.alert('Success', 'Video saved to gallery!');
            setIsRecording(false);
          },
          onRecordingError: (error) => {
            console.error('Error recording video:', error);
            Alert.alert('Error', 'Failed to record video');
            setIsRecording(false);
          },
        });
      } catch (error) {
        console.error('Error starting recording:', error);
        Alert.alert('Error', 'Failed to start recording');
        setIsRecording(false);
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      await cameraRef.current.stopRecording();
    }
  };

  const startCountdown = () => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          takePicture();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const toggleAutoCapture = () => {
    setAutoCaptureEnabled(!autoCaptureEnabled);
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text style={styles.text}>Requesting permissions...</Text></View>;
  }
  
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission denied</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (device == null) {
    return <View style={styles.container}><Text style={styles.text}>Loading camera...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
        video={true}
        audio={true}
        frameProcessor={frameProcessor}
      >
        {countdown !== null && <CountdownOverlay count={countdown} />}
        
        {detectionResult && autoCaptureEnabled && (
          <View style={styles.detectionOverlay}>
            <Text style={styles.detectionText}>
              Faces detected: {detectionResult.faces?.length || 0}
            </Text>
          </View>
        )}
        
        <CameraControls
          onCapture={takePicture}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          isRecording={isRecording}
          onFlipCamera={() => setCameraType(cameraType === 'back' ? 'front' : 'back')}
          onToggleFlash={() => setFlash(flash === 'off' ? 'on' : 'off')}
          onCountdown={startCountdown}
          onToggleAutoCapture={toggleAutoCapture}
          autoCaptureEnabled={autoCaptureEnabled}
          onClose={() => navigation.goBack()}
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
        />
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#e94560',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detectionOverlay: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 5,
  },
  detectionText: {
    color: '#fff',
    fontSize: 14,
  },
});
