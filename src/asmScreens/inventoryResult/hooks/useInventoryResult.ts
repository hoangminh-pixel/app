import { useAppRoute, useAppNavigation } from '@/navigation/NavigationService';
import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { getInventoryResult } from '@/services/asset';
import { showErrorToast } from '@/utils/toast';
import { useEffect, useState } from 'react';

const useInventoryResult = () => {
  const user = useAppSelector(state => state.auth.userAsm);
  const route = useAppRoute<'InventoryResultScreen'>();
  const { locationId, inventoryId, indexType } = route.params;
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const [data, setData] = useState<InventoryResult[]>([]);

  useEffect(() => {
    handleGetInventoryResult();
  }, []);

  const handleGetInventoryResult = async () => {
    dispatch(showLoading());
    try {
      const res = await getInventoryResult({
        access_token: user?.access_token ?? '',
        inventory_id: inventoryId,
        location_id: locationId,
        type: indexType,
        is_inventoried: true,
      });
      if (res && res.code === 200) {
        if (res.data && res.data.data) {
          setData(res.data.data);
        }
      }
    } catch (error) {
      console.log('error handleGetInventoryResult', error);
      showErrorToast({});
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleViewDetail = (assetId: number) =>
    navigation.navigate('InventoryResultDetailScreen', {
      locationId,
      inventoryId,
      assetId,
    });

  return {
    data,
    handleViewDetail,
  };
};

export default useInventoryResult;

export interface InventoryResult {
  asset_id: number;
  asset_name: string;
  asset_code: string;
  qty_unused: number;
  qty_good: number;
  qty_repair: number;
  qty_liquidation: number;
  theory_qty_total: number;
  real_qty_total: number;
}
