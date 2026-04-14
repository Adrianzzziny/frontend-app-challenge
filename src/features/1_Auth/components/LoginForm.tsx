import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';
import logoKambista from '../../../../assets/images/logoKambista.png';

import { loginSchema, LoginFormValues } from '../utils/loginSchema';
import BaseInput from '../../../shared/components/ui/BaseInput';
import { useAuthStore } from '../store/auth.store';

export default function LoginForm() {
  const { login, isLoading } = useAuthStore();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange', // Validación en tiempo real
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const togglePassword = () => setIsPasswordVisible((prev) => !prev);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
    } catch (error: any) {
      if (error?.data?.name === 'INVALID_CREDENTIALS') {
        setError('password', { message: error.data.message });
        setError('email', { message: error.data.message });
      } else {
        console.error('Error al iniciar sesión:', error);
      }
    }
  };

  return (
    <View className="w-full max-w-sm mx-auto px-5">
      <Image source={logoKambista} style={{ width: 240, height: 50, margin: 'auto', marginBottom: 20, marginTop: -50 }} />
      {/* Título */}
      <Text className="text-2xl font-bold text-gray-800 text-center mb-8">
        Inicia sesión
      </Text>

      {/* Contenedor del Formulario*/}
      <View>
        {/* INPUT: CORREO */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <BaseInput
              className='mb-[20px]'
              label="Correo electrónico"
              placeholder="ejemplo@mail.com"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
              editable={!isLoading}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />

        {/* INPUT: CONTRASEÑA */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <BaseInput
            className='mb-[20px]'
              label="Contraseña"
              placeholder="Escribe tu contraseña"
              value={value}
              onChangeText={onChange}
              error={errors.password?.message}
              editable={!isLoading}
              secureTextEntry={!isPasswordVisible}
              suffix={
                <TouchableOpacity
                  onPress={togglePassword}
                  className="h-full justify-center items-center px-3"
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              }
            />
          )}
        />

        {/* OPCIONES ADICIONALES */}
        <View className="flex-row justify-between items-center mt-1 mb-4">
          <TouchableOpacity className="flex-row items-center gap-2" activeOpacity={0.8}>
            <View className="w-4 h-4 border border-gray-300 rounded-sm items-center justify-center" />
            <Text className="text-sm text-gray-500">Recordarme</Text>
          </TouchableOpacity>
          
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-sm text-gray-500 underline decoration-gray-300">
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
        </View>

        {/* BOTÓN SUBMIT */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isLoading}
          activeOpacity={0.8}
          className={`mt-[87px] w-full py-3.5 rounded-lg flex-row justify-center items-center ${
            !isValid || isLoading ? 'bg-[#c3eadd]' : 'bg-[#14E2B1]'
          }`}
        >
          {isLoading ? (
            <>
              <ActivityIndicator color="#6B7280" className="mr-2" />
              <Text className="font-semibold text-gray-500">Ingresando...</Text>
            </>
          ) : (
            <Text className="font-semibold text-[#011B33]">INICIA SESIÓN</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* ENLACE DE REGISTRO */}
      <Text className="text-center text-sm text-gray-500 mt-8">
        ¿No tienes cuenta?{' '}
          <Text className="text-gray-600 underline decoration-gray-300 font-medium">
            Regístrate aquí
          </Text>
      </Text>
    </View>
  );
}