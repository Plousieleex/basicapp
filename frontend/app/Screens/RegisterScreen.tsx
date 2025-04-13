import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <RegisterForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
});
