import { IMonthData } from "../core/Types/interfaces";

export const gregorianMonths: IMonthData[] = [
  { name: "January", numeric: 1, dayLong: 31 },
  { name: "February", numeric: 2, dayLong: 28 }, // Note: 28 days in common years, 29 days in leap years
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
];
