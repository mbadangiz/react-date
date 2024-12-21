import { ChevronRight, ChevronLeft } from "react-feather";
import { ICalendarControllerProps } from "../../core/Types/interfaces";
import { useEffect, useState } from "react";

export function CalendarController({
  handleNextMonth,
  handlePrevMonth,
  currentYearAndMonth,
  handleShowJumpToDate,
}: ICalendarControllerProps) {
  return (
    <div className="flex h-12 content-center items-center justify-between text-light-primary-text">
      <div className="cursor-pointer" onClick={handlePrevMonth}>
        <ChevronRight size={18} />
      </div>
      <div
        className="cursor-pointer font-Medium_ir text-[17px]"
        onClick={handleShowJumpToDate}
      >
        {currentYearAndMonth}
      </div>
      <div className="cursor-pointer" onClick={handleNextMonth}>
        <ChevronLeft size={18} />
      </div>
    </div>
  );
}
