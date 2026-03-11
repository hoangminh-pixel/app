import { DropdownAppType } from '@/components/DropDown';
import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { getBusiness, getDashboardSummary } from '@/services/dashboard';
import { showErrorToast } from '@/utils/toast';
import moment from 'moment';
import { useEffect, useState } from 'react';

const useDashboard = () => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

  const today = new Date();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  const [selectedDateStart, setSelectedDateStart] =
    useState<Date>(sevenDaysAgo);
  const [selectedDateEnd, setSelectedDateEnd] = useState<Date>(today);

  const [visibleModalDateStart, setVisibleModalDateStart] =
    useState<boolean>(false);
  const [visibleModalDateEnd, setVisibleModalDateEnd] =
    useState<boolean>(false);

  const [bussinessModal, setBussinessModal] = useState<DropdownAppType[]>([]);
  const [modalLocation, setModalLocation] = useState<boolean>(false);
  const [location, setLocation] = useState<DropdownAppType | null>();
  const [dashboardData, setDashboardData] = useState<RootDashboard>();
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    handleGetBussiness();
  }, []);

  useEffect(() => {
    if (location?.id) {
      handleGetDashboardSummary();
    }
  }, [location?.id, selectedDateStart, selectedDateEnd]);

  const handleGetBussiness = async () => {
    try {
      // dispatch(showLoading());
      const res = await getBusiness({
        login: user?.login ?? '',
        password: user?.password ?? '',
      });
      if (res && res.code === 1) {
        const data = res?.data?.map((item: any) => {
          return {
            id: item?.id,
            value: item?.name,
          };
        });
        setBussinessModal(data);
        setLocation(data?.[0]);
      }
    } catch (error) {
      console.log('error handleGetBussiness', error);
      showErrorToast({});
    } finally {
      // dispatch(hideLoading());
    }
  };

  const handleGetDashboardSummary = async () => {
    try {
      // dispatch(showLoading());
      setShowSkeleton(true);
      const res = await getDashboardSummary({
        login: user?.login ?? '',
        password: user?.password ?? '',
        business_unit_id: location?.id ?? 0,
        start_date: moment(selectedDateStart).format('YYYY-MM-DD'),
        end_date: moment(selectedDateEnd).format('YYYY-MM-DD'),
      });
      if (res && res.code === 1) {
        setDashboardData(res.data);
      }
    } catch (error) {
      console.log('error handleGetDashboardSummary', error);
      showErrorToast({});
    } finally {
      setShowSkeleton(false);
      // dispatch(hideLoading());
    }
  };

  const handleRefresh = async () => {
    try {
      setRefresh(true);
      await handleGetDashboardSummary();
    } catch (error) {
    } finally {
      setRefresh(false);
    }
  };

  return {
    bussinessModal,
    selectedDateStart,
    setSelectedDateStart,
    visibleModalDateStart,
    setVisibleModalDateStart,
    selectedDateEnd,
    setSelectedDateEnd,
    visibleModalDateEnd,
    setVisibleModalDateEnd,
    modalLocation,
    setModalLocation,
    location,
    setLocation,
    dashboardData,
    showSkeleton,
    handleGetDashboardSummary,
    refresh,
    handleRefresh,
  };
};

export default useDashboard;

export interface RootDashboard {
  total_work: number;
  total_works: TotalWorks;
  total_cause: number;
  cause_not_done: CauseNotDone;
  cause_done: CauseDone;
  top_employees: TopEmployee[];
}

export interface TotalWorks {
  work_done: number;
  work_processing: number;
  work_overday: number;
}

export interface CauseNotDone {
  total_cause_not_done: number;
  items: Item[];
}

export interface Item {
  priority_id: number;
  code: string;
  name: string;
  count: number;
}

export interface CauseDone {
  total_cause_done: number;
  items: Item2[];
}

export interface Item2 {
  priority_id: number;
  code: string;
  name: string;
  count: number;
}

export interface TopEmployee {
  employee_id: number;
  employee_name: string;
  total_assigned: number;
  total_done: number;
  avatar: any;
}
