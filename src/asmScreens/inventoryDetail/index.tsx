import { BasePage } from '@/components';
import { AppFlatList } from '@/components/AppFlatList';
import React from 'react';
import { Pressable } from 'react-native';
import {
  InventoryDetail,
  useInventoryDetail,
} from './hooks/useInventoryDetail';
import InventoryAreaItem from './components/InventoryAreaItem';

const InventoryDetailScreen = () => {
  const {
    inventoryDetail,
    item,
    handleNavigateScanQr,
    inventoried,
    handleNavigateSummary,
    handleRefresh,
    refreshing,
  } = useInventoryDetail();
  return (
    <BasePage
      paddingHorizontal={0}
      title={item.name}
      showBack
      edges={['bottom']}
    >
      <AppFlatList
        refreshing={refreshing}
        onRefresh={handleRefresh}
        data={inventoryDetail}
        keyExtractor={item => item.location_id.toString()}
        renderItem={({ item }: { item: InventoryDetail }) => (
          <Pressable onPress={() => {}}>
            <InventoryAreaItem
              name={item.location_name}
              subTitle={''}
              done={item.qty_inventoried}
              total={item.total_inventory}
              onPress={() => {
                if (inventoried) {
                  handleNavigateSummary(item.location_id);
                  return;
                }
                handleNavigateScanQr(item.location_id);
              }}
            />
          </Pressable>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </BasePage>
  );
};

export default InventoryDetailScreen;
