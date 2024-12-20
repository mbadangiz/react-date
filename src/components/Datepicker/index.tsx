import { useEffect, useState } from "react";
import { IDateState } from "../../core/Types/interfaces";
import { generatePersianMonthDays } from "../../utils";
import { CalendarController } from "./CalendarController";
import { DaysLists } from "./DaysLists";

export function DatePicker() {
  const baseDate = new Date();

  const [monthDays, setMonthDays] = useState<IDateState>(
    generatePersianMonthDays(baseDate),
  );

  const [month, setMonth] = useState(baseDate.getMonth() + 1);
  const [year, setYear] = useState(baseDate.getFullYear());

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

  return (
    <div className="h-[550px] w-[425px] rounded-2xl bg-white p-5 pb-7">
      <CalendarController
        handlePrevMonth={handlePrevMonth}
        monthDays={monthDays}
        handleNextMonth={handleNextMonth}
      />
      <DaysLists monthDays={monthDays} baseDate={baseDate} />
    </div>
  );
}
