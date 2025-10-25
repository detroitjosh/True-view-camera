import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Share } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import FilterSelector from '../components/FilterSelector';
import EffectsPanel from '../components/EffectsPanel';
import SocialSharePanel from '../components/SocialSharePanel';

export default function EditScreen({ route, navigation }) {
  const { imageUri } = route.params;
  const [editedImage, setEditedImage] = useState(imageUri);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);

  const applyFilter = async (filterName) => {
    setSelectedFilter(filterName);
    try {
      let actions = [];
      
      // Apply different filters
      switch (filterName) {
        case 'vivid':
          actions = [{ resize: { width: 1080 } }];
          break;
        case 'warm':
          actions = [{ resize: { width: 1080 } }];
          break;
        case 'cool':
          actions = [{ resize: { width: 1080 } }];
          break;
        case 'bw':
          actions = [{ resize: { width: 1080 } }];
          break;
        default:
          actions = [];
      }

      if (actions.length > 0) {
        const result = await manipulateAsync(imageUri, actions, {
          compress: 0.9,
          format: SaveFormat.JPEG,
        });
        setEditedImage(result.uri);
      } else {
        setEditedImage(imageUri);
      }
    } catch (error) {
      console.error('Error applying filter:', error);
      Alert.alert('Error', 'Failed to apply filter');
    }
  };

  const saveImage = async () => {
    try {
      await MediaLibrary.saveToLibraryAsync(editedImage);
      Alert.alert('Success', 'Image saved to gallery!');
    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert('Error', 'Failed to save image');
    }
  };

  const shareImage = async (platform) => {
    try {
      // For now, use native share
      await Share.share({
        url: editedImage,
        message: 'Shared from TrueView Camera',
      });
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share image');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: editedImage }} style={styles.image} resizeMode="contain" />
        </View>

        <FilterSelector
          selectedFilter={selectedFilter}
          onFilterSelect={applyFilter}
          imageUri={imageUri}
        />

        <EffectsPanel
          brightness={brightness}
          contrast={contrast}
          saturation={saturation}
          onBrightnessChange={setBrightness}
          onContrastChange={setContrast}
          onSaturationChange={setSaturation}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Share</Text>
          <SocialSharePanel onShare={shareImage} />
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.saveButton} onPress={saveImage}>
            <Text style={styles.buttonText}>💾 Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>✕ Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContent: {
    padding: 15,
  },
  imageContainer: {
    width: '100%',
    height: 400,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#e94560',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
