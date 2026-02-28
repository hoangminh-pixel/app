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

const useRepair = () => {
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
    handleGetListMaintanence(1, true);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      handleGetListMaintanence(page + 1);
    }
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
  };
};

export default useRepair;
