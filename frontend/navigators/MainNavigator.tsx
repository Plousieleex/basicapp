// If user authenticated --> Using this navigator
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '@/components/TabBarIcon';
import ProfileScreen from '@/app/Screens/ProfileScreen';
import HomeScreen from '@/app/Screens/HomeScreen';
import { HomeStackNavigator } from './HomeStackNavigator';
import { ProfileStackNavigator } from './ProfileStackNavigator';

const Tab = createBottomTabNavigator();

export function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <TabBarIcon
              routeName={route.name}
              focused={focused}
              color={color}
              size={size}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ title: 'Books' }}
      ></Tab.Screen>
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{ title: 'Profile' }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}
