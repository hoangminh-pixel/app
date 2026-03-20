import { useAppNavigation, useAppRoute } from '@/navigation/NavigationService';
import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { getInventoryDetail } from '@/services/asset';
import { appEvent } from '@/utils/appEvent';
import { showErrorToast } from '@/utils/toast';
import { useEffect, useRef, useState } from 'react';

export const useInventoryDetail = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.auth.userAsm);
  const route = useAppRoute<'InventoryDetailScreen'>();
  const { item, inventoried } = route.params;
  const navigation = useAppNavigation();
  const [inventoryDetail, setInventoryDetail] = useState<InventoryDetail[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    handleGetInventoryDetail();
  }, []);

  const handleGetInventoryDetail = async () => {
    try {
      dispatch(showLoading());
      const res = await getInventoryDetail({
        access_token: user?.access_token ?? '',
        inventory_id: item.id,
      });
      if (res && res.code === 200) {
        setInventoryDetail(res.data);
      }
    } catch (error) {
      console.log('error handleGetInventoryDetail', error);
      showErrorToast({});
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await handleGetInventoryDetail();
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };

  const handleNavigateScanQr = (locationId: number) =>
    navigation.navigate('ScanQrInventoryScreen', {
      inventoryId: item.id,
      locationId: locationId,
    });

  const handleNavigateSummary = (locationId: number) =>
    navigation.navigate('InventorySummaryScreen', {
      locationId: locationId,
      inventoryId: item.id,
      inventoried: true,
    });

  const handlerRef = useRef(handleGetInventoryDetail);

  useEffect(() => {
    handlerRef.current = handleGetInventoryDetail;
  });

  useEffect(() => {
    const listener = () => handlerRef.current();
    appEvent.on('updated_inventory_line', listener);
    return () => {
      appEvent.off('updated_inventory_line', listener);
    };
  }, []);

  return {
    inventoryDetail,
    item,
    handleNavigateScanQr,
    inventoried,
    handleNavigateSummary,
    handleRefresh,
    refreshing,
  };
};

export interface InventoryDetail {
  location_id: number;
  location_name: string;
  qty_inventoried: number;
  total_inventory: number;
  status: string;
}
