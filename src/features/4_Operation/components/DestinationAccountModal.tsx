import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useOperationStore, BankAccount } from '../../../features/3_Dashboard/store/operation.store';

interface DestinationAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAccount: (account: BankAccount) => void;
  onOpenAddAccount: () => void;
}

export default function DestinationAccountModal({ 
  isOpen, 
  onClose, 
  onSelectAccount, 
  onOpenAddAccount 
}: DestinationAccountModalProps) {
  
  const { savedAccounts } = useOperationStore();

  const handleSelect = (account: BankAccount) => {
    onSelectAccount(account);
    onClose();
  };

  const handleAddNew = () => {
    onClose();
    setTimeout(() => {
      onOpenAddAccount();
    }, 300);
  };

  return (
    <Modal visible={isOpen} transparent={true} animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity className="flex-1 bg-black/40 justify-end" activeOpacity={1} onPress={onClose}>
        
        <TouchableOpacity activeOpacity={1} className="bg-white w-full rounded-t-[20px] max-h-[85%]" style={{ paddingBottom: Platform.OS === 'ios' ? 30 : 10 }}>
          
          {/* HEADER */}
          <View className="p-5 pb-4 items-center">
            <View className="w-12 h-1 bg-gray-300 rounded-full mb-4" />
            <Text className="text-[17px] font-bold text-[#011B33]">Selecciona tu cuenta destino</Text>
          </View>

          <View className="h-[1px] bg-gray-100 w-[90%] mx-auto mb-2" />

          <ScrollView className="px-5 py-2" showsVerticalScrollIndicator={false}>
            
            {/* LISTA DE CUENTAS GUARDADAS */}
            {savedAccounts.length > 0 ? (
              savedAccounts.map((account) => (
                <TouchableOpacity 
                  key={account.id}
                  onPress={() => handleSelect(account)}
                  className="py-4 border-b border-gray-100"
                  activeOpacity={0.7}
                >
                  <Text className="text-[15px] text-[#011B33] font-medium mb-1">
                    {account.alias} - {account.bankName} - {account.currency}
                  </Text>
                  <Text className="text-[14px] text-gray-500 tracking-widest">
                    ******{account.accountNumber}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              // ESTADO VACÍO
              <View className="py-6 items-center">
                <Ionicons name="wallet-outline" size={32} color="#9CA3AF" />
                <Text className="text-gray-500 text-sm mt-2 text-center">
                  Aún no tienes cuentas guardadas.{'\n'}Agrega una para continuar.
                </Text>
              </View>
            )}

            {/* BOTÓN AGREGAR NUEVA CUENTA */}
            <TouchableOpacity 
              onPress={handleAddNew}
              activeOpacity={0.7}
              className="flex-row items-center gap-4 py-5 mt-2"
            >
              <View className="w-12 h-12 rounded-xl border-2 border-[#011B33] items-center justify-center bg-white shadow-sm">
                <Ionicons name="add" size={24} color="#011B33" />
              </View>
              <Text className="text-[16px] text-[#011B33] font-medium">
                Agregar cuenta
              </Text>
            </TouchableOpacity>

            <View className="h-8" /> 
          </ScrollView>

        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}