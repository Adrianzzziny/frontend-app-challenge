import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';
import { addAccountSchema, AddAccountFormValues } from '../utils/addAccountSchema';
import BaseInput from '../../../shared/components/ui/BaseInput';
import NativeSelect from '../../../shared/components/ui/NativeSelect';
import banksMock from '../../../mocks/bankAccounts.json';
import { BankAccount } from '../../../features/3_Dashboard/store/operation.store';

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAccount: (account: BankAccount) => void;
}

export default function AddAccountModal({ isOpen, onClose, onAddAccount }: AddAccountModalProps) {
  
  const { control, handleSubmit, reset, watch, formState: { errors, isValid } } = useForm<AddAccountFormValues>({
    resolver: zodResolver(addAccountSchema),
    mode: 'onChange',
    defaultValues: { tipoCuenta: '', bancoId: '', numeroCuenta: '', alias: '', esPropia: false }
  });

  const tipoCuentaSeleccionada = watch('tipoCuenta');
  const getMaxLength = () => {
    if (tipoCuentaSeleccionada === 'ahorro') return 13;
    if (tipoCuentaSeleccionada === 'corriente') return 14;
  };

  const onSubmit = (values: AddAccountFormValues) => {
    const bank = banksMock.find(b => b.id === values.bancoId);
    
    const newAccount: BankAccount = {
      id: Math.random().toString(),
      alias: values.alias,
      bankName: bank?.name || 'Desconocido',
      currency: 'PEN',
      accountNumber: values.numeroCuenta.slice(-4),
    };

    onAddAccount(newAccount);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal visible={isOpen} transparent={true} animationType="slide" onRequestClose={handleClose}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity className="flex-1 bg-black/40 justify-end" activeOpacity={1} onPress={handleClose}>
          
          <TouchableOpacity activeOpacity={1} className="bg-white w-full rounded-t-[20px] h-[90%]">
            
            {/* HEADER */}
            <View className="p-5 pb-4 flex-row items-center justify-between border-b border-gray-100">
              <Text className="text-lg font-bold text-[#011B33]">Agregar cuenta - SOLES</Text>
              <TouchableOpacity onPress={handleClose}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
              
              <Text className="text-[14px] text-gray-700 mb-6">
                La cuenta que registres <Text className="font-bold text-[#011B33]">debe estar a tu nombre</Text> (titular de este perfil en Kambista)
              </Text>

              {/* FORMULARIO */}
              <View className="space-y-4">
                
                <View>
                  <Text className="text-sm text-gray-500 mb-1">Tipo de cuenta bancaria</Text>
                  <Controller control={control} name="tipoCuenta" render={({ field: { onChange, value } }) => (
                    <NativeSelect value={value} onChange={onChange} placeholder="Selecciona" options={[
                      { label: 'Ahorro', value: 'ahorro' }, { label: 'Corriente', value: 'corriente' }
                    ]} />
                  )} />
                </View>

                <View>
                  <Text className="text-sm text-gray-500 mb-1">Entidad financiera</Text>
                  <Controller control={control} name="bancoId" render={({ field: { onChange, value } }) => (
                    <NativeSelect value={value} onChange={onChange} placeholder="Selecciona" 
                      options={banksMock.map(b => ({ label: b.alias, value: b.id }))} 
                    />
                  )} />
                </View>

                <View className="bg-[#E5F0FF] rounded-lg p-3 flex-row gap-1 items-start mt-2">
                  <Ionicons name="information-circle-outline" size={18} color="#011B33" />
                  <Text className="flex-1 text-[11px] text-[#011B33] leading-tight">
                    Operamos en Lima con todos los bancos. Y en provincia con el BCP y cuentas digitales Interbank.
                  </Text>
                </View>

                <View className="mt-2">
                  <Text className="text-sm text-gray-500 mb-1">Moneda</Text>
                  <View className="bg-[#011B33] rounded-lg py-3 items-center">
                    <Text className="text-white font-bold text-sm">SOLES</Text>
                  </View>
                </View>

                <Controller control={control} name="numeroCuenta" render={({ field: { onChange, value } }) => (
                  <BaseInput label="Número de cuenta" placeholder="Escribe tu cuenta destino" value={value} onChangeText={onChange} error={errors.numeroCuenta?.message} keyboardType="numeric" maxLength={getMaxLength()} />
                )} />

                <Controller control={control} name="alias" render={({ field: { onChange, value } }) => (
                  <BaseInput label="Ponle nombre a tu cuenta" placeholder="Escribe un alias" value={value} onChangeText={onChange} error={errors.alias?.message} maxLength={30} />
                )} />

                {/* CHECKBOX */}
                <Controller control={control} name="esPropia" render={({ field: { onChange, value } }) => (
                  <View className="mt-4 mb-2">
                    <TouchableOpacity onPress={() => onChange(!value)} className="flex-row items-start gap-3" activeOpacity={0.7}>
                      <View className={`w-5 h-5 border rounded-sm items-center justify-center mt-1 ${value ? 'border-[#14E2B1] bg-[#14E2B1]' : 'border-gray-300'}`}>
                        {value && <Ionicons name="checkmark" size={16} color="white" />}
                      </View>
                      <View className="flex-1">
                        <Text className="text-[13px] font-bold text-[#011B33]">Declaro que esta cuenta es mía y NO de un tercero</Text>
                        <Text className="text-[11px] text-gray-500 mt-1">*Es obligatorio que la cuenta esté a tu nombre para que el cambio sea exitoso</Text>
                      </View>
                    </TouchableOpacity>
                    {errors.esPropia && <Text className="text-red-500 text-[10px] mt-1 ml-8">{errors.esPropia.message}</Text>}
                  </View>
                )} />

              </View>
              
              <View className="pb-10 pt-6">
                <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={!isValid} activeOpacity={0.8}
                  className={`w-full py-4 rounded-lg items-center ${!isValid ? 'bg-[#c3eadd]' : 'bg-[#14E2B1]'}`}
                >
                  <Text className="font-bold text-[#011B33]">AGREGAR Y USAR</Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
}