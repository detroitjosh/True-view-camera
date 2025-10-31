import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import VisionCameraScreen from './src/screens/VisionCameraScreen';
import EditScreen from './src/screens/EditScreen';
import AIGenerateScreen from './src/screens/AIGenerateScreen';
import GalleryScreen from './src/screens/GalleryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'TrueView Camera' }}
        />
        <Stack.Screen 
          name="Camera" 
          component={VisionCameraScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Edit" 
          component={EditScreen}
          options={{ title: 'Edit Photo' }}
        />
        <Stack.Screen 
          name="AIGenerate" 
          component={AIGenerateScreen}
          options={{ title: 'AI Generation' }}
        />
        <Stack.Screen 
          name="Gallery" 
          component={GalleryScreen}
          options={{ title: 'Gallery' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
