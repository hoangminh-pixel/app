import { useAppRoute } from '@/navigation/NavigationService';
import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { completeInventory, getDiffAssets } from '@/services/asset';
import { showErrorToast, showSuccesToast } from '@/utils/toast';
import { useEffect, useState } from 'react';

const useSummary = () => {
  const user = useAppSelector(state => state.auth.userAsm);
  const route = useAppRoute<'InventorySummaryScreen'>();
  const { locationId, inventoryId, inventoried } = route.params;
  const dispatch = useAppDispatch();

  const [data, setData] = useState<DiffAsset>();

  useEffect(() => {
    handleGetDiffAssets();
  }, []);

  const handleGetDiffAssets = async () => {
    try {
      dispatch(showLoading());
      const res = await getDiffAssets({
        access_token: user?.access_token ?? '',
        inventory_id: inventoryId,
        location_id: locationId,
        key_word: '',
        qty_asset: [],
        asset_user: [],
        location: [],
        asset_type: [],
        is_inventoried: true,
      });
      if (res && res.code === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log('error handleGetDiffAssets', error);
      showErrorToast({});
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleCompleteInventory = async () => {
    try {
      dispatch(showLoading());
      const res = await completeInventory({
        access_token: user?.access_token ?? '',
        inventory_id: inventoryId,
      });
      if (res && res.code === 200) {
        showSuccesToast({ title: 'Cập nhật thành công!' });
      }
    } catch (error) {
      console.log('error handleCompleteInventory', error);
      showErrorToast({});
    } finally {
      dispatch(hideLoading());
    }
  };

  return {
    data,
    locationId,
    inventoryId,
    inventoried,
    handleCompleteInventory,
  };
};

export default useSummary;

export interface DiffAsset {
  overview: Overview;
  detail: Detail[];
  qty_asset_inventoried: number;
  total_asset: number;
}

export interface Overview {
  diff_qty: number;
  diff_asset_user: number;
  diff_location: number;
  diff_detail_status: number;
}

export interface Detail {
  id: number;
  asset_id: number;
  asset_name: string;
  asset_code: string;
  theory_qty_total: number;
  real_qty_total: number;
}
