import moment from "moment-jalaali";
import { useEffect, useState, WheelEvent } from "react";
import {
  DatepickerProvider,
  useDatepicker,
} from "../../core/provider/DatepickerProvider";
import { En_Size } from "../../core/Types/Enums";
import { IDatePickerProps, IDateState } from "../../core/Types/interfaces";
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
}: IDatePickerProps) {
  return (
    <DatepickerProvider
      calendarType={calendarType}
      onChange={onChange ? onChange : () => {}}
      size={size}
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
  const { calendarType, onChange, size, dir } = useDatepicker();

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

  const boxSizes = {
    [En_Size.SMALL]: "w-[300px] h-[340px] p-1 pb-2 px-4",
    [En_Size.MEDIUM]: "h-[367.5px] w-[318.75px] p-3 pb-4",
    [En_Size.LARGE]: "h-[490px] w-[425px] p-5 pb-7",
  };

  const boxClass = boxSizes[size];

  return (
    <div
      dir={dir}
      className={`${calendarType === "Persian" ? "font-Reg_ir" : "font-Reg_en"} w-full`}
    >
      <div
        className={`flex h-10 w-64 content-center items-center justify-center bg-bluePowder text-white ${inputClass}`}
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
        className={`${boxClass} relative mt-6 overflow-hidden rounded-2xl bg-white shadow-xl`}
      >
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
        />
      </div>
    </div>
  );
}
