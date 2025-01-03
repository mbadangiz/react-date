import classNames from "classnames";
import { DayOfWeekDef } from "../../constants/Date";
import { IDaysListsProp } from "../../core/Types/interfaces";
import { LocalDateGenerator } from "../../utils";

export function DaysLists({
  monthDays,
  baseDate,
  onChange,
  calendarType,
  defType,
  handleWheel,
}: IDaysListsProp) {
  const { localizedDate } = new LocalDateGenerator(calendarType);
  const commonSingleDayStyleConfig =
    "flex size-12 content-center items-center justify-center rounded-lg cursor-pointer transition-all";

  const currentDay = localizedDate(baseDate, { dateStyle: "short" });

  return (
    <div
      className="flex flex-wrap content-center items-center justify-center gap-2"
      onWheel={handleWheel}
    >
      {DayOfWeekDef[defType].map((day) => {
        return (
          <div
            key={day.numeric}
            className={`text-light-gray-300 ${commonSingleDayStyleConfig}`}
          >
            {day.name.split("")[0]}
            {day.name.split("")[1]}
          </div>
        );
      })}
      {monthDays.dayList.map(({ day, fullDate, month, gregorianDate }) => {
        return (
          <div
            key={fullDate}
            className={classNames({
              [commonSingleDayStyleConfig as string]: true,
              "font-Bold_ir":
                defType === "fa-IR" &&
                month.numeric === monthDays.currentMonth.numeric,
              "font-Bold_en":
                defType === "en-US" &&
                month.numeric === monthDays.currentMonth.numeric,
              "bg-light-gray-100 text-light-primary-text hover:bg-light-gray-200":
                month.numeric === monthDays.currentMonth.numeric,
              "text-light-gray-300":
                month.numeric !== monthDays.currentMonth.numeric,
              "!bg-bluePowder text-white": currentDay === fullDate,
            })}
            onClick={() => {
              return onChange(gregorianDate);
            }}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}
