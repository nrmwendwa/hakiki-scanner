import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  glow?: boolean;
  variant?: 'default' | 'primary' | 'safe' | 'suspicious' | 'fake';
  padding?: number;
}

export function Card({ 
  children, 
  style, 
  glow = false, 
  variant = 'default',
  padding = 16 
}: CardProps) {
  const variantStyle = styles[variant];
  return (
    <View style={[
      styles.base, 
      variantStyle, 
      glow && styles.glow, 
      { padding },
      style
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  default: {},
  primary: {
    borderColor: Colors.primaryBorder,
    backgroundColor: 'rgba(44,213,126,0.04)',
  },
  safe: {
    borderColor: Colors.safeBorder,
    backgroundColor: Colors.safeBg,
  },
  suspicious: {
    borderColor: Colors.suspiciousBorder,
    backgroundColor: Colors.suspiciousBg,
  },
  fake: {
    borderColor: Colors.fakeBorder,
    backgroundColor: Colors.fakeBg,
  },
  glow: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
});
