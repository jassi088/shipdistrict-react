import {
  format,
  parse,
  addDays,
  subDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  addHours,
  addMinutes,
  isSameDay,
  isSameMinute,
  parseISO,
  isDate,
  isValid as isValidDate,
  formatISO,
  isFuture,
  isPast,
  differenceInDays,
} from 'date-fns';
import { util } from './helpers';

export function dateUtil(date: any) {
  // Function to parse various date formats
  const dateParser = (param: any) => {
    if (isDate(param)) return param;
    if (typeof param === 'number') return new Date(param);
    if (util(param).isEmpty()) return new Date();
    if (isValidDate(parseISO(param))) return parseISO(param);

    const dateRE = /^\/Date\((-?\d+)(\+|-)?(\d+)?\)\/$/;
    const arr = param && dateRE.exec(param);
    if (arr) return new Date(parseInt(arr[1], 10));

    try {
      return parse(param, 'dd/MM/yyyy', new Date());
    } catch {
      return new Date();
    }
  };

  // Initialize the parsed date
  date = dateParser(date);

  return {
    format: (formatStr: string, value?: any) => {
      return format(value || date, formatStr);
    },

    inMonth: (value?: any) => {
      const monthStart = startOfMonth(value || date);
      const monthEnd = endOfMonth(monthStart);

      return eachDayOfInterval({ start: monthStart, end: monthEnd });
    },

    inWeek: (value?: any) => {
      const start = startOfWeek(value || date, { weekStartsOn: 1 });
      const end = endOfWeek(start);

      return eachDayOfInterval({ start, end });
    },

    slots: (options: any) => {
      const start = options.start || 8;
      const count = options.count || 9;
      const step = options.step || 1;
      const dateValue = options.date || date;

      return Array.from({ length: count }, (_, index) => addHours(dateValue, start + step * index));
    },

    parse: function () {
      return dateParser(date);
    },

    toDate: function () {
      return date;
    },

    toISO: function () {
      return formatISO(date);
    },

    sameAs: function (date2: any, option: any = 'date') {
      const secondDate = dateParser(date2);

      if (option === 'date') {
        return isSameDay(date, secondDate);
      } else if (option === 'time') {
        return isSameMinute(date, secondDate);
      }

      return false;
    },

    toString: function (option: any) {
      if (option === 'date') {
        return format(date, 'dd-MM-yyyy');
      } else if (option === 'time') {
        return format(date, 'HH:mm');
      } else {
        return format(date, 'HH:mm');
      }
    },

    toJSON: function () {
      return formatISO(date);
    },

    sameDate: function (date2: any) {
      const secondDate = dateParser(date2);
      return isSameDay(date, secondDate);
    },

    sameTime: function (date2: any) {
      const secondDate = dateParser(date2);
      return isSameMinute(date, secondDate);
    },

    withinTime: function (startTime: any, minutes: any) {
      const slot = dateParser(startTime);
      const fromTime = slot;
      const tillTime = addMinutes(slot, minutes);
      const time = date;

      return fromTime <= time && time < tillTime;
    },

    setTime: function (time: any, value: any) {
      const newTime = time || new Date();
      const updatedDate = value || date;

      return new Date(
        updatedDate.getFullYear(),
        updatedDate.getMonth(),
        updatedDate.getDate(),
        newTime.getHours(),
        newTime.getMinutes(),
        newTime.getSeconds(),
      );
    },

    addDaysFn: function (days: number) {
      return format(addDays(new Date(date), days), 'yyyy-MM-dd');
    },

    subtractDaysFn: function (days: number) {
      return format(subDays(new Date(date), days), 'yyyy-MM-dd');
    },

    daysDifferenceFn: function (date2: string | Date) {
      return differenceInDays(new Date(date2), new Date(date));
    },

    isFutureDateFn: function () {
      return isFuture(new Date(date));
    },

    isPastDateFn: function () {
      return isPast(new Date(date));
    },

    getDayOfWeekFn: function () {
      return format(new Date(date), 'EEEE');
    },

    getDaysInMonthFn: function (year: number, month: number) {
      return new Date(year, month, 0).getDate();
    },
  };
}
