import { ButtonHTMLAttributes, ReactNode, WheelEvent } from "react";
import { T_CalendarType, T_DirectionType, T_localType, T_SizeType } from "..";

export interface IDiffrentShowStyles {
  long: string;
  numeric: number;
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
  handleWheel: (event: WheelEvent<HTMLDivElement>) => void;
  cellSize: string;
}

export interface ICalendarControllerProps {
  handlePrevMonth: () => void;
  currentYearAndMonth: string;
  handleNextMonth: () => void;
  handleShowJumpToDate: () => void;
  dir: string;
}

export interface IJumpToDateProps {
  showJumpToDate: boolean;
  handleShowJumpToDate: () => void;
  handleJumpToDate: (initialYear: number, initialMonth: number) => void;
  month: number;
  year: number;
}

export interface ITinyNumberProps {
  initialYear: number;
  handleMinues: () => void;
  handlePlus: () => void;
  handleOnChangeYearInput: (val: number) => void;
  defType: T_localType;
}
export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface IDatePickerProps {
  calendarType?: T_CalendarType;
  size?: T_SizeType;
  onChange?: (e: Date) => void;
}

export interface IDatePickerContext {
  onChange: (e: Date) => void;
  calendarType: T_CalendarType;
  size: T_SizeType;
  defType: T_localType;
  dir: T_DirectionType;
}
export interface IDatePickerProviderProps {
  onChange: (e: Date) => void;
  calendarType: T_CalendarType;
  size: T_SizeType;
  children: ReactNode;
}
