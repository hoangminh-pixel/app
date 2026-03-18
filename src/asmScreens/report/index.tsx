// src/screens/report/index.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BarChartReport from './components/ChartReport';
import { BasePage } from '@/components';
import DonutChart from '@/components/DonutChart';
import { Legend } from '../home';
import { useReport } from './hooks/useReport';
import SizeBox from '@/components/SizeBox';
import DashboardASMSkeleton from '@/components/skeletons/DashboardAsmSkeleton';

const ReportScreen = () => {
  const { dataHome, loading, donutData, rootGroup, handleInitData } =
    useReport();
  if (loading)
    return (
      <BasePage title="Báo cáo" paddingHorizontal={0}>
        <DashboardASMSkeleton />
      </BasePage>
    );

  return (
    <BasePage
      title="Báo cáo"
      paddingHorizontal={0}
      scrollable
      refreshing={loading}
      onRefresh={handleInitData}
    >
      <View style={styles.card}>
        <Text style={{ fontSize: 16, fontWeight: '700' }}>
          Tình trạng tài sản
        </Text>
        <SizeBox height={16} />
        <DonutChart data={donutData} />

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.legendGrid}>
            <Legend
              color="#10b981"
              title="Đang sử dụng"
              value={dataHome?.using.quantity ?? 0}
              percent={dataHome?.using.percent ?? 0}
            />
            <Legend
              color="#3b82f6"
              title="Chưa sử dụng"
              value={dataHome?.unused.quantity ?? 0}
              percent={dataHome?.unused.percent ?? 0}
            />
            <Legend
              color="#f59e0b"
              title="Hỏng, sửa chữa"
              value={dataHome?.damaged.quantity ?? 0}
              percent={dataHome?.damaged.percent ?? 0}
            />
            <Legend
              color="#ef4444"
              title="Mất, huỷ, thanh lý"
              value={dataHome?.lost.quantity ?? 0}
              percent={dataHome?.lost.percent ?? 0}
            />
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={{ fontSize: 16, fontWeight: '700' }}>Nhóm tài sản</Text>
        <SizeBox height={16} />
        <BarChartReport
          data={rootGroup}
          // data={[
          //   { category_id: { name: 'TSCĐ hữu hình khác' }, quantity: 300 },
          //   { category_id: { name: 'Phương tiện vận tải' }, quantity: 142 },
          //   { category_id: { name: 'Phương tiện vận tải' }, quantity: 122 },
          //   { category_id: { name: 'Máy móc' }, quantity: 115 },
          //   { category_id: { name: 'Quản lý' }, quantity: 1 },
          //   { category_id: { name: 'Máy móc' }, quantity: 115 },
          //   { category_id: { name: 'Quản lý' }, quantity: 84 },
          // ]}
        />
      </View>
    </BasePage>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 20,
    padding: 20,
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
});
