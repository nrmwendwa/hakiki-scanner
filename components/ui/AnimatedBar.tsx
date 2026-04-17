import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface AnimatedBarProps {
  value: number; // 0..100
  color: string;
  delay?: number;
  height?: number;
}

export function AnimatedBar({ value, color, delay = 0, height = 8 }: AnimatedBarProps) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: value,
      duration: 900,
      delay,
      useNativeDriver: false,
    }).start();
  }, [value, delay]);

  const width = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.track, { height }]}>
      <Animated.View
        style={[
          styles.bar,
          { width, backgroundColor: color, height },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: Colors.mutedBg,
    borderRadius: 99,
    overflow: 'hidden',
  },
  bar: {
    borderRadius: 99,
  },
});
