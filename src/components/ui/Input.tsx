"use client";

import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  labelClassName?: string;
  inputClassName?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      labelClassName = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
      inputClassName = "w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4E8B6E] focus:border-transparent text-sm disabled:opacity-50 transition-colors",
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? label;
    return (
      <div>
        <label htmlFor={inputId} className={labelClassName}>
          {label}
        </label>
        <input ref={ref} id={inputId} className={inputClassName} {...props} />
      </div>
    );
  },
);

Input.displayName = "Input";
export { Input };
