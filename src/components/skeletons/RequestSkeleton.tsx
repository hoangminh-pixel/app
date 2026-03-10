import { SkeletonBlock } from '@/screens/works/detailMaintenance/components/SkeletonUI';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

const FieldSkeleton = ({ labelWidth = 80 }: { labelWidth?: number }) => {
  return (
    <View style={styles.field}>
      <SkeletonBlock
        style={{
          width: labelWidth,
          height: 14,
          borderRadius: 4,
          marginBottom: 8,
        }}
      />

      <View style={styles.input}>
        <SkeletonBlock
          style={{ width: '100%', height: '100%', borderRadius: 10 }}
        />
      </View>
    </View>
  );
};

const RequestRepairSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <FieldSkeleton labelWidth={90} />
        <FieldSkeleton labelWidth={70} />
        <FieldSkeleton labelWidth={110} />
        <FieldSkeleton labelWidth={70} />
        <FieldSkeleton labelWidth={60} />
        <FieldSkeleton labelWidth={100} />
        <FieldSkeleton labelWidth={80} />
        <FieldSkeleton labelWidth={120} />
        <FieldSkeleton labelWidth={100} />
      </View>
    </View>
  );
};

export default RequestRepairSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },

  form: {
    paddingHorizontal: 16,
    marginTop: 20
  },

  field: {
    marginBottom: 20,
  },

  input: {
    height: 56,
    borderRadius: 10,
    overflow: 'hidden',
  },

  row: {
    flexDirection: 'row',
    gap: 12,
  },

  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
  },

  button: {
    height: 48,
    borderRadius: 10,
  },
});
