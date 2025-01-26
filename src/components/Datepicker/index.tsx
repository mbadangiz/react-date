import moment from "moment-jalaali";
import { MouseEvent, useEffect, useState, WheelEvent } from "react";
import {
  DatepickerProvider,
  useDatepicker,
} from "../../core/provider/DatepickerProvider";
import { En_Positions, En_Size } from "../../core/Types/Enums";
import { IDatePickerProps, IDateState } from "../../core/Types/interfaces";
import { T_Positions } from "../../core/Types/types";
import { LocalDateGenerator } from "../../utils";
import { CalendarController } from "./CalendarController";
import { DaysLists } from "./DaysLists";
import { JumpToDate } from "./JumpToDate";

export default function DatePicker({
  onChange,
  calendarType = "Persian",
  size = En_Size.LARGE,
  inputClass,
  placeholder,
  value,
  boxPosition,
}: IDatePickerProps) {
  return (
    <DatepickerProvider
      calendarType={calendarType}
      onChange={onChange ? onChange : () => {}}
      size={size}
      boxPosition={boxPosition}
    >
      <DatePickerContainer
        inputClass={inputClass}
        placeholder={placeholder}
        value={value ? value : new Date()}
      />
    </DatepickerProvider>
  );
}

function DatePickerContainer({
  inputClass,
  placeholder,
  value,
}: {
  inputClass?: string;
  placeholder?: string;
  value: Date;
}) {
  const { calendarType, onChange, size, dir, boxPosition } = useDatepicker();

  const { generateMonthArray, localizedDate } = new LocalDateGenerator(
    calendarType,
  );

  const [monthDays, setMonthDays] = useState<IDateState>(
    generateMonthArray(value),
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [month, setMonth] = useState<number>(monthDays.currentMonth.numeric);
  const [year, setYear] = useState<number>(monthDays.currentYear);
  const [showJumpToDate, setShowJumpToDate] = useState<boolean>(false);

  const [showDatePickerBox, setShowDatePickerBox] = useState<boolean>(false);
  const [calculatedPosition, setCalculatedPosition] =
    useState<T_Positions>("Bottom");

  useEffect(() => {
    const date =
      calendarType === "Persian"
        ? moment(`${year}-${month}-1`, "jYYYY-jMM-jDD").format("YYYY-MM-DD")
        : `${year}-${month}-1 12:00:00`;

    setMonthDays(generateMonthArray(new Date(date)));
  }, [month, year]);

  function handlePrevMonth() {
    if (month === 1) {
      setMonth(12);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  }

  function handleNextMonth() {
    if (month === 12) {
      setMonth(1);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  }

  function handleShowJumpToDate() {
    setShowJumpToDate((prev) => !prev);
  }

  function handleJumpToDate(initialYear: number, initialMonth: number) {
    setMonth(initialMonth);
    setYear(initialYear);
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    if (event.deltaY > 0) handleNextMonth();
    else handlePrevMonth();
  }

  function handleSelectDateLabelState(e: Date) {
    setSelectedDate(e);
  }

  function handleToggleShowDatePickerBox() {
    setShowDatePickerBox((prev) => !prev);
  }

  function handleOpenDatePickerBox(e: MouseEvent<HTMLDivElement>) {
    if (!boxPosition) {
      const boxHeight = {
        [En_Size.SMALL]: 340,
        [En_Size.MEDIUM]: 370,
        [En_Size.LARGE]: 490,
      };
      const screenHeight = document.documentElement.clientHeight;
      const topPosition = e.currentTarget.getBoundingClientRect().top;

      const fromTopDistance = screenHeight - topPosition!;

      if (size === "small")
        if (fromTopDistance > boxHeight[size]) setCalculatedPosition("Bottom");
        else setCalculatedPosition("Top");
      else if (size === "large") setCalculatedPosition("Middle");
    }
    handleToggleShowDatePickerBox();
  }

  const boxSizes = {
    [En_Size.SMALL]: "w-[300px] h-[340px] p-1 pb-2 px-4",
    [En_Size.MEDIUM]: "h-[367.5px] w-[318.75px] p-3 pb-4",
    [En_Size.LARGE]: "h-[490px] w-[425px] p-5 pb-7",
  };

  const pos = boxPosition ? boxPosition : calculatedPosition;

  const boxPositions = {
    [En_Positions.BOTTOM]: "left-1/2 mt-3 -translate-x-1/2",
    [En_Positions.LEFT]: "-left-[120%]  top-1/2 -translate-y-1/2",
    [En_Positions.RIGHT]: "-right-[120%]  top-1/2 -translate-y-1/2",
    [En_Positions.TOP]: "left-1/2 mb-2 -translate-x-1/2 bottom-12",
    [En_Positions.MIDDLE]:
      "left-1/2 mb-2 -translate-x-1/2 top-1/2 -translate-y-1/2 ",
  };

  return (
    <div
      dir={dir}
      className={`${calendarType === "Persian" ? "font-Reg_ir" : "font-Reg_en"} relative w-full`}
    >
      <div
        onClick={handleOpenDatePickerBox}
        className={`flex h-10 w-64 cursor-pointer content-center items-center justify-center rounded-xl bg-bluePowder text-white ${inputClass} select-none`}
      >
        {selectedDate
          ? localizedDate(selectedDate, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : placeholder
            ? placeholder
            : calendarType === "Persian"
              ? "تاریخ"
              : "Date"}
      </div>

      <div
        className={`${boxSizes[size]} absolute overflow-hidden rounded-2xl bg-white shadow-xl ${showDatePickerBox ? "block" : "hidden"} ${boxPositions[pos]}`}
      >
        <>
          <JumpToDate
            month={month}
            year={year}
            handleShowJumpToDate={handleShowJumpToDate}
            showJumpToDate={showJumpToDate}
            handleJumpToDate={handleJumpToDate}
          />

          <CalendarController
            handlePrevMonth={handlePrevMonth}
            currentYearAndMonth={`${monthDays.currentMonth.long} ${monthDays.currentYear}`}
            handleNextMonth={handleNextMonth}
            handleShowJumpToDate={handleShowJumpToDate}
          />

          <DaysLists
            monthDays={monthDays}
            baseDate={value}
            onChange={onChange}
            handleWheel={handleWheel}
            handleSelectDateLabelState={handleSelectDateLabelState}
            handleToggleShowDatePickerBox={handleToggleShowDatePickerBox}
          />
        </>
      </div>
    </div>
  );
}
