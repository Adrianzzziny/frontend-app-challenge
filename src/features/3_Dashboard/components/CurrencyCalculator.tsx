import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, InputAccessoryView, Keyboard, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useOperationStore } from '../store/operation.store';
import { useRouter } from 'expo-router';

import { api } from '../../../api/axiosConfig'; 

export default function CurrencyCalculator() {
  const { setCalculatorData } = useOperationStore();

  const [activeTab, setActiveTab] = useState<'compra' | 'venta'>('compra');
  const [sendAmount, setSendAmount] = useState<string>('1000');
  const [receiveAmount, setReceiveAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [rates, setRates] = useState({ compra: 3.321, venta: 3.350 });
  const [ahorroOficial, setAhorroOficial] = useState('0.00');

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sendCurrency = activeTab === 'compra' ? 'Dólares' : 'Soles';
  const receiveCurrency = activeTab === 'compra' ? 'Soles' : 'Dólares';

  const router = useRouter();

const fetchCurrentRates = async () => {
    try {
      const response = await api.get('/exchange/kambista/current'); 
      const data = response.data;
      
      setRates({ compra: data?.bid || 3.321, venta: data?.ask || 3.350 });
    } catch (error) {
      console.error('Error obteniendo TC:', error);
    }
  };

  const calculateWithAPI = (source: 'send' | 'receive', amount: string, currentTab: 'compra' | 'venta') => {
    if (!amount || isNaN(Number(amount))) {
      if (source === 'send') setReceiveAmount('');
      else setSendAmount('');
      return;
    }

    setIsLoading(true);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      try {
        const originCurrency = currentTab === 'compra' ? 'USD' : 'PEN';
        const destinationCurrency = currentTab === 'compra' ? 'PEN' : 'USD';
        
        const response = await api.get('/exchange/calculates', {
          params: {
            originCurrency,
            destinationCurrency,
            amount,
            active: 'S'
          }
        });
        
        const data = response.data;

        if (data?.tc) {
          setRates({ compra: data.tc.bid, venta: data.tc.ask });
        }

        const calculatedValue = data?.exchange ? data.exchange.toFixed(2) : '0.00';
        
        if (source === 'send') setReceiveAmount(calculatedValue);
        else setSendAmount(calculatedValue);

        if (data?.savings?.amount) setAhorroOficial(data.savings.amount);
      } catch (error) {
        console.error('Error calculando:', error);
      } finally {
        setIsLoading(false);
      }
    }, 400);
  };

  useEffect(() => {
    fetchCurrentRates();
    calculateWithAPI('send', '1000', activeTab);
  }, []);

  const onSendInput = (text: string) => {
    setSendAmount(text);
    calculateWithAPI('send', text, activeTab);
  };

  const onReceiveInput = (text: string) => {
    setReceiveAmount(text);
    calculateWithAPI('receive', text, activeTab);
  };

  const toggleTab = () => {
    const newTab = activeTab === 'compra' ? 'venta' : 'compra';
    setActiveTab(newTab);
    calculateWithAPI('send', sendAmount, newTab);
  };

  const startOperation = () => {
    setCalculatorData({
      sendAmount, sendCurrency, receiveAmount, receiveCurrency,
      rateCompra: rates.compra, rateVenta: rates.venta
    });
    router.push('/operacion/completa');
  };

  const koinksGanados = Math.floor(parseFloat(activeTab === 'compra' ? sendAmount : receiveAmount) || 0).toLocaleString();

  const inputAccessoryViewID = 'calculatorKeyboard';

  return (
    <View className="w-full max-w-md">
      {/* Contenedor Principal Blanco */}
      <View className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
        
        {/* TABS SUPERIORES */}
        <View className="flex-row h-12">
          <TouchableOpacity onPress={() => { setActiveTab('compra'); calculateWithAPI('send', sendAmount, 'compra'); }} className={`flex-1 items-center justify-center ${activeTab === 'compra' ? 'bg-[#011B33]' : 'bg-white'}`} activeOpacity={0.8}>
            <Text className={`font-semibold text-[13px] ${activeTab === 'compra' ? 'text-white' : 'text-gray-500'}`}>Compra: {rates.compra}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setActiveTab('venta'); calculateWithAPI('send', sendAmount, 'venta'); }} className={`flex-1 items-center justify-center ${activeTab === 'venta' ? 'bg-[#011B33]' : 'bg-white'}`} activeOpacity={0.8}>
            <Text className={`font-semibold text-[13px] ${activeTab === 'venta' ? 'text-white' : 'text-gray-500'}`}>Venta: {rates.venta}</Text>
          </TouchableOpacity>
        </View>

        <View className="p-5 space-y-4">
          
          {/* ZONA DE INPUTS */}
          <View className="relative">
            {/* INPUT ENVÍO */}
            <View className="flex-row rounded-lg overflow-hidden border border-transparent bg-[#e9ecef] mb-2 h-[72px]">
              <View className="flex-1 px-4 justify-center">
                <Text className="text-xs text-gray-500 font-medium mb-0.5">¿Cuánto envías?</Text>
                <TextInput value={sendAmount} onChangeText={onSendInput} keyboardType="numeric" className="text-[20px] font-bold text-gray-800 p-0" inputAccessoryViewID={inputAccessoryViewID}/>
              </View>
              <TouchableOpacity className="bg-[#011B33] w-[110px] flex-row items-center justify-between px-3" activeOpacity={0.7}>
                <Text className="font-semibold text-white text-[13px]">{sendCurrency}</Text>
                <Ionicons name="chevron-down" size={16} color="white" />
              </TouchableOpacity>
            </View>

            {/* BOTÓN SWAP */}
            <TouchableOpacity onPress={toggleTab} activeOpacity={0.8} className="absolute top-1/2 left-1/2 -mt-[16px] -ml-[16px] bg-[#f3f3f3] rounded-full w-[32px] h-[32px] items-center justify-center z-10 border-2 border-white shadow-sm">
              <Ionicons name="swap-vertical" size={18} color="#011B33" />
            </TouchableOpacity>

            {/* INPUT RECIBO */}
            <View className="flex-row rounded-lg overflow-hidden border border-transparent bg-[#e9ecef] h-[72px]">
              <View className="flex-1 px-4 justify-center">
                <Text className="text-xs text-gray-500 font-medium mb-0.5">Entonces recibes</Text>
                <TextInput value={receiveAmount} onChangeText={onReceiveInput} keyboardType="numeric" className="text-[20px] font-bold text-gray-800 p-0" inputAccessoryViewID={inputAccessoryViewID}/>
              </View>
              <TouchableOpacity className="bg-[#011B33] w-[110px] flex-row items-center justify-between px-3" activeOpacity={0.7}>
                <Text className="font-semibold text-white text-[13px]">{receiveCurrency}</Text>
                <Ionicons name="chevron-down" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* AHORRO Y KOINKS */}
          <View className="flex-row justify-between items-center mt-1">
            <View>
              <Text className="text-gray-500 text-[11px]">Ahorro estimado:</Text>
              <Text className="font-bold text-gray-800 text-[13px]">S/ {ahorroOficial}</Text>
            </View>
            <View className="items-end">
              <Text className="text-gray-500 text-[11px]">Koinks:</Text>
              <Text className="font-bold text-gray-800 text-[13px]">🪙 {koinksGanados}</Text>
            </View>
          </View>

          {/* CUPÓN */}
          <View className="flex-row border border-gray-200 rounded-lg overflow-hidden h-11 mt-1">
            <View className="px-3 justify-center bg-white"><Ionicons name="ticket-outline" size={18} color="#14E2B1" /></View>
            <TextInput placeholder="Ingresa el cupón" className="flex-1 bg-white text-[13px]" />
            <TouchableOpacity className="bg-[#011B33] justify-center px-4" activeOpacity={0.8}>
              <Text className="text-white text-[11px] font-bold tracking-wide">APLICAR</Text>
            </TouchableOpacity>
          </View>

          {/* BANNER PREFERENCIAL */}
          <View className="flex-row items-center gap-4 mt-2 bg-[#F8FAFC] p-2 rounded-md">
            <Ionicons name="star" size={20} color="#14E2B1" />
            <Text className="text-[11px] text-gray-600 flex-1 leading-snug">
              ¿Monto mayor a $5,000 o S/18,000?{'\n'}
              <Text className="font-bold underline">¡Obtén un Tipo de Cambio Preferencial!</Text>
            </Text>
          </View>

        </View>
      </View>

      {/* BOTÓN INICIAR OPERACIÓN */}
      <TouchableOpacity onPress={startOperation} activeOpacity={0.8} className="w-full bg-[#00E3C2] py-3.5 rounded-lg flex-row justify-center items-center">
        {isLoading ? <ActivityIndicator color="#011B33" /> : <Text className="font-bold text-[#060F26] tracking-wide text-[14px]">INICIAR OPERACIÓN</Text>}
      </TouchableOpacity>

      {/* BARRA NATIVA PARA EL TECLADO DE IOS */}
      {Platform.OS === 'ios' && (
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View className="bg-[#f5f6f8] flex-row justify-end px-4 py-3 border-t border-gray-200 shadow-sm">
            <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={0.7}>
              <Text className="text-[#011B33] font-bold text-[16px]">Aceptar</Text>
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      )}

    </View>
  );
}