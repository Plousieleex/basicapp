// If user authenticated --> Using this navigator
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '@/app/Screens/ProfileScreen';
import HomeScreen from '@/app/Screens/HomeScreen';

const Tab = createBottomTabNavigator();

export function MainNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: 'Home' }}
      ></Tab.Screen>
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: 'My Profile' }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}
