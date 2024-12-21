import { useEffect, useState } from "react";
import { IDateState } from "../../core/Types/interfaces";
import { generatePersianMonthDays } from "../../utils";
import { CalendarController } from "./CalendarController";
import { DaysLists } from "./DaysLists";
import { JumpToDate } from "./JumpToDate";
import moment from "moment-jalaali";

export function DatePicker() {
  const baseDate = new Date();

  const [monthDays, setMonthDays] = useState<IDateState>(
    generatePersianMonthDays(baseDate),
  );

  const [month, setMonth] = useState<number>(baseDate.getMonth() + 1);
  const [year, setYear] = useState<number>(baseDate.getFullYear());
  const [showJumpToDate, setShowJumpToDate] = useState<boolean>(false);

  useEffect(() => {
    const date = `${year}-${month}-24 12:22:22`;
    setMonthDays(generatePersianMonthDays(new Date(date)));
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

  console.log(monthDays);

  return (
    <div className="relative h-[550px] w-[425px] overflow-hidden rounded-2xl bg-white p-5 pb-7">
      <JumpToDate
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
      <DaysLists monthDays={monthDays} baseDate={baseDate} />
    </div>
  );
}
