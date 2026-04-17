import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { 
  ScanLine, 
  Image as ImageIcon, 
  Camera, 
  X, 
  ShieldCheck,
} from 'lucide-react-native';
import { ScanLine as AnimatedScanLine } from '@/components/ui/ScanLine';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = width * 0.7;

interface ScannerAreaProps {
  imageUri: string | null;
  scanning: boolean;
  onImageSelected: (uri: string) => void;
  onClear: () => void;
  onScan: () => void;
}

export function ScannerArea({
  imageUri,
  scanning,
  onImageSelected,
  onClear,
  onScan,
}: ScannerAreaProps) {
  const [imgHeight, setImgHeight] = useState(IMAGE_HEIGHT);

  const requestPermission = async (type: 'camera' | 'gallery') => {
    if (type === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      return status === 'granted';
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      return status === 'granted';
    }
  };

  const handlePickerResult = (result: ImagePicker.ImagePickerResult) => {
    if (result.canceled) return;

    // SDK 51+ uses assets array
    if (result.assets && result.assets.length > 0) {
      const selectedUri = result.assets[0].uri;
      if (selectedUri) {
        onImageSelected(selectedUri);
        return;
      }
    }

    // Fallback for legacy or edge cases
    // @ts-ignore - legacy uri support
    if (result.uri) {
      // @ts-ignore
      onImageSelected(result.uri);
    }
  };

  const pickFromGallery = async () => {
    const granted = await requestPermission('gallery');
    if (!granted) {
      Alert.alert('Ruhusa Inahitajika', 'Tafadhali ruhusu ufikiaji wa picha za simu.');
      return;
    }
    
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        // Adding aspect for certain Android crops
        aspect: [1, 1],
      });
      handlePickerResult(result);
    } catch (error) {
      Alert.alert('Hitilafu', 'Imeshindwa kufungua matunzio ya picha.');
    }
  };

  const pickFromCamera = async () => {
    const granted = await requestPermission('camera');
    if (!granted) {
      Alert.alert('Ruhusa Inahitajika', 'Tafadhali ruhusu ufikiaji wa kamera.');
      return;
    }
    
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1],
      });
      handlePickerResult(result);
    } catch (error) {
      Alert.alert('Hitilafu', 'Imeshindwa kufungua kamera.');
    }
  };

  if (!imageUri) {
    return (
      <View style={styles.uploadArea}>
        <View style={[styles.corner, styles.cornerTL]} />
        <View style={[styles.corner, styles.cornerTR]} />
        <View style={[styles.corner, styles.cornerBL]} />
        <View style={[styles.corner, styles.cornerBR]} />

        <View style={styles.uploadIconWrap}>
          <ScanLine color={Colors.primary} size={40} strokeWidth={2.5} />
        </View>
        <Text style={styles.uploadTitle}>Skani Picha Yako</Text>
        <Text style={styles.uploadSub}>Gusa chaguo hapa chini kuanza</Text>

        <View style={styles.uploadOptions}>
          <TouchableOpacity style={styles.optionBtn} onPress={pickFromGallery}>
            <ImageIcon color={Colors.primary} size={22} />
            <Text style={styles.optionLabel}>Matunzio</Text>
          </TouchableOpacity>
          <View style={styles.optionDivider} />
          <TouchableOpacity style={styles.optionBtn} onPress={pickFromCamera}>
            <Camera color={Colors.primary} size={22} />
            <Text style={styles.optionLabel}>Kamera</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.previewContainer}>
      <View style={[styles.imageWrap, { height: imgHeight }]}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          contentFit="cover"
          transition={200}
          onLayout={(e) => {
            const h = e.nativeEvent.layout.height;
            if (h > 0) setImgHeight(h);
          }}
        />

        {scanning && (
          <BlurView intensity={25} style={styles.scanningOverlay}>
            <View style={styles.scanningContent}>
              <ActivityIndicator size="large" color={Colors.primary} />
              <Text style={styles.scanningText}>Inachambua...</Text>
            </View>
            <AnimatedScanLine height={imgHeight} active={scanning} />
          </BlurView>
        )}

        {!scanning && (
          <TouchableOpacity style={styles.clearBtn} onPress={onClear}>
            <X color={Colors.white} size={18} />
          </TouchableOpacity>
        )}

        <View style={[styles.scanFrame, styles.frameTL]} />
        <View style={[styles.scanFrame, styles.frameTR]} />
        <View style={[styles.scanFrame, styles.frameBL]} />
        <View style={[styles.scanFrame, styles.frameBR]} />
      </View>

      {!scanning && (
        <View style={styles.actionWrap}>
          <Button
            label="Anza Uchambuzi"
            onPress={onScan}
            variant="primary"
            size="lg"
            fullWidth
            icon={<ShieldCheck color={Colors.background} size={22} />}
          />
          <TouchableOpacity onPress={pickFromGallery} style={styles.changeBtn}>
            <Text style={styles.changeText}>Badilisha picha</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  uploadArea: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    padding: 40,
    alignItems: 'center',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: Colors.primary,
    opacity: 0.5,
  },
  cornerTL: { top: 12, left: 12, borderTopWidth: 2, borderLeftWidth: 2, borderTopLeftRadius: 8 },
  cornerTR: { top: 12, right: 12, borderTopWidth: 2, borderRightWidth: 2, borderTopRightRadius: 8 },
  cornerBL: { bottom: 12, left: 12, borderBottomWidth: 2, borderLeftWidth: 2, borderBottomLeftRadius: 8 },
  cornerBR: { bottom: 12, right: 12, borderBottomWidth: 2, borderRightWidth: 2, borderBottomRightRadius: 8 },
  uploadIconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.primaryBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.primaryBorder,
  },
  uploadTitle: {
    color: Colors.foreground,
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk_700Bold',
    marginBottom: 6,
  },
  uploadSub: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 24,
  },
  uploadOptions: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    width: '100%',
  },
  optionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
  },
  optionDivider: {
    width: 1,
    backgroundColor: Colors.border,
  },
  optionLabel: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  previewContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  imageWrap: {
    width: '100%',
    backgroundColor: Colors.mutedBg,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  scanningOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningContent: {
    alignItems: 'center',
    gap: 12,
    zIndex: 10,
  },
  scanningText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  clearBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: Colors.primary,
    borderWidth: 3,
  },
  frameTL: { top: 20, left: 20, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 12 },
  frameTR: { top: 20, right: 20, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 12 },
  frameBL: { bottom: 20, left: 20, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 12 },
  frameBR: { bottom: 20, right: 20, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 12 },
  actionWrap: {
    padding: 20,
    alignItems: 'center',
  },
  changeBtn: {
    marginTop: 12,
  },
  changeText: {
    color: Colors.textSecondary,
    fontSize: 14,
    textDecorationLine: 'underline',
    fontFamily: 'Inter_400Regular',
  },
});
