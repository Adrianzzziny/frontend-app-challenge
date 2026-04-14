import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface BaseInputProps extends TextInputProps {
  label?: string;
  error?: string;
  suffix?: React.ReactNode;
}

export default function BaseInput({ 
  label, 
  error, 
  suffix, 
  className, 
  ...props 
}: BaseInputProps) {
  return (
    <View className="w-full">
      {label && (
        <Text className="text-sm font-medium text-gray-600 mb-1.5">
          {label}
        </Text>
      )}

      {/* Contenedor del Input y el Suffix */}
      <View className="relative justify-center">
        <TextInput
          className={`w-full px-4 py-3 bg-white rounded-lg border text-gray-800 ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${suffix ? 'pr-12' : ''} ${className}`}
          placeholderTextColor="#9CA3AF"
          {...props}
        />
        
        {suffix && (
          <View className="absolute right-0 top-0 bottom-4 justify-center items-center px-3">
            {suffix}
          </View>
        )}
      </View>

      {/* Mensaje de Error */}
      {error && (
        <Text className="mt-1.5 text-xs text-red-500 font-medium">
          {error}
        </Text>
      )}
    </View>
  );
}