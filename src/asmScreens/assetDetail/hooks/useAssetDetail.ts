import { useAppNavigation, useAppRoute } from '@/navigation/NavigationService';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { getAssetDetail, getAssets } from '@/services/asset';
import { ITEM_PER_PAGE } from '@/utils/appConstant';
import { showErrorToast } from '@/utils/toast';
import { useEffect, useState } from 'react';

const useAssetDetail = () => {
  const user = useAppSelector(state => state.auth.userAsm);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const route = useAppRoute<'AssetDetailScreen'>();
  const { id } = route.params;

  const [assetData, setAssetData] = useState<RootAssetDetail>();

  const [assetLineData, setAssetLineData] = useState<Line[]>([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skeleton, setSkeleton] = useState(false);

  useEffect(() => {
    handleGetAsset(1);
  }, []);

  const handleGetAsset = async (pageNumber = 1, isRefresh = false) => {
    if (loading) return;
    if (pageNumber === 1) {
      setSkeleton(true);
    }
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const res = await getAssetDetail({
        access_token: user?.access_token ?? '',
        company_id: user?.company_id.id ?? 0,
        business_unit_id: user?.business_unit_id.id ?? 0,
        page: pageNumber,
        items_per_page: ITEM_PER_PAGE,
        id: id,
      });

      if (res && res.code === 200) {
        setAssetData(res.data);

        const newLineData = res.data.lines ?? [];

        setAssetLineData(prev =>
          pageNumber === 1 ? newLineData : [...prev, ...newLineData],
        );

        setPage(pageNumber);
        setHasMore(newLineData.length === ITEM_PER_PAGE);
      }
    } catch (error) {
      console.log('error handleGetAsset', error);
      showErrorToast({});
    } finally {
      setLoading(false);
      setRefreshing(false);
      if (pageNumber === 1) {
        setSkeleton(false);
      }
    }
  };

  const handleRefresh = async () => {
    await handleGetAsset(1, true);
  };

  const handleLoadMore = async () => {
    if (!loading && hasMore) {
      await handleGetAsset(page + 1);
    }
  };

  const onPressMoreMenu = (type: 'broken' | 'loss') => {
    if (type === 'broken') {
      if (assetData?.mark_able) {
        navigation.navigate('MarkBrokenScreen', { id: assetData.id });
      } else {
        showErrorToast({
          content: `Chỉ được đánh dấu hỏng tài sản ở trạng thái chưa sử dụng và đang sử dụng thuộc đơn vị ${user?.business_unit_id.name}. Vui lòng kiểm tra lại thông tin.`,
        });
      }
    }
    if (type === 'loss') {
      if (assetData?.mark_able) {
        //TODO LossScreen
        // navigation.navigate('MarkBrokenScreen');
      } else {
        showErrorToast({
          content: `Chỉ được đánh dấu mất tài sản ở trạng thái chưa sử dụng và đang sử dụng thuộc đơn vị ${user?.business_unit_id.name}. Vui lòng kiểm tra lại thông tin.`,
        });
      }
    }
  };

  return {
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
  };
};

export default useAssetDetail;

export interface RootAssetDetail {
  id: number;
  asset_name: string;
  asset_code: string;
  category: Category;
  uom_id: UomId;
  quantity: number;
  price_unit: number;
  amount: number;
  type: Type;
  asset_type: string;
  zone: Zone;
  location: Location;
  image: string;
  lines: Line[];
  mark_able: boolean;
}

export interface Category {
  id: number;
  name: string;
}

export interface UomId {
  id: number;
  name: string;
}

export interface Type {
  id: number;
  name: string;
  type: string;
}

export interface Zone {
  id: number;
  name: string;
  code: string;
}

export interface Location {
  id: number;
  name: string;
  code: string;
}

export interface Line {
  id: number;
  state: string;
  quantity: number;
  asset_user?: string;
  is_locked: boolean;
  employee: Employee;
  department: Department;
  representative: Representative;
  zone: Zone2;
  location: Location2;
}

export interface Employee {
  id: any;
  name: any;
}

export interface Department {
  id: any;
  name: any;
}

export interface Representative {
  id: boolean;
  name: boolean;
}

export interface Zone2 {
  id: number;
  name: string;
  code: string;
}

export interface Location2 {
  id: number;
  name: string;
  code: string;
}
