import React from 'react';
import { Platform, KeyboardAvoidingView } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f6f8' }}>
        <StatusBar style="dark" />
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          {/* El Stack maneja la navegación */}
          <Stack screenOptions={{ headerShown: false }} />
        </KeyboardAvoidingView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}