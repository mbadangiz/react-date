import { useEffect, useState } from "react";
import { convertPersianToArabicNumbers } from "../utils";
import { IDateSchema, IDateState } from "../core/Types/interfaces";

export default function ReactPersianDate() {
  const [CurrentDate, setCurrentDate] = useState<IDateState | null>(null);
  const [initialDate, setInitialDate] = useState<Date>(new Date());

  const today =
    parseInt(
      convertPersianToArabicNumbers(
        new Date(initialDate || new Date()).toLocaleDateString("fa-IR", {
          day: "numeric",
        })
      )
    ) - 1;

  const currentMonth = parseInt(
    convertPersianToArabicNumbers(
      new Date(initialDate || new Date()).toLocaleDateString("fa-IR", {
        month: "numeric",
      })
    )
  );

  function forwardToFriday(index: number) {
    const lengthToEnd = currentMonth > 6 ? 30 - today - 1 : 31 - today - 1;

    const lastDayOfMonthWeekDay = new Date(
      new Date(initialDate || new Date()).getTime() +
        lengthToEnd * 24 * 60 * 60 * 1000
    ).toLocaleDateString("fa-IR", { weekday: "long" });

    if (lastDayOfMonthWeekDay !== "جمعه") {
      const current = lengthToEnd + index;
      const comparingDay = new Date(
        new Date(initialDate || new Date()).getTime() +
          current * 24 * 60 * 60 * 1000
      ).toLocaleDateString("fa-IR", { weekday: "long" });

      if (comparingDay !== "جمعه") {
        return forwardToFriday(index + 1);
      }
      return { forwardDays: index };
    }

    return { forwardDays: 0 };
  }

  function backWardCountToSat(today: number, index: number) {
    const todayWeekDay = new Date(
      new Date(initialDate || new Date()).getTime() -
        1000 * today * 60 * 60 * 24
    ).toLocaleDateString("fa-IR", {
      weekday: "long",
    });

    if (todayWeekDay !== "شنبه") {
      const current = today + index;

      const timeStamp =
        new Date(initialDate || new Date()).getTime() -
        1000 * current * 60 * 60 * 24;

      const weekday = new Date(timeStamp).toLocaleDateString("fa-IR", {
        weekday: "long",
      });

      if (weekday !== "شنبه") {
        return backWardCountToSat(today, index + 1);
      }

      return { backWarkCount: index };
    }

    return { backWarkCount: 0 };
  }

  function generateAllCurrentMonthDays(): IDateState {
    const backward = backWardCountToSat(today, 1);
    const forward = forwardToFriday(1);
    const arr: IDateSchema[] = [];
    const limit = (currentMonth > 6 ? 31 : 32) + forward.forwardDays;

    const currentMonthName = new Date(initialDate).toLocaleDateString("fa-IR", {
      month: "long",
    });
    const currentYear = parseInt(
      convertPersianToArabicNumbers(
        new Date(initialDate).toLocaleDateString("fa-IR", {
          year: "numeric",
        })
      )
    );

    for (let index = 1 - backward.backWarkCount; index < limit; index++) {
      const newss = today - index + 1;
      const timeStamp =
        new Date(initialDate || new Date()).getTime() -
        1000 * newss * 60 * 60 * 24;
      const fullYear = new Date(timeStamp).toLocaleDateString("fa-IR", {
        dateStyle: "short",
      });
      const weekday = new Date(timeStamp).toLocaleDateString("fa-IR", {
        weekday: "long",
      });
      const day = parseInt(
        convertPersianToArabicNumbers(
          new Date(timeStamp).toLocaleDateString("fa-IR", {
            day: "numeric",
          })
        )
      );
      const monthNumber = parseInt(
        convertPersianToArabicNumbers(
          new Date(timeStamp).toLocaleDateString("fa-IR", {
            month: "2-digit",
          })
        )
      );
      const monthName = new Date(timeStamp).toLocaleDateString("fa-IR", {
        month: "long",
      });
      const year = new Date(timeStamp).toLocaleDateString("fa-IR", {
        year: "numeric",
      });
      arr.push({ fullYear, weekday, day, monthNumber, monthName, year });
    }
    return {
      dateList: arr,
      currentMonthNumber: currentMonthName,
      currentYear: currentYear,
    };
  }

  useEffect(() => {
    setCurrentDate(generateAllCurrentMonthDays());
  }, [initialDate]);

  return (
    <>
      <div className="w-[450px] bg-white rounded-lg border-[1.5px] py-2 px-4 flex flex-row  flex-wrap ">
        <div className="w-full">
          {CurrentDate?.currentMonthNumber} - {CurrentDate?.currentYear}
        </div>
        {CurrentDate?.dateList.length
          ? CurrentDate?.dateList.map((singleDay) => {
              return (
                <div
                  key={`${singleDay.monthNumber}-${singleDay.day}`}
                  className={`w-[calc(100%/7)] h-14 flex justify-center items-center font-bold 
                  ${currentMonth !== singleDay.monthNumber && "opacity-50"} ${
                    singleDay.weekday === "جمعه" && "text-rose-600"
                  }`}
                >
                  {singleDay.day}
                </div>
              );
            })
          : "وایساااا"}
      </div>
      <div className="w-[450px] flex justify-around mt-5">
        <button
          onClick={() => {
            setInitialDate(
              new Date(initialDate.getTime() - 1000 * 60 * 60 * 24 * 32)
            );
          }}
        >
          ماه قبلی
        </button>
        <button
          onClick={() => {
            setInitialDate(new Date());
          }}
          // className={` ${
          //   ? "bg-gray-700" : "bg-red-400"
          // }`}
          // disabled={new Date() === initialDate}
        >
          برو به امروز
        </button>
        <button
          onClick={() => {
            setInitialDate(
              new Date(initialDate.getTime() + 1000 * 60 * 60 * 24 * 28)
            );
          }}
        >
          ماه بعد
        </button>
      </div>
    </>
  );
}

// const todayInt = parseInt(convertPersianToArabicNumbers(today)) - 1;

// const allMonth = generateAllCurrentMonthDays();
// console.log(allMonth);
