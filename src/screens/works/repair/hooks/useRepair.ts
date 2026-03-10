import { DropdownAppType } from '@/components/DropDown';
import { useAppNavigation } from '@/navigation/NavigationService';
import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import {
  assignWork,
  Detail,
  getDetailJob,
  getListJob,
  ListRequest,
  ResponseWorkRepair,
  RootDetailJob,
} from '@/services/workRepair';
import { ITEM_PER_PAGE } from '@/utils/appConstant';
import { useEffect, useRef, useState } from 'react';
import { findNodeHandle, UIManager, View } from 'react-native';

const useRepair = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const user = useAppSelector(state => state.auth.user);
  const [search, setSearch] = useState('');
  const [selectedButton, setSelectedButton] = useState('today');
  const buttonRef = useRef<View>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [dataMaintanence, setDataMaintanence] = useState<Detail[]>([]);
  const [dataMaintanenceFilter, setDataMaintanenceFilter] = useState<Detail[]>(
    [],
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [visibleModalFilter, setVisibleModalFilter] = useState(false);
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
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    handleGetListMaintanence();
  }, []);

  useEffect(() => {
    // if (role === USER) return;
    applyFilter();
  }, [dataMaintanence, selectedFilter, search]);

  const selectionType = [
    {
      label: 'Hôm nay',
      type: 'today',
      icon: 'calendar-today',
    },
    {
      label: 'Tuỳ chỉnh ngày',
      type: 'custom',
      icon: 'expand-more',
    },
  ];

  const STATUS_OPTIONS = [
    { id: 'all', value: 'Tất cả' },
    { id: 'tp_gv', value: 'QL giao việc' },
    { id: 'give', value: 'Nhận việc' },
    { id: 'processing', value: 'Đang thực hiện' },
    { id: 'wait_materials', value: 'Chờ vật tư' },
    { id: 'wait_tp_acceptance', value: 'Chờ QL nghiệm thu' },
    { id: 'done', value: 'Hoàn thành' },
  ];

  const onPressSelectionType = ({ type }: { type: string }) => {
    setSelectedButton(type);
    if (type === 'today') {
      setSelectedDate(new Date());
    }
    if (type === 'custom') {
      openCalendar();
    }
  };

  const openCalendar = () => {
    const handle = findNodeHandle(buttonRef.current);
    if (handle) {
      UIManager.measureInWindow(handle, (x, y, width, height) => {
        setPosition({
          top: y + height + 8,
          left: x,
        });
        setVisible(true);
      });
    }
  };

  const handleGetListMaintanence = async (
    pageNumber = 1,
    isRefresh = false,
  ) => {
    if (loading) return;
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      dispatch(showLoading());
      const data = await getListJob({
        login: user?.login ?? '',
        password: user?.password ?? '',
        page: pageNumber,
        item_per_page: ITEM_PER_PAGE,
        maintenance_type: ['cm', 'ne'],
        stage: [],
        filter_date: '2025-12-30',
        filtered: '',
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
      dispatch(hideLoading());
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setSelectedFilter('all');
    setSearch('')
    handleGetListMaintanence(1, true);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      handleGetListMaintanence(page + 1);
    }
  };

  const applyFilter = () => {
    if (dataMaintanence?.length === 0) {
      setDataMaintanenceFilter(dataMaintanence);
      return;
    }
    let data = [...dataMaintanence];

    if (!selectedFilter && search.trim() === '') {
      setDataMaintanenceFilter(dataMaintanence);
      return;
    }

    data = dataMaintanence?.filter(item => {
      if (selectedFilter === 'all') return item;

      const stateKey = item?.state?.state;
      return stateKey === selectedFilter;
    });

    if (search.trim() !== '') {
      const searchText = search.toLowerCase();

      data = data?.filter(item => {
        const name1 = item?.name?.name?.toLowerCase() || '';
        const name2 = item?.asset_name?.asset_name?.toLowerCase() || '';

        return name1.includes(searchText) || name2.includes(searchText);
      });
    }

    setDataMaintanenceFilter(data);
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

  const handleChangeFilterStatus = (item: string) => {
    setSelectedFilter(item);
    setSearch('')
  };

  const handleReloadWhenBack = async () => {
    await handleGetListMaintanence(page);
  };

  return {
    search,
    setSearch,
    selectedButton,
    selectionType,
    onPressSelectionType,
    visible,
    buttonRef,
    setVisible,
    position,
    selectedDate,
    setSelectedDate,
    dataMaintanence,
    handleRefresh,
    handleLoadMore,
    loading,
    refreshing,
    hasMore,
    visibleModalFilter,
    setVisibleModalFilter,
    STATUS_OPTIONS,
    visibleAssignWorkModal,
    setVisibleAssignWorkModal,
    handleAssignWork,
    dataDetailJob,
    checkEmployee,
    setCheckEmployee,
    technicians,
    setTechnicians,
    techniciansWorkToo,
    setCheckEmployeeWorkToo,
    handleCloseModal,
    handleAssignWorkInModal,
    handleChangeFilterStatus,
    dataMaintanenceFilter,
    navigation,
    handleReloadWhenBack
  };
};

export default useRepair;
