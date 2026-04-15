import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../1_Auth/store/auth.store';

export default function SuccessMessage() {
  const { userFirstName } = useAuthStore();
  const firstName = userFirstName();
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center px-6 bg-white">
      <Image 
        source={{ uri: 'https://app.kambista.com/_nuxt/img/phone-kambista.a884cba.png' }} 
        style={{ width: 90, height: 150, marginBottom: 24 }}
        resizeMode="contain"
      />

      <Text className="text-2xl font-semibold text-gray-700 mb-2 text-center">
        ¡Felicitaciones!
      </Text>
      <Text className="text-lg text-gray-600 mb-10 text-center">
        {firstName}, tu cuenta ha sido creada
      </Text>

      <TouchableOpacity 
        activeOpacity={0.8}
        className="w-full bg-[#14E2B1] py-4 rounded-lg shadow-sm"
        onPress={() => router.replace('/inicio')}
      >
        <Text className="text-center font-bold text-[#011B33]">CONTINUAR</Text>
      </TouchableOpacity>
    </View>
  );
}