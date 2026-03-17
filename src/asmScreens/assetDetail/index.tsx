import { BasePage } from '@/components';
import { AppFlatList } from '@/components/AppFlatList';
import { formatVND } from '@/utils/extension';
import React from 'react';
import { AssetItem } from './components/AssetItem';
import { HeaderAsset } from './components/Header';
import MoreMenu from './components/MoreMenu';
import useAssetDetail, { Line } from './hooks/useAssetDetail';

const AssetDetailScreen = () => {
  const {
    assetLineData,
    navigation,
    handleLoadMore,
    handleRefresh,
    refreshing,
    loading,
    hasMore,
    skeleton,
    assetData,
    onPressMoreMenu,
  } = useAssetDetail();
  return (
    <BasePage
      showBack
      title="Chi tiết tài sản"
      paddingHorizontal={0}
      actions={
        <MoreMenu
          onPressMarkBroken={() => onPressMoreMenu('broken')}
          onPressMarkLoss={() => onPressMoreMenu('loss')}
        />
      }
    >
      <AppFlatList
        data={assetLineData}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <HeaderAsset
            assetImage={assetData?.image ?? ''}
            assetName={assetData?.asset_name ?? ''}
            assetCode={assetData?.asset_code ?? ''}
            category={assetData?.category.name ?? ''}
            location={assetData?.location.name ?? ''}
            quantity={assetData?.quantity.toString() ?? ''}
            amount={formatVND(assetData?.amount ?? 0)}
            priceUnit={formatVND(assetData?.price_unit ?? 0)}
            assetType={assetData?.asset_type ?? ''}
          />
        }
        renderItem={({ item }: { item: Line }) => (
          <AssetItem
            qty={item.quantity}
            location={item.location.name}
            state={item.state}
            employee={item.employee.name}
            zone={item.zone.name}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
        onRefresh={handleRefresh}
        onLoadMore={handleLoadMore}
        loading={loading}
        refreshing={refreshing}
        hasMore={hasMore}
      />
    </BasePage>
  );
};

export default AssetDetailScreen;
