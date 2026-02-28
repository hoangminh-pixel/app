import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import {
  Detail,
  getListJob,
  ListRequest,
  ResponseWorkRepair,
} from '@/services/workRepair';
import { ITEM_PER_PAGE } from '@/utils/appConstant';
import { useEffect, useRef, useState } from 'react';
import { findNodeHandle, UIManager, View } from 'react-native';

const useMaintenance = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const [search, setSearch] = useState('');
  const [selectedButton, setSelectedButton] = useState('today');
  const buttonRef = useRef<View>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [dataMaintanence, setDataMaintanence] = useState<Detail[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [visibleModalFilter, setVisibleModalFilter] = useState(false);

  const [visibleAssignWorkModal, setVisibleAssignWorkModal] = useState(false);

  useEffect(() => {
    handleGetListMaintanence();
  }, []);

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

    { id: 'alls', value: 'Tất cả' },
    { id: 'tp_gvs', value: 'QL giao việc' },
    { id: 'gives', value: 'Nhận việc' },
    { id: 'processings', value: 'Đang thực hiện' },
    { id: 'wait_materisals', value: 'Chờ vật tư' },
    { id: 'wait_tp_acceptsance', value: 'Chờ QL nghiệm thu' },
    { id: 'donse', value: 'Hoàn thành' },
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
        maintenance_type: ['pm', 'por'],
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
    handleGetListMaintanence(1, true);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      handleGetListMaintanence(page + 1);
    }
  };

  const handleAssignWork = () => {
    setVisibleAssignWorkModal(true);
  };

  return {
    search,
    setSearch,
    selectedButton,
    setSelectedButton,
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
  };
};

export default useMaintenance;
