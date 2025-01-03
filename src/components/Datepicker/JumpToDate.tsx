import { useEffect, useRef, useState } from "react";
import { X } from "react-feather";
import { MonthDef } from "../../constants/Date";
import Button from "../../core/components/Button";
import TinyNumber from "../../core/components/TinyNumber";
import { IJumpToDateProps } from "../../core/Types/interfaces";

export function JumpToDate({
  handleShowJumpToDate,
  showJumpToDate,
  handleJumpToDate,
  defType,
  month,
  year,
}: IJumpToDateProps) {
  const [initialYear, setInitialYear] = useState<number>(year);
  const [initialMonth, setInitialMonth] = useState<number>(month);

  const [err, setErr] = useState<boolean>(!initialMonth ? true : false);

  const handleMinues = () => setInitialYear((prev) => prev - 1);

  const handlePlus = () => setInitialYear((prev) => prev + 1);

  const handleOnChangeYearInput = (val: number) => setInitialYear(val);

  const handleSelectMonth = (month: number) => setInitialMonth(month);

  const handleApproveDate = () => {
    if (initialMonth) {
      handleJumpToDate(initialYear, initialMonth);
      handleShowJumpToDate();
    } else {
      setErr(true);
    }
  };

  const handleJumpToDateForEscapeEnter = (event: KeyboardEvent) => {
    if (event.key === "Escape") handleShowJumpToDate();

    if (event.key === "Enter") {
      event.preventDefault();
      handleApproveDate();
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showJumpToDate) {
      modalRef.current?.focus();
      document.addEventListener("keydown", handleJumpToDateForEscapeEnter);
    } else {
      document.removeEventListener("keydown", handleJumpToDateForEscapeEnter);
    }

    return () => {
      document.removeEventListener("keydown", handleJumpToDateForEscapeEnter);
    };
  }, [showJumpToDate, handleJumpToDateForEscapeEnter]);

  return (
    <div
      className={`absolute left-0 ${showJumpToDate ? "top-0" : "-top-full"} z-50 flex size-full content-center items-center justify-center overflow-hidden rounded-2xl bg-slate-800/15 backdrop-blur transition-all duration-700`}
      ref={modalRef}
    >
      <div
        className={`relative min-h-[350px] w-10/12 rounded-lg bg-white transition-all ${showJumpToDate ? "-top-0" : "top-[200%]"} transition-all delay-700 duration-700`}
      >
        <div
          className="absolute -left-2 -top-2 flex size-7 cursor-pointer content-center items-center justify-center rounded bg-white shadow-md"
          onClick={handleShowJumpToDate}
        >
          <X size={17} />
        </div>
        <div className="size-full space-y-4 px-4 pb-5 pt-6">
          <h3
            className={`text-center ${defType === "fa-IR" ? "font-Medium_ir" : "font-Medium_en"} text-lg`}
          >
            {defType === "fa-IR"
              ? `رفتن به   ${MonthDef[defType].find((item) => item.numeric === initialMonth)?.name} ${initialYear}`
              : `Jump to ${MonthDef[defType].find((item) => item.numeric === initialMonth)?.name} ${initialYear} `}
          </h3>
          <div className="flex w-full flex-wrap justify-between gap-y-1.5">
            {MonthDef &&
              MonthDef[defType].map((singleMonth) => (
                <div
                  key={singleMonth.numeric}
                  className={`h-10 w-[calc(100%/3-1.5%)] cursor-pointer rounded bg-light-gray-100 py-2 text-center text-sm ${initialMonth === singleMonth.numeric && `border-2 border-solid border-bluePowder !bg-bluePowder/20 ${defType === "fa-IR" ? "font-Bold_ir" : "font-Bold_en"} !text-bluePowder`}`}
                  onClick={() => handleSelectMonth(singleMonth.numeric)}
                >
                  {singleMonth.name}
                </div>
              ))}
          </div>
          <TinyNumber
            defType={defType}
            handleOnChangeYearInput={handleOnChangeYearInput}
            initialYear={initialYear}
            handleMinues={handleMinues}
            handlePlus={handlePlus}
          />
          {err && (
            <div className="text-xs text-rose-500">
              *ماه مورد نظر را انتخاب کنید.
            </div>
          )}
          <div className="text-center">
            <Button onClick={handleApproveDate} className="w-full text-sm">
              {defType === "fa-IR" ? "تایید " : "Approve"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
