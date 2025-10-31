/**
 * RealToneProcessor Tests
 * Validates Real-Tone functionality and Monk Skin Tone Scale classification
 */

import { RealToneProcessor, MONK_SKIN_TONE_SCALE } from '../../src/utils/RealToneProcessor';

describe('RealToneProcessor', () => {
  let processor;

  beforeEach(() => {
    processor = new RealToneProcessor();
  });

  describe('Initialization', () => {
    test('should initialize with default config', () => {
      expect(processor).toBeDefined();
      expect(processor.config.enabled).toBe(true);
      expect(processor.config.adaptiveExposure).toBe(true);
      expect(processor.config.enhancedWhiteBalance).toBe(true);
    });

    test('should accept custom config', () => {
      const customProcessor = new RealToneProcessor({
        enabled: false,
        shadowLift: 0.5,
      });
      expect(customProcessor.config.enabled).toBe(false);
      expect(customProcessor.config.shadowLift).toBe(0.5);
    });
  });

  describe('Monk Skin Tone Scale Classification', () => {
    test('should classify very light skin tone as MST-1', () => {
      const category = processor.detectSkinToneCategory({ r: 250, g: 240, b: 230 });
      expect(category.id).toBe(1);
      expect(category.name).toBe('Very Light');
    });

    test('should classify light skin tone as MST-2', () => {
      const category = processor.detectSkinToneCategory({ r: 245, g: 230, b: 215 });
      expect(category.id).toBe(2);
      expect(category.name).toBe('Light');
    });

    test('should classify medium skin tone as MST-4', () => {
      const category = processor.detectSkinToneCategory({ r: 220, g: 195, b: 165 });
      expect(category.id).toBe(4);
      expect(category.name).toBe('Medium');
    });

    test('should classify tan skin tone as MST-6', () => {
      const category = processor.detectSkinToneCategory({ r: 175, g: 140, b: 110 });
      expect(category.id).toBe(6);
      expect(category.name).toBe('Tan');
    });

    test('should classify dark skin tone as MST-8', () => {
      const category = processor.detectSkinToneCategory({ r: 120, g: 85, b: 60 });
      expect(category.id).toBe(8);
      expect(category.name).toBe('Dark');
    });

    test('should classify very dark skin tone as MST-9', () => {
      const category = processor.detectSkinToneCategory({ r: 90, g: 60, b: 40 });
      expect(category.id).toBe(9);
      expect(category.name).toBe('Very Dark');
    });

    test('should classify deepest skin tone as MST-10', () => {
      const category = processor.detectSkinToneCategory({ r: 60, g: 40, b: 30 });
      expect(category.id).toBe(10);
      expect(category.name).toBe('Deepest');
    });

    test('should handle invalid RGB values gracefully', () => {
      const category = processor.detectSkinToneCategory(null);
      expect(category).toBeDefined();
      expect(category.id).toBe(5); // Default to medium
    });

    test('should handle missing RGB properties', () => {
      const category = processor.detectSkinToneCategory({ r: 100 });
      expect(category).toBeDefined();
      expect(category.id).toBe(5); // Default to medium
    });
  });

  describe('Exposure Compensation', () => {
    test('should apply negative compensation for very light skin (MST-1)', () => {
      const exposure = processor.calculateExposureCompensation(1);
      expect(exposure).toBe(-0.1);
    });

    test('should apply no compensation for light skin (MST-2)', () => {
      const exposure = processor.calculateExposureCompensation(2);
      expect(exposure).toBe(0);
    });

    test('should apply moderate compensation for medium skin (MST-4)', () => {
      const exposure = processor.calculateExposureCompensation(4);
      expect(exposure).toBe(0.2);
    });

    test('should apply significant compensation for dark skin (MST-8)', () => {
      const exposure = processor.calculateExposureCompensation(8);
      expect(exposure).toBe(0.4);
    });

    test('should apply maximum compensation for very dark skin (MST-9)', () => {
      const exposure = processor.calculateExposureCompensation(9);
      expect(exposure).toBe(0.5);
    });

    test('should apply highest compensation for deepest skin (MST-10)', () => {
      const exposure = processor.calculateExposureCompensation(10);
      expect(exposure).toBe(0.6);
    });

    test('should return 0 when adaptive exposure is disabled', () => {
      processor.updateConfig({ adaptiveExposure: false });
      const exposure = processor.calculateExposureCompensation(10);
      expect(exposure).toBe(0);
    });
  });

  describe('White Balance Calculation', () => {
    test('should apply minimal warmth for light skin tones', () => {
      const wb = processor.calculateWhiteBalance(2);
      expect(wb.temperature).toBeLessThan(0.1);
    });

    test('should apply moderate warmth for medium skin tones', () => {
      const wb = processor.calculateWhiteBalance(5);
      expect(wb.temperature).toBeGreaterThan(0.05);
      expect(wb.temperature).toBeLessThan(0.15);
    });

    test('should apply significant warmth for dark skin tones', () => {
      const wb = processor.calculateWhiteBalance(8);
      expect(wb.temperature).toBeGreaterThan(0.15);
    });

    test('should include tint adjustment', () => {
      const wb = processor.calculateWhiteBalance(5);
      expect(wb.tint).toBe(0.05);
    });

    test('should return zero adjustments when white balance is disabled', () => {
      processor.updateConfig({ enhancedWhiteBalance: false });
      const wb = processor.calculateWhiteBalance(10);
      expect(wb.temperature).toBe(0);
      expect(wb.tint).toBe(0);
    });
  });

  describe('Local Tone Mapping', () => {
    test('should apply minimal shadow boost for light skin tones', () => {
      const mapping = processor.calculateLocalToneMapping(2);
      expect(mapping.shadowBoost).toBeLessThanOrEqual(processor.config.shadowLift);
    });

    test('should apply increased shadow boost for dark skin tones', () => {
      const mapping = processor.calculateLocalToneMapping(8);
      expect(mapping.shadowBoost).toBeGreaterThan(processor.config.shadowLift);
    });

    test('should apply maximum shadow boost for very dark skin tones', () => {
      const mapping9 = processor.calculateLocalToneMapping(9);
      const mapping10 = processor.calculateLocalToneMapping(10);
      expect(mapping9.shadowBoost).toBeGreaterThan(processor.config.shadowLift * 1.3);
      expect(mapping10.shadowBoost).toBeGreaterThan(processor.config.shadowLift * 1.3);
    });

    test('should include highlight compression', () => {
      const mapping = processor.calculateLocalToneMapping(5);
      expect(mapping.highlightCompression).toBe(processor.config.highlightProtection);
    });

    test('should include midtone contrast', () => {
      const mapping = processor.calculateLocalToneMapping(5);
      expect(mapping.midtoneContrast).toBe(processor.config.contrastEnhancement);
    });

    test('should return zero adjustments when local tone mapping is disabled', () => {
      processor.updateConfig({ localToneMapping: false });
      const mapping = processor.calculateLocalToneMapping(10);
      expect(mapping.shadowBoost).toBe(0);
      expect(mapping.highlightCompression).toBe(0);
    });
  });

  describe('Optimized Settings', () => {
    test('should return comprehensive settings for light skin tone', () => {
      const settings = processor.getOptimizedSettings(MONK_SKIN_TONE_SCALE.MST_2);
      expect(settings.exposure).toBe(0);
      expect(settings.iso).toBe(200);
      expect(settings.hdr).toBe(true);
      expect(settings.whiteBalance.mode).toBe('auto');
    });

    test('should return comprehensive settings for medium skin tone', () => {
      const settings = processor.getOptimizedSettings(MONK_SKIN_TONE_SCALE.MST_5);
      expect(settings.exposure).toBe(0.25);
      expect(settings.iso).toBe(200);
      expect(settings.hdr).toBe(true);
    });

    test('should return comprehensive settings for dark skin tone', () => {
      const settings = processor.getOptimizedSettings(MONK_SKIN_TONE_SCALE.MST_8);
      expect(settings.exposure).toBe(0.4);
      expect(settings.iso).toBe(400); // Higher ISO for darker skin
      expect(settings.hdr).toBe(true);
    });

    test('should include Real-Tone metadata', () => {
      const settings = processor.getOptimizedSettings(MONK_SKIN_TONE_SCALE.MST_6);
      expect(settings.realTone).toBeDefined();
      expect(settings.realTone.enabled).toBe(true);
      expect(settings.realTone.mstCategory).toBe(6);
      expect(settings.realTone.categoryName).toBe('Tan');
      expect(settings.realTone.timestamp).toBeDefined();
    });
  });

  describe('Configuration Management', () => {
    test('should enable/disable processing', () => {
      processor.setEnabled(false);
      expect(processor.config.enabled).toBe(false);
      
      processor.setEnabled(true);
      expect(processor.config.enabled).toBe(true);
    });

    test('should get current config', () => {
      const config = processor.getConfig();
      expect(config).toBeDefined();
      expect(config.enabled).toBe(true);
      expect(config.shadowLift).toBe(0.3);
    });

    test('should update config partially', () => {
      processor.updateConfig({ shadowLift: 0.5, warmthMultiplier: 1.3 });
      const config = processor.getConfig();
      expect(config.shadowLift).toBe(0.5);
      expect(config.warmthMultiplier).toBe(1.3);
      expect(config.enabled).toBe(true); // Other settings unchanged
    });
  });

  describe('Image Analysis and Enhancement', () => {
    test('should analyze skin tone from image URI', async () => {
      const result = await processor.analyzeSkinTone('test://image.jpg');
      expect(result).toBeDefined();
      expect(result.detected).toBe(true);
      expect(result.mstCategory).toBeDefined();
      expect(result.confidence).toBeGreaterThan(0);
    });

    test('should analyze skin tone with region', async () => {
      const region = { x: 0, y: 0, width: 100, height: 100 };
      const result = await processor.analyzeSkinTone('test://image.jpg', region);
      expect(result.region).toEqual(region);
    });

    test('should enhance image when enabled', async () => {
      processor.setEnabled(true);
      const enhanced = await processor.enhanceImage('test://image.jpg');
      expect(enhanced).toBeDefined();
      expect(typeof enhanced).toBe('string');
    });

    test('should return original image when disabled', async () => {
      processor.setEnabled(false);
      const original = 'test://image.jpg';
      const result = await processor.enhanceImage(original);
      expect(result).toBe(original);
    });

    test('should enhance image with pre-detected skin tone', async () => {
      const enhanced = await processor.enhanceImage(
        'test://image.jpg',
        MONK_SKIN_TONE_SCALE.MST_8
      );
      expect(enhanced).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    test('should handle extreme RGB values', () => {
      const category1 = processor.detectSkinToneCategory({ r: 0, g: 0, b: 0 });
      expect(category1).toBeDefined();
      
      const category2 = processor.detectSkinToneCategory({ r: 255, g: 255, b: 255 });
      expect(category2).toBeDefined();
    });

    test('should handle invalid MST IDs gracefully', () => {
      const exposure = processor.calculateExposureCompensation(999);
      expect(exposure).toBe(0.3); // Default fallback
    });

    test('should handle zero MST ID', () => {
      const exposure = processor.calculateExposureCompensation(0);
      expect(exposure).toBeDefined();
    });
  });

  describe('Monk Skin Tone Scale Constants', () => {
    test('should have all 10 MST categories defined', () => {
      expect(Object.keys(MONK_SKIN_TONE_SCALE).length).toBe(10);
    });

    test('should have correct MST category structure', () => {
      Object.values(MONK_SKIN_TONE_SCALE).forEach((category) => {
        expect(category.id).toBeDefined();
        expect(category.name).toBeDefined();
        expect(category.rgb).toHaveLength(3);
        expect(category.exposureBoost).toBeDefined();
      });
    });

    test('should have progressive exposure boost', () => {
      const boosts = Object.values(MONK_SKIN_TONE_SCALE).map(c => c.exposureBoost);
      for (let i = 1; i < boosts.length; i++) {
        expect(boosts[i]).toBeGreaterThanOrEqual(boosts[i - 1]);
      }
    });
  });
});
