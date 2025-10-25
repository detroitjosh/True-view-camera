import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Image, ActivityIndicator } from 'react-native';
import { AIService } from '../services/AIService';

export default function AIGenerateScreen({ navigation }) {
  const [prompt, setPrompt] = useState('');
  const [generationType, setGenerationType] = useState('image'); // 'image' or 'video'
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const aiService = new AIService();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setGeneratedContent(null);

    try {
      let result;
      if (generationType === 'image') {
        result = await aiService.generateImage(prompt);
      } else {
        result = await aiService.generateVideo(prompt);
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
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter your prompt:</Text>
        <TextInput
          style={styles.input}
          placeholder="Describe what you want to create..."
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
          {isGenerating ? '⏳ Generating...' : '✨ Generate'}
        </Text>
      </TouchableOpacity>

      {isGenerating && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e94560" />
          <Text style={styles.loadingText}>Creating your {generationType}...</Text>
        </View>
      )}

      {generatedContent && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Generated {generationType}</Text>
          {generationType === 'image' ? (
            <Image source={{ uri: generatedContent }} style={styles.generatedImage} resizeMode="contain" />
          ) : (
            <View style={styles.videoPlaceholder}>
              <Text style={styles.videoPlaceholderText}>🎥 Video generated</Text>
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
        <Text style={styles.examplesTitle}>Example Prompts</Text>
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
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>ℹ️ Note</Text>
        <Text style={styles.infoText}>
          AI generation requires server setup or API keys. Configure your .env file with 
          STABLE_DIFFUSION_API_KEY or HUGGINGFACE_API_KEY to enable this feature.
          {'\n\n'}
          For local generation, run: npm run server
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
