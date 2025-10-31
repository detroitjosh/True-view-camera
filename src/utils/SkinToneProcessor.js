/**
 * SkinToneProcessor - Enhances images for darker skin tones
 * Based on Google's Real Tone research principles
 * 
 * DEPRECATED: Use RealToneProcessor for more advanced features
 * This class is maintained for backward compatibility
 */

import { RealToneProcessor } from './RealToneProcessor';

export class SkinToneProcessor {
  constructor() {
    // Initialize with RealToneProcessor for enhanced features
    this.realToneProcessor = new RealToneProcessor();
    
    this.config = {
      // Exposure compensation for darker skin tones
      exposureBoost: 0.3,
      // Enhanced local contrast
      localContrast: 1.2,
      // Color temperature adjustment
      warmth: 1.1,
      // Shadow detail enhancement
      shadowLift: 0.25,
    };
  }

  /**
   * Enhance image for better representation of darker skin tones
   * Now uses RealToneProcessor for advanced enhancement
   * @param {string} imageUri - URI of the image to enhance
   * @returns {Promise<string>} - URI of enhanced image
   */
  async enhanceImage(imageUri) {
    try {
      console.log('SkinToneProcessor: Using RealToneProcessor for enhancement');
      
      // Use the more advanced RealToneProcessor
      const enhancedUri = await this.realToneProcessor.enhanceImage(imageUri);
      
      return enhancedUri;
    } catch (error) {
      console.error('Error enhancing image:', error);
      return imageUri;
    }
  }

  /**
   * Detect skin tones in an image
   * @param {string} imageUri - URI of the image
   * @returns {Promise<Array>} - Array of detected skin tone regions
   */
  async detectSkinTones(imageUri) {
    // Placeholder for skin tone detection
    // In production, use TensorFlow.js with a trained model
    return [];
  }

  /**
   * Apply adaptive exposure compensation
   * @param {number} baseSkinTone - Detected base skin tone (0-255)
   * @returns {number} - Exposure compensation value
   */
  calculateExposureCompensation(baseSkinTone) {
    // Darker skin tones benefit from increased exposure
    if (baseSkinTone < 100) {
      return 0.5; // +0.5 EV for very dark skin
    } else if (baseSkinTone < 150) {
      return 0.3; // +0.3 EV for dark skin
    } else if (baseSkinTone < 200) {
      return 0.1; // +0.1 EV for medium skin
    }
    return 0; // No adjustment for lighter skin
  }

  /**
   * Get recommended camera settings for skin tone
   * @param {number} skinTone - Detected skin tone value
   * @returns {Object} - Recommended camera settings
   */
  getRecommendedSettings(skinTone) {
    return {
      exposure: this.calculateExposureCompensation(skinTone),
      iso: skinTone < 100 ? 400 : 200,
      whiteBalance: 'auto',
      hdr: true, // HDR helps preserve detail in both shadows and highlights
    };
  }
}
