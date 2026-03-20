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
import { styles } from './styles';
import { AppFlatList } from '@/components/AppFlatList';
import useInventorying, { InventoringRes } from './hooks/useInventorying';
import InventoryItem from '../components/InventoryItem';
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
    visibleFilterModal,
    setVisibleFilterModal,
    handleChangeFilter,
    visibleFilter,
    setVisibleFilter,
    filter,
    setFilter,
    selectedDateStart,
    setSelectedDateStart,
    selectedDateEnd,
    setSelectedDateEnd,
    handleGetInventorying,
  } = useInventorying();

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
              console.log('press');

              navigation.navigate('InventoryDetailScreen', {
                item,
                inventoried: false,
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
          handleGetInventorying(1);
          // setSelectedDateStart(data.fromDate);
          // setSelectedDateEnd(data.toDate);
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
