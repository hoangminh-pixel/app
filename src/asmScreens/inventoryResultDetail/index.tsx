import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { BasePage } from '@/components';
import useInventoryResultDetail from './hooks/useInventoryResultDetail';
import { StatusLegend } from '../inventoryResult';
import SizeBox from '@/components/SizeBox';

const STATUS_COLORS = {
  unused: '#111',
  good: '#10b981',
  repair: '#f59e0b',
  liquidation: '#ef4444',
};

const mockData = {
  id: 4,
  asset: {
    id: 5,
    name: 'Bàn ăn văn phòng',
    code: 'B01',
  },
  type: {
    name: 'Tài sản theo số lượng',
  },
  category: {
    name: 'Nhóm đồ dùng',
  },
  quantity: 1,
  asset_user_detail: [
    {
      asset_user: 'Nguyễn việt trinh',
      qty_unused: 0,
      qty_good: 1,
      qty_repair: 0,
      qty_liquidation: 0,
    },
    {
      asset_user: 'Lê Sĩ Cường',
      qty_unused: 0,
      qty_good: 1,
      qty_repair: 0,
      qty_liquidation: 0,
    },
  ],
};

const AssetDetailNewScreen = () => {
  const { data } = useInventoryResultDetail();

  return (
    <BasePage title="Chi tiết tài sản" showBack paddingHorizontal={0}>
      <FlatList
        data={data?.asset_user_detail}
        keyExtractor={(_, i) => i.toString()}
        ListHeaderComponent={
          <>
            <StatusLegend />
            <View style={styles.card}>
              <Text style={styles.code}>{data?.asset?.code}</Text>
              <Text style={styles.name}>{data?.asset?.name}</Text>

              <View style={{ marginLeft: 15 }}>
                <SizeBox height={15} />
                <Text style={styles.meta}>Loại: {data?.type?.name}</Text>
                <SizeBox height={5} />
                <Text style={styles.meta}>Nhóm: {data?.category?.name}</Text>
                <SizeBox height={15} />
              </View>
            </View>

            {/* <View style={styles.card}>
              <Text style={styles.sectionTitle}>Tổng số lượng</Text>

              <Text style={styles.bigNumber}>{data?.quantity}</Text>
            </View> */}

            <Text style={styles.sectionTitle}>Người sử dụng</Text>
          </>
        }
        renderItem={({ item }) => <UserItem item={item} />}
        contentContainerStyle={{ padding: 16, gap: 12 }}
      />
    </BasePage>
  );
};

export default AssetDetailNewScreen;

const UserItem = ({ item }: any) => {
  return (
    <View style={styles.card}>
      <Text style={styles.userName}>{item.asset_user}</Text>

      <View style={styles.statusRow}>
        <StatusDot color={STATUS_COLORS.unused} value={item.qty_unused} />
        <StatusDot color={STATUS_COLORS.good} value={item.qty_good} />
        <StatusDot color={STATUS_COLORS.repair} value={item.qty_repair} />
        <StatusDot
          color={STATUS_COLORS.liquidation}
          value={item.qty_liquidation}
        />
      </View>
    </View>
  );
};

const StatusDot = ({ color, value }: any) => (
  <View style={styles.dotItem}>
    <View style={[styles.dot, { backgroundColor: color }]} />
    <Text style={styles.dotText}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
  },

  code: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
  },

  name: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 4,
  },

  row: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },

  meta: {
    fontSize: 12,
    color: '#666',
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
  },

  bigNumber: {
    fontSize: 28,
    fontWeight: '900',
    marginTop: 4,
  },

  userName: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },

  statusRow: {
    flexDirection: 'row',
    gap: 16,
  },

  dotItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  dotText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
