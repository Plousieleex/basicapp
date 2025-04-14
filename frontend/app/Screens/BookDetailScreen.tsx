import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '@/types/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface BookDetail {
  id: number;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  price: number;
}

export default function BookDetailScreen() {
  const { token } = useAuth();
  const route = useRoute();
  const navigation = useNavigation();

  const { id } = route.params as { id: Number };

  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const handleBuyButton = async () => {
    if (!token || !book || !book.id) {
      Alert.alert('Error.', 'Gerekli bilgiler eksik.');
      return;
    }
    try {
      const response = await fetch(
        'http://192.168.137.1:3000/api/v1/order/purchase',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookId: book?.id, quantity: 1 }),
        }
      );

      if (!response.ok) {
        throw new Error('Cant purchase right now.');
      }

      const result = await response.json();

      if (result.status === 'success') {
        Alert.alert('Success.', 'Purchased.');
      } else {
        Alert.alert('Error.', 'Error while purchasing.');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error.', 'Server error while purchasing.');
    }
  };

  useEffect(() => {
    fetch(`http://192.168.137.1:3000/api/v1/book/${id}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 'success' && json.data) {
          setBook(json.data);
        }
      })
      .catch((error) => {
        console.error('Cant get book details.', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.centered}>
        <Text>Cant get book details.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: book.imageUrl }} style={styles.bookImage} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>by {book.author}</Text>
      <Text style={styles.description}>{book.description}</Text>
      <Text style={styles.price}>Price: {book.price} TL</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.purchaseButton}
          onPress={handleBuyButton}
        >
          <Text style={styles.buttonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 80,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  author: {
    fontSize: 18,
    color: '#555',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  backButton: {
    backgroundColor: '#257EC4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    width: 150,
  },
  purchaseButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    width: 150,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
