import { useEffect, useState } from "react";
import { X } from "react-feather";
import { persianMonthsList } from "../../constants/faDate";
import Button from "../../core/components/Button";
import TinyNumber from "../../core/components/TinyNumber";
import { IJumpToDateProps } from "../../core/Types/interfaces";
import { parsingIntFaIRDate } from "../../utils";

export function JumpToDate({
  handleShowJumpToDate,
  showJumpToDate,
  handleJumpToDate,
}: IJumpToDateProps) {
  const year = parsingIntFaIRDate(new Date(), { year: "numeric" });

  const [initialYear, setInitialYear] = useState<number>(year);
  const [initialMonth, setInitialMonth] = useState<number>(0);

  const [err, setErr] = useState<boolean>(!false);

  useEffect(() => {
    setErr(!showJumpToDate);
    setInitialMonth(0);
    setInitialYear(year);
  }, [showJumpToDate]);

  function handleMinues() {
    setInitialYear((prev) => prev - 1);
  }
  function handlePlus() {
    setInitialYear((prev) => prev + 1);
  }
  function handleOnChangeYearInput(val: number) {
    setInitialYear(val);
  }

  function handleSelectMonth(month: number) {
    setInitialMonth(month);
  }

  return (
    <div
      className={`absolute left-0 ${showJumpToDate ? "top-0" : "-top-full"} flex size-full content-center items-center justify-center overflow-hidden rounded-2xl bg-slate-800/15 backdrop-blur transition-all duration-700`}
    >
      <div
        className={`relative min-h-[350px] w-10/12 rounded-lg bg-white ${showJumpToDate ? "-top-0" : "top-[200%]"} transition-all delay-700 duration-700`}
      >
        <div
          className="absolute -left-2 -top-2 flex size-7 cursor-pointer content-center items-center justify-center rounded bg-white shadow-md"
          onClick={handleShowJumpToDate}
        >
          <X size={17} />
        </div>
        <div className="size-full space-y-4 px-4 pb-5 pt-6">
          <h3 className="text-center font-Medium_ir text-lg">رفتن به ماه</h3>
          <div className="flex w-full flex-wrap justify-between gap-y-1.5">
            {persianMonthsList &&
              persianMonthsList.map((singleMonth) => (
                <div
                  key={singleMonth.numeric}
                  className={`w-[calc(100%/3-1.5%)] cursor-pointer rounded bg-light-gray-100 py-2 text-center text-sm ${initialMonth === singleMonth.numeric && "border-2 border-solid border-bluePowder !bg-bluePowder/20 font-Bold_ir !text-bluePowder"}`}
                  onClick={() => handleSelectMonth(singleMonth.numeric!)}
                >
                  {singleMonth.long}
                </div>
              ))}
          </div>
          <TinyNumber
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
            <Button
              onClick={() => {
                if (initialMonth) {
                  handleShowJumpToDate();
                  handleJumpToDate(initialYear, initialMonth);
                } else {
                  setErr(true);
                }
              }}
              className="w-full text-sm"
            >
              تایید تاریخ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
