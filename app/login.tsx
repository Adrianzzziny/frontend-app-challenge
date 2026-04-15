import React from 'react';
import { View, Image } from 'react-native';
import LoginForm from '../src/features/1_Auth/components/LoginForm';

export default function LoginScreen() {
  return (
    <View className="flex-1 justify-center pb-12">
      
      <LoginForm />
      
    </View>
  );
}