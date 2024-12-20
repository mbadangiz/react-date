import classNames from "classnames";
import { weekDaysList } from "../../constants/faDate";
import { IDaysListsProp } from "../../core/Types/interfaces";
import { faIRTimeLocalize } from "../../utils";

export function DaysLists({ monthDays, baseDate }: IDaysListsProp) {
  const commonSingleDayStyleConfig =
    "flex size-12 content-center items-center justify-center rounded-lg ";

  const currentDay = faIRTimeLocalize(baseDate, { dateStyle: "short" });

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
              "bg-light-gray-100 font-Bold_ir text-light-primary-text":
                month.numeric === monthDays.currentMonth.numeric,
              "text-light-gray-300":
                month.numeric !== monthDays.currentMonth.numeric,
              "!bg-bluePowder text-white": currentDay === fullDate,
            })}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}
