import { DropdownAppType } from '@/components/DropDown';
import { useAppNavigation, useAppRoute } from '@/navigation/NavigationService';
import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import {
  Detail,
  RootDetailJob,
  assignWork,
  getDetailJob,
  getListJob,
} from '@/services/workRepair';
import { getListDevices } from '@/services/works';
import { ADMIN, ITEM_PER_PAGE } from '@/utils/appConstant';
import { useEffect, useState } from 'react';

const useListJobToday = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const route = useAppRoute<'ListJobTodayScreen'>();
  const { state } = route.params;

  const user = useAppSelector(state => state.auth.user);
  const role = useAppSelector(state => state.auth.user?.role);

  const isAdmin = role === ADMIN;

  const [search, setSearch] = useState('');
  const [dataMaintanence, setDataMaintanence] = useState<Detail[]>([]);
  const [dataMaintanenceFilter, setDataMaintanenceFilter] = useState<Detail[]>(
    [],
  );
  const [visibleAssignWorkModal, setVisibleAssignWorkModal] = useState(false);
  const [dataDetailJob, setDataDetailJob] = useState<RootDetailJob | null>(
    null,
  );

  const [checkEmployee, setCheckEmployee] = useState<DropdownAppType | null>(
    null,
  );
  const [technicians, setTechnicians] = useState<DropdownAppType | null>(null);
  const [techniciansWorkToo, setCheckEmployeeWorkToo] = useState<
    DropdownAppType[]
  >([]);
  const [deviceModal, setDeviceModal] = useState<DropdownAppType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [visibleModalFilter, setVisibleModalFilter] = useState(false);
  const [deviceModalSelect, setDeviceModalSelect] = useState<DropdownAppType[]>(
    [],
  );

  const [filterSelected, setFilterSelected] = useState<number[] | null>(null);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    handleGetListMaintanence();
    handleGetListDevices();
  }, []);

  useEffect(() => {
    if (deviceModalSelect && deviceModalSelect.length > 0) {
      const ids = deviceModalSelect.map(item => item.id);

      const result = ids.includes(-1) ? null : ids;

      setFilterSelected(result);
    }
  }, [deviceModalSelect]);

  useEffect(() => {
    applyFilter();
  }, [search, dataMaintanence]);

  const handleGetListDevices = async () => {
    try {
      const res = await getListDevices({
        login: user?.login ?? '',
        password: user?.password ?? '',
      });
      if (res && res.code === 1) {
        const data = res.data.map((item: { id: number; name: string }) => {
          return {
            id: item.id,
            value: item.name,
          };
        });

        const modalData = [{ id: -1, value: 'Tất cả' }, ...(data || [])];

        setDeviceModal(modalData);
      }
    } catch (error) {
      console.log('error handleGetListDevices', error);
    }
  };

  const handleGetListMaintanence = async (
    pageNumber = 1,
    isRefresh = false,
  ) => {
    if (loading) return;
    try {
      if (pageNumber === 1) {
        setShowSkeleton(true);
      }
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const data = await getListJob({
        login: user?.login ?? '',
        password: user?.password ?? '',
        page: pageNumber,
        item_per_page: ITEM_PER_PAGE,
        maintenance_type: ['cm', 'or', 'pm', 'por', 'ne'],
        check_today: state === 'today',
        check_today_done: state === 'work_due',
        check_overday: state === 'over_day',
        asset_category_level1_id: filterSelected,
        filtered: '',
        stage: [],
        group: '',
      });
      const newData = data?.data?.list_requests?.[0]?.detail ?? [];

      setDataMaintanence(prev =>
        pageNumber === 1 ? newData : [...prev, ...newData],
      );
      setPage(pageNumber);

      setHasMore(newData.length === ITEM_PER_PAGE);
    } catch (error) {
      console.log('error handleGetListMaintanence', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
      if (pageNumber === 1) {
        setShowSkeleton(false);
      }
    }
  };

  const applyFilter = () => {
    const filteredList = dataMaintanence.filter(item => {
      if (search.trim() !== '') {
        const s = search.toLowerCase();

        const name1 = item?.name?.name?.toLowerCase() || '';
        const name2 = item?.asset_name?.asset_name?.toLowerCase() || '';

        return name1.includes(s) || name2.includes(s);
      }

      return true;
    });

    setDataMaintanenceFilter(filteredList);
  };

  const handleRefresh = async () => {
    setSearch('');
    await handleGetListMaintanence(1, true);
  };

  const handleLoadMore = () => {
    if (search.trim() !== '') return;

    if (loading || !hasMore) return;

    if (!loading && hasMore) {
      handleGetListMaintanence(page + 1);
    }
  };

  const handleAssignWork = async (mro_order_id: any) => {
    try {
      dispatch(showLoading());
      const data = await getDetailJob({
        login: user?.login ?? '',
        password: user?.password ?? '',
        mro_order_id: mro_order_id,
      });
      setDataDetailJob(data);
    } catch (error) {
      console.log('error handleAssignWork', error);
    } finally {
      dispatch(hideLoading());
      setVisibleAssignWorkModal(true);
    }
  };

  const handleAssignWorkInModal = async (item: RootDetailJob | null) => {
    const techniciansWorkTooPayload = techniciansWorkToo.map(item => item.id);
    try {
      dispatch(showLoading());
      const data = await assignWork({
        login: user?.login ?? '',
        password: user?.password ?? '',
        mro_order_id: item?.data?.id,
        action: 'action_confirm',
        asset_id: item?.data.asset_id?.id,
        employee_execute_id: technicians?.id,
        assign_employee_ids: techniciansWorkTooPayload,
        check_employee_id: checkEmployee?.id,
      });
      if (data) {
        handleCloseModal();
        await handleGetListMaintanence(page);
      }
    } catch (error) {
      handleCloseModal();
      console.log('error handleAssignWorkInModal', error);
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleCloseModal = () => {
    setVisibleAssignWorkModal(false);
    setCheckEmployee(null);
    setTechnicians(null);
    setCheckEmployeeWorkToo([]);
  };
  return {
    search,
    setSearch,
    navigation,
    handleRefresh,
    handleLoadMore,
    loading,
    refreshing,
    hasMore,
    dataMaintanence,
    visibleAssignWorkModal,
    setVisibleAssignWorkModal,
    dataDetailJob,
    checkEmployee,
    setCheckEmployee,
    technicians,
    setTechnicians,
    techniciansWorkToo,
    setCheckEmployeeWorkToo,
    handleCloseModal,
    handleAssignWorkInModal,
    handleAssignWork,
    deviceModal,
    visibleModalFilter,
    setVisibleModalFilter,
    deviceModalSelect,
    setDeviceModalSelect,
    dataMaintanenceFilter,
    showSkeleton,
    isAdmin
  };
};

export default useListJobToday;
