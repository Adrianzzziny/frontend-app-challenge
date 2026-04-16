import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InicioIcon from '../../../shared/components/icons/InicioIcon';
import HistorialIcon from '../../../shared/components/icons/HistorialIcon';
import CuentasIcon from '../../../shared/components/icons/CuentasIcon';
import KoinksIcon from '../../../shared/components/icons/KoinksIcon';
import PerfilIcon from '../../../shared/components/icons/PerfilIcon';

const navLinks = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Historial', id: 'historial' },
  { label: 'Cuentas', id: 'cuentas' },
  { label: 'Koinks', id: 'koinks' },
  { label: 'Perfil', id: 'perfil' }
];

export default function DashboardBottomNav({ activeRoute = 'inicio' }: { activeRoute?: string }) {

  const insets = useSafeAreaInsets();

  const safeBottom = Platform.OS === 'android' ? Math.max(insets.bottom, 15) : (insets.bottom || 20);

  const renderIcon = (label: string, color: string) => {
    switch (label) {
      case 'Inicio': return <InicioIcon color={color} />;
      case 'Historial': return <HistorialIcon color={color} />;
      case 'Cuentas': return <CuentasIcon color={color} />;
      case 'Koinks': return <KoinksIcon color={color} />;
      case 'Perfil': return <PerfilIcon color={color} />;
      default:
        return null;
    }
  };

  return (
    <View 
      className="absolute bottom-0 w-full bg-white border-t border-gray-200 flex-row justify-around items-center px-2"
      style={{ 
        height: (Platform.OS === 'ios' ? 65 : 60) + safeBottom,
        paddingBottom: safeBottom 
      }}
    >
      {navLinks.map((link) => {
        const isActive = activeRoute === link.id;
        const color = isActive ? '#14E2B1' : '#4B5563';

        return (
          <TouchableOpacity 
            key={link.id} 
            className="items-center justify-center flex-1 py-2"
            activeOpacity={0.7}
          >
            {renderIcon(link.label, color)}
            <Text 
              className={`text-[10px] mt-1 ${isActive ? 'text-[#14E2B1] font-semibold' : 'text-gray-600'}`}
            >
              {link.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}