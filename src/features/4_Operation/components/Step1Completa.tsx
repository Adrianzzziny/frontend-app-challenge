import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
      <View className="bg-white px-5 pt-4 pb-2 flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 z-10" activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#011B33" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-[#011B33] -ml-8">
          Completa los datos
        </Text>
      </View>

      {/* CONTENEDOR PRINCIPAL */}
      <View className="flex-1 px-5 pt-2 pb-8">
        
        {/* BLOQUE SUPERIOR: Progreso + Tarjeta Resumen */}
        <View>
          {/* BARRA DE PROGRESO */}
          <View className="flex-row items-center justify-between mt-4 mb-4 px-2 relative">
            <View className="absolute top-1.5 left-8 right-8 h-0.5 bg-gray-300 z-0" />
            <View className="items-center z-10">
              <View className="w-3 h-3 rounded-full bg-[#011B33] mb-1" />
              <Text className="text-[10px] font-bold text-[#011B33]">Completa</Text>
            </View>
            <View className="items-center z-10">
              <View className="w-3 h-3 rounded-full bg-gray-300 mb-1" />
              <Text className="text-[10px] font-medium text-gray-400">Transfiere</Text>
            </View>
            <View className="items-center z-10">
              <View className="w-3 h-3 rounded-full bg-gray-300 mb-1" />
              <Text className="text-[10px] font-medium text-gray-400">Constancia</Text>
            </View>
          </View>

          {/* TARJETA DE RESUMEN */}
          <View className="bg-white rounded-xl p-4 mb-3 shadow-sm">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500 text-[13px]">Tú envías</Text>
              <Text className="font-bold text-[#011B33] text-[14px]">{sendCurr} {sendAmt}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500 text-[13px]">Tú recibes</Text>
              <Text className="font-bold text-[#011B33] text-[14px]">{recCurr} {recAmt}</Text>
            </View>
            <View className="flex-row justify-between pb-3 border-b border-gray-[#686868]">
              <Text className="text-gray-500 text-[13px]">Koinks</Text>
              <Text className="font-bold text-[#011B33] text-[14px] flex-row items-center">
                100 <Text className="text-[10px]">🪙</Text>
              </Text>
            </View>
            <View className="flex-row justify-between pt-3">
              <Text className="font-bold text-[#011B33] text-[13px]">Tipo de cambio</Text>
              <Text className="font-bold text-[#011B33] text-[14px]">{rate}</Text>
            </View>
          </View>

          {/* BANNER DE TIEMPO */}
          <View className="bg-[#D2E9FF] rounded-lg p-2.5 flex-row gap-1 items-start mb-4 mt-0.5">
            <Ionicons name="information-circle-outline" size={18} color="#011B33" />
            <Text className="flex-1 text-[11px] text-[#011B33] leading-tight">
              Tiempo estimado de espera <Text className="font-bold">BCP, Interbank, BanBif, Pichincha: 15 minutos.</Text> Otros: 1 día hábil
            </Text>
          </View>
        </View>


        {/* BLOQUE MEDIO: Selectores */}
        <View className="space-y-3 mt-1">
          
          <View>
            <Text className="text-xs text-gray-500 mb-1 ml-1">¿Desde qué banco nos envías tu dinero?</Text>
            <TouchableOpacity onPress={() => setOriginModalOpen(true)} className="w-full border border-gray-300 rounded-lg bg-white h-[42px] flex-row justify-between items-center px-4" activeOpacity={0.7}>
              <Text className={`text-[14px] ${selectedOriginBank ? 'text-[#011B33]' : 'text-gray-400'}`}>
                {selectedOriginBank || 'Selecciona'}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View>
            <Text className="text-xs text-gray-500 mb-1 ml-1">¿En qué cuenta deseas recibir tu dinero?</Text>
            <TouchableOpacity onPress={() => setDestModalOpen(true)} className="w-full border border-gray-300 rounded-lg bg-white h-[42px] flex-row justify-between items-center px-4" activeOpacity={0.7}>
              <Text className={`text-[14px] ${selectedDestinationAccount ? 'text-[#011B33]' : 'text-gray-400'}`}>
                {selectedDestinationAccount ? `${selectedDestinationAccount.alias} - ${selectedDestinationAccount.accountNumber}` : 'Selecciona'}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* BANNER ALERTA CUENTAS TERCEROS */}
          <View className="bg-[#F9F0E9] rounded-lg p-2.5 flex-row gap-1 items-start">
            <Ionicons name="information-circle-outline" size={18} color="#9A3412" />
            <Text className="flex-1 text-[11px] text-[#9A3412] leading-tight">
              Recuerda que las cuentas deben estar <Text className="font-bold">a tu nombre.</Text> Kambista no transfiere a <Text className="font-bold">cuentas de terceros</Text>
            </Text>
          </View>

          <View className='mb-6'>
            <Text className="text-xs text-gray-500 mb-1 ml-1">Origen de fondos</Text>
            <TouchableOpacity onPress={() => setSourceModalOpen(true)} className="w-full border border-gray-300 rounded-lg bg-white h-[42px] flex-row justify-between items-center px-4" activeOpacity={0.7}>
              <Text className={`text-[14px] ${selectedSourceFunds ? 'text-[#011B33]' : 'text-gray-400'}`}>
                {selectedSourceFunds || 'Selecciona'}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>

        </View>

        {/* BOTON CONTINUAR */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => router.push('/operacion/transfiere')}
          className={`w-full py-3.5 rounded-lg flex-row justify-center items-center mt-auto mb-4 shadow-sm ${
            selectedOriginBank && selectedDestinationAccount && selectedSourceFunds ? 'bg-[#00E3C2]' : 'bg-[#B2E7DF]'
          }`}
          disabled={!selectedOriginBank || !selectedDestinationAccount || !selectedSourceFunds}
        >
          <Text className="font-bold text-[#060F26] tracking-wide text-[15px]">CONTINUAR</Text>
        </TouchableOpacity>

      </View>

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