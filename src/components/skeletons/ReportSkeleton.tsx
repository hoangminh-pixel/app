import { SkeletonBlock } from '@/screens/works/detailMaintenance/components/SkeletonUI';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReportSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.summaryRow}>
        {[1, 2, 3].map(item => (
          <View key={item} style={styles.card}>
            <SkeletonBlock style={{ width: 60, height: 14, borderRadius: 4 }} />
            <SkeletonBlock style={{ width: 40, height: 26, borderRadius: 6 }} />
          </View>
        ))}
      </View>

      {/* DONUT CHART */}
      <View style={styles.chartContainer}>
        <View style={styles.chartCircle}></View>
      </View>
    </View>
  );
};

export default ReportSkeleton;

const styles = StyleSheet.create({
  container: {
    //     backgroundColor: '#f6f6f8',
  },

  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },

  summaryRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },

  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 14,
    gap: 10,
    backgroundColor: '#fff',
  },

  chartContainer: {
    alignItems: 'center',
    marginTop: 28,
  },

  chartCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 30,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  chartText: {
    marginTop: 32,
    paddingHorizontal: 16,
    gap: 10,
    alignItems: 'center',
  },

  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 10,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
});
