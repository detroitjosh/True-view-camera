import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';

const SOCIAL_PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: '📷', color: '#E4405F' },
  { id: 'facebook', name: 'Facebook', icon: '👍', color: '#1877F2' },
  { id: 'twitter', name: 'Twitter', icon: '🐦', color: '#1DA1F2' },
  { id: 'snapchat', name: 'Snapchat', icon: '👻', color: '#FFFC00' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', color: '#000000' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬', color: '#25D366' },
  { id: 'messenger', name: 'Messenger', icon: '💬', color: '#0084FF' },
  { id: 'more', name: 'More', icon: '⋯', color: '#666666' },
];

export default function SocialSharePanel({ onShare }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {SOCIAL_PLATFORMS.map((platform) => (
        <TouchableOpacity
          key={platform.id}
          style={styles.platformButton}
          onPress={() => onShare(platform.id)}
        >
          <View style={[styles.iconContainer, { backgroundColor: platform.color }]}>
            <Text style={styles.icon}>{platform.icon}</Text>
          </View>
          <Text style={styles.platformName}>{platform.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: -5,
  },
  platformButton: {
    alignItems: 'center',
    marginHorizontal: 8,
    padding: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    fontSize: 30,
  },
  platformName: {
    fontSize: 11,
    color: '#b8b8d1',
    fontWeight: '600',
  },
});
