import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BookDetailScreen from './BookDetailScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../types/navigation';

interface Book {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
}

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Home'
>;

export default function HomeScreen() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    fetch('http://192.168.137.1:3000/api/v1/book/')
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books: ', error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('BookDetail', { id: item.id })}
    >
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.bookImage} />
      ) : (
        <View style={[styles.bookImage, { backgroundColor: '#ccc' }]} />
      )}
      <View style={styles.itemContent}>
        <Text style={styles.title}>{item.title}</Text>
        {item.author && <Text style={styles.author}>{item.author}</Text>}
        <Text style={styles.detailButtonText}>Click for Details</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books as Book[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  bookImage: {
    width: 80,
    height: 120,
  },
  itemContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  detailButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  detailButtonText: {
    color: 'black',
    fontSize: 12,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
