import classNames from "classnames";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { IDateState, IDaysListsProp } from "../core/Types/interfaces";
import { faIRTimeLocalize, generatePersianMonthDays } from "../utils";
import { weekDaysList } from "../constants/faDate";

export default function ReactPersianDate() {
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

  const commonSingleDayStyleConfig =
    "flex size-12 content-center items-center justify-center rounded-lg ";
  return (
    <div className="h-[550px] w-[425px] rounded-2xl bg-white p-5 pb-7">
      <div className="text-light-primary-text flex h-12 content-center items-center justify-between">
        <div className="cursor-pointer bg-rose-400" onClick={handlePrevMonth}>
          <ChevronRight size={18} />
        </div>
        <div className="cursor-pointer font-Medium_ir text-[17px]">
          {monthDays.currentMonth.long} {monthDays.currentYear}
        </div>
        <div className="cursor-pointer" onClick={handleNextMonth}>
          <ChevronLeft size={18} />
        </div>
      </div>
      <DaysLists
        commonSingleDayStyleConfig={commonSingleDayStyleConfig}
        monthDays={monthDays}
        currentDay={currentDay}
      />
    </div>
  );
}

function DaysLists({
  commonSingleDayStyleConfig,
  monthDays,
  currentDay,
}: IDaysListsProp) {
  return (
    <div className="flex flex-wrap content-center items-center justify-center gap-2">
      {weekDaysList.map((day) => {
        return (
          <div
            key={day.numeric}
            className={`text-light-gray-300 ${commonSingleDayStyleConfig}`}
          >
            {day.long?.split("")[0]}
            {day.long?.split("")[1]}
          </div>
        );
      })}
      {monthDays.dayList.map(({ day, fullDate, month }) => {
        return (
          <div
            key={fullDate}
            className={classNames({
              [commonSingleDayStyleConfig as string]: true,
              "text-light-primary-text bg-light-gray-100 font-Bold_ir":
                month.numeric === monthDays.currentMonth.numeric,
              "text-light-gray-300":
                month.numeric !== monthDays.currentMonth.numeric,
              "bg-bluePowder text-white": currentDay === fullDate,
            })}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}
