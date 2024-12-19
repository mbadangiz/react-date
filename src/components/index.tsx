import { useEffect, useState } from "react";
import { generatePersianMonthDays } from "../utils";

export default function ReactPersianDate() {
  const [initialDate, setInitialDate] = useState<Date>(new Date());

  useEffect(() => {
    console.log(generatePersianMonthDays(initialDate));
  }, [initialDate]);
  return <></>;
}
