import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from '@/navigators/MainNavigator';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}
