import { useAppRoute } from '@/navigation/NavigationService';
import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import {
  createAssetMarkDamaged,
  createAssetMarkLost,
  getAssetMarkDamaged,
  getAssetMarkLost,
} from '@/services/asset';
import { showErrorToast, showSuccesToast } from '@/utils/toast';
import moment from 'moment';
import { useEffect, useState } from 'react';

const useMarkLost = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.userAsm);
  const route = useAppRoute<'MarkLostScreen'>();
  const { id } = route.params;
  const [assetData, setAssetData] = useState<RootMarkLost>();
  const [lineAsset, setLineAsset] = useState<Line[]>();
  const [totalLost, setTotalLost] = useState<number>();
  const [desciption, setDesciption] = useState<string>('');

  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    if (!lineAsset) return;

    const total = lineAsset.reduce(
      (sum, item) => sum + Number(item.lost_quantity || 0),
      0,
    );

    setTotalLost(total);
  }, [lineAsset]);

  const handleGetData = async () => {
    try {
      const res = await getAssetMarkLost({
        access_token: user?.access_token ?? '',
        asset_id: id,
      });
      if (res && res.code === 200) {
        setAssetData(res.data);
        setLineAsset(res.data.lines);
        const totalDamaged = res.data.lines?.reduce(
          (sum: any, item: { damaged_quantity: number }) =>
            sum + (item.damaged_quantity || 0),
          0,
        );
        setTotalLost(totalDamaged);
      }
    } catch (error) {
      console.log('error getAssetMarkLost', error);
      showErrorToast({});
    }
  };

  const handleSaveBroken = async () => {
    if (!lineAsset) {
      showErrorToast({
        content: 'Không tìm thấy tài sản trong chi tiết phiếu đánh dấu hỏng.',
      });
      return;
    }

    const lines = lineAsset.map(item => {
      return {
        id: item.id,
        lost_quantity: item.lost_quantity,
        lost_reason: item.lost_reason,
        note: item.note,
        original_value: item.original_value,
        residual_value: item.residual_value,
        compensation_value: item.compensation_value,
      };
    });

    const payload = {
      access_token: user?.access_token ?? '',
      asset_id: id,
      mark_lost_date: moment().format('YYYY-MM-DD'),
      description: desciption,
      lines: lines,
      business_unit_id: user?.business_unit_id.id ?? 0,
    };

    console.log('payload', payload);

    try {
      dispatch(showLoading());
      const res = await createAssetMarkLost(payload);
      if (res && res.code === 200) {
        showSuccesToast({ title: 'Thao tác thành công' });
      }
    } catch (error) {
      console.log('error createAssetMarkLost', error);

      showErrorToast({});
    } finally {
      dispatch(hideLoading());
    }
  };

  const removeItem = (index: number) => {
    if (lineAsset) {
      const newList = [...lineAsset];
      newList.splice(index, 1);
      setLineAsset(newList);
    }
  };

  const updateBrokenQty = (index: number, value: string) => {
    if (!lineAsset) return;

    const newList = [...lineAsset];
    const item = newList[index];

    if (value === '') {
      newList[index] = {
        ...item,
        lost_quantity: '',
      };
      setLineAsset(newList);
      return;
    }

    const num = Number(value);

    if (num > item.quantity) {
      showErrorToast({
        content: `Không được vượt quá ${item.quantity}`,
      });
      return;
    }

    newList[index] = {
      ...item,
      lost_quantity: value,
    };

    setLineAsset(newList);

    const total = newList.reduce(
      (sum, item) => sum + Number(item.lost_quantity || 0),
      0,
    );

    setTotalLost(total);
  };

  const updateReason = (index: number, value: string) => {
    if (!lineAsset) return;

    const newList = [...lineAsset];

    newList[index] = {
      ...newList[index],
      lost_reason: value,
    };

    setLineAsset(newList);
  };

  const formatMoney = (value: string) => {
    const num = value?.toString()?.replace(/\D/g, '');
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const parseMoney = (value: string) => {
    return Number(value.replace(/,/g, '')) || 0;
  };

  const updateOriginalValue = (index: number, value: string) => {
    if (!lineAsset) return;

    const newList = [...lineAsset];
    const item = newList[index];

    const raw = value.replace(/\D/g, '');

    newList[index] = {
      ...item,
      original_value: Number(raw),
    };

    setLineAsset(newList);
  };

  const updateRemainValue = (index: number, value: string) => {
    if (!lineAsset) return;

    const newList = [...lineAsset];
    const item = newList[index];

    const raw = value.replace(/\D/g, '');
    // const remain = Number(raw);
    // const original = Number(item.original_value || 0);

    // if (remain > original) {
    //   showErrorToast({
    //     content: `Không được vượt quá giá trị ban đầu`,
    //   });
    //   return;
    // }

    newList[index] = {
      ...item,
      residual_value: Number(raw),
    };

    setLineAsset(newList);
  };

  const updateCompensation = (index: number, value: string) => {
    if (!lineAsset) return;

    const newList = [...lineAsset];
    const item = newList[index];

    const raw = value.replace(/\D/g, '');
    // const remain = Number(raw);
    // const original = Number(item.original_value || 0);

    // if (remain > original) {
    //   showErrorToast({
    //     content: `Không được vượt quá giá trị ban đầu`,
    //   });
    //   return;
    // }

    newList[index] = {
      ...item,
      compensation_value: Number(raw),
    };

    setLineAsset(newList);
  };

  const updateNote = (index: number, value: string) => {
    if (!lineAsset) return;

    const newList = [...lineAsset];

    newList[index] = {
      ...newList[index],
      note: value,
    };

    setLineAsset(newList);
  };

  return {
    assetData,
    lineAsset,
    totalLost,
    removeItem,
    updateBrokenQty,
    updateReason,
    handleSaveBroken,
    desciption,
    setDesciption,
    formatMoney,
    parseMoney,
    updateOriginalValue,
    updateRemainValue,
    updateNote,
    updateCompensation,
  };
};

export default useMarkLost;

export interface RootMarkLost {
  id: number;
  code: string;
  name: string;
  is_depreciated: boolean;
  employee: Employee;
  job: Job;
  lines: Line[];
}

export interface Employee {
  id: number;
  name: string;
}

export interface Job {
  id: number;
  name: string;
}

export interface Line {
  id: number;
  asset_code: string;
  asset_name: string;
  state: string;
  quantity: number;
  lost_quantity: number | string;
  lost_reason: string;
  note: string;
  original_value: number;
  residual_value: number;
  compensation_value: number;
  asset_user: any;
  employee: Employee2;
  department: Department;
  representative: Representative;
  zone: Zone;
  location: Location;
}

export interface Employee2 {
  id: any;
  name: any;
}

export interface Department {
  id: any;
  name: any;
}

export interface Representative {
  id: boolean;
  name: boolean;
}

export interface Zone {
  id: number;
  name: string;
  code: string;
}

export interface Location {
  id: number;
  name: string;
  code: string;
}
