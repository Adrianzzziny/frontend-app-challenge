import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

export default function NativeSelect({ value, onChange, options, placeholder }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempValue, setTempValue] = useState(value || options[0]?.value);

  const selectedLabel = options.find((o: any) => o.value === value)?.label || placeholder;

  // VERSIÓN ANDROID
  if (Platform.OS === 'android') {
    return (
      <View className="w-full shrink-0 border border-gray-300 rounded-lg bg-white h-12 justify-center px-3 relative overflow-hidden">
        <Text className={`text-[15px] ${value ? 'text-[#011B33]' : 'text-gray-400'}`}>{selectedLabel}</Text>
        <Ionicons name="chevron-down" size={18} color="#6B7280" style={{ position: 'absolute', right: 12 }} />
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%' }}
          mode="dialog"
        >
          {options.map((opt: any) => <Picker.Item key={opt.value} label={opt.label} value={opt.value} />)}
        </Picker>
      </View>
    );
  }

  // VERSIÓN IOS
  return (
    <>
      <TouchableOpacity 
        onPress={() => { setTempValue(value || options[0]?.value); setModalVisible(true); }}
        className="w-full border border-gray-300 rounded-lg bg-white h-12 flex-row justify-between items-center px-3"
        activeOpacity={0.7}
      >
        <Text className={`text-[15px] ${value ? 'text-[#011B33]' : 'text-gray-400'}`}>{selectedLabel}</Text>
        <Ionicons name="chevron-down" size={18} color="#6B7280" />
      </TouchableOpacity>

      <Modal transparent visible={modalVisible} animationType="slide">
        <View className="flex-1 justify-end bg-black/20">
          <View className="bg-white pb-8">
            <View className="flex-row justify-between bg-[#F2F2F7] px-4 py-3 border-t border-gray-300">
              <TouchableOpacity onPress={() => { onChange(tempValue); setModalVisible(false); }}>
                <Text className="text-[#007AFF] font-semibold text-[17px]">Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="text-[#007AFF] text-[17px]">Cancelar</Text>
              </TouchableOpacity>
            </View>
            <Picker selectedValue={tempValue} onValueChange={setTempValue}>
              {options.map((opt: any) => (
                <Picker.Item key={opt.value} label={opt.label} value={opt.value} color="#011B33" />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </>
  );
}