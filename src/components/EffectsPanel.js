import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function EffectsPanel({
  brightness,
  contrast,
  saturation,
  onBrightnessChange,
  onContrastChange,
  onSaturationChange,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adjustments</Text>
      
      <View style={styles.sliderContainer}>
        <View style={styles.sliderHeader}>
          <Text style={styles.sliderLabel}>☀️ Brightness</Text>
          <Text style={styles.sliderValue}>{Math.round(brightness * 100)}%</Text>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.adjustButton} onPress={() => onBrightnessChange(Math.max(0, brightness - 0.1))}>
            <Text style={styles.adjustButtonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.valueDisplay}>
            <View style={[styles.progressBar, { width: `${(brightness / 2) * 100}%` }]} />
          </View>
          <TouchableOpacity style={styles.adjustButton} onPress={() => onBrightnessChange(Math.min(2, brightness + 0.1))}>
            <Text style={styles.adjustButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <View style={styles.sliderHeader}>
          <Text style={styles.sliderLabel}>🎭 Contrast</Text>
          <Text style={styles.sliderValue}>{Math.round(contrast * 100)}%</Text>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.adjustButton} onPress={() => onContrastChange(Math.max(0, contrast - 0.1))}>
            <Text style={styles.adjustButtonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.valueDisplay}>
            <View style={[styles.progressBar, { width: `${(contrast / 2) * 100}%` }]} />
          </View>
          <TouchableOpacity style={styles.adjustButton} onPress={() => onContrastChange(Math.min(2, contrast + 0.1))}>
            <Text style={styles.adjustButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <View style={styles.sliderHeader}>
          <Text style={styles.sliderLabel}>🌈 Saturation</Text>
          <Text style={styles.sliderValue}>{Math.round(saturation * 100)}%</Text>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.adjustButton} onPress={() => onSaturationChange(Math.max(0, saturation - 0.1))}>
            <Text style={styles.adjustButtonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.valueDisplay}>
            <View style={[styles.progressBar, { width: `${(saturation / 2) * 100}%` }]} />
          </View>
          <TouchableOpacity style={styles.adjustButton} onPress={() => onSaturationChange(Math.min(2, saturation + 0.1))}>
            <Text style={styles.adjustButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  sliderContainer: {
    marginBottom: 15,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sliderLabel: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  sliderValue: {
    fontSize: 14,
    color: '#e94560',
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  adjustButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(233, 69, 96, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e94560',
  },
  adjustButtonText: {
    color: '#e94560',
    fontSize: 24,
    fontWeight: 'bold',
  },
  valueDisplay: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#e94560',
    borderRadius: 4,
  },
});
