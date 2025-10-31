/**
 * RealTonePanel - UI component for Real-Tone settings and controls
 * Allows users to toggle and configure Real-Tone features
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { MONK_SKIN_TONE_SCALE } from '../utils/RealToneProcessor';

export default function RealTonePanel({ 
  realToneEnabled, 
  onToggleRealTone,
  currentSettings = {},
  onSettingsChange,
  detectedSkinTone = null,
  style 
}) {
  const renderSkinToneIndicator = () => {
    if (!detectedSkinTone) return null;

    return (
      <View style={styles.detectionContainer}>
        <Text style={styles.detectionLabel}>Detected Skin Tone:</Text>
        <View style={styles.toneInfo}>
          <View 
            style={[
              styles.toneColor, 
              { backgroundColor: `rgb(${detectedSkinTone.rgb[0]}, ${detectedSkinTone.rgb[1]}, ${detectedSkinTone.rgb[2]})` }
            ]} 
          />
          <Text style={styles.toneName}>
            MST-{detectedSkinTone.id}: {detectedSkinTone.name}
          </Text>
        </View>
        <Text style={styles.exposureInfo}>
          Exposure Boost: +{detectedSkinTone.exposureBoost} EV
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Real-Tone Processing</Text>
          <Text style={styles.subtitle}>Inclusive imaging for all skin tones</Text>
        </View>
        <Switch
          value={realToneEnabled}
          onValueChange={onToggleRealTone}
          trackColor={{ false: '#555', true: '#4CAF50' }}
          thumbColor={realToneEnabled ? '#fff' : '#ccc'}
        />
      </View>

      {realToneEnabled && (
        <View style={styles.content}>
          {renderSkinToneIndicator()}

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>📷 What is Real-Tone?</Text>
            <Text style={styles.infoText}>
              Real-Tone technology ensures accurate and beautiful representation 
              of all skin tones, especially darker complexions. Based on the 
              Monk Skin Tone Scale (MST), it automatically adjusts:
            </Text>
            <View style={styles.featureList}>
              <Text style={styles.featureItem}>✓ Exposure for optimal brightness</Text>
              <Text style={styles.featureItem}>✓ White balance for natural colors</Text>
              <Text style={styles.featureItem}>✓ Shadow detail preservation</Text>
              <Text style={styles.featureItem}>✓ Highlight protection</Text>
            </View>
          </View>

          <View style={styles.scaleSection}>
            <Text style={styles.scaleTitle}>Monk Skin Tone Scale (MST)</Text>
            <Text style={styles.scaleSubtitle}>10-shade inclusive scale</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.scaleScroll}
            >
              {Object.values(MONK_SKIN_TONE_SCALE).map((tone) => (
                <View key={tone.id} style={styles.scaleItem}>
                  <View 
                    style={[
                      styles.scaleColor,
                      { backgroundColor: `rgb(${tone.rgb[0]}, ${tone.rgb[1]}, ${tone.rgb[2]})` },
                      detectedSkinTone?.id === tone.id && styles.scaleColorActive
                    ]}
                  />
                  <Text style={styles.scaleLabel}>{tone.id}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 15,
    padding: 15,
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#b8b8d1',
    fontSize: 12,
    marginTop: 2,
  },
  content: {
    marginTop: 10,
  },
  detectionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  detectionLabel: {
    color: '#b8b8d1',
    fontSize: 12,
    marginBottom: 8,
  },
  toneInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  toneColor: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  toneName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  exposureInfo: {
    color: '#4CAF50',
    fontSize: 14,
    marginTop: 4,
  },
  infoSection: {
    marginBottom: 15,
  },
  infoTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    color: '#b8b8d1',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  featureList: {
    marginLeft: 10,
  },
  featureItem: {
    color: '#b8b8d1',
    fontSize: 13,
    marginBottom: 4,
  },
  scaleSection: {
    marginTop: 10,
  },
  scaleTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  scaleSubtitle: {
    color: '#b8b8d1',
    fontSize: 12,
    marginBottom: 10,
  },
  scaleScroll: {
    marginHorizontal: -5,
  },
  scaleItem: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  scaleColor: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  scaleColorActive: {
    borderColor: '#4CAF50',
    borderWidth: 3,
  },
  scaleLabel: {
    color: '#b8b8d1',
    fontSize: 11,
  },
});
