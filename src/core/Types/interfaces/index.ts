import { ButtonHTMLAttributes, ReactNode } from "react";
import {
  T_CalendarType,
  T_DirectionType,
  T_localType,
  T_Positions,
  T_SizeType,
} from "../types";

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
  year: number;
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
  handleSelectDateLabelState: (e: Date) => void;
  handleToggleShowDatePickerBox: () => void;
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
  month: number;
  year: number;
}

export interface ITinyNumberProps {
  initialYear: number;
  handleMinues: () => void;
  handlePlus: () => void;
  handleOnChangeYearInput: (val: number) => void;
}
export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  size: T_SizeType;
}

export interface IDatePickerProps {
  calendarType?: T_CalendarType;
  size?: T_SizeType;
  onChange?: (e: Date) => void;
  inputClass?: string;
  placeholder?: string;
  value?: Date;
  boxPosition?: T_Positions;
}

export interface IDatePickerContext {
  onChange: (e: Date) => void;
  calendarType: T_CalendarType;
  size: T_SizeType;
  defType: T_localType;
  dir: T_DirectionType;
  boxPosition?: T_Positions;
}
export interface IDatePickerProviderProps {
  onChange: (e: Date) => void;
  calendarType: T_CalendarType;
  size: T_SizeType;
  children: ReactNode;
  boxPosition?: T_Positions;
}
