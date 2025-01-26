import { createContext, useContext } from "react";
import { En_Size } from "../Types/Enums";

import { T_DirectionType, T_localType } from "../Types/types";
import {
  IDatePickerContext,
  IDatePickerProviderProps,
} from "../Types/interfaces";

const DatepickerContext = createContext<IDatePickerContext | undefined>(
  undefined,
);

export function DatepickerProvider({
  children,
  calendarType = "Persian",
  onChange,
  size = En_Size.LARGE,
  boxPosition,
}: IDatePickerProviderProps) {
  const defType: T_localType = calendarType === "Persian" ? "fa-IR" : "en-US";
  const dir: T_DirectionType = calendarType === "Persian" ? "rtl" : "ltr";
  return (
    <DatepickerContext.Provider
      value={{ calendarType, onChange, size, defType, dir, boxPosition }}
    >
      {children}
    </DatepickerContext.Provider>
  );
}

export function useDatepicker(): IDatePickerContext {
  const context = useContext(DatepickerContext);
  if (!context) {
    throw new Error("useDatepicker must be used within a DatepickerProvider");
  }
  return context;
}
