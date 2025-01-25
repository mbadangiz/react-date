import {
  DayOfWeekDef,
  locationBasedCalendar,
  MonthDef,
} from "../constants/Date";
import { T_CalendarType, T_localType } from "../core/Types";
import { IDateState, IDaySchema } from "../core/Types/interfaces";
import { TCalculationType } from "../core/Types/types";

export function convertToEnNumbers(persianStr: string): string {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return persianStr
    .split("")
    .map((char) => {
      const index = persianDigits.indexOf(char);
      return index > -1 ? index : char;
    })
    .join("");
}

export function parsIntStrings(strNum: string): number {
  return parseInt(convertToEnNumbers(strNum));
}

export class LocalDateGenerator {
  private calendarType: T_localType;

  constructor(calendar: T_CalendarType) {
    this.calendarType = locationBasedCalendar[calendar];
  }

  private calculatingDateDifference = (
    basedate: Date,
    dayLong: number,
    calculationType: TCalculationType,
  ): Date => {
    const userDayLong = dayLong * 24 * 60 * 60 * 1000;

    const date =
      calculationType === "+"
        ? new Date(new Date(basedate).getTime() + userDayLong)
        : new Date(new Date(basedate).getTime() - userDayLong);

    return date;
  };

  parsingIntToLocalDate = (
    date: Date,
    options: Intl.DateTimeFormatOptions,
  ): number => {
    return parsIntStrings(this.localizedDate(date, options));
  };

  private calcDateDifferenceToLocalDate = (
    basedate: Date,
    dayLong: number,
    calculationType: TCalculationType,
    options: Intl.DateTimeFormatOptions,
  ): string => {
    return this.localizedDate(
      this.calculatingDateDifference(basedate, dayLong, calculationType),
      options,
    );
  };

  localizedDate = (date: Date, options: Intl.DateTimeFormatOptions): string => {
    return date.toLocaleDateString(this.calendarType, options);
  };

  generateMonthArray = (initialDate: Date): IDateState => {
    const baseDate = initialDate || new Date();

    const firstDayOfWeek = DayOfWeekDef[this.calendarType][0].name;
    const lastDayOfWeek = DayOfWeekDef[this.calendarType][6].name;

    const todayNumeric =
      this.parsingIntToLocalDate(baseDate, { day: "numeric" }) - 1;

    const currentMonthNumeric = this.parsingIntToLocalDate(baseDate, {
      month: "numeric",
    });
    const currentMonthString = this.localizedDate(baseDate, { month: "long" });

    const monthLong = MonthDef[this.calendarType].find(
      (item) => item.name === currentMonthString,
    )!.dayLong!;

    const forwardToLastDayOfWeek = (): number => {
      const lengthToEnd = monthLong - todayNumeric - 1;

      let lastDayOfMonthWeekDay = this.calcDateDifferenceToLocalDate(
        baseDate,
        lengthToEnd,
        "+",
        { weekday: "long" },
      );

      let index = 0;

      while (lastDayOfMonthWeekDay !== lastDayOfWeek) {
        index++;
        const current = lengthToEnd + index;
        lastDayOfMonthWeekDay = this.calcDateDifferenceToLocalDate(
          baseDate,
          current,
          "+",
          {
            weekday: "long",
          },
        );
      }
      return index;
    };

    const backWardCountToFirstDayOfWeek = (): number => {
      let firstDayOfMonthWeekDay = this.calcDateDifferenceToLocalDate(
        baseDate,
        todayNumeric,
        "-",
        { weekday: "long" },
      );
      let index = 0;

      while (firstDayOfMonthWeekDay !== firstDayOfWeek) {
        index++;
        const current = todayNumeric + index;
        firstDayOfMonthWeekDay = this.calcDateDifferenceToLocalDate(
          baseDate,
          current,
          "-",
          {
            weekday: "long",
          },
        );
      }
      return index;
    };

    const backward = backWardCountToFirstDayOfWeek();
    const forward = forwardToLastDayOfWeek();
    const arr: IDaySchema[] = [];

    const currentYear = this.parsingIntToLocalDate(baseDate, {
      year: "numeric",
    });

    for (let index = 1 - backward; index < monthLong + forward + 1; index++) {
      const diff = todayNumeric - index + 1;

      const tempDateMaker = (option: Intl.DateTimeFormatOptions) =>
        this.calcDateDifferenceToLocalDate(baseDate, diff, "-", option);

      arr.push({
        gregorianDate: new Date(
          this.calculatingDateDifference(baseDate, diff, "-"),
        ),
        weekday: tempDateMaker({ weekday: "long" }),
        month: {
          numeric: parsIntStrings(tempDateMaker({ month: "2-digit" })),
          long: tempDateMaker({ month: "long" }),
        },
        year: parsIntStrings(tempDateMaker({ year: "numeric" })),
        day: parsIntStrings(tempDateMaker({ day: "numeric" })),
        fullDate: convertToEnNumbers(tempDateMaker({ dateStyle: "short" }))
          .split("/")
          .join("-"),
      });
    }

    const currentDayFullDate = this.localizedDate(baseDate, {
      dateStyle: "short",
    });

    return {
      dayList: arr,
      currentDayFullDate,
      currentMonth: { long: currentMonthString, numeric: currentMonthNumeric },
      currentYear: currentYear,
    };
  };
}
