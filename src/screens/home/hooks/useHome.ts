import { useAppNavigation } from '@/navigation/NavigationService';
import { login } from '@/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { countTotalWork } from '@/services/home';
import { showErrorToast } from '@/utils/toast';
import { useEffect, useState } from 'react';

const useHome = () => {
  const user = useAppSelector(state => state.auth.user);
  const navigation = useAppNavigation();

  const dispatch = useAppDispatch();

  const [homeData, setHomeData] = useState<RootHome>();
  const [showSkeleton, setShowSkeleton] = useState<boolean>(false);

  useEffect(() => {
    handleGetDataHome();
  }, []);

  const handleGetDataHome = async () => {
    try {
      setShowSkeleton(true);
      const res = await countTotalWork({
        login: user?.login ?? '',
        password: user?.password ?? '',
      });
      if (res && res.code === 1) {
        setHomeData(res.data);
        const id = res.data?.employee_data?.id;
        if (user) {
          if (!user?.id) {
            const userData = {
              ...user,
              id: id,
            };
            dispatch(
              login({
                user: userData,
              }),
            );
          }
        }
      }
    } catch (error) {
      console.log('error handleGetDataHome', error);
      showErrorToast({});
    } finally {
      setShowSkeleton(false);
    }
  };

  const summary = [
    {
      label: 'Đang thực hiện',
      value: homeData?.work_of_day?.quantity,
      color: '#3b82f6',
      onPress: () =>
        navigation.navigate('ListJobTodayScreen', { state: 'today' }),
      icon: 'pending-actions',
    },
    {
      label: 'Đã hoàn thành',
      value: homeData?.work_done?.quantity,
      color: '#22c55e',
      onPress: () =>
        navigation.navigate('ListJobTodayScreen', { state: 'work_due' }),
      icon: 'check-circle',
    },
    {
      label: 'Trễ hạn',
      value: homeData?.work_overday?.quantity,
      color: '#f43f5e',
      onPress: () =>
        navigation.navigate('ListJobTodayScreen', { state: 'over_day' }),
      icon: 'warning',
    },
  ];

  const handleNavigate = (id: number) => {
    navigation.navigate('DetailRepairScreen', {
      id: id,
      onGoBack: handleGetDataHome,
    });
  };

  const handleNavigateSetting = () => {
    navigation.navigate('SettingScreen');
  };

  return {
    homeData,
    summary,
    showSkeleton,
    handleGetDataHome,
    handleNavigate,
    handleNavigateSetting,
  };
};

export default useHome;

export interface RootHome {
  orders: Order[];
  activities: Activity[];
  employee_data: EmployeeData;
  work_of_day: WorkOfDay;
  work_done: WorkDone;
  work_due: WorkDue;
  work_overday: WorkOverday;
}

export interface Order {
  id: number;
  name: string;
  state: string;
  cause_id: any;
}

export interface Activity {
  id: number;
  name: string;
  cause_id: any;
  activity_code: string;
  state: string;
}

export interface EmployeeData {
  id: number;
  name: string;
  job_id: boolean;
  job_name: boolean;
  department_id: boolean;
  department_name: boolean;
  work_phone: boolean;
  work_email: string;
  avatar: boolean;
  avatar_url: string;
}

export interface WorkOfDay {
  field_name: string;
  quantity: number;
}

export interface WorkDone {
  field_name: string;
  quantity: number;
}

export interface WorkDue {
  field_name: string;
  quantity: number;
}

export interface WorkOverday {
  field_name: string;
  quantity: number;
}
