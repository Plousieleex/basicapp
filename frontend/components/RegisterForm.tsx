import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import CustomHomeButton from './CustomHomeButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useAuth } from '@/customHooks/useAuth';

export default function RegisterForm() {
  const [nameSurname, setNameSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { setUser, setToken } = useAuth();

  const handleRegister = async () => {
    try {
      const res = await fetch('http://192.168.137.1:3000/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nameSurname, email, password }),
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
      <Text style={styles.title}>Register</Text>
      <CustomInput
        label="Ad Soyad"
        placeholder="Enter your name and surname"
        value={nameSurname}
        onChangeText={setNameSurname}
      />
      <CustomInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <CustomInput
        label="Şifre"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomButton
        title="Kayıt Ol"
        onPress={handleRegister}
        style={{ backgroundColor: 'blue' }}
      />
      <CustomHomeButton title="Ana Sayfa" />
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
