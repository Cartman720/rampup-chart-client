import React, { FC } from "react";
import cn from "classnames";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  className?: string;
  type: "reset" | "submit" | "button";
}

const Button: FC<ButtonProps> = ({ children, type = "button", ...props }) => {
  return (
    <button
      type={type}
      {...props}
      className={cn(
        "w-full py-2 px-2 bg-indigo-500 hover:bg-indigo-600 ",
        "text-white rounded-lg focus:ring-2 ring-indigo-400",
        props.className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
