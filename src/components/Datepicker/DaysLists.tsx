import classNames from "classnames";
import { DayOfWeekDef } from "../../constants/Date";
import { IDaysListsProp } from "../../core/Types/interfaces";
import { convertToEnNumbers, LocalDateGenerator } from "../../utils";
import { En_Size } from "../../core/Types/Enums";
import { useDatepicker } from "../../core/provider/DatepickerProvider";

export function DaysLists({
  monthDays,
  baseDate,
  onChange,
  handleWheel,
  handleSelectDateLabelState,
  handleToggleShowDatePickerBox,
}: IDaysListsProp) {
  const { size, calendarType, defType } = useDatepicker();

  const { localizedDate } = new LocalDateGenerator(calendarType);

  const cellSizes = {
    [En_Size.SMALL]: "h-8 text-[13px]",
    [En_Size.MEDIUM]: "h-9 text-sm",
    [En_Size.LARGE]: "h-12 text-base",
  };

  const cellClass = cellSizes[size];

  const commonSingleDayStyleConfig = `${cellClass} flex content-center items-center justify-center rounded-lg cursor-pointer transition-all col-span-1`;

  const selecedDate = convertToEnNumbers(
    localizedDate(baseDate, { dateStyle: "short" }),
  )
    .split("/")
    .join("-");

  const currentDay = convertToEnNumbers(
    localizedDate(new Date(), { dateStyle: "short" }),
  )
    .split("/")
    .join("-");

  return (
    <div className="grid w-full grid-cols-7 gap-1.5" onWheel={handleWheel}>
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
              "border-2 border-solid border-bluePowder !bg-bluePowder/20 !text-bluePowder":
                selecedDate === fullDate,
              "!bg-bluePowder !text-white": currentDay === fullDate,
            })}
            onClick={() => {
              handleSelectDateLabelState(gregorianDate);
              handleToggleShowDatePickerBox();
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
