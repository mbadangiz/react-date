import { ButtonHTMLAttributes, ReactNode } from "react";
import { T_CalendarType, T_localType } from "..";

export interface IDiffrentShowStyles {
  long?: string;
  numeric?: number;
  fullDate?: string;
}
export interface IMonthData {
  name: string;
  dayLong: number;
  numeric: number;
}

export interface IDaySchema {
  fullDate: string;
  weekday: string;
  day: number;
  month: IDiffrentShowStyles;
  year: string;
  gregorianDate: Date;
}

export interface IDateState {
  currentMonth: IDiffrentShowStyles;
  currentYear: number;
  dayList: IDaySchema[];
  currentDayFullDate: string;
}

export interface IDaysListsProp {
  monthDays: IDateState;
  baseDate: Date;
  onChange: (e: Date) => void;
  calendarType: T_CalendarType;
  defType: T_localType;
}

export interface ICalendarControllerProps {
  handlePrevMonth: () => void;
  currentYearAndMonth: string;
  handleNextMonth: () => void;
  handleShowJumpToDate: () => void;
}

export interface IJumpToDateProps {
  showJumpToDate: boolean;
  handleShowJumpToDate: () => void;
  handleJumpToDate: (initialYear: number, initialMonth: number) => void;
  calendarType: T_CalendarType;
  defType: T_localType;
}

export interface ITinyNumberProps {
  initialYear: number;
  handleMinues: () => void;
  handlePlus: () => void;
  handleOnChangeYearInput: (val: number) => void;
}
export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface IDatePickerProps {
  calendarType?: T_CalendarType;
  onChange?: (e: Date) => void;
}
