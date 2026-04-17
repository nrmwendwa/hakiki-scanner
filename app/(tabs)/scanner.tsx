import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { 
  Scan,
  ShieldCheck,
  AlertTriangle,
  History,
  Info
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/Colors';
import { ScannerArea } from '@/components/ScannerArea';
import { ResultDisplay } from '@/components/ResultDisplay';
import { Badge } from '@/components/ui/Badge';
import { hakikiApi, PredictionResult } from '@/services/api';

export default function ScannerScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleImageSelected = useCallback((uri: string) => {
    setImageUri(uri);
    setResult(null);
  }, []);

  const handleClear = useCallback(() => {
    setImageUri(null);
    setResult(null);
    setScanning(false);
  }, []);

  const handleScan = useCallback(async () => {
    if (!imageUri) return;

    setScanning(true);
    setResult(null);

    // Haptic feedback on scan start
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      const data = await hakikiApi.predict(imageUri);
      setResult(data);

      // Haptic feedback based on verdict
      if (data.verdict === 'real') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else if (data.verdict === 'fake') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Uchambuzi umeshindwa. Jaribu tena.';
      Alert.alert('Hitilafu ya Uchambuzi', message, [{ text: 'Sawa', style: 'cancel' }]);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setScanning(false);
    }
  }, [imageUri]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Badge
            label="AI ANALYZER"
            icon={<Scan size={12} color={Colors.primary} />}
            variant="primary"
          />
          <Text style={styles.title}>
            HAKIKI <Text style={styles.titleHighlight}>SCANNER</Text>
          </Text>
          <Text style={styles.subtitle}>
            Pakia picha hapachini ili kubaini ikiwa ni halisi au deepfake kwa kutumia mifumo yetu ya kielektroniki.
          </Text>
        </View>

        {/* Scanner Area */}
        <View style={styles.scannerWrap}>
          <ScannerArea
            imageUri={imageUri}
            scanning={scanning}
            onImageSelected={handleImageSelected}
            onClear={handleClear}
            onScan={handleScan}
          />
        </View>

        {/* Dynamic Display */}
        {result && !scanning && (
          <View style={styles.resultWrap}>
            <ResultDisplay result={result} onScanAgain={handleClear} />
          </View>
        )}

        {/* Guide Cards */}
        {!imageUri && (
          <View style={styles.guideSection}>
            <View style={styles.sectionHeader}>
              <History size={16} color={Colors.textTertiary} />
              <Text style={styles.sectionTitle}>Uongozi wa Ukaguzi</Text>
            </View>
            
            <View style={styles.guideCards}>
              <GuideItem
                icon={<ShieldCheck size={18} color={Colors.safe} />}
                label="HALISI"
                text="Inathibitisha uhalisi wa uso"
              />
              <GuideItem
                icon={<Info size={18} color={Colors.suspicious} />}
                label="SHAKA"
                text="Viashiria vya udanganyifu"
              />
              <GuideItem
                icon={<AlertTriangle size={18} color={Colors.fake} />}
                label="BANDIA"
                text="Imetengenezwa na AI"
              />
            </View>
          </View>
        )}

        {/* Disclaimer */}
        {!imageUri && (
          <View style={styles.disclaimer}>
            <View style={styles.disclaimerDot} />
            <Text style={styles.disclaimerText}>
              Algorithm ya EfficientNet inafanya kazi. Matokeo yanategemea ubora wa picha. 
              HAKIKI haihifadhi picha zako kwa sababu za usalama.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function GuideItem({ icon, label, text }: { icon: React.ReactNode, label: string, text: string }) {
  return (
    <View style={styles.guideCard}>
      <View style={styles.guideIcon}>{icon}</View>
      <View style={styles.guideTextWrap}>
        <Text style={styles.guideLabel}>{label}</Text>
        <Text style={styles.guideText}>{text}</Text>
      </View>
    </View>
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
    paddingBottom: 100,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 70 : 50,
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
    gap: 12,
  },
  title: {
    color: Colors.foreground,
    fontSize: 28,
    fontWeight: '900',
    fontFamily: 'SpaceGrotesk_700Bold',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  titleHighlight: {
    color: Colors.primary,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 300,
    fontFamily: 'Inter_400Regular',
  },
  scannerWrap: {
    paddingHorizontal: 20,
  },
  resultWrap: {
    paddingHorizontal: 20,
  },
  guideSection: {
    paddingHorizontal: 20,
    marginTop: 32,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    color: Colors.textTertiary,
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  guideCards: {
    gap: 12,
  },
  guideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 16,
  },
  guideIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  guideTextWrap: {
    flex: 1,
    gap: 2,
  },
  guideLabel: {
    color: Colors.foreground,
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  guideText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  disclaimer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    marginTop: 30,
    alignItems: 'flex-start',
  },
  disclaimerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.textTertiary,
    marginTop: 6,
  },
  disclaimerText: {
    flex: 1,
    color: Colors.textTertiary,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Inter_400Regular',
  },
});
