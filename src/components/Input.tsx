import {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  forwardRef,
  useId,
} from "react";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  helperText?: string;
  error?: string;
}

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>(
  ({ label, labelProps, helperText, error, className, ...restProps }, ref) => {
    const id = useId();
    return (
      <div className="w-full flex flex-col items-start gap-2">
        <label
          htmlFor={id}
          {...labelProps}
          className={clsx("text-sm text-zinc-50", labelProps?.className)}
        >
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          {...restProps}
          className={clsx(
            "w-full px-2 py-2 text-sm text-white placeholder:text-zinc-500 rounded-md bg-zinc-800 border-[1px] border-zinc-600 outline-none",
            className
          )}
        />
        <p
          className={clsx("text-xs", {
            "text-red-600": error,
            "text-zinc-50": !error,
          })}
        >
          {helperText}
        </p>
      </div>
    );
  }
);

export default Input;
