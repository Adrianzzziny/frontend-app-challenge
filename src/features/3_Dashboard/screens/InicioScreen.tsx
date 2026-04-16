import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../1_Auth/store/auth.store';
import CurrencyCalculator from '../components/CurrencyCalculator';
import DashboardBottomNav from '../components/DashboardBottomNav';
import logoKambistaBlanco from '../../../../assets/images/logoKambistaBlanco.png';

export default function InicioScreen() {
  const { userFirstName, logout } = useAuthStore();

  return (
    <View className="flex-1 bg-[#f5f6f8] relative">
      
      {/* HEADER TIPO TARJETA BLANCA */}
      <View className="bg-[#060F26] px-5 pt-4 pb-3 shadow-sm z-10 flex-row justify-between items-center">
        <Image 
          source={logoKambistaBlanco}
          style={{ width: 100, height: 30 }} 
          resizeMode="contain" 
        />
        
        <View className="flex-row items-center gap-3">
          
          <TouchableOpacity className="flex-row items-center gap-1 border-l border-gray-200 pl-3">
            <View className="w-7 h-7 rounded-full border border-[#14E2B1] items-center justify-center bg-gray-50">
              <Ionicons name="person" size={14} color="#9CA3AF" />
            </View>
            <Text className="text-[12px] font-semibold text-white uppercase">
              {userFirstName() || 'Usuario'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CUERPO CENTRAL */}
      <View className="flex-1 px-4 items-center justify-center pb-[85px]">
        <CurrencyCalculator />
      </View>

      {/* BOTTOM NAV BAR */}
      <DashboardBottomNav activeRoute="inicio" />

    </View>
  );
}