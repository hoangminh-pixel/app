import { DropdownAppType } from '@/components/DropDown';
import {
  addSuppliesService,
  getInfoAddSupplies,
  getListSuppliesAdded,
} from './../../../services/works/index';
import { useAppRoute } from '@/navigation/NavigationService';
import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { getListSuppliesData } from '@/services/works';
import { showErrorToast, showSuccesToast } from '@/utils/toast';
import { useState, useEffect } from 'react';

export default function useSupplies() {
  const route = useAppRoute<'SuppliesScreen'>();
  const { id, onGoBack } = route.params;

  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

  const [listSupplies, setListSupplies] = useState<RootSupplies[]>([]);
  const [listSuppliesAdd, setListSuppliesAdd] = useState<RootSupplies[]>([]);
  const [listSuppliesAdded, setListSuppliesAdded] = useState<
    RootSuppliesAdded[]
  >([]);

  const [lines, setLines] = useState<{ parts_id: number; parts_qty: number }[]>(
    [],
  );
  const [managerId, setManagerId] = useState('');

  const [suppliesType, setSuppliesType] = useState(1);
  const [suppliesName, setSuppliesName] = useState('Thêm vật tư');
  const [showModalChangeSupplies, setShowModalChangeSupplies] = useState(false);

  useEffect(() => {
    getListSupplies();
    handleGetListSuppliesAdded();
    handleGetInfoAddSupplies();
  }, []);

  const getListSupplies = async () => {
    try {
      dispatch(showLoading());

      const data = await getListSuppliesData({
        login: user?.login ?? '',
        password: user?.password ?? '',
        search: '',
      });

      if (data.code === 1) {
        setListSupplies(data.data);
      }
    } catch (error) {
      console.log('error getListSupplies', error);
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleGetListSuppliesAdded = async () => {
    try {
      dispatch(showLoading());

      const data = await getListSuppliesAdded({
        login: user?.login ?? '',
        password: user?.password ?? '',
        mro_order_id: id,
      });

      if (data.code === 1) {
        setListSuppliesAdded(data.data.additional_parts.list_additional_parts);
      }
    } catch (error) {
      console.log('error handleGetListSuppliesAdded', error);
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleGetInfoAddSupplies = async () => {
    try {
      dispatch(showLoading());

      const data = await getInfoAddSupplies({
        login: user?.login ?? '',
        password: user?.password ?? '',
        mro_order_id: id,
      });

      if (data.code === 1) {
        setManagerId(data.data.manager_id.id);
      }
    } catch (error) {
      console.log('error handleGetListSuppliesAdded', error);
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleAddSupplies = async () => {
    if (lines.length === 0) {
      showErrorToast({ content: 'Vui lòng chọn vật tư!' });
      return;
    }
    const hasZero = lines.some(
      item => item.parts_qty === 0 || item.parts_qty === undefined,
    );

    if (hasZero) {
      showErrorToast({ content: 'Vui lòng chọn lơn hơn 0!' });
      return;
    }
    try {
      dispatch(showLoading());

      const data = await addSuppliesService({
        login: user?.login ?? '',
        password: user?.password ?? '',
        mro_order_id: id,
        manager_id: managerId,
        line_ids: lines,
      });

      if (data.code === 1) {
        showSuccesToast({ title: 'Thêm vật tư thành công' });
        if (onGoBack) {
          onGoBack();
        }
      }
    } catch (error) {
      console.log('error handleGetListSuppliesAdded', error);
      showErrorToast({});
    } finally {
      dispatch(hideLoading());
    }
  };

  const addSupplies = () => {
    const item: RootSupplies = {
      id: Date.now(),
      default_code: '',
      name: '',
      product_uom: '',
      quant_qty: 0,
      count: 1,
    };

    setListSuppliesAdd(prev => [...prev, item]);
  };

  const changeMaterial = (materialId: number, index: number) => {
    const material = listSupplies.find(i => i.id === materialId);
    if (!material) return;

    const newList = [...listSuppliesAdd];

    newList[index] = {
      ...material,
      count: newList[index].count || 1,
    };

    setListSuppliesAdd(newList);

    const newListLine = [...lines];
    newListLine[index] = {
      parts_id: materialId,
      parts_qty: newList[index].count || 1,
    };
    setLines(newListLine);
  };

  const increaseQty = (index: number) => {
    const newList = [...listSuppliesAdd];
    newList[index].count += 1;

    setListSuppliesAdd(newList);

    const newListLine = [...lines];
    newListLine[index] = {
      ...newListLine[index],
      parts_qty: newList[index].count,
    };

    setLines(newListLine);
  };

  const decreaseQty = (index: number) => {
    const newList = [...listSuppliesAdd];
    const newListLine = [...lines];

    if (newList[index].count === 1) {
      newList.splice(index, 1);

      newListLine.splice(index, 1);
    } else {
      newList[index].count -= 1;

      newListLine[index] = {
        ...newListLine[index],
        parts_qty: newList[index].count,
      };
    }

    setListSuppliesAdd(newList);
    setLines(newListLine);
  };

  const listSuppliesModal = listSupplies.map(item => ({
    id: item.id,
    value: item.name,
  }));

  const onChangeSupplies = (item?: DropdownAppType | null) => {
    setSuppliesName(item?.value ?? '');
    setSuppliesType(item?.id);
    onShowModalChangeSupplies(false);
  };

  const onShowModalChangeSupplies = (bol: boolean) => {
    setShowModalChangeSupplies(bol);
  };

  return {
    listSuppliesAdd,
    listSuppliesModal,
    addSupplies,
    changeMaterial,
    increaseQty,
    decreaseQty,
    listSuppliesAdded,
    managerId,
    handleAddSupplies,
    suppliesType,
    suppliesName,
    showModalChangeSupplies,
    onChangeSupplies,
    onShowModalChangeSupplies,
  };
}

export interface RootSupplies {
  id: number;
  default_code: string;
  name: string;
  product_uom: string;
  quant_qty: number;
  count: number;
}

export interface RootSuppliesAdded {
  parts_id: PartsId;
  date_request: DateRequest;
  image: Image;
  quant_qty: QuantQty;
  parts_qty: PartsQty;
  parts_qty_actual: PartsQtyActual;
  parts_uom: PartsUom;
}

export interface PartsId {
  id: number;
  name: string;
  default_code: string;
}

export interface DateRequest {
  field_name: string;
  value: string;
  required: boolean;
  readonly: boolean;
}

export interface Image {
  image: any;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface QuantQty {
  quant_qty: number;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface PartsQty {
  quant_qty: number;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface PartsQtyActual {
  quant_qty: number;
  field_name: string;
  required: boolean;
  readonly: boolean;
}

export interface PartsUom {
  id: number;
  parts_uom: string;
  field_name: string;
  required: boolean;
  readonly: boolean;
}
