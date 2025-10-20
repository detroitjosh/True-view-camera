/**
 * AutoCaptureDetector - Detects when subjects are in focus for auto-capture
 */
export class AutoCaptureDetector {
  constructor() {
    this.focusThreshold = 0.85; // Confidence threshold for in-focus detection
    this.stabilityFrames = 3; // Number of consecutive frames needed
    this.frameHistory = [];
  }

  /**
   * Check if detected faces are in focus
   * @param {Array} faces - Array of detected faces from camera
   * @returns {boolean} - True if faces are in focus and stable
   */
  checkFocus(faces) {
    if (!faces || faces.length === 0) {
      this.frameHistory = [];
      return false;
    }

    // Calculate focus score based on face detection confidence
    const focusScore = this.calculateFocusScore(faces);
    
    // Add to frame history
    this.frameHistory.push(focusScore);
    
    // Keep only recent frames
    if (this.frameHistory.length > this.stabilityFrames) {
      this.frameHistory.shift();
    }

    // Check if consistently in focus
    if (this.frameHistory.length >= this.stabilityFrames) {
      const isStable = this.frameHistory.every(score => score >= this.focusThreshold);
      if (isStable) {
        this.frameHistory = []; // Reset after capture
        return true;
      }
    }

    return false;
  }

  /**
   * Calculate focus score from face detections
   * @param {Array} faces - Array of detected faces
   * @returns {number} - Focus score (0-1)
   */
  calculateFocusScore(faces) {
    if (!faces || faces.length === 0) return 0;

    // Use the face with highest confidence
    const bestFace = faces.reduce((best, face) => {
      const confidence = face.rollAngle !== undefined ? 1 : 0.5;
      return confidence > best.confidence ? { face, confidence } : best;
    }, { face: null, confidence: 0 });

    // Additional checks for focus quality
    const face = bestFace.face;
    if (!face) return 0;

    let score = bestFace.confidence;

    // Penalize if face is too small (likely far away)
    const faceSize = face.bounds ? face.bounds.size.width * face.bounds.size.height : 0;
    if (faceSize < 10000) {
      score *= 0.7;
    }

    // Bonus if eyes are detected (indicates good focus)
    if (face.leftEyePosition && face.rightEyePosition) {
      score = Math.min(1, score * 1.2);
    }

    return score;
  }

  /**
   * Check if subject has minimal movement (stable for capture)
   * @param {Array} faces - Current frame faces
   * @param {Array} previousFaces - Previous frame faces
   * @returns {boolean} - True if movement is minimal
   */
  checkStability(faces, previousFaces) {
    if (!faces || !previousFaces || faces.length !== previousFaces.length) {
      return false;
    }

    // Compare face positions
    for (let i = 0; i < faces.length; i++) {
      const currentFace = faces[i];
      const previousFace = previousFaces[i];

      if (!currentFace.bounds || !previousFace.bounds) continue;

      const deltaX = Math.abs(currentFace.bounds.origin.x - previousFace.bounds.origin.x);
      const deltaY = Math.abs(currentFace.bounds.origin.y - previousFace.bounds.origin.y);

      // If movement exceeds threshold, not stable
      if (deltaX > 20 || deltaY > 20) {
        return false;
      }
    }

    return true;
  }

  /**
   * Reset the detector state
   */
  reset() {
    this.frameHistory = [];
  }
}
