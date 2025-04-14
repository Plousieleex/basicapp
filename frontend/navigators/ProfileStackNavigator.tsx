import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileS from '@/app/Screens/ProfileScreen';
import MyOrdersScreen from '@/app/Screens/MyOrdersScreen';

export type ProfileStackParamList = {
  Profile: undefined;
  MyOrders: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileS} />
      <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
    </Stack.Navigator>
  );
}
