// No authentication navigator
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '@/components/TabBarIcon';
import LoginScreen from '@/app/Screens/LoginScreen';
import RegisterScreen from '@/app/Screens/RegisterScreen';

const Tab = createBottomTabNavigator();

export function AuthNavigator() {
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
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login' }}
      ></Tab.Screen>
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Register' }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}
