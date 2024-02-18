import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element;
  mode?: "dark" | "light";
}

type Ref = HTMLButtonElement;

const IconButton = forwardRef<Ref, IconButtonProps>(
  ({ icon, mode = "dark", className, ...restProps }, ref) => {
    const isDarkMode = mode === "dark";
    return (
      <button
        ref={ref}
        {...restProps}
        className={clsx(
          "outline-non disabled:cursor-not-allowed rounded-md border-[1px] border-zinc-700 p-2",
          {
            " bg-zinc-50 hover:bg-zinc-200 disabled:bg-zinc-300 text-zinc-900":
              !isDarkMode,
            "bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-700 text-zinc-50":
              isDarkMode,
          },
          className
        )}
      >
        {icon}
      </button>
    );
  }
);

export default IconButton;
