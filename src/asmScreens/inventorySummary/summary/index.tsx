import Icon from '@react-native-vector-icons/material-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { styles } from '../styles';
import { BasePage } from '@/components';
import { PRIMARY } from '@/utils/color';
import useSummary, { DiffAsset } from '../hooks/useSummary';
import { useAppNavigation } from '@/navigation/NavigationService';

type Props = {
  data: DiffAsset | undefined;
  locationId: number;
  inventoryId: number;
  inventoried: boolean;
  handleCompleteInventory: () => void;
};

export default function SummaryScreen({
  data,
  locationId,
  inventoryId,
  inventoried,
  handleCompleteInventory,
}: Props) {
  const navigation = useAppNavigation();

  const handleNavigate = (indexType: number) => {
    navigation.navigate('InventoryResultScreen', {
      locationId,
      inventoryId,
      indexType,
    });
  };

  const renderItem = (
    icon: any,
    title: string,
    value: number,
    onPress: (index: number) => void,
    index: number,
  ) => (
    <Pressable
      style={styles.card}
      onPress={() => {
        // if (value === 0) return;
        onPress(index);
      }}
    >
      <View style={styles.cardLeft}>
        <View style={styles.iconBox}>
          <Icon name={icon} size={22} color={PRIMARY} />
        </View>

        <View>
          <Text style={styles.cardTitle}>{title}</Text>
          {/* <Text style={styles.cardSubtitle}>{subtitle}</Text> */}
        </View>
      </View>

      <View style={styles.cardRight}>
        <Text style={[styles.value, { color: '#999' }]}>{value}</Text>
        <Icon name="chevron-right" size={20} color="#999" />
      </View>
    </Pressable>
  );

  return (
    <BasePage edges={['bottom']} paddingHorizontal={0}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Cards */}
          {renderItem(
            'analytics',
            'Chênh lệch số lượng',
            data?.overview.diff_qty ?? 0,
            handleNavigate,
            1,
          )}

          {renderItem(
            'person-search',
            'Thay đổi đối tượng sử dụng',
            data?.overview.diff_asset_user ?? 0,
            handleNavigate,
            2,
          )}

          {renderItem(
            'location-on',
            'Thay đổi vị trí tài sản',
            data?.overview.diff_location ?? 0,
            handleNavigate,
            3,
          )}

          {renderItem(
            'rule',
            'Thay đổi tình trạng',
            data?.overview.diff_detail_status ?? 0,
            handleNavigate,
            4,
          )}
        </ScrollView>
        {!inventoried && (
          <Pressable
            style={[styles.button, { marginHorizontal: 16 }]}
            onPress={handleCompleteInventory}
          >
            <Icon name="check-circle" size={20} color="#fff" />
            <Text style={styles.buttonText}>HOÀN TẤT KIỂM KÊ</Text>
          </Pressable>
        )}
      </View>
    </BasePage>
  );
}
