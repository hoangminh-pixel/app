import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { useEffect, useState } from 'react';
import { WorkType } from '../components/WorkTypeSelector';
import { getMaintenanceJob } from '@/services/dashboard';
import moment from 'moment';
import { showErrorToast } from '@/utils/toast';

const useReport = () => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

  const today = new Date();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  const [selectedDateStart, setSelectedDateStart] =
    useState<Date>(sevenDaysAgo);
  const [selectedDateEnd, setSelectedDateEnd] = useState<Date>(today);

  const [visibleModalDateStart, setVisibleModalDateStart] =
    useState<boolean>(false);
  const [visibleModalDateEnd, setVisibleModalDateEnd] =
    useState<boolean>(false);
  const [types, setTypes] = useState<WorkType[]>(['vh']);
  const [totalDraft, setTotalDraft] = useState(0);
  const [totalInprogress, setTotalInprogress] = useState(0);
  const [totalDone, setTotalDone] = useState(0);

  const [skeleton, setSetSkeleton] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    try {
      setSetSkeleton(true);
      const res = await getMaintenanceJob({
        login: user?.login ?? '',
        password: user?.password ?? '',
        maintenance_type: ['cm', 'pm', 'cbm'],
        type: types,
        date_from: moment(selectedDateStart).format('YYYY-MM-DD'),
        date_to: moment(selectedDateEnd).format('YYYY-MM-DD'),
        check_draft: true,
        check_in_process: true,
        check_done: true,
      });
      if (res.data && res.code === 1) {
        var draftValue = 0;
        var inprogressValue = 0;
        var doneValue = 0;
        res.data.list_days?.map((it: { state: string; total: number }) => {
          if (it.state === 'draft' && it.total > 0) {
            draftValue = it.total;
          }
          if (it.state === 'in_process' && it.total > 0) {
            inprogressValue = it.total;
          }
          if (it.state === 'done' && it.total > 0) {
            doneValue = it.total;
          }
        });
        setTotalDraft(draftValue);
        setTotalInprogress(inprogressValue);
        setTotalDone(doneValue);
      }
    } catch (error) {
      console.log('error handleGetData', error);
      showErrorToast({});
    } finally {
      setSetSkeleton(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefresh(true);
      await handleGetData();
    } catch (error) {
      console.log('error handleRefresh', error);
    } finally {
      setRefresh(false);
    }
  };

  const data = [
    { label: 'Chưa làm', value: totalDraft, color: '#ef4444' },
    { label: 'Đang làm', value: totalInprogress, color: '#f59e0b' },
    { label: 'Hoàn thành', value: totalDone, color: '#10b981' },
  ];

  return {
    selectedDateStart,
    setSelectedDateStart,
    visibleModalDateStart,
    setVisibleModalDateStart,
    selectedDateEnd,
    setSelectedDateEnd,
    visibleModalDateEnd,
    setVisibleModalDateEnd,
    types,
    setTypes,
    totalDraft,
    totalInprogress,
    totalDone,
    data,
    handleGetData,
    handleRefresh,
    refresh,
    skeleton,
  };
};
export default useReport;
