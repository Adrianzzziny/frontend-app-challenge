import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useOperationStore } from '../../3_Dashboard/store/operation.store';

import iconExito from '../../../../assets/images/iconConstanciaEnviada.png';
import bannerExito from '../../../../assets/images/bannerExito.png';

export default function Step4Exito() {
  const router = useRouter();
  const { calculatorData, clearOperation } = useOperationStore();

  const [transactionCode] = useState(() => 'km' + Math.random().toString(36).substring(2, 8));

  // Datos del store
  const receiveAmt = calculatorData?.receiveAmount || '0.00';
  const receiveCurr = calculatorData?.receiveCurrency === 'Soles' ? 'S/' : '$';

  const handleGoHome = () => {
    clearOperation();
    router.replace('/inicio');
  };

  useEffect(() => {
    const onBackPress = () => {
      handleGoHome();
      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => subscription.remove();
  }, []);

  return (
    <View className="flex-1 bg-[#f5f6f8]">
      
      <Stack.Screen 
        options={{
          gestureEnabled: false, 
          headerBackVisible: false, 
        }} 
      />

      <View className="flex-1 px-5 mt-14">
        
        {/* TARJETA PRINCIPAL BLANCA */}
        <View className="bg-white rounded-xl shadow-sm p-5 mb-4 border border-gray-100">
          
          {/* ICONO DEL CHANCHITO */}
          <View className="w-28 h-28 mx-auto mb-1 items-center justify-center">
            <Image 
              source={iconExito} 
              style={{ width: 100, height: 100 }} 
              resizeMode="contain" 
            />
          </View>

          {/* TÍTULO */}
          <View className="border-b border-gray-400 pb-4 mb-5">
            <Text className="text-xl font-bold text-[#011B33] text-center">
              ¡Constancia enviada!
            </Text>
          </View>

          {/* DETALLES DE LA OPERACIÓN */}
          <View className="space-y-4">
            
            <View>
              <Text className="text-xs text-gray-500 font-medium mb-0.5">Código Kambista</Text>
              <Text className="text-[15px] font-bold text-[#011B33] mb-1">{transactionCode}</Text>
              <Text className="text-[11px] text-[#011B33] leading-tight font-medium">
                *Usa tu código para dar seguimiento a tu operación.
              </Text>
            </View>

            <View>
              <Text className="text-xs text-gray-500 font-medium mb-0.5">Monto a recibir</Text>
              <Text className="text-[15px] font-bold text-[#011B33]">
                {receiveCurr} {receiveAmt}
              </Text>
            </View>

            <View>
              <Text className="text-xs text-gray-500 font-medium mb-0.5">Tiempo estimado de espera</Text>
              <Text className="text-[15px] font-bold text-[#011B33]">20h 15min</Text>
            </View>

          </View>
        </View>

        {/* BANNER PROMOCIONAL */}
        <TouchableOpacity activeOpacity={0.9} className="w-full h-24 rounded-xl mb-6 overflow-hidden">
          <Image 
            source={bannerExito} 
            className="w-full h-full"
            resizeMode="cover"
          />
        </TouchableOpacity>

        {/* TEXTO INFORMATIVO */}
        <Text className="text-[13px] text-gray-600 text-center leading-relaxed px-4 mb-8">
          Verificaremos tu operación. Puedes ver su estado en "Mis operaciones".
        </Text>

        {/* BOTÓN VOLVER */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={handleGoHome}
          className="w-full bg-[#00E3C2] py-4 rounded-lg shadow-sm"
        >
          <Text className="text-center font-bold text-[#060F26] uppercase">
            Volver a inicio
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}