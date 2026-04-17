import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Colors, Gradients } from '@/constants/Colors';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'accent' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
  fullWidth = false,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const handlePress = () => {
    if (!isDisabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  const getGradient = () => {
    switch (variant) {
      case 'primary': return Gradients.primary;
      case 'accent': return Gradients.accent;
      case 'danger': return Gradients.fake;
      default: return null;
    }
  };

  const gradient = getGradient();

  const content = (
    <View style={styles.contentWrap}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? Colors.primary : Colors.background}
          size="small"
        />
      ) : (
        <>
          {icon}
          <Text 
            style={[
              styles.label, 
              styles[`label_${variant}`], 
              styles[`labelSize_${size}`], 
              textStyle
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </View>
  );

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[
        styles.base,
        !gradient && styles[variant],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {gradient ? (
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, styles.gradient]}
        >
          {content}
        </LinearGradient>
      ) : content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    height: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Variants (Non-gradient)
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  ghost: {
    backgroundColor: Colors.primaryBg,
    borderWidth: 1,
    borderColor: Colors.primaryBorder,
  },
  // Fallback styles for TouchableOpacity
  primary: { backgroundColor: Colors.primary },
  accent: { backgroundColor: Colors.accent },
  danger: { backgroundColor: Colors.fake },
  
  disabled: {
    opacity: 0.5,
  },
  // Sizes
  size_sm: { height: 40, paddingHorizontal: 16 },
  size_md: { height: 50, paddingHorizontal: 22 },
  size_lg: { height: 60, paddingHorizontal: 28 },
  // Labels
  label: {
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.3,
  },
  label_primary: { color: Colors.background },
  label_accent: { color: Colors.background },
  label_outline: { color: Colors.foreground },
  label_ghost: { color: Colors.primary },
  label_danger: { color: Colors.white },
  labelSize_sm: { fontSize: 13 },
  labelSize_md: { fontSize: 15 },
  labelSize_lg: { fontSize: 16 },
});
