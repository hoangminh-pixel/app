import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import SizeBox from '@/components/SizeBox';

type Props = {
  startDate: string;
  endDate: string;
  onClickStartDate: () => void;
  onClickEndDate: () => void;
  location: string;
  onClickLocation: () => void;
};

export default function FilterSection({
  startDate,
  endDate,
  onClickEndDate,
  onClickStartDate,
  location,
  onClickLocation,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Khoảng thời gian */}
      <View style={styles.col}>
        <Text style={styles.label}>KHOẢNG THỜI GIAN</Text>

        <View style={styles.box}>
          <MaterialIcons name="calendar-today" size={20} color="#005a3c" />
          <View style={{ flexDirection: 'row' }}>
            <Text onPress={onClickStartDate} style={styles.value}>
              {startDate}
            </Text>
            <Text style={styles.value}>-</Text>
            <Text onPress={onClickEndDate} style={styles.value}>
              {endDate}
            </Text>
          </View>
        </View>
      </View>

      {/* Mảng công việc */}
      <View style={styles.col}>
        <Text style={styles.label}>KHU VỰC</Text>

        <Pressable onPress={onClickLocation} style={styles.boxBetween}>
          <Text style={[styles.value, { flex: 1 }]} numberOfLines={1}>
            {location}
          </Text>
          <MaterialIcons name="expand-more" size={20} color="#94a3b8" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
  },

  col: {
    flex: 1,
  },

  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
    marginLeft: 4,
    marginBottom: 6,
  },

  box: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  boxBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 5,
  },

  value: {
    // flex: 1,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
    marginRight: 8,
  },
});
