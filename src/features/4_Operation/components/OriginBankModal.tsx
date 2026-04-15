import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import banksMock from '../../../mocks/bankAccounts.json';

interface OriginBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (bankName: string) => void;
}

export default function OriginBankModal({ isOpen, onClose, onSelect }: OriginBankModalProps) {
  
  const handleSelect = (bankName: string) => {
    onSelect(bankName);
    onClose();
  };

  return (
    <Modal visible={isOpen} transparent={true} animationType="slide" onRequestClose={onClose}>
      
      <TouchableOpacity 
        className="flex-1 bg-black/40 justify-end" 
        activeOpacity={1} 
        onPress={onClose}
      >
        
        {/* Contenedor Blanco Principal*/}
        <TouchableOpacity 
          activeOpacity={1} 
          className="bg-white w-full rounded-t-[20px] max-h-[85%]"
          style={{ paddingBottom: Platform.OS === 'ios' ? 30 : 10 }}
        >
          
          {/* HEADER DEL MODAL */}
          <View className="p-5 pb-4 items-center">
            <View className="w-12 h-1 bg-gray-300 rounded-full mb-4" />
            <Text className="text-[17px] font-bold text-[#011B33]">¿Desde qué banco nos envías tu dinero?</Text>
          </View>

          {/* LÍNEA DIVISORIA */}
          <View className="h-[1px] bg-gray-100 w-[90%] mx-auto" />

          {/* LISTA DE BANCOS */}
          <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
            {banksMock.map((bank, index) => (
              <TouchableOpacity 
                key={`${bank.id}-${index}`}
                onPress={() => handleSelect(bank.alias)}
                className="flex-row items-center gap-4 py-3 px-2 border-b border-gray-50"
                activeOpacity={0.7}
              >
                {/* LOGO DEL BANCO */}
                <Image 
                  source={{ uri: `https://cdn.kambista.com/app/images/banks/${bank.alias.toLowerCase()}.png` }} 
                  className="w-10 h-10 rounded border border-gray-100"
                  resizeMode="contain"
                />
                
                {/* NOMBRE DEL BANCO */}
                <Text className="text-[15px] text-[#011B33] font-medium flex-1">
                  {bank.name}
                </Text>
              </TouchableOpacity>
            ))}
            
            <View className="h-8" /> 
          </ScrollView>

        </TouchableOpacity>
      </TouchableOpacity>
      
    </Modal>
  );
}