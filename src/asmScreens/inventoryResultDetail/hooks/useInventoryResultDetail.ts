import { useAppRoute, useAppNavigation } from '@/navigation/NavigationService';
import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { getDetailInventory, getInventoryResult } from '@/services/asset';
import { showErrorToast } from '@/utils/toast';
import { useEffect, useState } from 'react';

const useInventoryResultDetail = () => {
  const user = useAppSelector(state => state.auth.userAsm);
  const route = useAppRoute<'InventoryResultDetailScreen'>();
  const { locationId, inventoryId, assetId } = route.params;
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const [data, setData] = useState<InventoryResultDetail>();

  useEffect(() => {
    handleGetInventoryResult();
  }, []);

  const handleGetInventoryResult = async () => {
    dispatch(showLoading());
    try {
      const res = await getDetailInventory({
        access_token: user?.access_token ?? '',
        inventory_id: inventoryId,
        location_id: locationId,
        asset_id: assetId,
      });
      if (res && res.code === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log('error handleGetInventoryResult', error);
      showErrorToast({});
    } finally {
      dispatch(hideLoading());
    }
  };

  return {
    data,
  };
};

export default useInventoryResultDetail;

export interface InventoryResultDetail {
  id: number;
  asset: Asset;
  images: string;
  type: Type;
  category: Category;
  quantity: number;
  asset_user_detail: AssetUserDetail[];
}

export interface Asset {
  id: number;
  name: string;
  code: string;
}

export interface Type {
  id: number;
  name: string;
  code: string;
  type: string;
}

export interface Category {
  id: number;
  name: string;
  code: string;
}

export interface AssetUserDetail {
  asset_user: string;
  qty_unused: number;
  qty_good: number;
  qty_repair: number;
  qty_liquidation: number;
}
