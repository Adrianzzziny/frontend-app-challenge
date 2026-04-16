import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

type ErrorType = 'DNI' | 'PHONE' | 'BOTH' | null;

interface DuplicateDataModalProps {
  errorType: ErrorType;
  onClose: () => void;
}

export default function DuplicateDataModal({ errorType, onClose }: DuplicateDataModalProps) {
  const renderMessage = () => {
    if (errorType === 'PHONE') {
      return (
        <Text className="text-[15px] text-[#4B5563] text-center mb-8 px-4">
          El <Text className="font-bold text-[#011B33]">número de celular</Text> registrado ya está en uso.
        </Text>
      );
    }
    if (errorType === 'BOTH') {
      return (
        <Text className="text-[15px] text-[#4B5563] text-center mb-8 px-4">
          El <Text className="font-bold text-[#011B33]">documento y celular</Text> registrados ya están en uso.
        </Text>
      );
    }
    return (
      <Text className="text-[15px] text-[#4B5563] text-center mb-8 px-4">
        El <Text className="font-bold text-[#011B33]">número de documento</Text> registrado ya está en uso.
      </Text>
    );
  };

  return (
    <Modal visible={!!errorType} transparent={true} animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity 
        className="flex-1 bg-black/40 justify-end" 
        activeOpacity={1} 
        onPress={onClose}
      >
        <TouchableOpacity 
          activeOpacity={1} 
          className="bg-white w-full rounded-t-[30px] px-6 pt-8 pb-10 items-center"
        >
          <Text className="text-[22px] font-bold text-[#011B33] mb-3">
            ¡Vaya!
          </Text>

          {renderMessage()}

          <TouchableOpacity 
            onPress={onClose}
            activeOpacity={0.8}
            className="w-full bg-[#011B33] py-4 rounded-xl items-center mb-5"
          >
            <Text className="font-bold text-white text-[14px] uppercase tracking-wide">
              Aceptar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} className="mb-2">
            <Text className="text-[13px] text-gray-500">
              ¿Problemas? <Text className="text-[#011B33] font-medium underline">Contacta a soporte</Text>
            </Text>
          </TouchableOpacity>

        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}