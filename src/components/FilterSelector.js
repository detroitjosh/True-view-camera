import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const FILTERS = [
  { id: 'none', name: 'Original', preview: '📷' },
  { id: 'vivid', name: 'Vivid', preview: '🌈' },
  { id: 'warm', name: 'Warm', preview: '🔥' },
  { id: 'cool', name: 'Cool', preview: '❄️' },
  { id: 'bw', name: 'B&W', preview: '⬛' },
  { id: 'vintage', name: 'Vintage', preview: '📜' },
  { id: 'dramatic', name: 'Dramatic', preview: '⚡' },
  { id: 'natural', name: 'Natural', preview: '🌿' },
];

export default function FilterSelector({ selectedFilter, onFilterSelect, imageUri }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filters</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterItem,
              selectedFilter === filter.id && styles.filterItemActive,
            ]}
            onPress={() => onFilterSelect(filter.id)}
          >
            <View style={styles.filterPreview}>
              <Text style={styles.filterEmoji}>{filter.preview}</Text>
            </View>
            <Text
              style={[
                styles.filterName,
                selectedFilter === filter.id && styles.filterNameActive,
              ]}
            >
              {filter.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  scrollView: {
    marginHorizontal: -5,
  },
  filterItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  filterItemActive: {
    borderColor: '#e94560',
    backgroundColor: 'rgba(233, 69, 96, 0.2)',
  },
  filterPreview: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  filterEmoji: {
    fontSize: 30,
  },
  filterName: {
    fontSize: 12,
    color: '#b8b8d1',
    fontWeight: '600',
  },
  filterNameActive: {
    color: '#e94560',
  },
});
