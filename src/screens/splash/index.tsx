import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';

export default function SplashScreen() {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.container}>
        {/* Top spacer */}
        <View style={{ height: 40 }} />

        {/* Center Brand Section */}
        <View style={styles.centerContent}>
          {/* Logo Box */}
          <View style={styles.logoContainer}>
            <View style={styles.logoInner}>
              <Text style={styles.logoIcon}>✦</Text>
            </View>
          </View>

          {/* Brand Text */}
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.title}>IZISOLUTION</Text>
            <Text style={styles.subtitle}>CMMS-ASM APP</Text>
          </View>
        </View>

        {/* Top spacer */}
        <View style={{ height: 40 }} />

        {/* Decorative Blur Circles */}
        <View style={styles.blurTop} />
        <View style={styles.blurBottom} />
      </View>
    </>
  );
}

const PRIMARY = '#005a3c';
const BACKGROUND = '#f6f6f8';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },

  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },

  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: PRIMARY,
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 10,
  },

  logoInner: {
    width: 70,
    height: 70,
    backgroundColor: PRIMARY,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoIcon: {
    color: '#fff',
    fontSize: 32,
  },

  title: {
    fontSize: 26,
    fontWeight: '300',
    letterSpacing: 4,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 12,
    letterSpacing: 4,
    color: PRIMARY,
  },

  loadingSection: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    gap: 16,
  },

  progressHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  progressLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: '#999',
  },

  progressPercent: {
    fontSize: 12,
    fontWeight: 'bold',
    color: PRIMARY,
  },

  progressBar: {
    width: '100%',
    height: 2,
    backgroundColor: PRIMARY + '20',
    borderRadius: 2,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: PRIMARY,
  },

  loadingText: {
    fontSize: 11,
    letterSpacing: 2,
    color: '#999',
  },

  blurTop: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 400,
    height: 400,
    backgroundColor: PRIMARY,
    opacity: 0.05,
    borderRadius: 200,
  },

  blurBottom: {
    position: 'absolute',
    bottom: -100,
    left: -100,
    width: 400,
    height: 400,
    backgroundColor: PRIMARY,
    opacity: 0.05,
    borderRadius: 200,
  },
});
