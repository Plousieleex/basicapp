import React, { createContext, useState, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

interface AuthContextProps {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    nameSurname: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    // API Call
    // setUser(response.user) setToken(response.token)
    try {
      const res = await fetch('http://192.168.137.1:3000/api/v1/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      await AsyncStorage.setItem('token', json.token);
      await AsyncStorage.setItem('user', JSON.stringify(json.data.user));

      if (res.ok) {
        setUser(json.data.user);
        setToken(json.token);
      } else {
        Alert.alert(json.message || 'Failed to login.');
      }
    } catch (e) {
      Alert.alert('Server error.');
    }
  };

  const register = async (
    nameSurname: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await fetch('http://192.168.137.1:3000/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nameSurname, email, password }),
      });

      const json = await res.json();

      await AsyncStorage.setItem('token', json.token);
      await AsyncStorage.setItem('user', JSON.stringify(json.data.newUser));

      if (res.ok) {
        setUser(json.data.newUser);
        setToken(json.token);
      } else {
        Alert.alert(json.message || 'Failed to register.');
      }
    } catch (e) {
      Alert.alert('Server error.');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    router.navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
