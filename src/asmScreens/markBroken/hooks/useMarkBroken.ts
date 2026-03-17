import { useAppRoute } from '@/navigation/NavigationService';
import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { createAssetMarkDamaged, getAssetMarkDamaged } from '@/services/asset';
import { showErrorToast, showSuccesToast } from '@/utils/toast';
import moment from 'moment';
import { useEffect, useState } from 'react';

const useMarkBroken = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.userAsm);
  const route = useAppRoute<'MarkBrokenScreen'>();
  const { id } = route.params;
  const [assetData, setAssetData] = useState<AssetMarkDamaged>();
  const [lineAsset, setLineAsset] = useState<Line[]>();
  const [totalDamaged, setTotalDamaged] = useState<number>();
  const [desciption, setDesciption] = useState<string>('');

  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    if (!lineAsset) return;

    const total = lineAsset.reduce(
      (sum, item) => sum + Number(item.damaged_quantity || 0),
      0,
    );

    setTotalDamaged(total);
  }, [lineAsset]);

  const handleGetData = async () => {
    try {
      const res = await getAssetMarkDamaged({
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
        setTotalDamaged(totalDamaged);
      }
    } catch (error) {
      console.log('error getAssetMarkDamaged', error);
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
        damaged_quantity: item.damaged_quantity,
        damaged_reason: item.damaged_reason,
      };
    });

    const payload = {
      access_token: user?.access_token ?? '',
      asset_id: id,
      mark_damaged_date: moment().format('YYYY-MM-DD'),
      description: desciption,
      lines: lines,
      business_unit_id: user?.business_unit_id.id ?? 0,
    };

    console.log('payload', payload);

    try {
      dispatch(showLoading());
      const res = await createAssetMarkDamaged(payload);
      if (res && res.code === 200) {
        showSuccesToast({ title: 'Thao tác thành công' });
      }
    } catch (error) {
      console.log('error createAssetMarkDamaged', error);

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
        damaged_quantity: '',
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
      damaged_quantity: value,
    };

    setLineAsset(newList);
  };

  const updateReason = (index: number, value: string) => {
    if (!lineAsset) return;

    const newList = [...lineAsset];

    newList[index] = {
      ...newList[index],
      damaged_reason: value,
    };

    setLineAsset(newList);
  };

  return {
    assetData,
    lineAsset,
    totalDamaged,
    removeItem,
    updateBrokenQty,
    updateReason,
    handleSaveBroken,
    desciption,
    setDesciption,
  };
};

export default useMarkBroken;

export interface AssetMarkDamaged {
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
  damaged_quantity: number | string;
  damaged_reason: string;
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
