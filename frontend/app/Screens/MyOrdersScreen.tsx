import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import CustomButton from '@/components/CustomButton';

interface OrderItem {
  id: number;
  book: {
    id: number;
    title: string;
    author: string;
  };
  quantity: number;
}

interface Order {
  id: number;
  createdAt: string;
  status: string;
  orderItems: OrderItem[];
}

export default function MyOrdersScreen() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>();
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (!token) return;

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          'http://192.168.137.1:3000/api/v1/order/',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Orders could not be fetched.');
        }

        const data = await response.json();
        if (data.status === 'success') {
          setOrders(data.data);
        } else {
          console.error('Error fetching orders: ', data);
        }
      } catch (e) {
        console.error('Fetch orders error: ', e);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, isFocused]);

  const renderOrderItem = ({ item }: { item: Order }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderTitle}>Order #{item.id}</Text>
      <Text style={styles.orderDate}>
        Date: {new Date(item.createdAt).toLocaleString()}
      </Text>
      <Text style={styles.orderStatus}>Status: {item.status}</Text>
      <FlatList
        data={item.orderItems}
        keyExtractor={(orderItem) => orderItem.id.toString()}
        renderItem={({ item: orderItem }) => (
          <View style={styles.orderItem}>
            <Text style={styles.bookTitle}>
              {orderItem.book.title} (x{orderItem.quantity})
            </Text>
            <Text style={styles.bookAuthor}>by {orderItem.book.author}</Text>
          </View>
        )}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!orders || orders.length == 0) {
    return (
      <View style={styles.centered}>
        <Text>No orders found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
      />
      <CustomButton
        title="Go Back"
        onPress={() => navigation.goBack()}
        style={{ backgroundColor: '#231919' }}
        textStyle={{ fontSize: 18 }}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderCard: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  orderStatus: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 8,
  },
  orderItem: {
    paddingVertical: 4,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 4,
  },
  bookTitle: {
    fontSize: 16,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
  },
});
