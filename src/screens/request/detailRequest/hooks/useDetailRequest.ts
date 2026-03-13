import { useAppNavigation, useAppRoute } from '@/navigation/NavigationService';
import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { createMroRequest } from '@/services/request';
import { getDetailRequest } from '@/services/works';
import { showErrorToast, showSuccesToast } from '@/utils/toast';
import { useEffect, useState } from 'react';
import { DetailRequestResponse } from '../../types';

const useDetailRequest = () => {
  const user = useAppSelector(state => state.auth.user);
  const role = useAppSelector(state => state.auth.user?.role ?? '');
  const route = useAppRoute<'DetailRequestScreen'>();
  const { id, onGoBack } = route.params;
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);

  const [detailRequestData, setDetailRequestData] =
    useState<DetailRequestResponse | null>();

  useEffect(() => {
    handleGetDetailRequest();
  }, []);

  const handleApproveOrRejectMroRequest = async (
    action: string,
    rejectReason?: string,
  ) => {
    try {
      dispatch(showLoading());
      const res = await createMroRequest({
        login: user?.login ?? '',
        password: user?.password ?? '',
        maintenance_type:
          detailRequestData?.maintenance_type.maintenance_type ?? '',
        asset_id: detailRequestData?.asset_id?.id,
        asset_category_level1_id:
          detailRequestData?.asset_category_level1_id?.id,
        cause_id: detailRequestData?.cause_id?.id,
        zone_id: detailRequestData?.zone_id?.id,
        mro_location_id: detailRequestData?.mro_location_id?.id,
        description: detailRequestData?.describe?.describe ?? '',
        note_employee_request:
          detailRequestData?.request_employee_id?.name ?? '',
        receive_department_id: detailRequestData?.receive_department_id?.id,
        request_department_id: detailRequestData?.request_department_id?.id,
        priority_id: detailRequestData?.priority_id?.id,
        action: action,
        state: detailRequestData?.state.state,
        title: detailRequestData?.title.title,
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
    } catch (error) {
      console.log('error handleApproveOrRejectMroRequest', error);
      showErrorToast({});
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleGetDetailRequest = async () => {
    try {
      setShowSkeleton(true);
      const res = await getDetailRequest({
        login: user?.login ?? '',
        password: user?.password ?? '',
        mro_request_id: id,
      });

      if (res && res.code === 1) {
        const data = res.data;

        setDetailRequestData(data);
      }
    } catch (error) {
      console.log('error handleGetDetailRequest', error);
      showErrorToast({});
    } finally {
      setShowSkeleton(false);
    }
  };

  const handleShowRejectModal = () => setShowRejectModal(true);

  const handleHideRejectModal = () => setShowRejectModal(false);

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
    detailRequestData,
    role,
    handleApproveOrRejectMroRequest,
    showRejectModal,
    handleShowRejectModal,
    handleHideRejectModal,
    showSkeleton,
    handleNavigateDetailMedia
  };
};

export default useDetailRequest;
