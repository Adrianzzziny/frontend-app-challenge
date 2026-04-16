import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Platform, Modal} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import NativeSelect from '../../../shared/components/ui/NativeSelect';
import NativeDatePicker from '../../../shared/components/ui/NativeDatePicker';

import { personalDataSchema, PersonalDataFormValues } from '../utils/personalDataSchema';
import { useAuthStore } from '../../1_Auth/store/auth.store';
import BaseInput from '../../../shared/components/ui/BaseInput';
import DuplicateDataModal from './DuplicateDataModal';


export default function PersonalDataForm() {
  const { submitPersonalData, isLoading, logout } = useAuthStore();
  const router = useRouter();

  const [duplicateErrorType, setDuplicateErrorType] = useState<'DNI' | 'PHONE' | 'BOTH' | null>(null);

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
      router.push('/onboarding/exito');
    } catch (error: any) {
      if (error.data?.name === 'DUPLICATE_DNI') setDuplicateErrorType('DNI');
      else if (error.data?.name === 'DUPLICATE_PHONE') setDuplicateErrorType('PHONE');
      else if (error.data?.name === 'DUPLICATE_BOTH') setDuplicateErrorType('BOTH');
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
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2" activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color="#011B33" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-[#011B33]">Completa tus datos</Text>
          
          <TouchableOpacity onPress={() => { logout(); router.replace('/login'); }} className="p-2 -mr-2" activeOpacity={0.7}>
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
            
            {/* COMPONENTE FECHA */}
            <View className="flex-1 mt-1.5">
              <Controller control={control} name="birthDate" render={({ field: { onChange, value } }) => (
                <NativeDatePicker 
                  label="Fecha de nacimiento" 
                  value={value} 
                  onChange={onChange} 
                  error={errors.birthDate?.message} 
                />
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
        <View className="mb-6">
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
          className={`w-full py-4 rounded-lg flex-row justify-center items-center mt-2 mb-4 ${!isValid || isLoading ? 'bg-[#c3eadd]' : 'bg-[#14E2B1]'}`}
        >
          {isLoading ? <ActivityIndicator color="#011B33" /> : <Text className="font-bold text-[#011B33] tracking-wide">REGISTRARME</Text>}
        </TouchableOpacity>
      </View>

      <DuplicateDataModal 
        errorType={duplicateErrorType} 
        onClose={() => setDuplicateErrorType(null)} 
      />

    </View>
  );
}