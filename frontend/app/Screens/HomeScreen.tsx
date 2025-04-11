import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '@/customHooks/useAuth';

export default function HomeScreen() {
  const [users, setUsers] = useState([]);
  const { token, logout } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('http://192.168.137.1:3000/api/v1/users/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      setUsers(json.data);
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.nameSurname}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
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
