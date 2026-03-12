import { DropdownAppType } from '@/components/DropDown';
import useAppCamera from '@/hooks/useAppCamera';
import { useAppNavigation, useAppRoute } from '@/navigation/NavigationService';
import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { RootScanQR } from '@/screens/scanBarcode/hooks/useScanCode';
import {
  createMroRequest,
  getDepartment,
  getInforDetailMroRequest,
  getListAsset,
  getListGroupAsset,
  getListService,
  getLocation,
  getPriorityOption,
  getZone,
} from '@/services/request';
import { showErrorToast, showSuccesToast } from '@/utils/toast';
import moment from 'moment';
import { useEffect, useState } from 'react';

const useCreateReportProblem = () => {
  const user = useAppSelector(state => state.auth.user);
  const route = useAppRoute<'CreateReportProbemScreen'>();

  const { id, onGoBack } = route.params;

  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const { openCamera, mediaResponse, loading, removeMedia, openLibrary } =
    useAppCamera();

  const [requestEmployee, setRequestEmployee] = useState('');

  const [listZone, setListZone] = useState<DropdownAppType[]>([]);
  const [listLocation, setListLocation] = useState<DropdownAppType[]>([]);
  const [listReceiveDepartment, setListReceiveDepartment] = useState<
    DropdownAppType[]
  >([]);
  const [priorityLevels, setPriorityLevels] = useState<DropdownAppType[]>([]);

  const [zone, setZone] = useState<DropdownAppType | null>();
  const [location, setLocation] = useState<DropdownAppType | null>();
  const [maintenanceGroup, setMaintenanceGroup] =
    useState<DropdownAppType | null>();
  const [priority, setPriority] = useState<DropdownAppType | null>();

  const [description, setDescription] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const [barcodeScan, setBarcodeScan] = useState<RootScanQR>();

  const [keyboardShouldPersistTaps, setKeyboardShouldPersistTaps] = useState<
    boolean | 'always' | 'never' | 'handled' | undefined
  >('always');

  useEffect(() => {
    getInfo();
    getListReceiveDepartment();
    handleGetPriorityOption();
    handleGetZone();
  }, []);

  useEffect(() => {
    if (zone?.id) {
      handleGetLocation();
    }
  }, [zone?.id]);

  useEffect(() => {
    if (barcodeScan) {
      setLocation({
        id: barcodeScan?.mro_location_id?.id,
        value: barcodeScan?.mro_location_id?.name,
      });

      setZone({
        id: barcodeScan?.zone_id?.id,
        value: barcodeScan?.zone_id?.name,
      });

      setMaintenanceGroup({
        id: barcodeScan?.receive_department_id?.id,
        value: barcodeScan?.receive_department_id?.name,
      });
    }
  }, [barcodeScan]);

  const getInfo = async () => {
    try {
      dispatch(showLoading());
      const res = await getInforDetailMroRequest({
        login: user?.login ?? '',
        password: user?.password ?? '',
      });

      setRequestEmployee(res.data.request_employee_id?.name);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  };

  const getListReceiveDepartment = async () => {
    try {
      dispatch(showLoading());
      const res = await getDepartment({
        login: user?.login ?? '',
        password: user?.password ?? '',
      });
      const data = res?.data?.map((item: any) => {
        return {
          id: item?.id,
          value: item?.name,
        };
      });
      setListReceiveDepartment(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleGetZone = async () => {
    try {
      dispatch(showLoading());
      const res = await getZone({
        login: user?.login ?? '',
        password: user?.password ?? '',
      });
      const data = res?.data?.map((item: any) => {
        return {
          id: item?.id,
          value: item?.name,
        };
      });
      setListZone(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleGetLocation = async () => {
    try {
      dispatch(showLoading());
      const res = await getLocation({
        login: user?.login ?? '',
        password: user?.password ?? '',
        zone_id: zone?.id,
      });
      const data = res?.data?.map((item: any) => {
        return {
          id: item?.id,
          value: item?.name,
        };
      });
      setListLocation(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleGetPriorityOption = async () => {
    try {
      dispatch(showLoading());
      const res = await getPriorityOption({
        login: user?.login ?? '',
        password: user?.password ?? '',
      });
      const data = res?.data?.map((item: any) => {
        return {
          id: item?.id,
          value: item?.name,
        };
      });
      setPriorityLevels(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleOpenCamera = async () => {
    try {
      await openCamera('video');
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleOpenPhoto = async () => {
    try {
      await openCamera('photo');
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleOpenLibrary = async () => {
    try {
      await openCamera('photo');
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleCreateMroRequest = async () => {
    if (!title || title === '') {
      showErrorToast({ content: 'Vui lòng nhập tiêu đề!' });
      return;
    }

    if (!description || description === '') {
      showErrorToast({ content: 'Vui lòng nhập mô tả!' });
      return;
    }
    try {
      dispatch(showLoading());
      const res = await createMroRequest({
        login: user?.login ?? '',
        password: user?.password ?? '',
        maintenance_type: 'ne',
        asset_id: '',
        asset_category_level1_id: '',
        cause_id: '',
        zone_id: zone?.id,
        mro_location_id: location?.id,
        description: description,
        note_employee_request: requestEmployee,
        receive_department_id: maintenanceGroup?.id,
        request_department_id: '',
        priority_id: priority?.id,
        g_map_location: '',
        report_cause_id: '',
        imageFile: mediaResponse,
        title: title,
      });

      if (res && res.code === 1) {
        showSuccesToast({ title: 'Tạo yêu cầu thành công' });
        if (onGoBack && navigation.canGoBack()) {
          await onGoBack();
          navigation.goBack();
        }
      }

      if (res && res.code !== 1) {
        showErrorToast({ content: res.message });
      }
    } catch (error) {
      console.log('error handleCreateMroRequest', error);
      showErrorToast({});
    } finally {
      dispatch(hideLoading());
    }
  };

  const onFocusInput = () => {
    setKeyboardShouldPersistTaps('handled');
  };
  const onBlurInput = () => {
    setKeyboardShouldPersistTaps('always');
  };

  const handleNavigateScanScreen = () => {
    navigation.navigate('QRScannerScreen', {
      onScanSuccess: data => {
        console.log('data', data);
        setBarcodeScan(data);
      },
    });
  };

  return {
    requestEmployee,
    listReceiveDepartment,
    listZone,
    listLocation,
    zone,
    setZone,
    location,
    setLocation,
    maintenanceGroup,
    setMaintenanceGroup,
    handleOpenCamera,
    handleOpenPhoto,
    mediaResponse,
    removeMedia,
    handleCreateMroRequest,
    description,
    setDescription,
    title,
    setTitle,
    setPriority,
    priorityLevels,
    setPriorityLevels,
    priority,
    onFocusInput,
    onBlurInput,
    keyboardShouldPersistTaps,
    openLibrary,
    handleNavigateScanScreen,
  };
};

export default useCreateReportProblem;
