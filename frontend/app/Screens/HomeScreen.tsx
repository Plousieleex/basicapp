import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutText: { color: '#fff', fontWeight: 'bold' },
});
