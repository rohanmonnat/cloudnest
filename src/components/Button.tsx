import { ButtonHTMLAttributes, forwardRef } from "react";
import { Link } from "react-router-dom";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asLink?: boolean;
  href?: string;
}

type Ref = HTMLButtonElement;

const Button = forwardRef<Ref, ButtonProps>(
  ({ asLink, href, children, className, ...restProps }, ref) => {
    const BaseButton = () => (
      <button
        ref={ref}
        {...restProps}
        className={clsx(
          "w-full px-4 py-2 outline-none rounded-md text-sm bg-zinc-50 text-zinc-900 hover:bg-zinc-200 disabled:bg-zinc-300 disabled:cursor-not-allowed",
          className
        )}
      >
        {children}
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
