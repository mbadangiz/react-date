import { ChevronLeft, ChevronRight } from "react-feather";
import { ICalendarControllerProps } from "../../core/Types/interfaces";

export function CalendarController({
  handleNextMonth,
  handlePrevMonth,
  currentYearAndMonth,
  handleShowJumpToDate,
  dir,
}: ICalendarControllerProps) {
  return (
    <div className="flex h-12 content-center items-center justify-between text-light-primary-text">
      <div
        className={`cursor-pointer ${dir === "ltr" && "rotate-180"}`}
        onClick={handlePrevMonth}
      >
        <ChevronRight size={18} />
      </div>
      <div
        className={`cursor-pointer ${dir === "rtl" ? "font-Medium_ir" : "font-Medium_en"} text-[17px]`}
        onClick={handleShowJumpToDate}
      >
        {currentYearAndMonth}
      </div>
      <div
        className={`cursor-pointer ${dir === "ltr" && "rotate-180"}`}
        onClick={handleNextMonth}
      >
        <ChevronLeft size={18} />
      </div>
    </div>
  );
}
