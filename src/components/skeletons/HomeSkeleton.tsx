import { SkeletonBlock } from '@/screens/works/detailMaintenance/components/SkeletonUI';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import SizeBox from '../SizeBox';

const HomeSkeleton = () => {
  return (
    <View style={styles.container}>
      <SizeBox height={16} />
      {/* PROFILE */}
      <View style={styles.profileSection}>
        <SkeletonBlock style={styles.avatarLarge} />

        <View style={{ marginLeft: 16 }}>
          <SkeletonBlock style={{ width: 160, height: 20, marginBottom: 8 }} />
          <SkeletonBlock style={{ width: 90, height: 14 }} />
        </View>
      </View>

      {/* WORK SUMMARY */}
      <View style={styles.section}>
        <SkeletonBlock style={{ width: 160, height: 16, marginBottom: 16 }} />

        <View style={styles.grid}>
          {[1, 2, 3].map((_, i) => (
            <View key={i} style={styles.summaryCard}>
              <SkeletonBlock style={styles.square} />
              <SkeletonBlock
                style={{ width: '70%', height: 10, marginTop: 8 }}
              />
              <SkeletonBlock
                style={{ width: '40%', height: 8, marginTop: 4 }}
              />
            </View>
          ))}
        </View>
      </View>

      {/* RECENT ACTIVITY */}
      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <SkeletonBlock style={{ width: 140, height: 16 }} />
          <SkeletonBlock style={{ width: 60, height: 12 }} />
        </View>

        {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
          <View key={i} style={styles.activityCard}>
            <SkeletonBlock style={styles.activityIcon} />

            <View style={{ flex: 1 }}>
              <SkeletonBlock
                style={{ width: '70%', height: 14, marginBottom: 6 }}
              />
              <SkeletonBlock style={{ width: '45%', height: 10 }} />
            </View>

            <SkeletonBlock style={styles.badge} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default HomeSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },

  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },

  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  summaryCard: {
    width: '30%',
  },

  square: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
  },

  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },

  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },

  badge: {
    width: 60,
    height: 20,
    borderRadius: 12,
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },

  navItem: {
    alignItems: 'center',
  },

  navIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },

  navCenterIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginTop: -18,
  },

  navLabel: {
    width: 30,
    height: 6,
    marginTop: 6,
    borderRadius: 4,
  },
});
