import { useEffect, useRef, useState } from 'react';
import { RootRequest } from '../../types';
import { getListMroRequest } from '@/services/request';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { showErrorToast } from '@/utils/toast';
import { ITEM_PER_PAGE } from '@/utils/appConstant';
import { useAppNavigation } from '@/navigation/NavigationService';
import { appEvent } from '@/utils/appEvent';

const useReportProblem = () => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const [listRequest, setListRequest] = useState<RootRequest[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    handleGetListMroRequest(1);
  }, []);

  // useEffect(() => {
  //   appEvent.on('reload_report_screen', handleReloadwhenBack);

  //   return () => {
  //     appEvent.off('reload_report_screen', handleReloadwhenBack);
  //   };
  // }, []);

  const handleGetListMroRequest = async (pageNumber = 1, isRefresh = false) => {
    if (loading) return;
    if (pageNumber === 1) {
      setShowSkeleton(true);
    }
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      // dispatch(showLoading());

      const res = await getListMroRequest({
        login: user?.login ?? '',
        password: user?.password ?? '',
        stage: [],
        filtered: '',
        maintenance_type: ['ne'],
        group: '',
        page: pageNumber,
        item_per_page: ITEM_PER_PAGE,
      });

      const newData = res?.data?.list_requests?.[0]?.detail ?? [];

      setListRequest(prev =>
        pageNumber === 1 ? newData : [...prev, ...newData],
      );

      setPage(pageNumber);
      setHasMore(newData.length === ITEM_PER_PAGE);
    } catch (error) {
      console.log('error handleGetListMroRequest', error);
      showErrorToast({});
    } finally {
      // dispatch(hideLoading());
      setLoading(false);
      setRefreshing(false);
      if (pageNumber === 1) {
        setShowSkeleton(false);
      }
    }
  };

  const handleRefresh = async () => {
    await handleGetListMroRequest(1, true);
  };

  const handleReloadwhenBack = async () => {
    await handleGetListMroRequest(page);
  };

  const handleLoadMore = async () => {
    if (!loading && hasMore) {
      await handleGetListMroRequest(page + 1);
    }
  };

  const handlerRef = useRef(handleReloadwhenBack);

  useEffect(() => {
    handlerRef.current = handleReloadwhenBack;
  });

  useEffect(() => {
    const listener = () => handlerRef.current();
    appEvent.on('reload_report_screen', listener);
    return () => {
      appEvent.off('reload_report_screen', listener);
    };
  }, []);

  return {
    listRequest,
    loading,
    refreshing,
    handleRefresh,
    handleLoadMore,
    hasMore,
    navigation,
    handleReloadwhenBack,
    showSkeleton,
  };
};

export default useReportProblem;
