import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

interface DuplicateDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DuplicateDocumentModal({ isOpen, onClose }: DuplicateDocumentModalProps) {
  return (
    <Modal visible={isOpen} transparent={true} animationType="slide" onRequestClose={onClose}>
      
      <TouchableOpacity 
        className="flex-1 bg-black/40 justify-end" 
        activeOpacity={1} 
        onPress={onClose}
      >
        
        <TouchableOpacity 
          activeOpacity={1} 
          className="bg-white w-full rounded-t-[30px] px-6 pt-8 pb-10 items-center"
        >
          
          {/* TÍTULO */}
          <Text className="text-[22px] font-bold text-[#011B33] mb-3">
            ¡Vaya!
          </Text>

          {/* MENSAJE */}
          <Text className="text-[15px] text-[#4B5563] text-center mb-8 px-4">
            El <Text className="font-bold text-[#011B33]">número de documento</Text> registrado ya está en uso.
          </Text>

          {/* BOTÓN ACEPTAR */}
          <TouchableOpacity 
            onPress={onClose}
            activeOpacity={0.8}
            className="w-full bg-[#011B33] py-4 rounded-xl items-center mb-5"
          >
            <Text className="font-bold text-white text-[14px] uppercase tracking-wide">
              Aceptar
            </Text>
          </TouchableOpacity>

          {/* LINK DE SOPORTE */}
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