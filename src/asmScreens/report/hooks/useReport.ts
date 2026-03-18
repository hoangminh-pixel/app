import { useAppSelector } from '@/redux/store/hooks';
import { getGroupReport, getReportHome } from '@/services/asset';
import { showErrorToast } from '@/utils/toast';
import { useEffect, useState } from 'react';

export const useReport = () => {
  const user = useAppSelector(state => state.auth.userAsm);

  const [dataHome, setDataHome] = useState<HomeReport>();
  const [rootGroup, setRootGroup] = useState<RootGroup[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleInitData();
  }, []);

  const handleInitData = async () => {
    setLoading(true);
    try {
      await Promise.all([handleGetHomeReport(), handleGetGroupReport()]);
    } catch (error) {
      console.log('error handleInitData', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetHomeReport = async () => {
    try {
      const res = await getReportHome({
        access_token: user?.access_token ?? '',
        company_id: user?.company_id.id ?? 0,
        business_unit_id: user?.business_unit_id.id ?? 0,
      });

      if (res && res.code === 200) {
        setDataHome(res.data);
      }
    } catch (error) {
      showErrorToast({});
      console.log('error handleGetHomeReport', error);
    }
  };

  const handleGetGroupReport = async () => {
    try {
      setLoading(true);
      const res = await getGroupReport({
        access_token: user?.access_token ?? '',
        company_id: user?.company_id.id ?? 0,
        business_unit_id: user?.business_unit_id.id ?? 0,
      });

      if (res && res.code === 200) {
        setRootGroup(res.data);
      }
    } catch (error) {
      showErrorToast({});
      console.log('error handleGetGroupReport', error);
    } finally {
      setLoading(false);
    }
  };

  const donutData = [
    {
      label: 'Đang sử dụng',
      value: dataHome?.using.quantity,
      color: '#10b981',
    },
    {
      label: 'Chưa sử dụng',
      value: dataHome?.unused.quantity,
      color: '#3b82f6',
    },
    {
      label: 'Hỏng, sửa chữa',
      value: dataHome?.damaged.quantity,
      color: '#f59e0b',
    },
    {
      label: 'Mất, huỷ, thanh lý',
      value: dataHome?.lost.quantity,
      color: '#ef4444',
    },
  ];
  return {
    dataHome,
    loading,
    donutData,
    handleInitData,
    rootGroup,
  };
};

export interface HomeReport {
  using: Using;
  unused: Unused;
  damaged: Damaged;
  lost: Lost;
}

export interface Using {
  quantity: number;
  percent: number;
}

export interface Unused {
  quantity: number;
  percent: number;
}

export interface Damaged {
  quantity: number;
  percent: number;
}

export interface Lost {
  quantity: number;
  percent: number;
}

export interface RootGroup {
  category_id: CategoryId;
  quantity: number;
}

export interface CategoryId {
  id: number;
  name: string;
}
