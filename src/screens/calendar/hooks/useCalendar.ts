import { useAppNavigation } from '@/navigation/NavigationService';
import { useAppSelector } from '@/redux/store/hooks';
import { Detail, getListJob, ResponseWorkRepair } from '@/services/workRepair';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { findNodeHandle, UIManager, View } from 'react-native';
import { buildLayout } from '../calendarLayout';

const useCalendar = () => {
  const user = useAppSelector(state => state.auth.user);
  const navigation = useAppNavigation();

  const buttonRef = useRef<View>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const [list, setList] = useState<Detail[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const times = Array.from({ length: 24 }, (_, i) => i);
  const [selectedButton, setSelectedButton] = useState('today');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [selectedDate]);

  const fetchJobs = () => {
    setLoading(true);
    getListJob({
      login: user?.login ?? '',
      password: user?.password ?? '',
      page: 1,
      item_per_page: 100,
      maintenance_type: ['cm', 'or', 'pm', 'por'],
      filter_date: moment(selectedDate).format('YYYY-MM-DD'),
      filtered: '',
      group: '',
      stage: [],
    })
      .then(res => {
        setList(res?.data?.list_requests?.[0]?.detail || []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getJobTime = (job: Detail) => {
    const start = moment(job.execution_date?.execution_date);

    let end = job.request_actual_date?.request_actual_date
      ? moment(job.request_actual_date.request_actual_date)
      : start.clone().add(60, 'minutes');

    // fix job qua ngày
    if (end.isBefore(start)) {
      end = end.add(1, 'day');
    }

    return { start, end };
  };

  const buildColumns = (jobs: Detail[]) => {
    const sorted = [...jobs].sort((a, b) => {
      const { start: aStart } = getJobTime(a);
      const { start: bStart } = getJobTime(b);
      return aStart.valueOf() - bStart.valueOf();
    });

    const columns: Detail[][] = [];

    sorted.forEach(job => {
      const { start, end } = getJobTime(job);

      let placed = false;

      for (let col of columns) {
        const overlap = col.some(colJob => {
          const { start: colStart, end: colEnd } = getJobTime(colJob);

          return start.isBefore(colEnd) && end.isAfter(colStart);
        });

        if (!overlap) {
          col.push(job);
          placed = true;
          break;
        }
      }

      if (!placed) {
        columns.push([job]);
      }
    });

    return columns;
  };

  const layoutJobs = buildLayout(list);

  const columns = buildColumns(list);

  const selectionType = [
    {
      label: 'Hôm nay',
      type: 'today',
      icon: 'calendar-today',
    },
    {
      label: 'Tuỳ chỉnh ngày',
      type: 'custom',
      icon: 'expand-more',
    },
  ];

  const onPressSelectionType = ({ type }: { type: string }) => {
    setSelectedButton(type);
    if (type === 'today') {
      setSelectedDate(new Date());
    }
    if (type === 'custom') {
      openCalendar();
    }
  };

  const openCalendar = () => {
    const handle = findNodeHandle(buttonRef.current);
    if (handle) {
      UIManager.measureInWindow(handle, (x, y, width, height) => {
        setPosition({
          top: y + height + 8,
          left: x,
        });
        setVisible(true);
      });
    }
  };

  const handleNavigate = (id: number) => {
    navigation.navigate('DetailRepairScreen', {
      id: id,
      onGoBack: () => {},
    });
  };
  return {
    times,
    columns,
    selectionType,
    onPressSelectionType,
    visible,
    position,
    buttonRef,
    selectedButton,
    setVisible,
    selectedDate,
    setSelectedDate,
    loading,
    handleNavigate,
    layoutJobs,
    list,
  };
};

export default useCalendar;
