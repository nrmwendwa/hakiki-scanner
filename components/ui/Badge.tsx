import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

interface BadgeProps {
  label: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'accent' | 'safe' | 'suspicious' | 'fake' | 'muted';
  style?: ViewStyle;
}

export function Badge({ label, icon, variant = 'primary', style }: BadgeProps) {
  return (
    <View style={[styles.base, styles[variant], style]}>
      {icon}
      <Text style={[styles.label, styles[`label_${variant}`]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  primary: {
    backgroundColor: Colors.primaryBg,
    borderColor: Colors.primaryBorder,
  },
  label_primary: { color: Colors.primary },
  accent: {
    backgroundColor: Colors.accentBg,
    borderColor: 'rgba(245,168,48,0.3)',
  },
  label_accent: { color: Colors.accent },
  safe: {
    backgroundColor: Colors.safeBg,
    borderColor: Colors.safeBorder,
  },
  label_safe: { color: Colors.safe },
  suspicious: {
    backgroundColor: Colors.suspiciousBg,
    borderColor: Colors.suspiciousBorder,
  },
  label_suspicious: { color: Colors.suspicious },
  fake: {
    backgroundColor: Colors.fakeBg,
    borderColor: Colors.fakeBorder,
  },
  label_fake: { color: Colors.fake },
  muted: {
    backgroundColor: Colors.mutedBg,
    borderColor: Colors.border,
  },
  label_muted: { color: Colors.muted },
});
