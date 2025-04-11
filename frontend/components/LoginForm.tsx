import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomHomeButton from '../components/CustomHomeButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useAuth } from '@/customHooks/useAuth';
import loginUser from '@/services/auth'

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { setUser, setToken } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);
      });

      const json = await res.json();

      if (res.ok) {
        await AsyncStorage.setItem('token', json.token);
        await AsyncStorage.setItem('user', JSON.stringify(json.data.user));
        setToken(json.token);
        setUser(json.data.user);
        router.replace('/Screens/HomeScreen');
      } else {
        Alert.alert(json.message);
      }
    } catch (err) {
      Alert.alert('Sunucu hatası');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <CustomInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <CustomInput
        label="Password"
        placeholder="Enter your password."
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomButton
        title="Login"
        onPress={handleLogin}
        style={{ backgroundColor: 'green' }}
      />
      <CustomHomeButton title="Home Page" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
