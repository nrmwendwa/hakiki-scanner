import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface StepCardProps {
  step: string;
  title: string;
  description: string;
  isLast?: boolean;
}

export function StepCard({ step, title, description, isLast = false }: StepCardProps) {
  return (
    <View style={styles.container}>
      {/* Left decoration */}
      <View style={styles.leftColumn}>
        <View style={styles.circle}>
          <Text style={styles.stepNum}>{step}</Text>
        </View>
        {!isLast && <View style={styles.line} />}
      </View>

      {/* Right content */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {!isLast && <View style={styles.spacer} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
  },
  leftColumn: {
    alignItems: 'center',
    width: 36,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 2,
  },
  stepNum: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: '900',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  content: {
    flex: 1,
    paddingTop: 4,
  },
  title: {
    color: Colors.foreground,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold',
    marginBottom: 6,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
  },
  spacer: {
    height: 32,
  },
});
