import axios from 'axios';

/**
 * AIService - Handles AI image and video generation
 * Supports local server or external APIs (Stable Diffusion, HuggingFace)
 */
export class AIService {
  constructor() {
    this.serverUrl = process.env.AI_SERVER_URL || 'http://localhost:3001';
    this.stableDiffusionKey = process.env.STABLE_DIFFUSION_API_KEY;
    this.huggingFaceKey = process.env.HUGGINGFACE_API_KEY;
  }

  /**
   * Generate image from text prompt
   * @param {string} prompt - Text description of desired image
   * @returns {Promise<string>} - URI of generated image
   */
  async generateImage(prompt) {
    try {
      // Try local server first
      if (await this.isServerAvailable()) {
        return await this.generateImageLocal(prompt);
      }
      
      // Fall back to cloud API if configured
      if (this.huggingFaceKey) {
        return await this.generateImageHuggingFace(prompt);
      }

      throw new Error('No AI service available. Please configure AI_SERVER_URL or API keys.');
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  }

  /**
   * Generate video from text prompt
   * @param {string} prompt - Text description of desired video
   * @returns {Promise<string>} - URI of generated video
   */
  async generateVideo(prompt) {
    try {
      if (await this.isServerAvailable()) {
        return await this.generateVideoLocal(prompt);
      }

      throw new Error('Video generation requires local server. Run: npm run server');
    } catch (error) {
      console.error('Error generating video:', error);
      throw error;
    }
  }

  /**
   * Check if local AI server is available
   * @returns {Promise<boolean>}
   */
  async isServerAvailable() {
    try {
      const response = await axios.get(`${this.serverUrl}/health`, { timeout: 2000 });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  /**
   * Generate image using local server
   * @param {string} prompt
   * @returns {Promise<string>}
   */
  async generateImageLocal(prompt) {
    const response = await axios.post(`${this.serverUrl}/generate/image`, {
      prompt,
      negative_prompt: 'blurry, low quality, distorted',
      num_inference_steps: 30,
      guidance_scale: 7.5,
    });
    return response.data.image_url;
  }

  /**
   * Generate video using local server
   * @param {string} prompt
   * @returns {Promise<string>}
   */
  async generateVideoLocal(prompt) {
    const response = await axios.post(`${this.serverUrl}/generate/video`, {
      prompt,
      num_frames: 16,
      fps: 8,
    });
    return response.data.video_url;
  }

  /**
   * Generate image using HuggingFace API
   * @param {string} prompt
   * @returns {Promise<string>}
   */
  async generateImageHuggingFace(prompt) {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1',
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${this.huggingFaceKey}`,
          'Content-Type': 'application/json',
        },
        responseType: 'blob',
      }
    );

    // Convert blob to base64 URI
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(response.data);
    });
  }

  /**
   * Apply AI-powered background replacement
   * @param {string} imageUri - Original image
   * @param {string} backgroundPrompt - Description of new background
   * @returns {Promise<string>} - URI of edited image
   */
  async replaceBackground(imageUri, backgroundPrompt) {
    if (await this.isServerAvailable()) {
      const response = await axios.post(`${this.serverUrl}/edit/background`, {
        image_uri: imageUri,
        background_prompt: backgroundPrompt,
      });
      return response.data.image_url;
    }
    throw new Error('Background replacement requires local server');
  }

  /**
   * Apply AI-powered retouching
   * @param {string} imageUri - Original image
   * @returns {Promise<string>} - URI of retouched image
   */
  async retouchImage(imageUri) {
    if (await this.isServerAvailable()) {
      const response = await axios.post(`${this.serverUrl}/edit/retouch`, {
        image_uri: imageUri,
      });
      return response.data.image_url;
    }
    throw new Error('Retouching requires local server');
  }
}
