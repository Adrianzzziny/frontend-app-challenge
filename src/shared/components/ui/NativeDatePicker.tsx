import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface NativeDatePickerProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  error?: string;
  maximumDate?: Date;
}

export default function NativeDatePicker({ label, value, onChange, error, maximumDate }: NativeDatePickerProps) {
  const [show, setShow] = useState(false);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'DD/MM/AAAA';
    const d = new Date(`${dateStr}T12:00:00`);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShow(false);
    
    if (selectedDate) {
      const isoDate = selectedDate.toISOString().split('T')[0];
      onChange(isoDate);
    }
  };

  const defaultDate = value ? new Date(`${value}T12:00:00`) : new Date(2000, 0, 1);
  const maxDate = maximumDate || new Date();

  return (
    <View>
      <Text className="text-[13px] text-gray-500 mb-1">{label}</Text>
      
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setShow(true)}
        className={`w-full border rounded-lg h-12 justify-center px-3 bg-white ${
          error ? 'border-red-400' : 'border-gray-300'
        }`}
      >
        <Text className={`text-[14px] ${value ? 'text-[#011B33]' : 'text-gray-300'}`}>
          {formatDate(value)}
        </Text>
      </TouchableOpacity>

      {error && (
        <Text className="text-red-500 text-[10px] mt-1 ml-1">{error}</Text>
      )}

      {show && (
        Platform.OS === 'ios' ? (
          <Modal transparent visible={show} animationType="slide">
            <View className="flex-1 justify-end bg-black/20">
              <View className="bg-white pb-8">
                <View className="flex-row justify-end bg-[#F2F2F7] px-4 py-3 border-t border-gray-300">
                  <TouchableOpacity onPress={() => setShow(false)}>
                    <Text className="text-[#007AFF] font-semibold text-[17px]">Aceptar</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={defaultDate}
                  mode="date"
                  display="spinner"
                  maximumDate={maxDate}
                  onChange={onChangeDate}
                  textColor="#011B33"
                />
              </View>
            </View>
          </Modal>
        ) : (
          <DateTimePicker
            value={defaultDate}
            mode="date"
            display="default"
            maximumDate={maxDate}
            onChange={onChangeDate}
          />
        )
      )}
    </View>
  );
}