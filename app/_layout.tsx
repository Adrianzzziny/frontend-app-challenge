import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Platform, Text } from 'react-native';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';

import * as SplashScreen from 'expo-splash-screen';
import { 
  useFonts, 
  Montserrat_400Regular, 
  Montserrat_500Medium, 
  Montserrat_600SemiBold, 
  Montserrat_700Bold 
} from '@expo-google-fonts/montserrat';

SplashScreen.preventAutoHideAsync();

const oldTextRender = (Text as any).render;
(Text as any).render = function (...args: any[]) {
  const origin = oldTextRender.call(this, ...args);
  return React.cloneElement(origin, {
    style: [{ fontFamily: 'Montserrat_400Regular' }, origin.props.style],
  });
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f6f8' }} edges={['top', 'left', 'right']} >
        <StatusBar style="dark" /> 
          
          <ThemeProvider value={DefaultTheme}>
            <Stack 
              screenOptions={{ 
                headerShown: false,
                animation: Platform.OS === 'android' ? 'slide_from_right' : 'default',
                contentStyle: { backgroundColor: '#f5f6f8' }
              }} 
            />
          </ThemeProvider>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}