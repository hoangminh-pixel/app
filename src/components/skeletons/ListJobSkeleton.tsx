import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SkeletonBlock } from '@/screens/works/detailMaintenance/components/SkeletonUI';

const JobListSkeleton = () => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4].map((_, index) => (
        <View key={index} style={styles.card}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.leftHeader}>
              <SkeletonBlock style={styles.icon} />

              <View style={{ flex: 1 }}>
                <SkeletonBlock style={styles.title} />
                <SkeletonBlock style={styles.subtitle} />
              </View>
            </View>

            <SkeletonBlock style={styles.statusDot} />
          </View>

          {/* Info rows */}
          <View style={styles.infoRow}>
            <SkeletonBlock style={styles.infoTextShort} />
          </View>

          <View style={styles.infoRow}>
            <SkeletonBlock style={styles.infoTextLong} />
          </View>
          <View style={styles.infoRow}>
            <SkeletonBlock style={[styles.infoTextLong]} />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <SkeletonBlock style={styles.button} />
          </View>
        </View>
      ))}
    </View>
  );
};

export default JobListSkeleton;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },

  card: {
    backgroundColor: '#f8f6f6',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e8e9e9',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  leftHeader: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },

  icon: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },

  title: {
    width: '75%',
    height: 16,
    marginBottom: 6,
    borderRadius: 6,
  },

  subtitle: {
    width: '50%',
    height: 14,
    borderRadius: 6,
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },

  infoTextShort: {
    width: '35%',
    height: 10,
    borderRadius: 4,
  },

  infoTextLong: {
    width: '55%',
    height: 10,
    borderRadius: 4,
  },

  footer: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: '#f1f5f9',
  },

  button: {
    //     width: 90,
    height: 32,
    borderRadius: 8,
  },
});
