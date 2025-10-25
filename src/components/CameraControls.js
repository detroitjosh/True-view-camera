import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function CameraControls({
  onCapture,
  onStartRecording,
  onStopRecording,
  isRecording,
  onFlipCamera,
  onToggleFlash,
  onCountdown,
  onToggleAutoCapture,
  autoCaptureEnabled,
  onClose,
  currentFilter,
  onFilterChange,
}) {
  return (
    <View style={styles.container}>
      {/* Top Controls */}
      <View style={styles.topControls}>
        <TouchableOpacity style={styles.topButton} onPress={onClose}>
          <Text style={styles.topButtonText}>✕</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton} onPress={onToggleFlash}>
          <Text style={styles.topButtonText}>⚡</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.topButton, autoCaptureEnabled && styles.topButtonActive]}
          onPress={onToggleAutoCapture}
        >
          <Text style={styles.topButtonText}>🎯</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Preview */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FilterButton
            name="None"
            isActive={currentFilter === 'none'}
            onPress={() => onFilterChange('none')}
          />
          <FilterButton
            name="Vivid"
            isActive={currentFilter === 'vivid'}
            onPress={() => onFilterChange('vivid')}
          />
          <FilterButton
            name="Warm"
            isActive={currentFilter === 'warm'}
            onPress={() => onFilterChange('warm')}
          />
          <FilterButton
            name="Cool"
            isActive={currentFilter === 'cool'}
            onPress={() => onFilterChange('cool')}
          />
          <FilterButton
            name="B&W"
            isActive={currentFilter === 'bw'}
            onPress={() => onFilterChange('bw')}
          />
        </ScrollView>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.sideButton} onPress={onFlipCamera}>
          <Text style={styles.sideButtonText}>🔄</Text>
        </TouchableOpacity>

        <View style={styles.captureContainer}>
          {!isRecording ? (
            <>
              <TouchableOpacity style={styles.captureButton} onPress={onCapture}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.recordButton}
                onPress={onStartRecording}
                onLongPress={onStartRecording}
              >
                <View style={styles.recordButtonInner} />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.stopButton} onPress={onStopRecording}>
              <View style={styles.stopButtonInner} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.sideButton} onPress={onCountdown}>
          <Text style={styles.sideButtonText}>⏱️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function FilterButton({ name, isActive, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.filterButton, isActive && styles.filterButtonActive]}
      onPress={onPress}
    >
      <Text style={[styles.filterButtonText, isActive && styles.filterButtonTextActive]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
  },
  topButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topButtonActive: {
    backgroundColor: '#e94560',
  },
  topButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  filterContainer: {
    position: 'absolute',
    bottom: 150,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  filterButtonActive: {
    backgroundColor: 'rgba(233, 69, 96, 0.5)',
    borderColor: '#e94560',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  sideButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideButtonText: {
    fontSize: 28,
    color: '#fff',
  },
  captureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  captureButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
  },
  recordButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  recordButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e94560',
  },
  stopButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  stopButtonInner: {
    width: 40,
    height: 40,
    backgroundColor: '#e94560',
  },
});
