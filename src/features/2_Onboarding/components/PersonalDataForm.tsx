import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Modal, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import { personalDataSchema, PersonalDataFormValues } from '../utils/personalDataSchema';
import { useAuthStore } from '../../1_Auth/store/auth.store';
import BaseInput from '../../../shared/components/ui/BaseInput';

// --- COMPONENTE SELECTOR NATIVO ---
const NativeSelect = ({ value, onChange, options, placeholder }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempValue, setTempValue] = useState(value || options[0].value);

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
  onPress={() => { setTempValue(value || options[0].value); setModalVisible(true); }}
  className="w-full border border-gray-300 rounded-lg bg-white h-12 flex-row justify-between items-center px-3" // 👈 flex-1 → w-full
  activeOpacity={0.7}
>
  <Text className={`text-[15px] ${value ? 'text-[#011B33]' : 'text-gray-400'}`}>{selectedLabel}</Text>
  <Ionicons name="chevron-down" size={18} color="#6B7280" />
</TouchableOpacity>

      <Modal transparent visible={modalVisible} animationType="slide">
        {/* Fondo oscuro semi-transparente para hacer foco en el modal */}
        <View className="flex-1 justify-end bg-black/20">
          <View className="bg-white pb-8">
            {/* Toolbar Gris calcada a la foto */}
            <View className="flex-row justify-between bg-[#F2F2F7] px-4 py-3 border-t border-gray-300">
              <TouchableOpacity onPress={() => { onChange(tempValue); setModalVisible(false); }}>
                <Text className="text-[#007AFF] font-semibold text-[17px]">Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="text-[#007AFF] text-[17px]">Cancelar</Text>
              </TouchableOpacity>
            </View>
            
            {/* Rueda nativa de iOS */}
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
};

export default function PersonalDataForm() {
  const { submitPersonalData, isLoading } = useAuthStore();

  const { control, handleSubmit, setError, formState: { errors, isValid } } = useForm<PersonalDataFormValues>({
    resolver: zodResolver(personalDataSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '', documentType: 'DNI', documentNumber: '', 
      phone: '', birthDate: '', previousExchange: '', acceptTerms: false, acceptPrivacy: false
    }
  });

  const onSubmit = async (values: PersonalDataFormValues) => {
    try {
      await submitPersonalData(values);
      console.log("Datos enviados:", values);
    } catch (error: any) {
      if (error.data?.name === 'DUPLICATE_DNI') {
        setError('documentNumber', { message: error.data.message });
      }
    }
  };

  const CheckboxItem = ({ label, value, onChange, error }: any) => (
  <View className="mb-4">
    <TouchableOpacity onPress={() => onChange(!value)} className="flex-row items-start gap-2.5" activeOpacity={0.7}>
      <View className={`w-[18px] h-[18px] border rounded-sm items-center justify-center mt-0.5 ${value ? 'border-[#14E2B1] bg-[#14E2B1]' : 'border-gray-300'}`}>
        {value ? <Ionicons name="checkmark" size={14} color="white" /> : null}
      </View>
      <Text className="flex-1 text-[12px] leading-tight text-[#011B33]">
        {label}
      </Text>
    </TouchableOpacity>
    {error ? <Text className="text-red-500 text-[10px] mt-0.5 ml-7">{error}</Text> : null}
  </View>
);

  return (
    <View className="flex-1 px-5 pt-2 pb-4 bg-white justify-between">
      
      {/* --- SECCIÓN SUPERIOR --- */}
      <View>
        {/* HEADER */}
        <View className="flex-row items-center justify-between mb-4 mt-2">
          <TouchableOpacity className="p-2 -ml-2" activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color="#011B33" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-[#011B33]">Completa tus datos</Text>
          <TouchableOpacity className="p-2 -mr-2" activeOpacity={0.7}>
            <Ionicons name="log-out-outline" size={24} color="#011B33" />
          </TouchableOpacity>
        </View>

        {/* SUBTÍTULO */}
        <Text className="text-center text-[15px] text-[#011B33] mb-6 px-4 leading-5">
          Completa tus datos <Text className="font-bold">como figuran en tu documento de identidad</Text>
        </Text>

        {/* CAMPOS */}
        <View className="space-y-3">
          
          <Controller control={control} name="fullName" render={({ field: { onChange, value } }) => (
            <BaseInput label="Nombres completos" placeholder="Escribe tus nombres y apellidos" value={value} onChangeText={onChange} error={errors.fullName?.message} />
          )} />

          {/* FILA DOCUMENTO */}
          <View>
            <Text className="text-sm text-gray-500 mb-1">Documento</Text>
            <View className="flex-row gap-x-3">
              <View className="w-[35%]">
                <Controller control={control} name="documentType" render={({ field: { onChange, value } }) => (
                  <NativeSelect 
                    value={value} onChange={onChange} 
                    options={[{ label: 'DNI', value: 'DNI' }, { label: 'CE', value: 'CE' }, { label: 'Pasaporte', value: 'PASSPORT' }]} 
                  />
                )} />
              </View>
              <View className="flex-1">
                <Controller control={control} name="documentNumber" render={({ field: { onChange, value } }) => (
                  <BaseInput placeholder="Nº de documento" value={value} onChangeText={onChange} error={errors.documentNumber?.message} keyboardType="numeric" />
                )} />
              </View>
            </View>
          </View>

          {/* BANNER AZUL */}
          <View className="bg-[#E5F0FF] rounded-lg py-1 px-3 flex-row gap-1 items-center">
  <Ionicons name="information-circle-outline" size={18} color="#011B33" />
  <Text className="flex-1 text-[11px] text-[#011B33] leading-tight">
    Tu documento de identidad debe coincidir con tus datos para evitar inconvenientes al momento de hacer una primera operación.
  </Text>
</View>

          {/* FILA CELULAR Y FECHA */}
          <View className="flex-row gap-x-3">
            <View className="flex-1">
              <Controller control={control} name="phone" render={({ field: { onChange, value } }) => (
                <BaseInput label="Celular" placeholder="Nº de celular" value={value} onChangeText={onChange} error={errors.phone?.message} keyboardType="phone-pad" maxLength={9} />
              )} />
            </View>
            <View className="flex-1">
              <Controller control={control} name="birthDate" render={({ field: { onChange, value } }) => (
                <BaseInput label="Fecha de nacimiento" placeholder="DD/MM/AAAA" value={value} onChangeText={onChange} error={errors.birthDate?.message} keyboardType="numbers-and-punctuation" />
              )} />
            </View>
          </View>

          {/* SELECTOR OPCIONAL */}
          <View>
            <Text className="text-sm text-gray-500 mb-2">¿Donde cambiabas antes? (Opcional)</Text>
            <Controller control={control} name="previousExchange" render={({ field: { onChange, value } }) => (
              <NativeSelect 
                value={value} onChange={onChange} placeholder="Último lugar de cambio"
                options={[
                  { label: 'Último lugar de cambio', value: '' },
                  { label: 'Banco', value: 'banco' },
                  { label: 'Casa de cambio física', value: 'fisica' },
                  { label: 'Otra plataforma digital', value: 'digital' }
                ]} 
              />
            )} />
          </View>

        </View>
      </View>

      {/* --- SECCIÓN INFERIOR --- */}
      <View>
        <View className="mb-2">
          <Controller control={control} name="acceptTerms" render={({ field: { onChange, value } }) => (
            <CheckboxItem label={<Text>He leído y acepto los <Text className="font-bold underline">Términos y condiciones</Text></Text>} value={value} onChange={onChange} error={errors.acceptTerms?.message} />
          )} />
          <Controller control={control} name="acceptPrivacy" render={({ field: { onChange, value } }) => (
            <CheckboxItem label={<Text>Acepto de manera expresa e informada la <Text className="font-bold underline">Política de Tratamiento de datos personales de Kambista</Text></Text>} value={value} onChange={onChange} error={errors.acceptPrivacy?.message} />
          )} />
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isLoading}
          activeOpacity={0.8}
          className={`w-full py-4 rounded-lg flex-row justify-center items-center mt-2 ${!isValid || isLoading ? 'bg-[#c3eadd]' : 'bg-[#14E2B1]'}`}
        >
          {isLoading ? <ActivityIndicator color="#011B33" /> : <Text className="font-bold text-[#011B33] tracking-wide">REGISTRARME</Text>}
        </TouchableOpacity>
      </View>

    </View>
  );
}