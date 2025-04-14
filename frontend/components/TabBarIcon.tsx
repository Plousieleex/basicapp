import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface TabBarIconProps {
  routeName: string;
  focused: boolean;
  color: string;
  size: number;
}

const TabBarIcon = ({ routeName, focused, color, size }: TabBarIconProps) => {
  let iconName:
    | 'log-in'
    | 'log-in-outline'
    | 'person-add'
    | 'person-add-outline'
    | 'book'
    | 'book-outline'
    | 'person'
    | 'person-outline' = 'log-in';

  if (routeName === 'Login') {
    iconName = focused ? 'log-in' : 'log-in-outline';
  } else if (routeName === 'Register') {
    iconName = focused ? 'person-add' : 'person-add-outline';
  } else if (routeName === 'HomeTab') {
    iconName = focused ? 'book' : 'book-outline';
  } else if (routeName === 'ProfileTab') {
    iconName = focused ? 'person' : 'person-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

export default TabBarIcon;
