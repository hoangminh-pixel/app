import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { InventoringRes } from '../inventorying/hooks/useInventorying';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import SizeBox from '@/components/SizeBox';
import { PRIMARY } from '@/utils/color';

const InventoryItem = ({ item }: { item: InventoringRes }) => {
  return (
    <View style={styles.card}>
      <View style={[styles.bgCircle]} />

      <View style={styles.header}>
        <View>
          <Text style={styles.label}>MÃ PHIẾU</Text>
          <Text style={styles.code}>{item.name}</Text>
        </View>

        <View style={styles.badge}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="inventory-2" size={14} color={PRIMARY} />
            <SizeBox width={4} />
            <Text style={styles.badgeText}>
              {item.inventoried_quantity}/{item.inventory_quantity}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.date}>{item.create_date}</Text>
      </View>
    </View>
  );
};

export default InventoryItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eaeaeb',
    overflow: 'hidden',
  },

  bgCircle: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'rgba(19,55,236,0.05)',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  label: {
    fontSize: 10,
    fontWeight: '700',
    color: PRIMARY,
    marginBottom: 2,
  },

  code: {
    fontSize: 16,
    fontWeight: '700',
    color: PRIMARY,
  },

  badge: {
    backgroundColor: '#eff6ff',
    //     paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    justifyContent: 'center',

    //     gap: 4,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: PRIMARY,
  },

  progressWrapper: {
    marginTop: 8,
  },

  progressBg: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    overflow: 'hidden',
  },

  progressBar: {
    height: 6,
    backgroundColor: PRIMARY,
  },

  footer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  date: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '700',
  },
});
