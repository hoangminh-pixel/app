import { useAppNavigation } from '@/navigation/NavigationService';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { getAssets } from '@/services/asset';
import { ITEM_PER_PAGE } from '@/utils/appConstant';
import { showErrorToast } from '@/utils/toast';
import { useEffect, useState } from 'react';

const useAsset = () => {
  const user = useAppSelector(state => state.auth.userAsm);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const [search, setSearch] = useState('');
  const [assetData, setAssetData] = useState<RootAssetData[]>([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skeleton, setSkeleton] = useState(false);

  const [debounceSearch, setDebounceSearch] = useState('');

  /**
   * debounce search
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /**
   * call api when search change
   */
  useEffect(() => {
    handleGetAsset(1);
  }, [debounceSearch]);

  /**
   * API
   */
  const handleGetAsset = async (pageNumber = 1, isRefresh = false) => {
    if (loading) return;
    if (pageNumber === 1) {
      setSkeleton(true);
    }
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const res = await getAssets({
        access_token: user?.access_token ?? '',
        company_id: user?.company_id.id ?? 0,
        business_unit_id: user?.business_unit_id.id ?? 0,
        key_word: debounceSearch,
        page: pageNumber,
        items_per_page: ITEM_PER_PAGE,
        employee_id: 0,
        department_id: 0,
        zone_id: 0,
        location_id: 0,
        type_id: 0,
      });

      if (res && res.code === 200) {
        const newData = res.data.data ?? [];

        setAssetData(prev =>
          pageNumber === 1 ? newData : [...prev, ...newData],
        );

        setPage(pageNumber);
        setHasMore(newData.length === ITEM_PER_PAGE);
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

  /**
   * pull refresh
   */
  const handleRefresh = async () => {
    await handleGetAsset(1, true);
  };

  /**
   * load more
   */
  const handleLoadMore = async () => {
    if (!loading && hasMore) {
      await handleGetAsset(page + 1);
    }
  };

  return {
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
  };
};

export default useAsset;

export interface RootAssetData {
  id: number;
  code: string;
  name: string;
  quantity: number;
  state: string;
  detail_status: boolean;
  type: Type;
}

export interface Type {
  id: number;
  name: string;
  code: string;
  type: string;
}
