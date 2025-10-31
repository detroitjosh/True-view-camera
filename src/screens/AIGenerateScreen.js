import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AIService } from '../services/AIService';

const MAX_IMAGES_FOR_ANIMATION = 10;

export default function AIGenerateScreen({ navigation, route }) {
  const [prompt, setPrompt] = useState('');
  const [generationType, setGenerationType] = useState('image'); // 'image', 'video', or 'animate'
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImages, setSelectedImages] = useState(route?.params?.selectedImages || []);
  
  const aiService = new AIService();

  const handlePickImages = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Please allow access to your photo library to select images.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: generationType === 'animate',
        quality: 1,
        selectionLimit: generationType === 'animate' ? MAX_IMAGES_FOR_ANIMATION : 1,
      });

      if (!result.canceled && result.assets) {
        setSelectedImages(result.assets.map(asset => asset.uri));
      }
    } catch (error) {
      console.error('Error picking images:', error);
      Alert.alert('Error', 'Failed to select images');
    }
  };

  const handleGenerate = async () => {
    if (generationType === 'animate' && selectedImages.length === 0) {
      Alert.alert('Error', 'Please select at least one image to animate');
      return;
    }

    if (generationType !== 'animate' && !prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setGeneratedContent(null);

    try {
      let result;
      if (generationType === 'image') {
        result = await aiService.generateImage(prompt);
      } else if (generationType === 'video') {
        result = await aiService.generateVideo(prompt);
      } else if (generationType === 'animate') {
        if (selectedImages.length === 1) {
          // Single image animation
          result = await aiService.generateVideoFromImage(selectedImages[0], prompt);
        } else {
          // Multiple images - create slideshow/movie
          result = await aiService.generateVideoFromMultipleImages(selectedImages, {
            transitionType: 'fade',
            durationPerImage: 3,
            includeMotion: true,
          });
        }
      }
      
      setGeneratedContent(result);
    } catch (error) {
      console.error('Error generating content:', error);
      Alert.alert('Error', 'Failed to generate content. This feature requires AI service setup.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Generation</Text>
        <Text style={styles.subtitle}>Create images and videos with AI</Text>
      </View>

      <View style={styles.typeSelector}>
        <TouchableOpacity
          style={[styles.typeButton, generationType === 'image' && styles.typeButtonActive]}
          onPress={() => setGenerationType('image')}
        >
          <Text style={[styles.typeButtonText, generationType === 'image' && styles.typeButtonTextActive]}>
            🖼️ Image
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, generationType === 'video' && styles.typeButtonActive]}
          onPress={() => setGenerationType('video')}
        >
          <Text style={[styles.typeButtonText, generationType === 'video' && styles.typeButtonTextActive]}>
            🎥 Video
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, generationType === 'animate' && styles.typeButtonActive]}
          onPress={() => setGenerationType('animate')}
        >
          <Text style={[styles.typeButtonText, generationType === 'animate' && styles.typeButtonTextActive]}>
            ✨ Animate
          </Text>
        </TouchableOpacity>
      </View>

      {generationType === 'animate' && (
        <View style={styles.imageSelectionContainer}>
          <Text style={styles.label}>Select images to animate:</Text>
          <TouchableOpacity
            style={styles.pickImagesButton}
            onPress={handlePickImages}
          >
            <Text style={styles.pickImagesButtonText}>
              📷 {selectedImages.length > 0 ? `${selectedImages.length} Image(s) Selected` : 'Pick Images'}
            </Text>
          </TouchableOpacity>
          
          {selectedImages.length > 0 && (
            <ScrollView horizontal style={styles.imagePreviewScroll} showsHorizontalScrollIndicator={false}>
              {selectedImages.map((uri, index) => (
                <View key={index} style={styles.imagePreviewContainer}>
                  <Image source={{ uri }} style={styles.imagePreview} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => setSelectedImages(selectedImages.filter((_, i) => i !== index))}
                  >
                    <Text style={styles.removeImageText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          {generationType === 'animate' 
            ? 'Describe motion/animation (optional):' 
            : 'Enter your prompt:'}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={
            generationType === 'animate'
              ? 'e.g., smooth pan, zoom in, natural motion...'
              : 'Describe what you want to create...'
          }
          placeholderTextColor="#888"
          value={prompt}
          onChangeText={setPrompt}
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity
        style={[styles.generateButton, isGenerating && styles.generateButtonDisabled]}
        onPress={handleGenerate}
        disabled={isGenerating}
      >
        <Text style={styles.generateButtonText}>
          {isGenerating ? '⏳ Generating...' : generationType === 'animate' ? '🎬 Create Movie' : '✨ Generate'}
        </Text>
      </TouchableOpacity>

      {isGenerating && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e94560" />
          <Text style={styles.loadingText}>
            {generationType === 'animate' 
              ? 'Creating your personalized movie...' 
              : `Creating your ${generationType}...`}
          </Text>
        </View>
      )}

      {generatedContent && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Generated {generationType === 'animate' ? 'Movie' : generationType}</Text>
          {generationType === 'image' ? (
            <Image source={{ uri: generatedContent }} style={styles.generatedImage} resizeMode="contain" />
          ) : (
            <View style={styles.videoPlaceholder}>
              <Text style={styles.videoPlaceholderText}>🎥 Video generated successfully</Text>
              <Text style={styles.videoPath}>{generatedContent}</Text>
            </View>
          )}
          
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('Edit', { imageUri: generatedContent })}
          >
            <Text style={styles.editButtonText}>Edit & Share</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.examplesContainer}>
        <Text style={styles.examplesTitle}>Example {generationType === 'animate' ? 'Animations' : 'Prompts'}</Text>
        {generationType === 'animate' ? (
          <>
            <ExamplePrompt
              text="Smooth zoom in with parallax effect"
              onPress={() => setPrompt("Smooth zoom in with parallax effect")}
            />
            <ExamplePrompt
              text="Pan across the scene with natural motion"
              onPress={() => setPrompt("Pan across the scene with natural motion")}
            />
            <ExamplePrompt
              text="Animate with facial expressions and head movement"
              onPress={() => setPrompt("Animate with facial expressions and head movement")}
            />
          </>
        ) : (
          <>
            <ExamplePrompt
              text="A beautiful sunset over mountains with warm colors"
              onPress={() => setPrompt("A beautiful sunset over mountains with warm colors")}
            />
            <ExamplePrompt
              text="Portrait of a person with natural lighting"
              onPress={() => setPrompt("Portrait of a person with natural lighting")}
            />
            <ExamplePrompt
              text="Urban street scene at night with vibrant lights"
              onPress={() => setPrompt("Urban street scene at night with vibrant lights")}
            />
          </>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>ℹ️ Note</Text>
        <Text style={styles.infoText}>
          {generationType === 'animate' 
            ? 'Image animation requires server setup with Stable Video Diffusion or AnimateDiff. This feature brings your photos to life with AI-powered motion.\n\nFor local generation, run: npm run server'
            : 'AI generation requires server setup or API keys. Configure your .env file with STABLE_DIFFUSION_API_KEY or HUGGINGFACE_API_KEY to enable this feature.\n\nFor local generation, run: npm run server'}
        </Text>
      </View>
    </ScrollView>
  );
}

function ExamplePrompt({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.examplePrompt} onPress={onPress}>
      <Text style={styles.examplePromptText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#b8b8d1',
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeButtonActive: {
    backgroundColor: 'rgba(233, 69, 96, 0.2)',
    borderColor: '#e94560',
  },
  typeButtonText: {
    color: '#b8b8d1',
    fontSize: 16,
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: '#e94560',
  },
  imageSelectionContainer: {
    marginBottom: 20,
  },
  pickImagesButton: {
    backgroundColor: 'rgba(233, 69, 96, 0.2)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e94560',
    borderStyle: 'dashed',
  },
  pickImagesButtonText: {
    color: '#e94560',
    fontSize: 16,
    fontWeight: '600',
  },
  imagePreviewScroll: {
    marginTop: 15,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginRight: 10,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e94560',
  },
  removeImageButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#e94560',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeImageText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  generateButton: {
    backgroundColor: '#e94560',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  generateButtonDisabled: {
    backgroundColor: '#888',
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 30,
  },
  loadingText: {
    color: '#b8b8d1',
    marginTop: 15,
    fontSize: 14,
  },
  resultContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  generatedImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 15,
  },
  videoPlaceholder: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 40,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  videoPlaceholderText: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 10,
  },
  videoPath: {
    color: '#b8b8d1',
    fontSize: 12,
  },
  editButton: {
    backgroundColor: '#e94560',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  examplesContainer: {
    marginBottom: 20,
  },
  examplesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  examplePrompt: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  examplePromptText: {
    color: '#b8b8d1',
    fontSize: 14,
  },
  infoContainer: {
    backgroundColor: 'rgba(233, 69, 96, 0.1)',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(233, 69, 96, 0.3)',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e94560',
    marginBottom: 8,
  },
  infoText: {
    color: '#d1d1e0',
    fontSize: 13,
    lineHeight: 20,
  },
});
