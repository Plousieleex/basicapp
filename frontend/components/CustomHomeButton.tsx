import React from 'react';
import { useRouter } from 'expo-router';
import CustomButton from './CustomButton';

type Props = {
  title: string;
};

export default function CustomHomeButton({ title }: Props) {
  const router = useRouter();
  return (
    <CustomButton
      title={title}
      onPress={() => router.replace('/')}
      style={{ backgroundColor: '#6c757d' }}
    />
  );
}
