/**
 * HAKIKI SCANNER — Design System Colors
 * Optimized for premium dark mode with gradients.
 */

export const Colors = {
  // Base
  background: '#0E1119',      
  backgroundAlt: '#111623',   
  card: '#111623',            
  cardInner: '#131926',       
  border: '#1E2535',          
  input: '#1E2535',

  // Foreground
  foreground: '#F0EFE5',      
  muted: '#8A95A9',           
  mutedBg: '#161D2A',         

  // Primary (Green Gradient)
  primary: '#2CD57E',         
  primaryDark: '#1FA863',
  primaryBg: 'rgba(44,213,126,0.10)',
  primaryBorder: 'rgba(44,213,126,0.30)',

  // Accent (Amber/Gold Gradient)
  accent: '#F5A830',          
  accentBg: 'rgba(245,168,48,0.10)',
  accentBorder: 'rgba(245,168,48,0.30)',

  // Verdict colors
  safe: '#2CD57E',
  safeBg: 'rgba(44,213,126,0.10)',
  safeBorder: 'rgba(44,213,126,0.30)',

  suspicious: '#F59E0B',
  suspiciousBg: 'rgba(245,158,11,0.10)',
  suspiciousBorder: 'rgba(245,158,11,0.30)',

  fake: '#EF4444',
  fakeBg: 'rgba(239,68,68,0.10)',
  fakeBorder: 'rgba(239,68,68,0.30)',

  // Gray scale for text depth
  textPrimary: '#F0EFE5',
  textSecondary: '#8A95A9',
  textTertiary: '#586070',

  // Utility
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(14,17,25,0.85)',
  shadow: 'rgba(0,0,0,0.5)',
};

// Gradient configurations for expo-linear-gradient
export const Gradients = {
  hero: ['rgba(44,213,126,0.15)', 'rgba(245,168,48,0.08)', 'transparent'] as const,
  primary: ['#2CD57E', '#1FA863'] as const,
  accent: ['#F5A830', '#D4871A'] as const,
  safe: ['#2CD57E', '#1FA863'] as const,
  suspicious: ['#F59E0B', '#D97706'] as const,
  fake: ['#EF4444', '#B91C1C'] as const,
  card: ['#131926', '#0E1119'] as const,
  glass: ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)'] as const,
};
