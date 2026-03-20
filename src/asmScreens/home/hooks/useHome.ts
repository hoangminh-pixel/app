import { useAppNavigation } from '@/navigation/NavigationService';
import { loginAsm } from '@/redux/slices/authSlice';
import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { getBusinessUnit, getReportHome } from '@/services/asset';
import { RootAsmSignIn } from '@/services/auth/authService';
import { showErrorToast } from '@/utils/toast';
import { useEffect, useState } from 'react';

export const useHome = () => {
  const user = useAppSelector(state => state.auth.userAsm);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const [dataHome, setDataHome] = useState<HomeReport>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [dataBusinessUnit, setDataBusinessUnit] = useState<
    BusinessUnitResponse[]
  >([]);

  useEffect(() => {
    handleGetHomeReport();
  }, [user]);

  const handleGetHomeReport = async () => {
    try {
      setLoading(true);
      const res = await getReportHome({
        access_token: user?.access_token ?? '',
        company_id: user?.company_id.id ?? 0,
        business_unit_id: user?.business_unit_id.id ?? 0,
      });

      if (res && res.code === 200) {
        setDataHome(res.data);
        const total = Object.values(res.data).reduce(
          (sum, item: any) => sum + item.quantity,
          0,
        );
        setTotal(Number(total));
      }
    } catch (error) {
      showErrorToast({});
      console.log('error handleGetHomeReport', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetBusinessUnit = async () => {
    try {
      dispatch(showLoading());
      const res = await getBusinessUnit({
        access_token: user?.access_token ?? '',
        key_word: '',
      });
      if (res && res.code === 200) {
        setDataBusinessUnit(res.data);
      }
    } catch (error) {
      console.log('error handleGetBusinessUnit', error);
      showErrorToast({});
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleShowBottomSheetBusiness = async () => {
    try {
      await handleGetBusinessUnit();
      setOpenDropdown(true);
    } catch (error) {}
  };

  const handleSelectBusinessUnit = (item: {
    id: number;
    name: string;
    business_unit: {
      id: number;
      name: string;
    };
  }) => {
    if (user) {
      const userInforAsm = {
        ...user,
        company_id: {
          id: item.id,
          name: item.name,
        },
        business_unit_id: {
          id: item.business_unit.id,
          name: item.business_unit.name,
        },
      };
      dispatch(loginAsm({ user: userInforAsm }));
    }
  };

  const handleNavigateSetting = () => {
    navigation.navigate('SettingScreen');
  };

  const donutData = [
    {
      label: 'Đang sử dụng',
      value: dataHome?.using?.quantity ?? 0,
      color: '#10b981',
    },
    {
      label: 'Chưa sử dụng',
      value: dataHome?.unused?.quantity ?? 0,
      color: '#3b82f6',
    },
    {
      label: 'Hỏng, sửa chữa',
      value: dataHome?.damaged?.quantity ?? 0,
      color: '#f59e0b',
    },
    {
      label: 'Mất, huỷ, thanh lý',
      value: dataHome?.lost?.quantity ?? 0,
      color: '#ef4444',
    },
  ];
  return {
    dataHome,
    total,
    loading,
    donutData,
    user,
    openDropdown,
    setOpenDropdown,
    handleShowBottomSheetBusiness,
    dataBusinessUnit,
    handleSelectBusinessUnit,
    handleGetHomeReport,
    handleNavigateSetting,
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

export interface BusinessUnitResponse {
  id: number;
  name: string;
  business_unit: BusinessUnit[];
}

export interface BusinessUnit {
  id: number;
  name: string;
}
