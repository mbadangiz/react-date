import moment from "moment-jalaali";
import { useEffect, useState, WheelEvent } from "react";
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
  const dir = calendarType === "Persian" ? "rtl" : "ltr";

  const { generateMonthArray } = new LocalDateGenerator(calendarType);

  const [monthDays, setMonthDays] = useState<IDateState>(
    generateMonthArray(baseDate),
  );

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

  return (
    <div
      dir={dir}
      className={`${calendarType === "Persian" ? "font-Reg_ir" : "font-Reg_en"}`}
    >
      <div className="absolute h-[490px] w-[425px] overflow-hidden rounded-2xl bg-white p-5 pb-7 shadow-xl">
        <JumpToDate
          month={month}
          year={year}
          defType={defType}
          calendarType={calendarType}
          handleShowJumpToDate={handleShowJumpToDate}
          showJumpToDate={showJumpToDate}
          handleJumpToDate={handleJumpToDate}
        />
        <CalendarController
          dir={dir}
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
          handleWheel={handleWheel}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          onClick={(e) => {
            const innerWidth = window.innerWidth;
            const calendarHeightDiff = innerWidth - 490;
            // console.log(e.currentTarget.offsetTop);
            console.log(innerWidth);
          }}
        />
      </div>
    </div>
  );
}
