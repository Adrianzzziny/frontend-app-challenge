import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TextInputProps, 
  Platform, 
  InputAccessoryView, 
  Keyboard, 
  TouchableOpacity 
} from 'react-native';

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
  keyboardType,
  ...props 
}: BaseInputProps) {
  
  const inputAccessoryViewID = `accessory-${label ? label.replace(/\s+/g, '') : Math.random().toString()}`;

  const needsAccessoryBar = Platform.OS === 'ios' && (keyboardType === 'numeric' || keyboardType === 'phone-pad');

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
          keyboardType={keyboardType} // <-- Lo volvemos a pasar
          inputAccessoryViewID={needsAccessoryBar ? inputAccessoryViewID : undefined} // <-- 3. Le pasamos el ID
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

      {/* 4. LA BARRA DE HERRAMIENTAS NATIVA PARA IOS */}
      {needsAccessoryBar && (
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View className="bg-[#F2F2F7] border-t border-gray-300 flex-row justify-end px-4 py-2.5 shadow-sm">
            <TouchableOpacity onPress={() => Keyboard.dismiss()}>
              <Text className="text-[#007AFF] font-semibold text-[17px]">Aceptar</Text>
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      )}
    </View>
  );
}