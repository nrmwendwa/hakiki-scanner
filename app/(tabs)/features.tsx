import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ScanLine, 
  Zap, 
  Globe, 
  ShieldCheck, 
  ArrowRight,
  Target,
  Users,
  Lock
} from 'lucide-react-native';
import { Colors, Gradients } from '@/constants/Colors';
import { FeatureCard } from '@/components/FeatureCard';
import { Button } from '@/components/ui/Button';

const FEATURES = [
  {
    icon: <ScanLine size={24} color={Colors.primary} />,
    title: 'Kichunguzi cha Deepfake',
    description:
      'Hugundua nyuso zilizotengenezwa na AI au zilizobadilishwa kwa kutumia modeli za CNN na kutoa uamuzi wa HALISI, SHAKA, au BANDIA.',
  },
  {
    icon: <Zap size={24} color={Colors.primary} />,
    title: 'Uchambuzi wa Haraka',
    description:
      'AI huchambua picha zilizopakiwa kwa sekunde, ikitoa alama za uhakika na muhtasari wa kina wa kila jamii.',
  },
  {
    icon: <Globe size={24} color={Colors.primary} />,
    title: 'Mobile + Wavuti',
    description:
      'Inafanya kazi kwenye majukwaa yote ya simu na wavuti, ikitoa msaada wa nje ya mtandao kwa maeneo ya data ya chini.',
  },
  {
    icon: <Users size={24} color={Colors.primary} />,
    title: 'Ripoti ya Jamii',
    description:
      'Shiriki matokeo yaliyothibitishwa au alama picha zenye shaka kwa ukaguzi wa jamii wa pamoja.',
  },
  {
    icon: <Lock size={24} color={Colors.primary} />,
    title: 'Faragha Kwanza',
    description:
      'Picha zako hazihifadhiwi kwenye seva. Uchambuzi ni wa mara moja tu na data hufutwa mara baada ya matokeo.',
  },
  {
    icon: <Target size={24} color={Colors.primary} />,
    title: 'Alama za Uhakika',
    description:
      'Pata asilimia za kina kwa kila darasa: Halisi, Shaka, na Bandia — si uamuzi tu wa ndiyo/hapana.',
  },
];

export default function FeaturesScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Vipengele <Text style={styles.titleHighlight}>Muhimu</Text>
          </Text>
          <Text style={styles.subtitle}>
            Imejengwa kupigana na ushabiki na kulinda utambulisho wa kidijitali Tanzania na zaidi.
          </Text>
        </View>

        {/* Feature cards */}
        <View style={styles.cardsContainer}>
          {FEATURES.map((f, i) => (
            <FeatureCard
              key={i}
              index={i}
              icon={f.icon}
              title={f.title}
              description={f.description}
            />
          ))}
        </View>

        {/* CTA */}
        <View style={styles.ctaCard}>
          <ShieldCheck size={40} color={Colors.primary} />
          <Text style={styles.ctaTitle}>Uko Tayari Kuthibitisha?</Text>
          <Text style={styles.ctaSub}>
            Jilinde dhidi ya uigaji wa deepfake. Jaribu HAKIKI SCANNER sasa — ni bure.
          </Text>
          <Button
            label="Anzisha Scanner"
            onPress={() => router.push('/(tabs)/scanner')}
            variant="primary"
            icon={<ScanLine size={18} color={Colors.background} />}
            fullWidth
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 100,
    paddingTop: Platform.OS === 'ios' ? 70 : 56,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 28,
    gap: 10,
  },
  title: {
    color: Colors.foreground,
    fontSize: 32,
    fontWeight: '900',
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -1,
  },
  titleHighlight: {
    color: Colors.primary,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
  },
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 32,
  },
  ctaCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.primaryBg,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: Colors.primaryBorder,
    padding: 32,
    alignItems: 'center',
    gap: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  ctaTitle: {
    color: Colors.foreground,
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  ctaSub: {
    color: Colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
    fontFamily: 'Inter_400Regular',
  },
});
