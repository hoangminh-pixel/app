import { SkeletonBlock } from '@/screens/works/detailMaintenance/components/SkeletonUI';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const DashboardASMSkeleton = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* DONUT */}
        <View style={styles.card}>
          <SkeletonBlock style={{ width: 120, height: 20, marginBottom: 20 }} />

          <View style={styles.donut} />

          <View style={styles.legendGrid}>
            {[1, 2, 3, 4].map((_, i) => (
              <View key={i} style={{ flex: 1 }}>
                <SkeletonBlock style={styles.dot} />
                <View style={{ flex: 1, marginTop: 10 }}>
                  <SkeletonBlock style={styles.legendText} />
                  <SkeletonBlock style={styles.legendSub} />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* BAR CHART */}
        <View style={styles.card}>
          <SkeletonBlock style={{ width: 120, height: 20, marginBottom: 20 }} />

          <View style={styles.barContainer}>
            {[20, 60, 15, 85, 35].map((h, i) => (
              <View key={i} style={styles.barItem}>
                <SkeletonBlock style={{ width: 20, height: 12 }} />

                <SkeletonBlock
                  style={{
                    width: '100%',
                    height: `${h}%`,
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4,
                  }}
                />

                <SkeletonBlock style={{ height: 10, width: '100%' }} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardASMSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },

  skeleton: {
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: '#fff',
  },

  circleSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },

  title: {
    height: 20,
    width: 120,
  },

  metricGrid: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },

  metricCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    height: 90,
    justifyContent: 'space-between',
  },

  metricLabel: {
    width: '50%',
    height: 12,
  },

  metricValue: {
    width: '70%',
    height: 24,
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
  },

  donut: {
    width: 250,
    height: 250,
    borderRadius: 999,
    borderWidth: 20,
    borderColor: '#e5e7eb',
    alignSelf: 'center',
    marginTop: 20,
  },

  legendGrid: {
    flexDirection: 'row',
    //     flexWrap: 'wrap',
    marginTop: 20,
    gap: 16,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '48%',
    gap: 8,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 8,
  },

  legendText: {
    width: '70%',
    height: 10,
    marginBottom: 6,
  },

  legendSub: {
    width: '40%',
    height: 10,
  },

  barContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 160,
    gap: 8,
  },

  barItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },

  navItem: {
    alignItems: 'center',
    gap: 6,
  },

  navIcon: {
    width: 24,
    height: 24,
  },

  navText: {
    width: 30,
    height: 8,
  },
});
