import { DropdownAppType } from '@/components/DropDown';
import useAppCamera from '@/hooks/useAppCamera';
import { useAppNavigation, useAppRoute } from '@/navigation/NavigationService';
import { showLoading, hideLoading } from '@/redux/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import {
  assignWork,
  doneDetailJob,
  getDetailJob,
  RootDetailJob,
} from '@/services/workRepair';
import { ADMIN } from '@/utils/appConstant';
import { showErrorToast, showSuccesToast } from '@/utils/toast';
import { useEffect, useState } from 'react';

const useDetailRepair = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const route = useAppRoute<'DetailMaintenanceScreen'>();
  const { id, onGoBack } = route.params;

  const user = useAppSelector(state => state.auth.user);
  const isAdmin = user?.role === ADMIN;

  const [dataDetailJob, setDataDetailJob] = useState<RootDetailJob | null>(
    null,
  );
  const [skelenton, setSkeleton] = useState<boolean>(true);
  const [visibleAssignWorkModal, setVisibleAssignWorkModal] = useState(false);
  const [checkEmployee, setCheckEmployee] = useState<DropdownAppType | null>(
    null,
  );
  const [technicians, setTechnicians] = useState<DropdownAppType | null>(null);
  const [techniciansWorkToo, setCheckEmployeeWorkToo] = useState<
    DropdownAppType[]
  >([]);

  const [isApprove, setApprove] = useState<boolean>(true);
  const [isDone, setDone] = useState<boolean>(true);
  const [isActionTpDone, setActionTpDone] = useState<boolean>(true);

  const [reasonsNotCompleting, setReasonsNotCompleting] = useState<string>('');
  const [desc, setDesc] = useState<string>('');

  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);

  const { openCamera, mediaResponse, loading, removeMedia } = useAppCamera();

  useEffect(() => {
    handleGetDetailWork();
  }, []);

  const handleGetDetailWork = async () => {
    try {
      setSkeleton(true);
      dispatch(showLoading());

      const data = await getDetailJob({
        login: user?.login ?? '',
        password: user?.password ?? '',
        mro_order_id: id,
      });
      setDataDetailJob(data);
      const transitions = data?.data?.list_transitions?.list_transitions ?? [];

      const actions = new Set(transitions.map(item => item.action));

      setApprove(actions.has('action_approve'));
      setDone(actions.has('button_done'));
      setActionTpDone(actions.has('action_tp_acceptance_done'));
    } catch (error) {
      console.log('error handleGetDetailWork', error);
    } finally {
      dispatch(hideLoading());
      setSkeleton(false);
    }
  };

  const handleAssignWorkInModal = async (item: RootDetailJob | null) => {
    const techniciansWorkTooPayload = techniciansWorkToo.map(item => item.id);
    try {
      dispatch(showLoading());
      const data = await assignWork({
        login: user?.login ?? '',
        password: user?.password ?? '',
        mro_order_id: item?.data?.id,
        action: 'action_confirm',
        asset_id: item?.data.asset_id?.id,
        employee_execute_id: technicians?.id,
        assign_employee_ids: techniciansWorkTooPayload,
        check_employee_id: checkEmployee?.id,
      });
      if (data) {
        handleCloseModal();
        await handleGetDetailWork();
        if (onGoBack) {
          onGoBack();
        }
      }
    } catch (error) {
      handleCloseModal();
      console.log('error handleAssignWorkInModal', error);
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleCloseModal = () => {
    setVisibleAssignWorkModal(false);
    setCheckEmployee(null);
    setTechnicians(null);
    setCheckEmployeeWorkToo([]);
  };

  const handleGetJob = async () => {
    const listOrderPartsIds =
      dataDetailJob?.data?.list_order_parts_ids?.list_order_parts_ids;
    if (listOrderPartsIds) {
      const isCancelListOrder = listOrderPartsIds.filter(
        item => item?.state?.state === 'Chờ giám đốc phê duyệt',
      );
      if (isCancelListOrder.length > 0) {
        showErrorToast({
          content: 'Có phiếu vật tư chưa hoàn thành',
        });
        return;
      }
    }
    try {
      dispatch(showLoading());
      const data = await assignWork({
        login: user?.login ?? '',
        password: user?.password ?? '',
        mro_order_id: id,
        action: 'button_get_job',
      });
      if (data) {
        await handleGetDetailWork();
        if (onGoBack) {
          onGoBack();
        }
      }
    } catch (error) {
      console.log('error handleGetJob', error);
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleActionJob = async (action: string, reason?: string) => {
    try {
      dispatch(showLoading());
      const data = await assignWork({
        login: user?.login ?? '',
        password: user?.password ?? '',
        mro_order_id: id,
        action: action,
        reason: reason,
      });
      console.log('data', data);

      if (data?.code === 1002) {
        showErrorToast({ content: data?.message });
        return;
      }
      if (data.code === 1) {
        showSuccesToast({ title: data?.message ?? 'Cập nhật thành công' });
        await handleGetDetailWork();
        if (onGoBack) {
          onGoBack();
        }
      }
    } catch (error) {
      console.log('error handleGetJob', error);
      showErrorToast({});
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleDoneJob = async () => {
    try {
      dispatch(showLoading());
      const data = await doneDetailJob({
        login: user?.login ?? '',
        password: user?.password ?? '',
        mro_order_id: id,
        maintenance_type: 'cm',
        g_map_location: '',
        imageFile: mediaResponse,
        reasons_not_completing: reasonsNotCompleting ?? '',
        description: desc ?? '',
      });

      if (data?.code === 1002) {
        showErrorToast({ content: data?.message });
        return;
      }
      if (data.code === 1) {
        const dataAssign = await assignWork({
          login: user?.login ?? '',
          password: user?.password ?? '',
          mro_order_id: id,
          action: 'button_done',
        });
        if (dataAssign.code === 1) {
          showSuccesToast({ title: data?.message ?? 'Cập nhật thành công' });

          await handleGetDetailWork();
          if (onGoBack) {
            onGoBack();
          }
        }
      }
    } catch (error) {
      console.log('error handleDoneJob', error);
      showErrorToast({});
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleShowRejectModal = () => setShowRejectModal(true);

  const handleHideRejectModal = () => setShowRejectModal(false);

  const handleBack = () => navigation.goBack();

  const handleNavigateAddSupplies = () => {
    navigation.navigate('SuppliesScreen', {
      id: id,
      onGoBack: async () => {
        await handleGetDetailWork();
        if (onGoBack) {
          onGoBack();
        }
      },
    });
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

  const handleChangeReason = (v: string) => setReasonsNotCompleting(v);

  const handleChangeDesc = (v: string) => setDesc(v);

  return {
    dataDetailJob,
    skelenton,
    visibleAssignWorkModal,
    setVisibleAssignWorkModal,
    checkEmployee,
    setCheckEmployee,
    technicians,
    setTechnicians,
    techniciansWorkToo,
    setCheckEmployeeWorkToo,
    handleCloseModal,
    handleAssignWorkInModal,
    handleGetDetailWork,
    handleGetJob,
    isApprove,
    isDone,
    isActionTpDone,
    isAdmin,
    handleActionJob,
    showRejectModal,
    handleShowRejectModal,
    handleHideRejectModal,
    handleBack,
    handleNavigateAddSupplies,
    handleOpenCamera,
    handleOpenPhoto,
    mediaResponse,
    removeMedia,
    reasonsNotCompleting,
    desc,
    handleChangeReason,
    handleChangeDesc,
    handleDoneJob,
  };
};

export default useDetailRepair;
