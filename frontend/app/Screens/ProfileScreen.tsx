import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';

export default function ProfileS() {
  const [userData, setUserData] = useState<{
    nameSurname: String;
    email: String;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const imageUrl = 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('Token cant found.');
        }

        const res = await fetch(
          'http://192.168.137.1:3000/api/v1/user/myProfile',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
              Pragma: 'no-cache',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error('Error while getting user data.');
        }

        const json = await res.json();

        setUserData({
          nameSurname: json.data.user.nameSurname,
          email: json.data.user.email,
        });
      } catch (e) {
        console.error(e);
        Alert.alert('Error.', 'Cant get user data.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.centered}>
        <Text>Can't find user data. Try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.profileImage} />
      <Text style={styles.nameSurname}>{userData.nameSurname}</Text>
      <Text style={styles.email}>{userData.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,

    margin: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  nameSurname: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
