import { AVATAR_DEFAULT } from '@/assets/images';
import { BasePage } from '@/components';
import BottomSheetBusiness from '@/components/BottomSheetHomeAsm';
import DonutChart from '@/components/DonutChart';
import HomeAsmSkeleton from '@/components/skeletons/HomeAsmSkeleton';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import React from 'react';
import {
  Image,
  Pressable,
  Text,
  View
} from 'react-native';
import { useHome } from './hooks/useHome';
import { styles } from './styles';
const HomeScreen = () => {
  const {
    total,
    dataHome,
    loading,
    donutData,
    user,
    openDropdown,
    setOpenDropdown,
    handleShowBottomSheetBusiness,
    dataBusinessUnit,
    handleSelectBusinessUnit,
    handleGetHomeReport,
    handleNavigateSetting,
  } = useHome();

  if (loading) {
    return (
      <BasePage
        paddingHorizontal={0}
        title="Trang chủ"
        actions={
          <Pressable onPress={handleNavigateSetting}>
            <MaterialIcons name="settings" size={24} color="white" />
          </Pressable>
        }
      >
        <HomeAsmSkeleton />
      </BasePage>
    );
  }

  return (
    <BasePage
      paddingHorizontal={0}
      title="Trang chủ"
      scrollable
      refreshing={loading}
      onRefresh={handleGetHomeReport}
      keyboardShouldPersistTaps="always"
      actions={
        <Pressable onPress={handleNavigateSetting}>
          <MaterialIcons name="settings" size={24} color="white" />
        </Pressable>
      }
    >
      <View style={styles.header}>
        <View style={styles.userRow}>
          <Image source={AVATAR_DEFAULT} style={styles.avatar} />
          <Pressable
            style={{ flex: 1 }}
            onPress={handleShowBottomSheetBusiness}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={[styles.name, { flex: 1 }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {user?.user_id.name}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={20}
                color="#666"
              />
            </View>
            <Text style={styles.sub}>{user?.business_unit_id.name}</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.card}>
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
      <BottomSheetBusiness
        visible={openDropdown}
        data={dataBusinessUnit}
        onClose={() => setOpenDropdown(false)}
        onSelect={handleSelectBusinessUnit}
      />
    </BasePage>
  );
};

export default HomeScreen;

type LegendProps = {
  color: string;
  title: string;
  value: number;
  percent: number;
};

export const Legend: React.FC<LegendProps> = ({ color, title, value, percent }) => {
  return (
    <View style={styles.legendItem}>
      <View style={styles.legendRow}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={styles.legendText}>{title}</Text>
      </View>
      <Text style={styles.legendValue}>
        {value} <Text style={styles.percent}>{percent}%</Text>
      </Text>
    </View>
  );
};
