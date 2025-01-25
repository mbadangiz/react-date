import { En_Size } from "../Types/Enums";
import { IButtonProps } from "../Types/interfaces";

export default function Button({
  children,
  className,
  size,
  ...props
}: IButtonProps) {
  const btnCellStyleBySize = {
    [En_Size.LARGE]: "h-10  ",
    [En_Size.MEDIUM]: "",
    [En_Size.SMALL]: "h-8 text-[13px]",
  };
  return (
    <button
      {...props}
      className={`mx-auto h-10 rounded-md bg-bluePowder px-4 text-white ${btnCellStyleBySize[size]} ${className}`}
    >
      {children}
    </button>
  );
}
