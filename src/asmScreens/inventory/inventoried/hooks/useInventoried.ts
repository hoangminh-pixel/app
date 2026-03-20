import { DropdownAppType } from '@/components/DropDown';
import { useAppNavigation } from '@/navigation/NavigationService';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { getAssets, getInventoried, getInventorying } from '@/services/asset';
import { ITEM_PER_PAGE } from '@/utils/appConstant';
import { showErrorToast } from '@/utils/toast';
import { useEffect, useState } from 'react';

const useInventoried = () => {
  const user = useAppSelector(state => state.auth.userAsm);
  const navigation = useAppNavigation();

  const [search, setSearch] = useState('');
  const [inventoryings, setInventoryings] = useState<InventoringRes[]>([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skeleton, setSkeleton] = useState(false);

  const [debounceSearch, setDebounceSearch] = useState('');

  const [visibleFilterModal, setVisibleFilterModal] = useState(false);
  const [visibleFilter, setVisibleFilter] = useState(false);

  const [filter, setFilter] = useState({
    fromDate: '',
    toDate: '',
  });

  const today = new Date();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  const [selectedDateStart, setSelectedDateStart] =
    useState<Date>(sevenDaysAgo);
  const [selectedDateEnd, setSelectedDateEnd] = useState<Date>(today);
  const [inventoryType, setInventoryType] = useState<string | null>(null);

  /**
   * debounce search
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    handleGetInventoried(1);
  }, [debounceSearch, inventoryType]);

  const handleGetInventoried = async (pageNumber = 1, isRefresh = false) => {
    if (loading) return;
    if (pageNumber === 1) {
      setSkeleton(true);
    }
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const res = await getInventoried({
        access_token: user?.access_token ?? '',
        company_id: user?.company_id.id ?? 0,
        business_unit_id: user?.business_unit_id.id ?? 0,
        key_word: debounceSearch,
        page: pageNumber,
        items_per_page: ITEM_PER_PAGE,
        from_date: '2000-01-01',
        to_date: '2026-03-19',
        inventory_type: null,
      });

      if (res && res.code === 200) {
        const newData = res.data.data ?? [];

        setInventoryings(prev =>
          pageNumber === 1 ? newData : [...prev, ...newData],
        );

        setPage(pageNumber);
        setHasMore(newData.length === ITEM_PER_PAGE);
      }
    } catch (error) {
      console.log('error getInventorying', error);
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
    await handleGetInventoried(1, true);
  };

  const handleLoadMore = async () => {
    if (!loading && hasMore) {
      await handleGetInventoried(page + 1);
    }
  };

  const handleChangeFilter = async (value: DropdownAppType | null) => {
      if (value?.id === -1) {
        setInventoryType(null);
        return;
      }
      if (value?.id === 2) {
        setInventoryType('detail');
        return;
      }
      if (value?.id === 3) {
        setInventoryType('quantity');
        return;
      }
    };

  return {
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
    filter,
    setFilter,
    selectedDateStart,
    setSelectedDateStart,
    selectedDateEnd,
    setSelectedDateEnd,
    handleGetInventoried,
    visibleFilterModal, setVisibleFilterModal,
    handleChangeFilter
  };
};

export default useInventoried;

export interface InventoringRes {
  id: number;
  name: string;
  state: string;
  description: string;
  create_date: string;
  inventory_type: string;
  inventoried_quantity: number;
  inventory_quantity: number;
  location_id: number[];
}
