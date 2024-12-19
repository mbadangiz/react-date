export interface IDateSchema {
  fullDate: string;
  weekday: string;
  day: number;
  monthNumber: number;
  monthName: string;
  year: string;
}
export interface IDateState {
  currentMonthNumber: string;
  currentYear: number;
  dateList: IDateSchema[];
}
