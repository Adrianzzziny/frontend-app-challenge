import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useOperationStore } from '../../3_Dashboard/store/operation.store';
import OriginBankModal from './OriginBankModal';
import SourceFundsModal from './SourceFundsModal';
import DestinationAccountModal from './DestinationAccountModal';
import AddAccountModal from './AddAccountModal';

export default function Step1Completa() {
  const router = useRouter();
  const { calculatorData, selectedOriginBank, selectedDestinationAccount, selectedSourceFunds, setSelections, addAccount } = useOperationStore();

  const [isOriginModalOpen, setOriginModalOpen] = useState(false);
  const [isDestModalOpen, setDestModalOpen] = useState(false);
  const [isSourceModalOpen, setSourceModalOpen] = useState(false);
  const [isAddAccountModalOpen, setAddAccountModalOpen] = useState(false);

  const sendAmt = calculatorData?.sendAmount || '0.00';
  const sendCurr = calculatorData?.sendCurrency === 'Dólares' ? '$' : 'S/';
  const recAmt = calculatorData?.receiveAmount || '0.00';
  const recCurr = calculatorData?.receiveCurrency === 'Soles' ? 'S/' : '$';
  const rate = calculatorData?.sendCurrency === 'Dólares' ? calculatorData.rateCompra : calculatorData?.rateVenta;

  return (
    <View className="flex-1 bg-[#f5f6f8]">
      {/* HEADER NAVEGACIÓN */}
      <View className="bg-white px-5 pt-4 pb-3 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 z-10" activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#011B33" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-[#011B33] -ml-8">
          Completa los datos
        </Text>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* BARRA DE PROGRESO */}
        <View className="flex-row items-center justify-between mt-6 mb-8 px-2 relative">
          <View className="absolute top-1.5 left-6 right-6 h-0.5 bg-gray-300 z-0" />
          
          <View className="items-center z-10">
            <View className="w-3 h-3 rounded-full bg-[#011B33] mb-2" />
            <Text className="text-[11px] font-bold text-[#011B33]">Completa</Text>
          </View>
          <View className="items-center z-10">
            <View className="w-3 h-3 rounded-full bg-gray-300 mb-2" />
            <Text className="text-[11px] font-medium text-gray-400">Transfiere</Text>
          </View>
          <View className="items-center z-10">
            <View className="w-3 h-3 rounded-full bg-gray-300 mb-2" />
            <Text className="text-[11px] font-medium text-gray-400">Constancia</Text>
          </View>
        </View>

        {/* TARJETA DE RESUMEN */}
        <View className="bg-white rounded-xl p-5 mb-5 shadow-sm">
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-500 text-[14px]">Tú envías</Text>
            <Text className="font-bold text-[#011B33] text-[15px]">{sendCurr} {sendAmt}</Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-500 text-[14px]">Tú recibes</Text>
            <Text className="font-bold text-[#011B33] text-[15px]">{recCurr} {recAmt}</Text>
          </View>
          <View className="flex-row justify-between pb-4 border-b border-gray-100">
            <Text className="text-gray-500 text-[14px]">Koinks</Text>
            <Text className="font-bold text-[#011B33] text-[15px] flex-row items-center">
              100 <Text className="text-[12px]">🪙</Text>
            </Text>
          </View>
          <View className="flex-row justify-between pt-4">
            <Text className="font-bold text-[#011B33] text-[14px]">Tipo de cambio utilizado</Text>
            <Text className="font-bold text-[#011B33] text-[15px]">{rate}</Text>
          </View>
        </View>

        {/* BANNER DE TIEMPO */}
        <View className="bg-[#E5F0FF] rounded-lg p-3 flex-row gap-3 items-start mb-6">
          <Ionicons name="information-circle-outline" size={20} color="#011B33" />
          <Text className="flex-1 text-[12px] text-[#011B33] leading-snug">
            Tiempo estimado de espera <Text className="font-bold">BCP, Interbank, BanBif, Pichincha: 15 minutos.</Text> Otros bancos: 1 día hábil
          </Text>
        </View>

        {/* SELECTORES */}
        <View className="space-y-5">
          
          <View>
            <Text className="text-sm text-gray-500 mb-1.5 ml-1">¿Desde qué banco nos envías tu dinero?</Text>
            <TouchableOpacity onPress={() => setOriginModalOpen(true)} className="w-full border border-gray-300 rounded-lg bg-white h-12 flex-row justify-between items-center px-4" activeOpacity={0.7}>
              <Text className={`text-[15px] ${selectedOriginBank ? 'text-[#011B33]' : 'text-gray-400'}`}>
                {selectedOriginBank || 'Selecciona'}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View>
            <Text className="text-sm text-gray-500 mb-1.5 ml-1">¿En qué cuenta deseas recibir tu dinero?</Text>
            <TouchableOpacity onPress={() => setDestModalOpen(true)} className="w-full border border-gray-300 rounded-lg bg-white h-12 flex-row justify-between items-center px-4" activeOpacity={0.7}>
              <Text className={`text-[15px] ${selectedDestinationAccount ? 'text-[#011B33]' : 'text-gray-400'}`}>
                {selectedDestinationAccount ? `${selectedDestinationAccount.alias} - ${selectedDestinationAccount.accountNumber}` : 'Selecciona'}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* BANNER ALERTA CUENTAS TERCEROS */}
          <View className="bg-[#FFF4E5] rounded-lg p-3 flex-row gap-3 items-start">
            <Ionicons name="warning-outline" size={20} color="#9A3412" />
            <Text className="flex-1 text-[12px] text-[#9A3412] leading-snug">
              Recuerda que las cuentas deben estar <Text className="font-bold">a tu nombre.</Text> Kambista no transfiere a <Text className="font-bold">cuentas de terceros</Text>
            </Text>
          </View>

          <View>
            <Text className="text-sm text-gray-500 mb-1.5 ml-1">Origen de fondos</Text>
            <TouchableOpacity onPress={() => setSourceModalOpen(true)} className="w-full border border-gray-300 rounded-lg bg-white h-12 flex-row justify-between items-center px-4" activeOpacity={0.7}>
              <Text className={`text-[15px] ${selectedSourceFunds ? 'text-[#011B33]' : 'text-gray-400'}`}>
                {selectedSourceFunds || 'Selecciona'}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>

        </View>

        {/* BOTON CONTINUAR */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => router.push('/operacion/transfiere')}
          className={`w-full py-4 rounded-lg flex-row justify-center items-center mt-8 ${
            selectedOriginBank && selectedDestinationAccount && selectedSourceFunds ? 'bg-[#14E2B1]' : 'bg-[#c3eadd]'
          }`}
          disabled={!selectedOriginBank || !selectedDestinationAccount || !selectedSourceFunds}
        >
          <Text className="font-bold text-[#011B33] tracking-wide">CONTINUAR</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* MODAL: Seleccionar Banco */}
      <OriginBankModal 
        isOpen={isOriginModalOpen} 
        onClose={() => setOriginModalOpen(false)} 
        onSelect={(bankName) => setSelections(bankName, selectedDestinationAccount, selectedSourceFunds)}
      />

      {/* MODAL: Origen de Fondos */}
      <SourceFundsModal 
        isOpen={isSourceModalOpen} 
        onClose={() => setSourceModalOpen(false)} 
        onSelect={(fundName) => setSelections(selectedOriginBank, selectedDestinationAccount, fundName)}
      />

      {/* MODAL: Seleccionar Cuenta Guardada */}
      <DestinationAccountModal 
        isOpen={isDestModalOpen} 
        onClose={() => setDestModalOpen(false)} 
        onSelectAccount={(account) => setSelections(selectedOriginBank, account, selectedSourceFunds)}
        onOpenAddAccount={() => setAddAccountModalOpen(true)}
      />

      {/* MODAL: Formulario para Agregar Cuenta */}
      <AddAccountModal 
        isOpen={isAddAccountModalOpen} 
        onClose={() => setAddAccountModalOpen(false)} 
        onAddAccount={(newAccount) => {
          addAccount(newAccount); // La guarda en Zustand
          setSelections(selectedOriginBank, newAccount, selectedSourceFunds);
        }}
      />

    </View>
  );
}