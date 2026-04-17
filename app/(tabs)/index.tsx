import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ScanSearch, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight,
  Fingerprint,
  Zap,
  Globe
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors, Gradients } from '@/constants/Colors';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section with Gradient */}
        <View style={styles.heroWrap}>
          <LinearGradient
            colors={Gradients.hero}
            style={StyleSheet.absoluteFill}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
          
          <Animated.View 
            entering={FadeInDown.duration(800).delay(200)}
            style={styles.header}
          >
            <View style={styles.badge}>
              <Zap size={12} color={Colors.primary} fill={Colors.primary} />
              <Text style={styles.badgeText}>AI-POWERED ANALYSIS</Text>
            </View>
            <Text style={styles.heroTitle}>
              Hakikisha{'\n'}
              <Text style={styles.heroHighlight}>Uhalisia</Text>
            </Text>
            <Text style={styles.heroSub}>
              Teknolojia ya kisasa ya AI kugundua deepfakes na kulinda utambulisho wako Tanzania.
            </Text>
          </Animated.View>

          <Animated.View 
            entering={FadeInUp.duration(800).delay(400)}
            style={styles.heroActions}
          >
            <Button
              label="Anza Kukagua"
              onPress={() => router.push('/(tabs)/scanner')}
              size="lg"
              variant="primary"
              icon={<ScanSearch size={22} color={Colors.background} />}
              style={styles.mainBtn}
            />
            <Button
              label="Jinsi Inavyofanya Kazi"
              onPress={() => router.push('/(tabs)/about')}
              size="lg"
              variant="outline"
            />
          </Animated.View>
        </View>

        {/* Stats Section */}
        <Animated.View 
          entering={FadeInUp.duration(600).delay(600)}
          style={styles.statsRow}
        >
          <View style={styles.statItem}>
            <Text style={styles.statValue}>99%</Text>
            <Text style={styles.statLabel}>Usahihi</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>&lt;2s</Text>
            <Text style={styles.statLabel}>Uchambuzi</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>100%</Text>
            <Text style={styles.statLabel}>Usiri</Text>
          </View>
        </Animated.View>

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tunachunguza Nini?</Text>
          <View style={styles.categories}>
            <CategoryCard
              icon={<ShieldCheck size={28} color={Colors.safe} />}
              title="Picha Halisi"
              desc="Tunathibitisha uhalisi wa nyuso kwenye picha za kawaida."
              color={Colors.safe}
            />
            <CategoryCard
              icon={<Fingerprint size={28} color={Colors.suspicious} />}
              title="Uhuishaji wa AI"
              desc="Gundua picha zilizotengenezwa na Generative AI."
              color={Colors.suspicious}
            />
            <CategoryCard
              icon={<AlertTriangle size={28} color={Colors.fake} />}
              title="Deepfakes"
              desc="Tambua nyuso zilizobadilishwa kwa kutumia teknolojia."
              color={Colors.fake}
            />
          </View>
        </View>

        {/* Localized Section */}
        <Card variant="primary" style={styles.localizedCard}>
           <View style={styles.localizedHeader}>
              <Globe size={24} color={Colors.primary} />
              <Text style={styles.localizedTitle}>Salama Tanzania</Text>
           </View>
           <Text style={styles.localizedText}>
             HAKIKI inatumia hifadhidata maalum ya nyuso za Kitanzania ili kutoa usahihi wa juu zaidi katika mazingira yetu ya asili.
           </Text>
        </Card>

      </ScrollView>
    </View>
  );
}

function CategoryCard({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) {
  return (
    <Card style={styles.catCard} padding={20}>
      <View style={[styles.catIconWrap, { backgroundColor: color + '15' }]}>
        {icon}
      </View>
      <Text style={styles.catTitle}>{title}</Text>
      <Text style={styles.catDesc}>{desc}</Text>
      <View style={styles.catFooter}>
        <Text style={[styles.catLink, { color }]}>Jifunze zaidi</Text>
        <ArrowRight size={14} color={color} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Account for absolute tab bar
  },
  heroWrap: {
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
    minHeight: 480,
    justifyContent: 'center',
    position: 'relative',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primaryBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.primaryBorder,
  },
  badgeText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    fontFamily: 'Inter_700Bold',
  },
  heroTitle: {
    color: Colors.foreground,
    fontSize: 44,
    fontWeight: '900',
    textAlign: 'center',
    fontFamily: 'SpaceGrotesk_700Bold',
    lineHeight: 52,
    letterSpacing: -1,
  },
  heroHighlight: {
    color: Colors.primary,
  },
  heroSub: {
    color: Colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24,
    maxWidth: 300,
    fontFamily: 'Inter_400Regular',
  },
  heroActions: {
    gap: 12,
  },
  mainBtn: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  statLabel: {
    color: Colors.textTertiary,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'Inter_500Medium',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
    opacity: 0.5,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  sectionTitle: {
    color: Colors.foreground,
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk_700Bold',
    marginBottom: 20,
  },
  categories: {
    gap: 16,
  },
  catCard: {
    gap: 12,
  },
  catIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  catTitle: {
    color: Colors.foreground,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  catDesc: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
  },
  catFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  catLink: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  localizedCard: {
    marginHorizontal: 20,
    padding: 24,
    gap: 12,
  },
  localizedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  localizedTitle: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  localizedText: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
  },
});
