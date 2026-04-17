import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { 
  ShieldCheck, 
  ShieldAlert, 
  ShieldX, 
  Share2, 
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react-native';
import { AnimatedBar } from '@/components/ui/AnimatedBar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Colors } from '@/constants/Colors';
import { PredictionResult, Verdict } from '@/services/api';

interface ResultDisplayProps {
  result: PredictionResult;
  onScanAgain: () => void;
}

const VERDICT_DATA: Record<Verdict, { 
  label: string; 
  icon: typeof ShieldCheck; 
  color: string; 
  desc: string;
  variant: 'safe' | 'suspicious' | 'fake';
}> = {
  real: {
    label: 'HALISI',
    icon: ShieldCheck,
    color: Colors.safe,
    desc: 'Uso huu umethibitishwa kuwa wa asili. Hakuna dalili za udanganyifu wa AI zilizopatikana.',
    variant: 'safe'
  },
  suspicious: {
    label: 'SHAKA',
    icon: ShieldAlert,
    color: Colors.suspicious,
    desc: 'Modeli imepata baadhi ya hitilafu. Inashauriwa kuchunguza picha hii kwa uangalifu zaidi.',
    variant: 'suspicious'
  },
  fake: {
    label: 'BANDIA',
    icon: ShieldX,
    color: Colors.fake,
    desc: 'Hii inaonekana kuwa ni picha iliyotengenezwa au kurekebishwa na AI (Deepfake).',
    variant: 'fake'
  },
};

export function ResultDisplay({ result, onScanAgain }: ResultDisplayProps) {
  const { verdict, confidence, scores } = result;
  const data = VERDICT_DATA[verdict];
  const Icon = data.icon;

  return (
    <View style={styles.container}>
      <Card variant={data.variant} glow={verdict === 'real'} padding={24}>
        <View style={styles.verdictHeader}>
          <View style={[styles.iconBox, { backgroundColor: data.color + '20' }]}>
            <Icon color={data.color} size={40} strokeWidth={2.5} />
          </View>
          <View style={styles.verdictInfo}>
            <Badge label="MATOKEO" variant={data.variant} />
            <Text style={[styles.verdictLabel, { color: data.color }]}>{data.label}</Text>
          </View>
        </View>

        <Text style={styles.description}>{data.desc}</Text>

        <View style={styles.divider} />

        <View style={styles.scoresWrap}>
          <Text style={styles.scoresTitle}>Mchanganuo wa AI</Text>
          
          <ScoreRow 
            label="Asili (Real)" 
            value={scores.real} 
            color={Colors.safe} 
            icon={<CheckCircle2 size={14} color={Colors.safe} />}
          />
          <ScoreRow 
            label="Inatia Shaka" 
            value={scores.suspicious} 
            color={Colors.suspicious} 
            icon={<HelpCircle size={14} color={Colors.suspicious} />}
          />
          <ScoreRow 
            label="Bandia (AI)" 
            value={scores.fake} 
            color={Colors.fake} 
            icon={<AlertCircle size={14} color={Colors.fake} />}
          />
        </View>
      </Card>

      <View style={styles.actions}>
        <Button
          label="Skani Tena"
          onPress={onScanAgain}
          variant="outline"
          fullWidth
          icon={<RotateCcw size={18} color={Colors.foreground} />}
        />
        <Button
          label="Shiriki Matokeo"
          onPress={() => {}}
          variant="ghost"
          fullWidth
          icon={<Share2 size={18} color={Colors.primary} />}
        />
      </View>
    </View>
  );
}

function ScoreRow({ label, value, color, icon }: { label: string; value: number; color: string; icon: React.ReactNode }) {
  const percentage = Math.round(value * 100);
  return (
    <View style={styles.scoreRow}>
      <View style={styles.scoreLabelRow}>
        <View style={styles.scoreLabelLeft}>
          {icon}
          <Text style={styles.scoreLabel}>{label}</Text>
        </View>
        <Text style={[styles.scoreValue, { color }]}>{percentage}%</Text>
      </View>
      <AnimatedBar value={percentage} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginTop: 20,
  },
  verdictHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  verdictInfo: {
    flex: 1,
    gap: 4,
  },
  verdictLabel: {
    fontSize: 32,
    fontWeight: '900',
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -1,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 20,
    opacity: 0.5,
  },
  scoresWrap: {
    gap: 16,
  },
  scoresTitle: {
    color: Colors.foreground,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.8,
  },
  scoreRow: {
    gap: 8,
  },
  scoreLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreLabelLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scoreLabel: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
  },
  actions: {
    gap: 12,
  },
});
