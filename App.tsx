import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import InicioScreen from './src/features/3_Dashboard/screens/InicioScreen';
//import LoginForm from './src/features/1_Auth/components/LoginForm';
//import RegisterForm from './src/features/1_Auth/components/RegisterForm';
//import PersonalDataForm from './src/features/2_Onboarding/components/PersonalDataForm';
//import SuccessMessage from './src/features/2_Onboarding/components/SuccessMessage';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="dark" />
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-center"
        >
          
          <InicioScreen />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}