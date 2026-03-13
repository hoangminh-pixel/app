import { DropdownAppType } from '@/components/DropDown';
import useAppCamera from '@/hooks/useAppCamera';
import { useAppNavigation, useAppRoute } from '@/navigation/NavigationService';
import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
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
import { getDetailRequest } from '@/services/works';
import { showErrorToast, showSuccesToast } from '@/utils/toast';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { DetailRequestResponse } from '../../types';
import { RootScanQR } from '@/screens/scanBarcode/hooks/useScanCode';

const useCreateRepairRequest = () => {
  const user = useAppSelector(state => state.auth.user);
  const role = useAppSelector(state => state.auth.user?.role ?? '');
  const route = useAppRoute<'CreateRepairRequestScreen'>();

  const { id, onGoBack, state, author } = route.params;

  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const { openCamera, mediaResponse, loading, removeMedia, openLibrary } =
    useAppCamera();

  const [requestEmployee, setRequestEmployee] = useState('');
  const [listDeviceGroup, setListDeviceGroup] = useState<DropdownAppType[]>([]);
  const [listReceiveDepartment, setListReceiveDepartment] = useState<
    DropdownAppType[]
  >([]);
  const [listZone, setListZone] = useState<DropdownAppType[]>([]);
  const [priorityLevels, setPriorityLevels] = useState<DropdownAppType[]>([]);
  const [listAsset, setListAsset] = useState<any[]>([]);
  const [listFunc, setListFunc] = useState<any[]>([]);
  const [listLocation, setListLocation] = useState<DropdownAppType[]>([]);

  const [asset, setAsset] = useState<any>();
  const [deviceGroup, setDeviceGroup] = useState<DropdownAppType | null>();
  const [zone, setZone] = useState<DropdownAppType | null>();
  const [location, setLocation] = useState<DropdownAppType | null>();
  const [receiveDepartment, setReceiveDepartment] =
    useState<DropdownAppType | null>();
  const [func, setFunc] = useState<any>();
  const [maintenanceGroup, setMaintenanceGroup] =
    useState<DropdownAppType | null>();
  const [priority, setPriority] = useState<DropdownAppType | null>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [visibleModalDate, setVisibleModalDate] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [titleReport, setTitleReport] = useState<string>('');
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
  const [imagePrev, setImagePrev] = useState<any[]>([]);
  const [keyboardShouldPersistTaps, setKeyboardShouldPersistTaps] = useState<
    boolean | 'always' | 'never' | 'handled' | undefined
  >('always');
  const [barcodeScan, setBarcodeScan] = useState<RootScanQR>();
  const [isCreateRequest, setIsCreateRequest] = useState(false);

  useEffect(() => {
    initData();

    // getInfo();
    // getDeviceGroup();
    // getListReceiveDepartment();
    // handleGetZone();
    // handleGetPriorityOption();
    // handleGetListAsset();
    // handleGetListService();
    //     Geolocation.getCurrentPosition(res => {
    //       setEmp_location(res.coords.latitude + ', ' + res.coords.longitude);
    //     });
  }, []);

  useEffect(() => {
    if (zone?.id) {
      handleGetLocation();
    }
  }, [zone?.id]);

  useEffect(() => {
    if (asset && isCreateRequest) {
      console.log('has barcodeScan', barcodeScan);

      setLocation({
        id: asset?.mro_location_id?.id,
        value: asset?.mro_location_id?.name,
      });
      setDeviceGroup({
        id: asset?.asset_category_level1_id?.id,
        value: asset?.asset_category_level1_id?.name,
      });
      setZone({
        id: asset?.zone_id?.id,
        value: asset?.zone_id?.name,
      });
      setReceiveDepartment({
        id: asset?.request_department_id?.id,
        value: asset?.request_department_id?.name,
      });
      setMaintenanceGroup({
        id: asset?.receive_department_id?.id || null,
        value: asset?.receive_department_id?.name || null,
      });
      setPriority(null);
      setFunc(null);
    }
  }, [asset]);

  useEffect(() => {
    if (barcodeScan) {
      setIsCreateRequest(false);

      setAsset({
        id: barcodeScan?.asset_id?.id,
        value: barcodeScan?.asset_id?.name,
      });
      setLocation({
        id: barcodeScan?.mro_location_id?.id,
        value: barcodeScan?.mro_location_id?.name,
      });
      setDeviceGroup({
        id: barcodeScan?.asset_category_level1_id?.id,
        value: barcodeScan?.asset_category_level1_id?.name,
      });
      setZone({
        id: barcodeScan?.zone_id?.id,
        value: barcodeScan?.zone_id?.name,
      });
      setReceiveDepartment({
        id: barcodeScan?.request_department_id?.id,
        value: barcodeScan?.request_department_id?.name,
      });
      setMaintenanceGroup({
        id: barcodeScan?.receive_department_id?.id,
        value: barcodeScan?.receive_department_id?.name,
      });
      setPriority(null);
      setFunc(null);
      setBarcodeScan(undefined);
    }
  }, [barcodeScan]);

  useEffect(() => {
    if (func && isCreateRequest) {
      setPriority({
        id: func?.level_priority?.id,
        value: func?.level_priority?.name,
      });
    }
  }, [func]);

  const initData = async () => {
    // dispatch(showLoading());
    setShowSkeleton(true);

    try {
      await Promise.all([
        getInfo(),
        getDeviceGroup(),
        getListReceiveDepartment(),
        handleGetZone(),
        handleGetPriorityOption(),
        handleGetListAsset(),
        handleGetListService(),
      ]);
      if (id !== -1) {
        await handleGetDetailRequest();
      }
    } catch (error) {
      console.log('error init data', error);
      showErrorToast({});
    } finally {
      setShowSkeleton(false);
      // dispatch(hideLoading());
    }
  };

  const getInfo = async () => {
    try {
      // dispatch(showLoading());
      const res = await getInforDetailMroRequest({
        login: user?.login ?? '',
        password: user?.password ?? '',
      });

      setRequestEmployee(res.data.request_employee_id?.name);
    } catch (error) {
      console.log(error);
    } finally {
      // dispatch(hideLoading());
    }
  };

  const getDeviceGroup = async () => {
    try {
      // dispatch(showLoading());
      const res = await getListGroupAsset({
        login: user?.login ?? '',
        password: user?.password ?? '',
      });
      const data = res?.data?.map((item: any) => {
        return {
          id: item?.id,
          value: item?.name,
        };
      });
      setListDeviceGroup(data);
    } catch (error) {
      console.log(error);
    } finally {
      // dispatch(hideLoading());
    }
  };

  const getListReceiveDepartment = async () => {
    try {
      // dispatch(showLoading());
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
      // dispatch(hideLoading());
    }
  };

  const handleGetZone = async () => {
    try {
      // dispatch(showLoading());
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
      // dispatch(hideLoading());
    }
  };

  const handleGetPriorityOption = async () => {
    try {
      // dispatch(showLoading());
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
      // dispatch(hideLoading());
    }
  };

  const handleGetListAsset = async () => {
    try {
      // dispatch(showLoading());
      const res = await getListAsset({
        login: user?.login ?? '',
        password: user?.password ?? '',
      });
      const data = res?.data?.map((item: any) => {
        return {
          id: item?.id,
          value: item?.name,
          ...item,
        };
      });
      setListAsset(data);
    } catch (error) {
      console.log(error);
    } finally {
      // dispatch(hideLoading());
    }
  };

  const handleGetListService = async () => {
    try {
      // dispatch(showLoading());
      const res = await getListService({
        login: user?.login ?? '',
        password: user?.password ?? '',
        asset_category_level2_id: undefined,
        zone_id: undefined,
        mro_location_id: undefined,
      });
      const data = res?.data?.map((item: any) => {
        return {
          id: item?.id,
          value: item?.name,
          ...item,
        };
      });
      setListFunc(data);
    } catch (error) {
      console.log(error);
    } finally {
      // dispatch(hideLoading());
    }
  };

  const handleGetLocation = async () => {
    try {
      // dispatch(showLoading());
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
      // dispatch(hideLoading());
    }
  };

  const handleChangeService = (id: any) => {
    const service = listFunc?.find(item => item.id === id);

    setFunc(service);
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

  const handleCreateMroRequest = async () => {
    if (!description || description === '') {
      showErrorToast({ content: 'Vui lòng nhập mô tả!' });
      return;
    }
    try {
      dispatch(showLoading());
      const res = await createMroRequest({
        login: user?.login ?? '',
        password: user?.password ?? '',
        maintenance_type: 'cm',
        asset_id: asset?.id,
        asset_category_level1_id: deviceGroup?.id,
        cause_id: func?.id,
        zone_id: zone?.id,
        mro_location_id: location?.id,
        description: description,
        note_employee_request: requestEmployee,
        receive_department_id: maintenanceGroup?.id,
        request_department_id: receiveDepartment?.id,
        priority_id: priority?.id ? priority?.id : null,
        g_map_location: '',
        report_cause_id: '',
        action: 'action_approve',
        state: 'claim',
        request_actual_date: moment(selectedDate).format('YYYY-MM-DD HH:mm:ss'),
        imageFile: mediaResponse,
      });

      if (res && res.code === 1) {
        showSuccesToast({ title: 'Tạo yêu cầu thành công' });
        if (onGoBack && navigation.canGoBack()) {
          await onGoBack();
          navigation.goBack();
        }
      }
      if (res && res.code === 1001) {
        showErrorToast({ content: 'Vui lòng nhập đủ thông tin!' });
        return;
      }
    } catch (error) {
      console.log('error handleCreateMroRequest', error);
      showErrorToast({});
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleApproveOrRejectMroRequest = async (
    action: string,
    rejectReason?: string,
  ) => {
    if (action === 'action_approve') {
      if (!asset?.id) {
        showErrorToast({ content: 'Vui lòng nhập thiết bị!' });
        return;
      }

      if (!deviceGroup?.id) {
        showErrorToast({ content: 'Vui lòng chọn nhóm thiết bị!' });
        return;
      }

      if (!zone?.id) {
        showErrorToast({ content: 'Vui lòng chọn khu vực!' });
        return;
      }

      if (!receiveDepartment?.id) {
        showErrorToast({ content: 'Vui lòng chọn phòng ban!' });
        return;
      }

      if (!maintenanceGroup?.id) {
        showErrorToast({ content: 'Vui lòng chọn nhóm bảo trì!' });
        return;
      }
    }
    try {
      dispatch(showLoading());
      const res = await createMroRequest({
        login: user?.login ?? '',
        password: user?.password ?? '',
        maintenance_type: 'ne',
        asset_id: asset?.id ? asset?.id : null,
        asset_category_level1_id: deviceGroup?.id ? deviceGroup?.id : null,
        cause_id: func?.id ? func?.id : null,
        zone_id: zone?.id ? zone?.id : null,
        mro_location_id: location?.id ? location?.id : null,
        description: description,
        note_employee_request: requestEmployee,
        receive_department_id: maintenanceGroup?.id
          ? maintenanceGroup?.id
          : null,
        request_department_id: receiveDepartment?.id
          ? receiveDepartment?.id
          : null,
        priority_id: priority?.id ? priority?.id : null,
        g_map_location: '',
        report_cause_id: '',
        action: action,
        state: 'claim',
        request_actual_date: moment(selectedDate).format('YYYY-MM-DD HH:mm:ss'),
        imageFile: mediaResponse,
        title: titleReport,
        reject_reason: rejectReason,
        mro_request_id: id,
      });

      if (res && res.code === 1) {
        showSuccesToast({ title: 'Thao tác thành công' });
        if (onGoBack && navigation.canGoBack()) {
          await onGoBack();
          navigation.goBack();
        }
      }
      if (res && res.code === 1001) {
        showErrorToast({ content: 'Vui lòng nhập đủ thông tin!' });
        return;
      }
    } catch (error) {
      console.log('error handleApproveOrRejectMroRequest', error);
      showErrorToast({});
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleGetDetailRequest = async () => {
    try {
      // dispatch(showLoading());
      const res = await getDetailRequest({
        login: user?.login ?? '',
        password: user?.password ?? '',
        mro_request_id: id,
      });

      if (res && res.code === 1) {
        const data = res.data;

        setTitleReport(data?.title?.title);
        setPriority({
          id: data?.priority_id?.id,
          value: data?.priority_id?.name,
        });
        setDeviceGroup({
          id: data?.asset_category_level1_id?.id,
          value: data?.asset_category_level1_id?.name,
        });
        setZone({
          id: data?.zone_id?.id,
          value: data?.zone_id?.name,
        });
        setLocation({
          id: data?.mro_location_id?.id,
          value: data?.mro_location_id?.name,
        });

        setReceiveDepartment({
          id: data?.request_department_id?.id,
          value: data?.request_department_id?.name,
        });

        setDescription(data?.describe?.describe);
        setImagePrev(data?.list_image_request.list_image_request);

        // setIs_approve(res.data?.show_button?.show_button);
      }
    } catch (error) {
      console.log('error handleGetDetailRequest', error);
      showErrorToast({});
    } finally {
      // dispatch(hideLoading());
    }
  };

  const handleShowRejectModal = () => setShowRejectModal(true);

  const handleHideRejectModal = () => setShowRejectModal(false);

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

  const handleNavigateDetailMedia = ({
    url,
    type,
  }: {
    url: string;
    type: string;
  }) => {
    navigation.navigate('DetailMediaScreen', { url: url, mediaType: type });
  };
  return {
    requestEmployee,
    listDeviceGroup,
    listReceiveDepartment,
    listZone,
    priorityLevels,
    listAsset,
    listFunc,
    listLocation,
    asset,
    setAsset,
    deviceGroup,
    setDeviceGroup,
    zone,
    setZone,
    location,
    setLocation,
    receiveDepartment,
    setReceiveDepartment,
    func,
    setFunc,
    maintenanceGroup,
    setMaintenanceGroup,
    priority,
    setPriority,
    handleChangeService,
    selectedDate,
    setSelectedDate,
    visibleModalDate,
    setVisibleModalDate,
    handleOpenCamera,
    handleOpenPhoto,
    mediaResponse,
    removeMedia,
    handleCreateMroRequest,
    description,
    setDescription,
    titleReport,
    setTitleReport,
    state,
    role,
    handleApproveOrRejectMroRequest,
    showRejectModal,
    handleShowRejectModal,
    handleHideRejectModal,
    showSkeleton,
    author,
    imagePrev,
    onFocusInput,
    onBlurInput,
    keyboardShouldPersistTaps,
    openLibrary,
    handleNavigateScanScreen,
    setIsCreateRequest,
    handleNavigateDetailMedia,
  };
};

export default useCreateRepairRequest;
