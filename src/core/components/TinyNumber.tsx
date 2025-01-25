import { Minus, Plus } from "react-feather";
import { ITinyNumberProps } from "../Types/interfaces";
import { useDatepicker } from "../provider/DatepickerProvider";
import { En_Size } from "../Types/Enums";

export default function TinyNumber({
  initialYear,
  handleMinues,
  handlePlus,
  handleOnChangeYearInput,
}: ITinyNumberProps) {
  const { defType, size } = useDatepicker();

  const inptStyleBySize = {
    [En_Size.LARGE]: "  h-9",
    [En_Size.MEDIUM]: " h-8",
    [En_Size.SMALL]: " h-7",
  };
  return (
    <div className="mx-auto flex w-full flex-wrap content-center items-center justify-center gap-1 text-center">
      <div
        className="flex size-4 cursor-pointer content-center items-center justify-center rounded bg-bluePowder text-white"
        onClick={handleMinues}
      >
        <Minus size={11} />
      </div>
      <div
        className={`flex ${inptStyleBySize[size]} w-20 content-center items-center justify-center rounded bg-light-gray-200 ${defType === "fa-IR" ? "font-Reg_ir" : "font-Reg_en"}`}
      >
        <input
          type="text"
          value={initialYear}
          onChange={(e) => {
            handleOnChangeYearInput(parseInt(e.target.value));
          }}
          className={`size-full bg-transparent text-center outline-none ${defType === "fa-IR" ? "font-Reg_ir" : "!font-Reg_en"}`}
        />
      </div>
      <div
        className="flex size-4 cursor-pointer content-center items-center justify-center rounded bg-bluePowder text-white"
        onClick={handlePlus}
      >
        <Plus size={11} />
      </div>
    </div>
  );
}
