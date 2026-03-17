import { SkeletonBlock } from '@/screens/works/detailMaintenance/components/SkeletonUI';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

const AssetListSkeleton = () => {
  return (
    <View style={styles.list}>
      {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardHeader}>
            <SkeletonBlock style={styles.code} />
            <SkeletonBlock style={styles.status} />
          </View>

          <SkeletonBlock style={styles.assetTitle} />

          <View style={styles.infoRow}>
            <View>
              <SkeletonBlock style={styles.label} />
              <SkeletonBlock style={styles.value} />
            </View>

            <View>
              <SkeletonBlock style={styles.label} />
              <SkeletonBlock style={styles.valueWide} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default AssetListSkeleton;

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  code: {
    width: 80,
    height: 22,
    borderRadius: 6,
  },

  status: {
    width: 60,
    height: 22,
    borderRadius: 20,
  },

  assetTitle: {
    width: '90%',
    height: 22,
    borderRadius: 6,
    marginBottom: 18,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
  },

  label: {
    width: 60,
    height: 10,
    borderRadius: 4,
    marginBottom: 6,
  },

  value: {
    width: 70,
    height: 16,
    borderRadius: 4,
  },

  valueWide: {
    width: 100,
    height: 16,
    borderRadius: 4,
  },
});
