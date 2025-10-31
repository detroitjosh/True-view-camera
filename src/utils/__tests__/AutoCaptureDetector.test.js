import { AutoCaptureDetector } from '../AutoCaptureDetector';

describe('AutoCaptureDetector', () => {
  let detector;

  beforeEach(() => {
    detector = new AutoCaptureDetector();
  });

  describe('checkFocus', () => {
    it('should return false when no faces are detected', () => {
      const result = detector.checkFocus([]);
      expect(result).toBe(false);
    });

    it('should return false when faces array is null', () => {
      const result = detector.checkFocus(null);
      expect(result).toBe(false);
    });

    it('should return false on first frame with good face', () => {
      const faces = [
        {
          rollAngle: 0,
          bounds: {
            size: { width: 150, height: 150 },
            origin: { x: 100, y: 100 }
          },
          leftEyePosition: { x: 120, y: 120 },
          rightEyePosition: { x: 180, y: 120 }
        }
      ];
      
      const result = detector.checkFocus(faces);
      expect(result).toBe(false);
      expect(detector.frameHistory.length).toBe(1);
    });

    it('should return true after 3 consecutive frames with good focus', () => {
      const faces = [
        {
          rollAngle: 0,
          bounds: {
            size: { width: 150, height: 150 },
            origin: { x: 100, y: 100 }
          },
          leftEyePosition: { x: 120, y: 120 },
          rightEyePosition: { x: 180, y: 120 }
        }
      ];
      
      // Frame 1
      let result = detector.checkFocus(faces);
      expect(result).toBe(false);
      
      // Frame 2
      result = detector.checkFocus(faces);
      expect(result).toBe(false);
      
      // Frame 3 - should trigger capture
      result = detector.checkFocus(faces);
      expect(result).toBe(true);
      
      // Frame history should be reset after capture
      expect(detector.frameHistory.length).toBe(0);
    });

    it('should reset frame history when no faces detected', () => {
      const faces = [
        {
          rollAngle: 0,
          bounds: {
            size: { width: 150, height: 150 },
            origin: { x: 100, y: 100 }
          }
        }
      ];
      
      // Build up frame history
      detector.checkFocus(faces);
      detector.checkFocus(faces);
      expect(detector.frameHistory.length).toBe(2);
      
      // No faces - should reset
      detector.checkFocus([]);
      expect(detector.frameHistory.length).toBe(0);
    });

    it('should not trigger on small faces (far away)', () => {
      const faces = [
        {
          rollAngle: 0,
          bounds: {
            size: { width: 50, height: 50 },  // Small face
            origin: { x: 100, y: 100 }
          }
        }
      ];
      
      // Try 3 frames
      detector.checkFocus(faces);
      detector.checkFocus(faces);
      const result = detector.checkFocus(faces);
      
      // Should not trigger because face is too small
      expect(result).toBe(false);
    });
  });

  describe('calculateFocusScore', () => {
    it('should return 0 for null faces', () => {
      const score = detector.calculateFocusScore(null);
      expect(score).toBe(0);
    });

    it('should return 0 for empty faces array', () => {
      const score = detector.calculateFocusScore([]);
      expect(score).toBe(0);
    });

    it('should give high score for good face with eyes', () => {
      const faces = [
        {
          rollAngle: 0,
          bounds: {
            size: { width: 150, height: 150 },
            origin: { x: 100, y: 100 }
          },
          leftEyePosition: { x: 120, y: 120 },
          rightEyePosition: { x: 180, y: 120 }
        }
      ];
      
      const score = detector.calculateFocusScore(faces);
      expect(score).toBeGreaterThan(0.85);
    });

    it('should penalize small faces', () => {
      const faces = [
        {
          rollAngle: 0,
          bounds: {
            size: { width: 50, height: 50 },  // Small face
            origin: { x: 100, y: 100 }
          }
        }
      ];
      
      const score = detector.calculateFocusScore(faces);
      expect(score).toBeLessThan(0.85);
    });

    it('should bonus for detected eyes', () => {
      const facesWithoutEyes = [
        {
          bounds: {
            size: { width: 150, height: 150 },
            origin: { x: 100, y: 100 }
          }
        }
      ];
      
      const facesWithEyes = [
        {
          bounds: {
            size: { width: 150, height: 150 },
            origin: { x: 100, y: 100 }
          },
          leftEyePosition: { x: 120, y: 120 },
          rightEyePosition: { x: 180, y: 120 }
        }
      ];
      
      const scoreWithoutEyes = detector.calculateFocusScore(facesWithoutEyes);
      const scoreWithEyes = detector.calculateFocusScore(facesWithEyes);
      
      // Should get eye bonus (1.2x multiplier, capped at 1.0)
      expect(scoreWithEyes).toBeGreaterThanOrEqual(scoreWithoutEyes);
      expect(scoreWithEyes).toBeLessThanOrEqual(1.0);
    });
  });

  describe('checkStability', () => {
    it('should return false when faces count differs', () => {
      const currentFaces = [{ bounds: { origin: { x: 100, y: 100 } } }];
      const previousFaces = [
        { bounds: { origin: { x: 100, y: 100 } } },
        { bounds: { origin: { x: 200, y: 200 } } }
      ];
      
      const result = detector.checkStability(currentFaces, previousFaces);
      expect(result).toBe(false);
    });

    it('should return true for stable faces', () => {
      const currentFaces = [
        { bounds: { origin: { x: 100, y: 100 } } }
      ];
      const previousFaces = [
        { bounds: { origin: { x: 105, y: 105 } } }  // Small movement
      ];
      
      const result = detector.checkStability(currentFaces, previousFaces);
      expect(result).toBe(true);
    });

    it('should return false for large movement', () => {
      const currentFaces = [
        { bounds: { origin: { x: 100, y: 100 } } }
      ];
      const previousFaces = [
        { bounds: { origin: { x: 150, y: 150 } } }  // Large movement
      ];
      
      const result = detector.checkStability(currentFaces, previousFaces);
      expect(result).toBe(false);
    });
  });

  describe('reset', () => {
    it('should clear frame history', () => {
      const faces = [
        {
          rollAngle: 0,
          bounds: {
            size: { width: 150, height: 150 },
            origin: { x: 100, y: 100 }
          }
        }
      ];
      
      // Build up frame history
      detector.checkFocus(faces);
      detector.checkFocus(faces);
      expect(detector.frameHistory.length).toBe(2);
      
      // Reset
      detector.reset();
      expect(detector.frameHistory.length).toBe(0);
    });
  });
});
