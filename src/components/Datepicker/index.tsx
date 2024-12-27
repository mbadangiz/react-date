import moment from "moment-jalaali";
import { useEffect, useState } from "react";
import { T_localType } from "../../core/Types";
import { IDatePickerProps, IDateState } from "../../core/Types/interfaces";
import { LocalDateGenerator } from "../../utils";
import { CalendarController } from "./CalendarController";
import { DaysLists } from "./DaysLists";
import { JumpToDate } from "./JumpToDate";

export function DatePicker({
  onChange,
  calendarType = "Persian",
}: IDatePickerProps) {
  const baseDate = new Date();
  const defType: T_localType = calendarType === "Persian" ? "fa-IR" : "en-US";

  const { generateMonthArray } = new LocalDateGenerator(calendarType);

  const [monthDays, setMonthDays] = useState<IDateState>(
    generateMonthArray(baseDate),
  );

  const [month, setMonth] = useState<number>(baseDate.getMonth() + 1);
  const [year, setYear] = useState<number>(baseDate.getFullYear());
  const [showJumpToDate, setShowJumpToDate] = useState<boolean>(false);

  useEffect(() => {
    const date = `${year}-${month}-24 12:22:22`;
    setMonthDays(generateMonthArray(new Date(date)));
  }, [month]);

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
    const date = `${initialYear}/${initialMonth}/3`;

    const gregorian = moment(date, "jYYYY/jMM/jDD")
      .format("YYYY-MM-DD")
      .split("-");

    const month = parseInt(gregorian[1]);
    const year = parseInt(gregorian[0]);
    setMonth(month);
    setYear(year);
  }

  return (
    <div dir={calendarType === "Persian" ? "rtl" : "ltr"}>
      <div className="mb-3"></div>
      <div className="relative h-[550px] w-[425px] overflow-hidden rounded-2xl bg-white p-5 pb-7 shadow-xl">
        <JumpToDate
          defType={defType}
          calendarType={calendarType}
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
          defType={defType}
          calendarType={calendarType}
          monthDays={monthDays}
          baseDate={baseDate}
          onChange={onChange ? onChange : () => {}}
        />
      </div>
    </div>
  );
}
