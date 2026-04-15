import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import RegisterForm from '../src/features/1_Auth/components/RegisterForm';

export default function RegistroScreen() {
  return (
    <View className="flex-1">
      <RegisterForm />
    </View>
  );
}