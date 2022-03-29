import React, { FC } from "react";
import cn from "classnames";

interface InputProps extends React.HTMLProps<HTMLInputElement> {}

const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "w-full border border-slate py-2 px-2",
        "focus-within:ring-2 ring-indigo-600 rounded-lg",
        className
      )}
    >
      <input {...props} className="w-full outline-none" />
    </div>
  );
};

export default Input;
