import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { legendStyles, styles } from './styles';
import { BasePage } from '@/components';
import useInventoryResult from './hooks/useInventoryResult';

const STATUS_COLORS = {
  unused: '#111', // đen
  good: '#10b981', // xanh lá
  repair: '#f59e0b', // vàng
  liquidation: '#ef4444', // đỏ
};

type Item = {
  asset_id: number;
  asset_name: string;
  asset_code: string;
  qty_unused: number;
  qty_good: number;
  qty_repair: number;
  qty_liquidation: number;
  theory_qty_total: number;
  real_qty_total: number;
};

const STATUS_LEGENDS = [
  {
    label: 'Chưa sử dụng',
    color: '#111',
  },
  {
    label: 'Đang sử dụng',
    color: '#10b981',
  },
  {
    label: 'Hỏng / sửa chữa',
    color: '#f59e0b',
  },
  {
    label: 'Thanh lý',
    color: '#ef4444',
  },
];

export const StatusLegend = () => {
  return (
    <View style={legendStyles.container}>
      {STATUS_LEGENDS.map((item, index) => (
        <View key={index} style={legendStyles.item}>
          <View style={[legendStyles.dot, { backgroundColor: item.color }]} />
          <Text style={legendStyles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

const InventoryResultItem = ({ item }: { item: Item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <View style={styles.codeRow}>
            <Text style={styles.code}>{item.asset_code}</Text>
          </View>

          <Text style={styles.name}>{item.asset_name}</Text>
        </View>

        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.diffValue}>
            {item.real_qty_total}/{item.real_qty_total}
          </Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <StatusItem color={STATUS_COLORS.unused} value={item.qty_unused} />
        <StatusItem color={STATUS_COLORS.good} value={item.qty_good} />
        <StatusItem color={STATUS_COLORS.repair} value={item.qty_repair} />
        <StatusItem
          color={STATUS_COLORS.liquidation}
          value={item.qty_liquidation}
        />
      </View>
    </View>
  );
};

const StatusItem = ({ color, value }: any) => (
  <View style={styles.statusItem}>
    <View style={[styles.statusDot, { backgroundColor: color }]} />
    <Text style={styles.statusText}>{value}</Text>
  </View>
);

const InventoryResultScreen = () => {
  const { data, handleViewDetail } = useInventoryResult();

  return (
    <BasePage title="Kết quả kiểm kê" showBack edges={['bottom']}>
      <StatusLegend />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.asset_id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleViewDetail(item.asset_id)}>
            <InventoryResultItem item={item} />
          </Pressable>
        )}
        contentContainerStyle={{ gap: 12 }}
        ListEmptyComponent={
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text>Không có dữ liệu</Text>
          </View>
        }
      />
    </BasePage>
  );
};

export default InventoryResultScreen;
