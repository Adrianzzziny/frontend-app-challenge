import React from 'react';
import { ScrollView, View } from 'react-native';
import LoginForm from '../src/features/1_Auth/components/LoginForm';

export default function LoginScreen() {
  return (
    <ScrollView 
      className="bg-white flex-1"
      contentContainerStyle={{ flexGrow: 1, paddingTop: 100, paddingBottom: 40 }} 
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center pb-12">
      
      <LoginForm />
      
    </View>
      </ScrollView>
  );
}