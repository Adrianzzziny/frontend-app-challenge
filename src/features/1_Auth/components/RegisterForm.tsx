import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { registerSchema, RegisterFormValues } from '../utils/registerSchema';
import BaseInput from '../../../shared/components/ui/BaseInput';

export default function RegisterForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      acceptPrivacy: false,
      acceptPromotions: false,
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    console.log('Registro exitoso:', values.email);
    router.push('/onboarding/datos');
  };

  const CheckboxItem = ({ label, value, onChange, error }: any) => (
    <View className="mb-4">
      <TouchableOpacity 
        onPress={() => onChange(!value)} 
        className="flex-row items-start gap-3" 
        activeOpacity={0.7}
      >
        <View className={`w-5 h-5 border rounded-sm items-center justify-center mt-0.5 ${value ? 'border-[#060F26] bg-[#060F26]' : 'border-gray-400'}`}>
          {value && <Ionicons name="checkmark" size={16} color="white" />}
        </View>
        <Text className="flex-1 text-[13px] leading-4 text-gray-600">{label}</Text>
      </TouchableOpacity>
      {error && <Text className="text-red-500 text-[10px] mt-1 ml-8">{error}</Text>}
    </View>
  );

  return (
    <View className="flex-1 px-6 pt-4 pb-8 justify-between">
      {/* HEADER */}
      <View>
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2" activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color="#011B33" />
          </TouchableOpacity>
          <Text className="flex-1 text-center text-lg font-bold text-[#011B33] pr-6">
            Regístrate
          </Text>
        </View>

        {/* FORM INPUTS */}
        <View className="space-y-3 px-3">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <BaseInput
                className='mb-[10px]'
                label="Correo"
                placeholder="Escribe tu correo"
                value={value}
                onChangeText={onChange}
                error={errors.email?.message}
                autoCapitalize="none"
              />
            )}
          />

          <Controller
            control={control}
            name="confirmEmail"
            render={({ field: { onChange, value } }) => (
              <BaseInput
                className='mb-[10px]'
                label="Confirmar correo"
                placeholder="Confirma tu correo"
                value={value}
                onChangeText={onChange}
                error={errors.confirmEmail?.message}
                autoCapitalize="none"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <BaseInput
                className='mb-[10px]'
                label="Crea tu contraseña"
                placeholder="Escribe tu contraseña"
                value={value}
                onChangeText={onChange}
                error={errors.password?.message}
                secureTextEntry={!isPasswordVisible}
                suffix={
                  <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} className="p-1.5 top-1.5">
                    <Ionicons name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                }
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <BaseInput
                className='mb-[10px]'
                label="Confirma tu contraseña"
                placeholder="Confirma tu contraseña"
                value={value}
                onChangeText={onChange}
                error={errors.confirmPassword?.message}
                secureTextEntry={!isConfirmPasswordVisible}
                suffix={
                  <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} className="p-1.5 top-1.5">
                    <Ionicons name={isConfirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                }
              />
            )}
          />

          {/* CHECKBOXES */}
          <View className="mt-2">
            <Controller
              control={control}
              name="acceptTerms"
              render={({ field: { onChange, value } }) => (
                <CheckboxItem
                  label={<Text>He leído y acepto los <Text className="underline font-medium">Términos y condiciones</Text></Text>}
                  value={value} onChange={onChange} error={errors.acceptTerms?.message} 
                />
              )}
            />
            <Controller
              control={control}
              name="acceptPrivacy"
              render={({ field: { onChange, value } }) => (
                <CheckboxItem 
                  label={<Text>Acepto de manera expresa e informada la <Text className="underline font-medium">Política de Privacidad</Text></Text>}
                  value={value} onChange={onChange} error={errors.acceptPrivacy?.message} 
                />
              )}
            />
            <Controller
              control={control}
              name="acceptPromotions"
              render={({ field: { onChange, value } }) => (
                <CheckboxItem 
                  label={<Text>Deseo recibir información sobre promociones, ofertas exclusivas y novedades...</Text>}
                  value={value} onChange={onChange}
                />
              )}
            />
          </View>
        </View>
      </View>

      {/* BOTON Y ENLACE LOGIN */}
      <View>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isLoading}
          activeOpacity={0.8}
          className={`w-full py-4 rounded-lg flex-row justify-center items-center ${
            !isValid || isLoading ? 'bg-[#B2E7DF]' : 'bg-[#00E3C2]'
          }`}
        >
          {isLoading ? (
            <ActivityIndicator color="#011B33" />
          ) : (
            <Text className="font-bold text-[#060F26] text-sm tracking-wider">REGISTRARME</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/login')} activeOpacity={0.7} className="mt-6">
          <Text className="text-center text-sm text-gray-500">
            ¿Ya tienes cuenta? <Text className="text-gray-600 underline font-medium">Ingresa aquí</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}