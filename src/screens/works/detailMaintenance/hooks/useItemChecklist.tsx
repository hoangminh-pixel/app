import { hideLoading, showLoading } from '@/redux/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { actionUpdateChecklist } from '@/services/works';
import { useEffect, useState } from 'react';
import { ChecklistItem } from '../components/Checklist';
import { showErrorToast, showSuccesToast } from '@/utils/toast';
import useAppCamera, { MediaTypeRes } from '@/hooks/useAppCamera';
import { useAppNavigation } from '@/navigation/NavigationService';

type Props = {
  item: ChecklistItem;
  checklistType: string;
};

export const useItemChecklist = ({ item, checklistType }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const navigation = useAppNavigation();

  const [pass, setPass] = useState(false);
  const [fail, setFail] = useState(false);
  const [mroCheck, setMroCheck] = useState('');
  const [itemSuccess, setItemSuccess] = useState<boolean | null>(null);
  const [checklistDesc, setChecklistDesc] = useState(item.note.note);
  const [measure, setMeasure] = useState(item.measure.measure);

  const { openCamera, mediaResponse, loading, removeMedia, openLibrary } =
    useAppCamera();

  const serverMedia: MediaTypeRes[] =
    item?.list_image_url?.list_image_url?.map(img => {
      const isImage = /\.(jpe?g|png|gif|webp)$/i.test(img.image_url);

      return {
        name: img.name_image,
        url: img.image_url,
        type: isImage ? 'photo' : 'video',
      };
    }) ?? [];

  const displayMedia = mediaResponse.length > 0 ? mediaResponse : serverMedia;

  useEffect(() => {
    if (item.mro_check.mro_check.key === 'normal') {
      setItemSuccess(null);
    }
    if (item.mro_check.mro_check.key === 'done') {
      setItemSuccess(true);
      setPass(true);
      setFail(false);
    }
    if (item.mro_check.mro_check.key === 'blocked') {
      setItemSuccess(false);
      setPass(false);
      setFail(true);
    }
  }, []);

  useEffect(() => {
    if (!pass && !fail) {
      setMroCheck('normal');
    }
    if (pass) {
      setMroCheck('done');
    }
    if (fail) {
      setMroCheck('blocked');
    }
  }, [fail, pass]);

  useEffect(() => {
    if (!measure) return;

    if (
      Number(measure) >= item.tolerance_min.tolerance_min &&
      Number(measure) <= item.tolerance_max.tolerance_max
    ) {
      setMroCheck('done');
    } else {
      setMroCheck('blocked');
    }
    if (Number(measure) === 0) {
      setMroCheck('normal');
    }
  }, [measure]);

  const handleChangePassFail = ({
    val,
    isPass,
  }: {
    val: boolean;
    isPass: boolean;
  }) => {
    if (isPass) {
      setPass(val);
      setFail(!val);
    } else {
      setPass(!val);
      setFail(val);
    }
  };

  const onChecklistDescChange = (v: string) => setChecklistDesc(v);

  const onMeasureChange = (v: string) => setMeasure(v);

  const handleUpdateChecklist = async () => {
    if (checklistType === 'picture' && mediaResponse.length <= 0) {
      showErrorToast({ content: 'Vui lòng thêm hình ảnh!' });
      return;
    }

    if (checklistType === 'measure' && !measure) {
      showErrorToast({ content: 'Vui lòng nhập đo lường!' });
      return;
    }

    if (checklistType === 'text' && !checklistDesc) {
      showErrorToast({ content: 'Vui lòng nhập mô tả!' });
      return;
    }

    try {
      dispatch(showLoading());
      const data = await actionUpdateChecklist({
        login: user?.login ?? '',
        password: user?.password ?? '',
        mro_check:
          checklistType === 'text' || checklistType === 'picture'
            ? 'done'
            : mroCheck,

        task_id: item.id,
        description: checklistDesc,
        g_map_location: '',
        measure: measure,
        imageFile: mediaResponse,
      });
      console.log('DATA handleUpdateChecklist', data);
      if (data.code === 1) {
        showSuccesToast({ title: data.data.message });
        if (checklistType === 'passfail') {
          setItemSuccess(pass ? true : false);
          return;
        }

        if (checklistType === 'measure') {
          if (
            Number(measure) >= item.tolerance_min.tolerance_min &&
            Number(measure) <= item.tolerance_max.tolerance_max
          ) {
            setItemSuccess(true);
          } else {
            setItemSuccess(false);
          }
          return;
        }

        setItemSuccess(true);
      }
    } catch (error) {
      console.log('error handleUpdateChecklist', error);
      setItemSuccess(fail);
      showErrorToast({});
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
    pass,
    fail,
    handleChangePassFail,
    mroCheck,
    handleUpdateChecklist,
    itemSuccess,
    checklistDesc,
    onChecklistDescChange,
    measure,
    onMeasureChange,
    handleOpenCamera,
    mediaResponse,
    removeMedia,
    handleOpenPhoto,
    displayMedia,
    openLibrary,
    handleNavigateDetailMedia,
  };
};
