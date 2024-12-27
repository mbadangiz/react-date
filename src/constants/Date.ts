import { T_CalendarType, T_localType } from "../core/Types";

export const locationBasedCalendar: Record<T_CalendarType, T_localType> = {
  Persian: "fa-IR",
  Gregorian: "en-US",
};

export const MonthDef = {
  "fa-IR": [
    { name: "فروردین", numeric: 1, dayLong: 31 },
    { name: "اردیبهشت", numeric: 2, dayLong: 31 },
    { name: "خرداد", numeric: 3, dayLong: 31 },
    { name: "تیر", numeric: 4, dayLong: 31 },
    { name: "مرداد", numeric: 5, dayLong: 31 },
    { name: "شهریور", numeric: 6, dayLong: 31 },
    { name: "مهر", numeric: 7, dayLong: 30 },
    { name: "آبان", numeric: 8, dayLong: 30 },
    { name: "آذر", numeric: 9, dayLong: 30 },
    { name: "دی", numeric: 10, dayLong: 30 },
    { name: "بهمن", numeric: 11, dayLong: 30 },
    { name: "اسفند", numeric: 12, dayLong: 30 },
  ],
  "en-US": [
    { name: "January", numeric: 1, dayLong: 31 },
    { name: "February", numeric: 2, dayLong: 29 },
    { name: "March", numeric: 3, dayLong: 31 },
    { name: "April", numeric: 4, dayLong: 30 },
    { name: "May", numeric: 5, dayLong: 31 },
    { name: "June", numeric: 6, dayLong: 30 },
    { name: "July", numeric: 7, dayLong: 31 },
    { name: "August", numeric: 8, dayLong: 31 },
    { name: "September", numeric: 9, dayLong: 30 },
    { name: "October", numeric: 10, dayLong: 31 },
    { name: "November", numeric: 11, dayLong: 30 },
    { name: "December", numeric: 12, dayLong: 31 },
  ],
};

export const DayOfWeekDef = {
  "fa-IR": [
    { name: "شنبه", numeric: 1 },
    { name: "یک‌شنبه", numeric: 2 },
    { name: "دوشنبه", numeric: 3 },
    { name: "سه‌شنبه", numeric: 4 },
    { name: "چهارشنبه", numeric: 5 },
    { name: "پنج‌شنبه", numeric: 6 },
    { name: "جمعه", numeric: 7 },
  ],
  "en-US": [
    { name: "Sunday", numeric: 1 },
    { name: "Monday", numeric: 2 },
    { name: "Tuesday", numeric: 3 },
    { name: "Wednesday", numeric: 4 },
    { name: "Thursday", numeric: 5 },
    { name: "Friday", numeric: 6 },
    { name: "Saturday", numeric: 7 },
  ],
};
