export interface IDiffrentShowStyles {
  long?: string;
  numeric?: number;
  fullDate?: string;
}

export interface IDaySchema {
  fullDate: string;
  weekday: string;
  day: number;
  month: IDiffrentShowStyles;
  year: string;
}

export interface IDateState {
  currentMonth: IDiffrentShowStyles;
  currentYear: number;
  dayList: IDaySchema[];
  currentDayFullDate: string;
}
export interface IDaysListsProp {
  commonSingleDayStyleConfig: string;
  monthDays: IDateState;
  currentDay: string;
}
