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
