import { Minus, Plus } from "react-feather";
import { ITinyNumberProps } from "../Types/interfaces";

export default function TinyNumber({
  initialYear,
  handleMinues,
  handlePlus,
  handleOnChangeYearInput,
}: ITinyNumberProps) {
  return (
    <div className="mx-auto flex w-full flex-wrap content-center items-center justify-center gap-1 text-center">
      <div
        className="flex size-5 cursor-pointer content-center items-center justify-center rounded bg-bluePowder text-white"
        onClick={handleMinues}
      >
        <Minus size={12} />
      </div>
      <div className="flex h-9 w-20 content-center items-center justify-center rounded bg-light-gray-200">
        <input
          type="number"
          value={initialYear}
          onChange={(e) => handleOnChangeYearInput(parseInt(e.target.value))}
          className="size-full bg-transparent text-center outline-none"
        />
      </div>
      <div
        className="flex size-5 cursor-pointer content-center items-center justify-center rounded bg-bluePowder text-white"
        onClick={handlePlus}
      >
        <Plus size={12} />
      </div>
    </div>
  );
}
