import { IButtonProps } from "../Types/interfaces";

export default function Button({
  children,
  className,
  ...props
}: IButtonProps) {
  return (
    <button
      {...props}
      className={`mx-auto h-10 rounded-md bg-bluePowder px-4 text-white ${className}`}
    >
      {children}
    </button>
  );
}
