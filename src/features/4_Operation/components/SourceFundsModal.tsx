import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Platform } from 'react-native';
import sourceFundsMock from '../../../mocks/sourceFunds.json';

interface SourceFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (fundName: string) => void;
}

export default function SourceFundsModal({ isOpen, onClose, onSelect }: SourceFundsModalProps) {
  
  const handleSelect = (fundName: string) => {
    onSelect(fundName);
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
            <Text className="text-[17px] font-bold text-[#011B33]">Origen de fondos</Text>
          </View>

          {/* LÍNEA DIVISORIA */}
          <View className="h-[1px] bg-gray-100 w-[90%] mx-auto" />

          {/* LISTA DE FONDOS */}
          <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
            {sourceFundsMock.map((fund, index) => (
              <TouchableOpacity 
                key={`${fund._id}-${index}`}
                onPress={() => handleSelect(fund.name)}
                className="py-4 px-2 border-b border-gray-50"
                activeOpacity={0.7}
              >
                <Text className="text-[15px] text-[#011B33] font-medium">
                  {fund.name}
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