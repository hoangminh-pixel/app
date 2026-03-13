import { BasePage } from '@/components';
import { PRIMARY } from '@/utils/color';
import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import useScanCode from './hooks/useScanCode';
import { Camera } from 'react-native-vision-camera';
import SizeBox from '@/components/SizeBox';

const SCAN_SIZE = 260;

const QRScannerScreen = () => {
  const {
    readQRFromGallery,
    device,
    hasPermission,
    scanTranslate,
    codeScanner,
  } = useScanCode();

  if (!device || !hasPermission)
    return (
      <BasePage
        title="Quét QR"
        showBack
        edges={['bottom']}
        paddingHorizontal={0}
      >
        <SizeBox height={30} />
        <Text style={{ textAlign: 'center' }}>Camera không khả dụng</Text>
      </BasePage>
    );

  return (
    <BasePage title="Quét QR" showBack edges={['bottom']} paddingHorizontal={0}>
      <View style={styles.container}>
        {/* Camera */}
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />

        {/* Overlay */}
        <View style={styles.overlay}>
          {/* Scanner Box */}
          <View style={styles.scanBox}>
            {/* Corners */}
            <View style={[styles.corner, styles.tl]} />
            <View style={[styles.corner, styles.tr]} />
            <View style={[styles.corner, styles.bl]} />
            <View style={[styles.corner, styles.br]} />

            {/* Scan Line */}
            {/* <Animated.View
              style={[
                styles.scanLine,
                {
                  transform: [{ translateY: scanTranslate }],
                },
              ]}
            /> */}
          </View>
        </View>

        {/* Bottom Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={readQRFromGallery}>
            <Text style={styles.buttonText}>Chọn ảnh từ thư viện</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BasePage>
  );
};

export default QRScannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scanBox: {
    width: SCAN_SIZE,
    height: SCAN_SIZE,
    position: 'relative',
  },

  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: PRIMARY,
    borderWidth: 4,
  },

  tl: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 12,
  },

  tr: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 12,
  },

  bl: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
  },

  br: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 12,
  },

  scanLine: {
    position: 'absolute',
    top: 0,
    width: '90%', // nhỏ hơn khung
    height: 2,
    backgroundColor: PRIMARY,
    alignSelf: 'center', // luôn nằm giữa
  },

  textContainer: {
    position: 'absolute',
    top: '75%',
    alignItems: 'center',
  },

  title: {
    color: PRIMARY,
    fontWeight: '700',
    fontSize: 18,
  },

  subtitle: {
    color: '#ddd',
    marginTop: 6,
    fontSize: 13,
  },

  footer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },

  button: {
    backgroundColor: PRIMARY,
    height: 52,
    width: '85%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
