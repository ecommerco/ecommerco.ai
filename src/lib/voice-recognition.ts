/**
 * Voice Recognition - Extract voice features
 * Client-side voice feature extraction
 */

/**
 * Extract voice features from audio blob
 * This creates a "voiceprint" - unique characteristics of the voice
 */
export async function extractVoiceFeatures(audioBlob: Blob): Promise<number[]> {
  try {
    // Convert audio blob to ArrayBuffer
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioData = new Float32Array(arrayBuffer);

    // Extract basic voice features
    // In production, you'd use more advanced algorithms
    const features: number[] = [];

    // 1. Calculate mean (average amplitude)
    let sum = 0;
    for (let i = 0; i < audioData.length; i++) {
      sum += Math.abs(audioData[i]);
    }
    features.push(sum / audioData.length);

    // 2. Calculate standard deviation
    const mean = features[0];
    let variance = 0;
    for (let i = 0; i < audioData.length; i++) {
      variance += Math.pow(Math.abs(audioData[i]) - mean, 2);
    }
    features.push(Math.sqrt(variance / audioData.length));

    // 3. Calculate zero crossing rate (voice characteristic)
    let zeroCrossings = 0;
    for (let i = 1; i < audioData.length; i++) {
      if ((audioData[i - 1] >= 0 && audioData[i] < 0) || 
          (audioData[i - 1] < 0 && audioData[i] >= 0)) {
        zeroCrossings++;
      }
    }
    features.push(zeroCrossings / audioData.length);

    // 4. Calculate energy (power)
    let energy = 0;
    for (let i = 0; i < audioData.length; i++) {
      energy += Math.pow(audioData[i], 2);
    }
    features.push(energy / audioData.length);

    // 5. Calculate spectral features (simplified)
    // Fast Fourier Transform would be better, but this is simpler
    const fftSize = 2048;
    const samples = Math.min(audioData.length, fftSize);
    
    // Calculate frequency domain features
    let maxFreq = 0;
    let minFreq = Infinity;
    let avgFreq = 0;
    
    for (let i = 0; i < samples; i++) {
      const freq = Math.abs(audioData[i]) * 44100 / samples; // Assuming 44.1kHz sample rate
      maxFreq = Math.max(maxFreq, freq);
      minFreq = Math.min(minFreq, freq);
      avgFreq += freq;
    }
    avgFreq /= samples;

    features.push(maxFreq);
    features.push(minFreq);
    features.push(avgFreq);

    // 6. Add more statistical features
    // Percentiles
    const sorted = Array.from(audioData).map(Math.abs).sort((a, b) => a - b);
    features.push(sorted[Math.floor(sorted.length * 0.25)]); // 25th percentile
    features.push(sorted[Math.floor(sorted.length * 0.5)]);  // 50th percentile (median)
    features.push(sorted[Math.floor(sorted.length * 0.75)]); // 75th percentile

    // 7. Duration-based features
    const duration = audioBlob.size / (44100 * 2); // Approximate duration
    features.push(duration);

    // Normalize features to 0-1 range for better comparison
    const normalizedFeatures = features.map(f => {
      // Simple normalization (in production, use proper scaling)
      return Math.min(1, Math.max(0, f / 1000));
    });

    // Pad or trim to fixed size (128 features like face descriptor)
    const targetSize = 128;
    while (normalizedFeatures.length < targetSize) {
      normalizedFeatures.push(0);
    }
    return normalizedFeatures.slice(0, targetSize);

  } catch (error) {
    console.error('Voice feature extraction error:', error);
    // Return default features if extraction fails
    return new Array(128).fill(0.5);
  }
}

/**
 * Compare two voice features
 * Returns distance (lower = more similar)
 */
export function compareVoiceFeatures(
  features1: number[],
  features2: number[]
): number {
  if (features1.length !== features2.length) {
    return Infinity;
  }

  let distance = 0;
  for (let i = 0; i < features1.length; i++) {
    distance += Math.pow(features1[i] - features2[i], 2);
  }
  return Math.sqrt(distance);
}

/**
 * Check if two voices match (threshold: 0.5)
 */
export function voicesMatch(
  features1: number[],
  features2: number[],
  threshold: number = 0.5
): boolean {
  const distance = compareVoiceFeatures(features1, features2);
  return distance < threshold;
}
