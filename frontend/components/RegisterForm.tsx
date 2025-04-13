import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomHomeButton from '../components/CustomHomeButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { registerUser } from '@/services/auth';

export default function RegisterForm() {
  const [nameSurname, setNameSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { user, token } = useAuth();

  const handleRegister = async () => {
    try {
      const json = await registerUser(nameSurname, email, password);

      router.replace('/Screens/HomeScreen');
    } catch (err) {
      Alert.alert('Server error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <CustomInput
        label="Name Surname"
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
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomButton
        title="Register"
        onPress={handleRegister}
        style={{ backgroundColor: 'blue' }}
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
