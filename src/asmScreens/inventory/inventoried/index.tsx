import { BasePage } from '@/components';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { AppFlatList } from '@/components/AppFlatList';
import InventoryItem from '../components/InventoryItem';
import useInventoried, { InventoringRes } from './hooks/useInventoried';
import { styles } from './styles';
import { ModalDropdown } from '@/components/DropDown';
import BottomSheetFilterDate from '../components/BottomSheetFilterDate';

const InventoryingScreen = () => {
  const {
    inventoryings,
    navigation,
    handleLoadMore,
    handleRefresh,
    refreshing,
    loading,
    hasMore,
    search,
    setSearch,
    skeleton,
    visibleFilter,
    setVisibleFilter,
    handleChangeFilter,
    selectedDateStart,
    setSelectedDateStart,
    selectedDateEnd,
    setSelectedDateEnd,
    handleGetInventoried,
    visibleFilterModal,
    setVisibleFilterModal,
  } = useInventoried();

  return (
    <BasePage paddingHorizontal={0}>
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={20} color="#888" />
          <TextInput
            placeholder="Tìm kiếm..."
            value={search}
            onChangeText={setSearch}
            style={styles.input}
            placeholderTextColor={'#888'}
          />
        </View>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setVisibleFilterModal(true)}
        >
          <MaterialIcons name="tune" size={20} color="#555" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setVisibleFilter(true)}
        >
          <MaterialIcons name="calendar-month" size={20} color="#555" />
        </TouchableOpacity>
      </View>

      <AppFlatList
        data={inventoryings}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }: { item: InventoringRes }) => (
          <Pressable
            onPress={() => {
              navigation.navigate('InventoryDetailScreen', {
                item,
                inventoried: true,
              });
            }}
          >
            <InventoryItem item={item} />
          </Pressable>
        )}
        contentContainerStyle={{ padding: 16 }}
        onRefresh={handleRefresh}
        onLoadMore={handleLoadMore}
        loading={loading}
        refreshing={refreshing}
        hasMore={hasMore}
      />

      <ModalDropdown
        options={[
          {
            id: -1,
            value: 'Tất cả',
          },
          {
            id: 2,
            value: 'Kiểm kê chi tiết',
          },
          {
            id: 3,
            value: 'Số lượng kiểm kê',
          },
        ]}
        visible={visibleFilterModal}
        onVisible={() => setVisibleFilterModal(false)}
        onChange={handleChangeFilter}
      />

      <BottomSheetFilterDate
        visible={visibleFilter}
        onClose={() => setVisibleFilter(false)}
        onApply={data => {
          handleGetInventoried(1);
        }}
        fromDate={selectedDateStart}
        endDate={selectedDateEnd}
        setFromDate={setSelectedDateStart}
        setEndDate={setSelectedDateEnd}
      />
    </BasePage>
  );
};

export default InventoryingScreen;
