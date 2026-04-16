import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';

import iconConstancia from '../../../../assets/images/iconConstancia.png'; 

export default function Step3Constancia() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'image/*', 
          'application/pdf', 
          'application/msword', 
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        
        if (file.size && file.size > 10485760) {
          setErrorMessage('El archivo es demasiado grande (Máximo 10 MB).');
          setSelectedFile(null);
        } else {
          setErrorMessage('');
          setSelectedFile(file);
        }
      }
    } catch (error) {
      console.error('Error al seleccionar documento:', error);
    }
  };

  const onSubmit = () => {
    if (selectedFile) {
      console.log('Archivo listo para enviar a la API:', selectedFile.name);
      router.push('/operacion/exito');
    }
  };

  return (
    <View className="flex-1 bg-[#f5f6f8]">
      {/* HEADER */}
      <View className="bg-white px-5 pt-4 pb-1 flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 z-10" activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#011B33" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-[#011B33] -ml-8">
          Envía tu constancia
        </Text>
      </View>

      <View className="flex-1 px-5">
        
        {/* BARRA DE PROGRESO */}
        <View className="flex-row items-center justify-between mt-2 mb-4 px-2 relative">
          <View className="absolute top-1.5 left-8 right-10 h-0.5 bg-gray-300 z-0" />
          <View className="absolute top-1.5 left-8 right-10 h-0.5 bg-[#011B33] z-0" />
          
          <View className="items-center z-10">
            <View className="w-3 h-3 rounded-full bg-[#011B33] mb-2" />
            <Text className="text-[11px] font-bold text-[#011B33]">Completa</Text>
          </View>
          <View className="items-center z-10">
            <View className="w-3 h-3 rounded-full bg-[#011B33] mb-2" />
            <Text className="text-[11px] font-bold text-[#011B33]">Transfiere</Text>
          </View>
          <View className="items-center z-10">
            <View className="w-3 h-3 rounded-full bg-[#011B33] mb-2" />
            <Text className="text-[11px] font-bold text-[#011B33]">Constancia</Text>
          </View>
        </View>

        {/* TARJETA PRINCIPAL */}
        <View className="bg-white rounded-xl shadow-sm p-5 mb-8 border border-gray-100">
          
          {/* ILUSTRACIÓN */}
          <View className="w-24 h-24 mx-auto mb-2 items-center justify-center">
            <Image 
              source={iconConstancia} 
              style={{ width: 120, height: 120 }} 
              resizeMode="contain" 
            />
          </View>

          <Text className="text-[15px] text-gray-600 text-center leading-relaxed mb-4 px-2">
            Adjunta la constancia de tu transferencia para poder verificar tu operación.
          </Text>

          {/* CAJA DE SUBIDA DE ARCHIVO */}
          <View className="border border-gray-200 rounded-xl p-5 mb-4">
            <Text className="text-[13px] text-[#011B33] font-medium mb-3">
              Sube el archivo de tu constancia
            </Text>
            
            <TouchableOpacity 
              onPress={pickDocument}
              activeOpacity={0.7}
              className={`w-full border rounded-lg p-3 bg-white flex-row justify-between items-center ${
                errorMessage ? 'border-red-400' : 'border-gray-300'
              }`}
            >
              <Text 
                className={`flex-1 pr-2 truncate ${selectedFile ? 'text-[#011B33] font-medium' : 'text-gray-400'}`}
                numberOfLines={1}
              >
                {selectedFile ? selectedFile.name : 'Selecciona archivo'}
              </Text>
              <Ionicons name="image-outline" size={20} color="#011B33" />
            </TouchableOpacity>
            
            {errorMessage ? (
              <Text className="text-[11px] text-red-500 mt-2">{errorMessage}</Text>
            ) : (
              <Text className="text-[11px] text-gray-400 mt-2">*Tamaño máximo permitido del archivo 10 Mb</Text>
            )}
          </View>

          {/* REGLAS */}
          <View className="text-gray-600">
            <Text className="text-[13px] text-gray-600 mb-2">Recuerda:</Text>
            
            <View className="flex-row items-start mb-1 pr-4">
              <Text className="text-[15px] text-gray-500 mr-2">•</Text>
              <Text className="text-[13px] text-gray-600 leading-tight">
                El voucher enviado debe tener el <Text className="font-bold text-[#011B33]">monto, datos del beneficiario, fecha y hora.</Text>
              </Text>
            </View>
            
            <View className="flex-row items-start mb-1 pr-4">
              <Text className="text-[15px] text-gray-500 mr-2">•</Text>
              <Text className="text-[13px] text-gray-600 leading-tight">
                El voucher debe ser legible
              </Text>
            </View>
            
            <View className="flex-row items-start pr-4">
              <Text className="text-[15px] text-gray-500 mr-2">•</Text>
              <Text className="text-[13px] text-gray-600 leading-tight">
                Archivos permitidos <Text className="font-bold text-[#011B33]">imágenes, word y PDF</Text>
              </Text>
            </View>
          </View>

        </View>

        {/* BOTÓN ENVIAR */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={onSubmit}
          disabled={!selectedFile}
          className={`w-full py-4 rounded-lg flex-row justify-center items-center mb-10 shadow-sm ${
            !selectedFile ? 'bg-[#B2E7DF]' : 'bg-[#00E3C2]'
          }`}
        >
          <Text className="font-bold text-[#060F26] uppercase">Enviar Constancia</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}