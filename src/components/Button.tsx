import { ButtonHTMLAttributes, forwardRef } from "react";
import { Link } from "react-router-dom";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asLink?: boolean;
  href?: string;
  mode?: "dark" | "light";
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  variant?: "ghost" | "standard";
}

type Ref = HTMLButtonElement;

const Button = forwardRef<Ref, ButtonProps>(
  (
    {
      asLink,
      href,
      mode = "light",
      variant = "standard",
      startIcon,
      endIcon,
      children,
      className,
      ...restProps
    },
    ref
  ) => {
    const isDarkMode = mode === "dark";
    const BaseButton = () => (
      <button
        ref={ref}
        {...restProps}
        className={clsx(
          "px-4 py-2 outline-none rounded-md text-sm disabled:cursor-not-allowed  flex items-center justify-center gap-2",
          {
            "bg-zinc-50 text-zinc-900 hover:bg-zinc-200 disabled:bg-zinc-300":
              !isDarkMode,
            "bg-zinc-900 text-zinc-80 hover:bg-zinc-800 disabled:bg-zinc-700":
              isDarkMode,
          },
          {
            "border-[1px] border-zinc-700": variant === "standard",
          },
          className
        )}
      >
        {startIcon}
        {children}
        {endIcon}
      </button>
    );

    return asLink && href ? (
      <Link to={href}>
        <BaseButton />
      </Link>
    ) : (
      <BaseButton />
    );
  }
);

export default Button;
