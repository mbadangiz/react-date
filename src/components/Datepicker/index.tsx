import { useEffect, useState } from "react";
import { IDateState } from "../../core/Types/interfaces";
import { faIRTimeLocalize, generatePersianMonthDays } from "../../utils";
import { DaysLists } from "./DaysLists";
import { CalendarController } from "./CalendarController";

export function DatePicker() {
  const baseDate = new Date();

  const [month, setMonth] = useState(baseDate.getMonth() + 1);
  const [year, setYear] = useState(baseDate.getFullYear());

  const [monthDays, setMonthDays] = useState<IDateState>(
    generatePersianMonthDays(baseDate),
  );

  useEffect(() => {
    if (month !== baseDate.getMonth() + 1) {
      const date = `${year}-${month}-10 12:00:00`;
      setMonthDays(generatePersianMonthDays(new Date(date)));
    }
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

  const currentDay = faIRTimeLocalize(baseDate, { dateStyle: "short" });

  return (
    <div className="h-[550px] w-[425px] rounded-2xl bg-white p-5 pb-7">
      <CalendarController
        handlePrevMonth={handlePrevMonth}
        monthDays={monthDays}
        handleNextMonth={handleNextMonth}
      />
      <DaysLists monthDays={monthDays} currentDay={currentDay} />
    </div>
  );
}
