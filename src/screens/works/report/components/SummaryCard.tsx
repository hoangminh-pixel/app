import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface SummaryItem {
  label: string;
  value: number;
  color: string;
}

export interface ChartItem {
  label: string;
  value: number;
  percent: number;
  color: string;
}

interface Props {
  item: SummaryItem;
}

const SummaryCard = ({ item }: Props) => {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: item.color + '20', alignItems: 'center' },
      ]}
    >
      <Text style={[styles.label, { color: item.color }]}>{item.label}</Text>
      <Text style={[styles.value, { color: item.color }]}>{item.value}</Text>
    </View>
  );
};

export default SummaryCard;

const styles = StyleSheet.create({
  card: {
    minWidth: 110,
    padding: 14,
    borderRadius: 12,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
  },
});
