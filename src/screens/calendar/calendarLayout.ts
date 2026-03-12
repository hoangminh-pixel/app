import moment from 'moment';
import { Detail } from '@/services/workRepair';

export interface LayoutJob extends Detail {
  layout: {
    top: number;
    height: number;
    width: number;
    left: number;
  };
}

const HOUR_HEIGHT = 80;

const getTime = (job: Detail) => {
  const start = moment(job.execution_date?.execution_date);

  let end = job.request_actual_date?.request_actual_date
    ? moment(job.request_actual_date.request_actual_date)
    : start.clone().add(60, 'minutes');

  if (end.isBefore(start)) {
    end.add(1, 'day');
  }

  return { start, end };
};

export const buildLayout = (jobs: Detail[]): LayoutJob[] => {
  const sorted = [...jobs].sort((a, b) => {
    const { start: aStart } = getTime(a);
    const { start: bStart } = getTime(b);
    return aStart.valueOf() - bStart.valueOf();
  });

  const active: LayoutJob[] = [];
  const result: LayoutJob[] = [];

  sorted.forEach(job => {
    const { start, end } = getTime(job);

    // remove finished jobs
    for (let i = active.length - 1; i >= 0; i--) {
      const { end: aEnd } = getTime(active[i]);
      if (aEnd.isSameOrBefore(start)) {
        active.splice(i, 1);
      }
    }

    const column = active.length;

    const startDay = start.clone().startOf('day');

    const top = start.diff(startDay, 'minutes') / 60 * HOUR_HEIGHT;
    const height =
      end.diff(start, 'minutes') / 60 * HOUR_HEIGHT;

    const layoutJob: LayoutJob = {
      ...job,
      layout: {
        top,
        height,
        width: 1,
        left: column,
      },
    };

    active.push(layoutJob);
    result.push(layoutJob);

    const maxColumns = active.length;

    active.forEach(j => {
      j.layout.width = maxColumns;
    });
  });

  return result;
};