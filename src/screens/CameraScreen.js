import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { SkinToneProcessor } from '../utils/SkinToneProcessor';
import { AutoCaptureDetector } from '../utils/AutoCaptureDetector';
import CameraControls from '../components/CameraControls';
import CountdownOverlay from '../components/CountdownOverlay';

const { width, height } = Dimensions.get('window');

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [isRecording, setIsRecording] = useState(false);
  const [autoCaptureEnabled, setAutoCaptureEnabled] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [exposureCompensation, setExposureCompensation] = useState(0.5);
  const [currentFilter, setCurrentFilter] = useState('none');
  
  const cameraRef = useRef(null);
  const skinToneProcessor = useRef(new SkinToneProcessor());
  const autoCaptureDetector = useRef(new AutoCaptureDetector());

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(cameraStatus === 'granted' && mediaStatus === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          exif: true,
          skipProcessing: false,
        });
        
        // Apply skin-tone enhancement
        const enhancedPhoto = await skinToneProcessor.current.enhanceImage(photo.uri);
        
        // Save to library
        await MediaLibrary.saveToLibraryAsync(enhancedPhoto || photo.uri);
        
        Alert.alert('Success', 'Photo saved to gallery!', [
          { text: 'OK' },
          { text: 'Edit', onPress: () => navigation.navigate('Edit', { imageUri: enhancedPhoto || photo.uri }) }
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
        const video = await cameraRef.current.recordAsync({
          quality: Camera.Constants.VideoQuality['720p'],
          maxDuration: 60,
        });
        
        await MediaLibrary.saveToLibraryAsync(video.uri);
        Alert.alert('Success', 'Video saved to gallery!');
      } catch (error) {
        console.error('Error recording video:', error);
        Alert.alert('Error', 'Failed to record video');
      } finally {
        setIsRecording(false);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
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

  const onFacesDetected = ({ faces }) => {
    if (autoCaptureEnabled && faces.length > 0) {
      const isInFocus = autoCaptureDetector.current.checkFocus(faces);
      if (isInFocus) {
        takePicture();
        setAutoCaptureEnabled(false); // Take only one picture
      }
    }
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

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={cameraType}
        flashMode={flash}
        ratio="16:9"
        onFacesDetected={autoCaptureEnabled ? onFacesDetected : undefined}
        faceDetectorSettings={{
          mode: Camera.Constants.FaceDetectorMode.accurate,
          detectLandmarks: Camera.Constants.FaceDetectorLandmarks.all,
          runClassifications: Camera.Constants.FaceDetectorClassifications.all,
        }}
      >
        {countdown !== null && <CountdownOverlay count={countdown} />}
        
        <CameraControls
          onCapture={takePicture}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          isRecording={isRecording}
          onFlipCamera={() => setCameraType(
            cameraType === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          )}
          onToggleFlash={() => setFlash(
            flash === Camera.Constants.FlashMode.off
              ? Camera.Constants.FlashMode.on
              : Camera.Constants.FlashMode.off
          )}
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
});
