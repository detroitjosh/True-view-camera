import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CountdownOverlay({ count }) {
  return (
    <View style={styles.container}>
      <View style={styles.countdownCircle}>
        <Text style={styles.countdownText}>{count}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  countdownCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(233, 69, 96, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#fff',
  },
  countdownText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#fff',
  },
});
