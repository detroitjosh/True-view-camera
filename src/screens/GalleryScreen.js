import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

const { width } = Dimensions.get('window');
const numColumns = 3;
const imageSize = (width - 40) / numColumns;

export default function GalleryScreen({ navigation }) {
  const [photos, setPhotos] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      
      if (status === 'granted') {
        loadPhotos();
      }
    })();
  }, []);

  const loadPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync({
        first: 100,
        mediaType: 'photo',
        sortBy: [[MediaLibrary.SortBy.creationTime, false]],
      });
      setPhotos(assets);
    } catch (error) {
      console.error('Error loading photos:', error);
      Alert.alert('Error', 'Failed to load photos');
    }
  };

  const togglePhotoSelection = (item) => {
    if (selectedPhotos.find(p => p.id === item.id)) {
      setSelectedPhotos(selectedPhotos.filter(p => p.id !== item.id));
    } else {
      setSelectedPhotos([...selectedPhotos, item]);
    }
  };

  const handleCreateMovie = () => {
    if (selectedPhotos.length === 0) {
      Alert.alert('No Images Selected', 'Please select at least one image to create a movie.');
      return;
    }
    
    navigation.navigate('AIGenerate', { 
      selectedImages: selectedPhotos.map(p => p.uri)
    });
    setSelectionMode(false);
    setSelectedPhotos([]);
  };

  const renderPhoto = ({ item }) => {
    const isSelected = selectedPhotos.find(p => p.id === item.id);
    
    return (
      <TouchableOpacity
        style={styles.photoContainer}
        onPress={() => {
          if (selectionMode) {
            togglePhotoSelection(item);
          } else {
            navigation.navigate('Edit', { imageUri: item.uri });
          }
        }}
        onLongPress={() => {
          if (!selectionMode) {
            setSelectionMode(true);
            setSelectedPhotos([item]);
          }
        }}
      >
        <Image source={{ uri: item.uri }} style={styles.photo} />
        {selectionMode && (
          <View style={[styles.selectionOverlay, isSelected && styles.selectedOverlay]}>
            {isSelected && (
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Media library permission denied</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {selectionMode && (
        <View style={styles.selectionBar}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              setSelectionMode(false);
              setSelectedPhotos([]);
            }}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.selectionCount}>{selectedPhotos.length} selected</Text>
          <TouchableOpacity
            style={styles.createMovieButton}
            onPress={handleCreateMovie}
          >
            <Text style={styles.createMovieButtonText}>🎬 Create Movie</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <FlatList
        data={photos}
        renderItem={renderPhoto}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.grid}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No photos found</Text>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => navigation.navigate('Camera')}
            >
              <Text style={styles.cameraButtonText}>Take a Photo</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  grid: {
    padding: 10,
  },
  photoContainer: {
    width: imageSize,
    height: imageSize,
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  selectionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOverlay: {
    backgroundColor: 'rgba(233, 69, 96, 0.4)',
  },
  checkmark: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e94560',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(233, 69, 96, 0.15)',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#e94560',
  },
  cancelButton: {
    padding: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  selectionCount: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createMovieButton: {
    backgroundColor: '#e94560',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createMovieButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: '#b8b8d1',
    fontSize: 18,
    marginBottom: 20,
  },
  cameraButton: {
    backgroundColor: '#e94560',
    padding: 15,
    borderRadius: 10,
  },
  cameraButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
