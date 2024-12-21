import { ButtonHTMLAttributes, ReactNode } from "react";

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
}

export interface ICalendarControllerProps {
  handlePrevMonth: () => void;
  monthDays: IDateState;
  handleNextMonth: () => void;
  handleShowJumpToDate: () => void;
}

export interface IJumpToDateProps {
  showJumpToDate: boolean;
  handleShowJumpToDate: () => void;
  handleJumpToDate: (initialYear: number, initialMonth: number) => void;
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
