import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SkeletonBlock } from '@/screens/works/detailMaintenance/components/SkeletonUI';
import SizeBox from '../SizeBox';

const DashboardSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* CHART */}
      <View style={styles.section}>
        <SkeletonBlock style={styles.sectionTitleLarge} />
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.chartItem}>
            <SkeletonBlock style={styles.chartCircle} />
            <SkeletonBlock style={styles.chartLabel} />
          </View>
          <SizeBox width={8} />
          <View style={{ flex: 1 }}>
            <SizeBox height={5} />
            <SkeletonBlock style={styles.label} />
            <SizeBox height={5} />
            <SkeletonBlock style={styles.label} />
            <SizeBox height={5} />
            <SkeletonBlock style={styles.label} />
            <SizeBox height={5} />

            <SkeletonBlock style={styles.input} />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <SkeletonBlock style={styles.sectionTitleLarge} />
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.chartItem}>
            <SkeletonBlock style={styles.chartCircle} />
            <SkeletonBlock style={styles.chartLabel} />
          </View>
          <SizeBox width={8} />
          <View style={{ flex: 1 }}>
            <SizeBox height={5} />
            <SkeletonBlock style={styles.label} />
            <SizeBox height={5} />
            <SkeletonBlock style={styles.label} />
            <SizeBox height={5} />
            <SkeletonBlock style={styles.label} />
            <SizeBox height={5} />

            <SkeletonBlock style={styles.input} />
          </View>
        </View>
      </View>

      {/* EMPLOYEE LIST */}
      <View style={styles.section}>
        <SkeletonBlock style={styles.sectionTitleLarge} />

        {[1, 2, 3, 4].map((_, index) => (
          <View key={index} style={styles.employeeCard}>
            <SkeletonBlock style={styles.avatar} />

            <View style={{ flex: 1 }}>
              <SkeletonBlock style={styles.employeeName} />
              <SkeletonBlock style={styles.employeeSub} />
            </View>

            <SkeletonBlock style={styles.badge} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default DashboardSkeleton;

const styles = StyleSheet.create({
  container: {
//     padding: 16,
    gap: 20,
  },

  section: {
    gap: 12,
  },

  row: {
    flexDirection: 'row',
    gap: 12,
  },

  sectionTitle: {
    width: 90,
    height: 14,
    borderRadius: 6,
  },

  sectionTitleLarge: {
    width: 160,
    height: 16,
    borderRadius: 6,
  },

  label: {
    width: '40%',
    height: 12,
    borderRadius: 6,
  },

  input: {
    height: 48,
    borderRadius: 12,
  },

  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  chartItem: {
    alignItems: 'center',
    gap: 12,
  },

  chartCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  chartLabel: {
    width: 90,
    height: 12,
    borderRadius: 6,
  },

  counterRow: {
    flexDirection: 'row',
    gap: 12,
  },

  counterCard: {
    flex: 1,
    backgroundColor: '#f8f6f6',
    borderRadius: 12,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#e8e9e9',
  },

  counterLabel: {
    width: '60%',
    height: 10,
    borderRadius: 4,
  },

  counterValue: {
    width: 28,
    height: 18,
    borderRadius: 4,
  },

  employeeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f8f6f6',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e8e9e9',
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  employeeName: {
    width: '65%',
    height: 14,
    borderRadius: 6,
    marginBottom: 6,
  },

  employeeSub: {
    width: '40%',
    height: 12,
    borderRadius: 6,
  },

  badge: {
    width: 50,
    height: 24,
    borderRadius: 12,
  },
});
