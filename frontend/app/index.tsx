import { Text, View, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import CustomButton from '@/components/CustomButton';
import { useAuth } from '@/contexts/AuthContext';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthNavigator } from '@/navigators/AuthNavigator';
import { MainNavigator } from '@/navigators/MainNavigator';

export default function Index() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  const { user } = useAuth();

  return <>{user ? <MainNavigator /> : <AuthNavigator />}</>;
}

/* export default function Index() {
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Welcome',
      headerTitleAlign: 'center',
    });
  }, [navigation]);
  const handleLogin = () => {
    router.push('/Screens/LoginScreen');
  };
  const handleRegister = () => {
    router.push('/Screens/RegisterScreen');
  };
  const handleGuest = () => {
    router.push('/Screens/HomeScreen');
  };

  return (
    <View style={styles.container}>
      <CustomButton
        title="Login"
        onPress={handleLogin}
        style={styles.loginBtn}
      />
      <CustomButton
        title="Register"
        onPress={handleRegister}
        style={styles.registerBtn}
      />
      <CustomButton
        title="Continue as a Guest"
        onPress={handleGuest}
        style={styles.guestBtn}
      />
    </View>
  ); 

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Register" component={RegisterScreen} />
    </Tab.Navigator>
  );
} */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#C29F85',
  },
  loginBtn: {
    backgroundColor: '#521903',
  },
  registerBtn: {
    backgroundColor: '#DCBC18',
  },
  guestBtn: {
    backgroundColor: '#9F4409',
  },
});
