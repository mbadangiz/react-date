import { ChevronLeft, ChevronRight } from "react-feather";
import { ICalendarControllerProps } from "../../core/Types/interfaces";
import { useDatepicker } from "../../core/provider/DatepickerProvider";
import { En_Size } from "../../core/Types/Enums";

export function CalendarController({
  handleNextMonth,
  handlePrevMonth,
  currentYearAndMonth,
  handleShowJumpToDate,
}: ICalendarControllerProps) {
  const { dir, size } = useDatepicker();

  const textSizeStyle = {
    [En_Size.SMALL]: "text-[14.5px]",
    [En_Size.MEDIUM]: "text-[15px]",
    [En_Size.LARGE]: "text-[17px]",
  };

  return (
    <div className="flex h-12 content-center items-center justify-between text-light-primary-text">
      <div
        className={`cursor-pointer ${dir === "ltr" && "rotate-180"} z-0`}
        onClick={handlePrevMonth}
      >
        <ChevronRight size={18} />
      </div>
      <div
        className={`cursor-pointer ${dir === "rtl" ? "font-Medium_ir" : "font-Medium_en"} ${textSizeStyle[size]}`}
        onClick={handleShowJumpToDate}
      >
        {currentYearAndMonth}
      </div>
      <div
        className={`cursor-pointer ${dir === "ltr" && "rotate-180"} z-0`}
        onClick={handleNextMonth}
      >
        <ChevronLeft size={18} />
      </div>
    </div>
  );
}
