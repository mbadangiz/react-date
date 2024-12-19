import { IDateSchema, IDateState } from "../core/Types/interfaces";
import { TCalculationType } from "../core/Types/types";

export function convertPersianToArabicNumbers(persianStr: string): string {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return persianStr
    .split("")
    .map((char) => {
      const index = persianDigits.indexOf(char);
      return index > -1 ? index : char;
    })
    .join("");
}

export function parseStringNumber(strNum: string): number {
  return parseInt(convertPersianToArabicNumbers(strNum));
}

export function faIRTimeLocalize(
  date: Date,
  options: Intl.DateTimeFormatOptions
): string {
  return date.toLocaleDateString("fa-IR", options);
}

export function parsingIntFaIRDate(
  date: Date,
  options: Intl.DateTimeFormatOptions
): number {
  return parseStringNumber(faIRTimeLocalize(date, options));
}

export function calculatingDateDifference(
  basedate: Date,
  dayLong: number,
  calculationType: TCalculationType
): Date {
  const userDayLong = dayLong * 24 * 60 * 60 * 1000;

  const date =
    calculationType === "+"
      ? new Date(new Date(basedate).getTime() + userDayLong)
      : new Date(new Date(basedate).getTime() - userDayLong);

  return date;
}

export function calcDateDifferenceToFaIR(
  basedate: Date,
  dayLong: number,
  calculationType: TCalculationType,
  options: Intl.DateTimeFormatOptions
): string {
  return faIRTimeLocalize(
    calculatingDateDifference(basedate, dayLong, calculationType),
    options
  );
}

export function generatePersianMonthDays(initialDate: Date) {
  const baseDate = initialDate || new Date();

  const today = parsingIntFaIRDate(baseDate, { day: "numeric" }) - 1;
  const currentMonth = parsingIntFaIRDate(baseDate, { month: "numeric" });

  function forwardToFriday(): number {
    const lengthToEnd = currentMonth > 6 ? 29 - today : 30 - today;

    let lastDayOfMonthWeekDay = calcDateDifferenceToFaIR(
      baseDate,
      lengthToEnd,
      "+",
      { weekday: "long" }
    );

    let index = 0;

    while (lastDayOfMonthWeekDay !== "جمعه") {
      index++;
      const current = lengthToEnd + index;
      lastDayOfMonthWeekDay = calcDateDifferenceToFaIR(baseDate, current, "+", {
        weekday: "long",
      });
    }
    return index;
  }

  function backWardCountToSat(): number {
    let firstDayOfMonthWeekDay = calcDateDifferenceToFaIR(
      baseDate,
      today,
      "-",
      { weekday: "long" }
    );
    let index = 0;

    while (firstDayOfMonthWeekDay !== "شنبه") {
      index++;
      const current = today + index;
      firstDayOfMonthWeekDay = calcDateDifferenceToFaIR(
        baseDate,
        current,
        "-",
        {
          weekday: "long",
        }
      );
    }
    return index;
  }

  const backward = backWardCountToSat();
  const forward = forwardToFriday();
  const arr: IDateSchema[] = [];
  const limit = (currentMonth > 6 ? 31 : 32) + forward;

  const currentMonthName = new Date(baseDate).toLocaleDateString("fa-IR", {
    month: "long",
  });

  const currentYear = parsingIntFaIRDate(baseDate, { year: "numeric" });

  for (let index = 1 - backward; index < limit; index++) {
    const diff = today - index + 1;

    const tempDateMaker = (option: Intl.DateTimeFormatOptions) =>
      calcDateDifferenceToFaIR(baseDate, diff, "-", option);

    arr.push({
      fullDate: tempDateMaker({
        dateStyle: "short",
      }),
      weekday: tempDateMaker({
        weekday: "long",
      }),
      monthName: tempDateMaker({
        month: "long",
      }),
      year: tempDateMaker({
        month: "long",
      }),
      day: parseStringNumber(tempDateMaker({ day: "numeric" })),
      monthNumber: parseStringNumber(tempDateMaker({ month: "2-digit" })),
    });
  }

  return {
    dateList: arr,
    currentMonthNumber: currentMonthName,
    currentYear: currentYear,
  };
}
