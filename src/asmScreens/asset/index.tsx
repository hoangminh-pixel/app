import { BasePage } from '@/components';
import { AppFlatList } from '@/components/AppFlatList';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import React from 'react';
import { Pressable, TextInput, TouchableOpacity, View } from 'react-native';
import { AssetCard } from './components/AssetCard';
import useAsset, { RootAssetData } from './hooks/useAsset';
import { styles } from './styles';
import AssetListSkeleton from '@/components/skeletons/AssetSkeleton';

export default function AssetListScreen() {
  const {
    assetData,
    navigation,
    handleLoadMore,
    handleRefresh,
    refreshing,
    loading,
    hasMore,
    search,
    setSearch,
    skeleton,
  } = useAsset();

  return (
    <BasePage title="Tài sản" paddingHorizontal={0}>
      <View style={styles.container}>
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <MaterialIcons name="search" size={20} color="#888" />
            <TextInput
              placeholder="Tìm kiếm tài sản..."
              value={search}
              onChangeText={setSearch}
              style={styles.input}
              placeholderTextColor={'#888'}
            />
          </View>

          <TouchableOpacity style={styles.filterBtn}>
            <MaterialIcons name="tune" size={20} color="#555" />
          </TouchableOpacity>
        </View>

        {skeleton || refreshing ? (
          <AssetListSkeleton />
        ) : (
          <AppFlatList
            data={assetData}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }: { item: RootAssetData }) => (
              <Pressable
                onPress={() => {
                  navigation.navigate('AssetDetailScreen', { id: item.id });
                }}
              >
                <AssetCard item={item} />
              </Pressable>
            )}
            contentContainerStyle={{ padding: 16 }}
            onRefresh={handleRefresh}
            onLoadMore={handleLoadMore}
            loading={loading}
            refreshing={refreshing}
            hasMore={hasMore}
          />
        )}
      </View>
    </BasePage>
  );
}
