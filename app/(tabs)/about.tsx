import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  History as StepsIcon, 
  Cpu, 
  Activity, 
  ChevronRight,
  ShieldCheck,
  Scan,
  Database,
  FastForward,
  Info
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { StepCard } from '@/components/StepCard';
import { hakikiApi, HealthStatus } from '@/services/api';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

const STEPS = [
  {
    step: '01',
    title: 'Pokea picha yenye shaka',
    description:
      'Pata picha kutoka WhatsApp, Instagram, Telegram, au chanzo chochote cha mtandaoni.',
  },
  {
    step: '02',
    title: 'Pakia kwenye HAKIKI Scanner',
    description:
      'Gonga kitufe cha kamera au matunzio ili kuchagua picha yako, au pakia moja kwa moja kutoka kwa kifaa chako.',
  },
  {
    step: '03',
    title: 'AI inachambua kwa sekunde',
    description:
      'Modeli yetu ya EfficientNet iliyofunzwa inashughulikia picha na kuitathmini dhidi ya mamilioni ya nyuso halisi na bandia.',
  },
  {
    step: '04',
    title: 'Pata uamuzi wako',
    description:
      'Ona HALISI, SHAKA, au BANDIA pamoja na alama za asilimia kwa kila darasa. Shiriki au hifadhi kwa usalama.',
  },
];

export default function AboutScreen() {
  const router = useRouter();
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [healthLoading, setHealthLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const status = await hakikiApi.health();
        setHealth(status);
      } catch {
        setHealth(null);
      } finally {
        setHealthLoading(false);
      }
    };
    checkHealth();
  }, []);

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
            Jinsi <Text style={styles.titleHighlight}>Inavyofanya</Text> Kazi
          </Text>
          <Text style={styles.subtitle}>
            Mchakato rahisi wa hatua 4 kuthibitisha uhalisi wa uso wa mtu yeyote kwa kutumia AI.
          </Text>
        </View>

        {/* Steps */}
        <View style={styles.stepsSection}>
          <View style={styles.sectionHeader}>
            <StepsIcon size={16} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Mchakato wa Hatua</Text>
          </View>
          {STEPS.map((s, i) => (
            <StepCard key={i} {...s} isLast={i === STEPS.length - 1} />
          ))}
        </View>

        {/* Dynamic Model Info */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Cpu size={16} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Maelezo ya Teknolojia</Text>
          </View>
          
          <Card padding={20}>
            <TechRow icon={<Cpu size={18} color={Colors.primary} />} label="Modeli" value="EfficientNet-B0 (Tanzania Edition)" />
            <View style={styles.divider} />
            <TechRow icon={<Database size={18} color={Colors.primary} />} label="Dataset" value="Face-X 2026 (Mixed Local)" />
            <View style={styles.divider} />
            <TechRow icon={<FastForward size={18} color={Colors.primary} />} label="Muda" value="< 1.5s per frame" />
            <View style={styles.divider} />
            <TechRow icon={<Activity size={18} color={Colors.primary} />} label="Backend" value="Python FastAPI v2.4" />
          </Card>
        </View>

        {/* API Status */}
        <View style={styles.section}>
           <View style={styles.sectionHeader}>
            <Activity size={16} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Hali ya Mfumo</Text>
          </View>

          <Card padding={20} variant={health ? 'safe' : 'fake'}>
            {healthLoading ? (
              <Text style={styles.statusText}>Inakagua hali ya mfumo...</Text>
            ) : health ? (
              <View style={styles.statusContent}>
                <View style={styles.statusMain}>
                  <View style={[styles.statusDot, { backgroundColor: Colors.safe }]} />
                  <Text style={styles.statusTitle}>HAKIKI API iko Hewani</Text>
                </View>
                <View style={styles.statusDetails}>
                   <Badge label={`Model Loaded: ${health.model_loaded ? 'NDIYO' : 'HAPANA'}`} variant="primary" />
                   <Text style={styles.versionText}>v{health.version}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.statusContent}>
                <View style={styles.statusMain}>
                  <View style={[styles.statusDot, { backgroundColor: Colors.fake }]} />
                  <Text style={[styles.statusTitle, { color: Colors.fake }]}>Hitilafu ya Muunganisho</Text>
                </View>
                <Text style={styles.errorSub}>Seva haipatikani kwa sasa. Tafadhali angalia mtandao wako au jaribu tena baadaye.</Text>
              </View>
            )}
          </Card>
        </View>

        {/* CTA Bottom */}
        <TouchableOpacity 
          style={styles.ctaBanner}
          onPress={() => router.push('/(tabs)/scanner')}
          activeOpacity={0.9}
        >
          <View style={styles.ctaIcon}>
            <Scan size={24} color={Colors.background} />
          </View>
          <View style={styles.ctaTextWrap}>
            <Text style={styles.ctaBig}>Anza Sasa hivi</Text>
            <Text style={styles.ctaSmall}>Matokeo ni ya siri na papo hapo</Text>
          </View>
          <ChevronRight size={20} color={Colors.primary} />
        </TouchableOpacity>

        <View style={styles.footer}>
          <ShieldCheck size={14} color={Colors.textTertiary} />
          <Text style={styles.footerText}>
            HAKIKI SCANNER © 2026. Made in Tanzania.
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

function TechRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <View style={styles.techRow}>
      <View style={styles.techLeft}>
        {icon}
        <Text style={styles.techLabel}>{label}</Text>
      </View>
      <Text style={styles.techValue}>{value}</Text>
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
    paddingTop: Platform.OS === 'ios' ? 70 : 50,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
  },
  title: {
    color: Colors.foreground,
    fontSize: 28,
    fontWeight: '900',
    fontFamily: 'SpaceGrotesk_700Bold',
    lineHeight: 36,
  },
  titleHighlight: {
    color: Colors.primary,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 14,
  },
  stepsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  techRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  techLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  techLabel: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  techValue: {
    color: Colors.foreground,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    opacity: 0.3,
  },
  statusContent: {
    gap: 12,
  },
  statusMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusTitle: {
    color: Colors.safe,
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  statusDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
  versionText: {
    color: Colors.textTertiary,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  errorSub: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Inter_400Regular',
  },
  ctaBanner: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: Colors.backgroundAlt,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 16,
  },
  ctaIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaTextWrap: {
    flex: 1,
    gap: 2,
  },
  ctaBig: {
    color: Colors.foreground,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  ctaSmall: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 40,
    opacity: 0.6,
  },
  footerText: {
    color: Colors.textTertiary,
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
});
