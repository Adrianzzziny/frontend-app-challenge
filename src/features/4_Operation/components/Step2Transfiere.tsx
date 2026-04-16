import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import { useOperationStore } from '../../3_Dashboard/store/operation.store';
import iconoTransfiere from '../../../../assets/images/iconoTransfiere.png';

export default function Step2Transfiere() {
  const router = useRouter();
  const { calculatorData, selectedOriginBank } = useOperationStore();
  const [expirationTime, setExpirationTime] = useState('');

  const sendAmt = calculatorData?.sendAmount || '0.00';
  const sendCurr = calculatorData?.sendCurrency === 'Dólares' ? '$' : 'S/';
  const bankName = selectedOriginBank || 'Interbank';

  useEffect(() => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 15);
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    setExpirationTime(`${hours}:${minutes}`);
  }, []);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await Clipboard.setStringAsync(text);
      Alert.alert('¡Copiado!', `${label} copiado al portapapeles.`);
    } catch (err) {
      console.error('Error al copiar: ', err);
    }
  };

  return (
    <View className="flex-1 bg-[#f5f6f8]">
      {/* HEADER NAVEGACIÓN */}
      <View className="bg-white px-5 pt-4 pb-2 flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 z-10" activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#011B33" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-[#011B33] -ml-8">
          Transfiere a Kambista
        </Text>
      </View>

      <View className="flex-1 px-5">
        
        {/* BARRA DE PROGRESO */}
        <View className="flex-row items-center justify-between mt-2 mb-4 px-2 relative">
          
          <View className="absolute top-1.5 left-8 right-10 h-0.5 flex-row z-0 overflow-hidden">
            <View className="flex-1 bg-[#011B33]" />
            <View className="flex-1 bg-gray-300" />
          </View>
          
          <View className="items-center z-10">
            <View className="w-3 h-3 rounded-full bg-[#011B33] mb-2" />
            <Text className="text-[11px] font-bold text-[#011B33]">Completa</Text>
          </View>
          <View className="items-center z-10">
            <View className="w-3 h-3 rounded-full bg-[#011B33] mb-2" />
            <Text className="text-[11px] font-bold text-[#011B33]">Transfiere</Text>
          </View>
          <View className="items-center z-10">
            <View className="w-3 h-3 rounded-full bg-gray-300 mb-2" />
            <Text className="text-[11px] font-medium text-gray-400">Constancia</Text>
          </View>
        </View>

        {/* TIEMPO DE EXPIRACIÓN */}
        <Text className="text-[12px] text-gray-500 text-center mb-3">
          El tipo de cambio podría actualizarse a las: 
          <Text className="font-bold text-[#011B33] text-[14px] ml-1"> {expirationTime}</Text>
        </Text>

        {/* TARJETA PRINCIPAL */}
        <View className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-100 items-center">
          
          {/* ICONO */}
          <View className="w-20 h-20 mb-4 items-center justify-center">
            <Image 
            source={iconoTransfiere} 
            style={{ width: 68, height: 74 }}
            resizeMode="contain" 
            />
        </View>

          <Text className="text-[15px] text-gray-600 text-center leading-snug mb-3 px-2 font-normal">
            Transfiere desde tu app bancaria y guarda el{' '}
            <Text
              className={`font-bold text-[#011B33] ${
                Platform.OS === 'android'
                  ? 
                    'border-b-[1.5px] border-[#011B33] pb-[0.5px]'
                  : 
                    'underline'
              }`}
            >
              número o código de operación
            </Text>{' '}
            para el siguiente paso.
          </Text>

          {/* CAJA DE DATOS BANCARIOS */}
          <View className="border border-gray-300 rounded-xl p-4 w-full space-y-1.5">
            
            <View>
              <Text className="text-xs text-gray-500 font-medium mb-0.5">Banco</Text>
              <Text className="text-[15px] font-bold text-[#011B33]">{bankName}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-xs text-gray-500 font-medium mb-0.5">Monto</Text>
                <Text className="text-[15px] font-bold text-[#011B33]">{sendCurr} {sendAmt}</Text>
              </View>
              <TouchableOpacity onPress={() => copyToClipboard(sendAmt, 'Monto')} className="p-2" activeOpacity={0.7}>
                <Ionicons name="copy-outline" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-xs text-gray-500 font-medium mb-0.5">Número de cuenta</Text>
                <Text className="text-[15px] font-bold text-[#011B33]">201010000000000</Text>
              </View>
              <TouchableOpacity onPress={() => copyToClipboard('201010000000000', 'Número de cuenta')} className="p-2" activeOpacity={0.7}>
                <Ionicons name="copy-outline" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-xs text-gray-500 font-medium mb-0.5">RUC</Text>
                <Text className="text-[15px] font-bold text-[#011B33]">20601708141</Text>
              </View>
              <TouchableOpacity onPress={() => copyToClipboard('20601708141', 'RUC')} className="p-2" activeOpacity={0.7}>
                <Ionicons name="copy-outline" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            <View>
              <Text className="text-xs text-gray-500 font-medium mb-0.5">Titular de la cuenta</Text>
              <Text className="text-[15px] font-bold text-[#011B33]">Kambista SAC</Text>
            </View>

            <View>
              <Text className="text-xs text-gray-500 font-medium mb-0.5">Tipo de cuenta</Text>
              <Text className="text-[15px] font-bold text-[#011B33]">Corriente</Text>
            </View>

          </View>
        </View>

        {/* BOTÓN CONTINUAR */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => router.push('/operacion/constancia')}
          className="w-full bg-[#00E3C2] py-4 rounded-lg flex-row justify-center items-center mt-1 mb-8 shadow-sm"
        >
          <Text className="font-bold text-[#060F26] uppercase">Ya hice mi transferencia</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}