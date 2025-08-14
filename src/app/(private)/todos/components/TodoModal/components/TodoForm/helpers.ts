import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const calcTimeLeft = (createOn: string, dueDate?: string) => {
  if (!dueDate) {
    return;
  }

  const now = dayjs();
  const createOnDayJs = dayjs(createOn);
  const dueDayJs = dayjs(dueDate);

  const totalDuration = dueDayJs.diff(createOnDayJs);
  const elapsed = now.diff(createOnDayJs);
  const remaining = totalDuration - elapsed;

  if (remaining <= 0) return;

  const dur = dayjs.duration(remaining);

  return `${dur.get('d')}d ${dur.get('h')}h ${dur.get('m')}m ${dur.get('s')}s`;
};
