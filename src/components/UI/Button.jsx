import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ children, variant, size, className = "", ...restProps }) => {
  // const classes = twMerge(
  //   "capitalize bg-blue-500 flex items-center justify-center gap-2 text-white py-2 rounded-sm hover:bg-blue-500/90 transition-colors disabled:bg-gray-600 disabled:opacity-50",
  //   className
  // );

  // Define Tailwind CSS classes based on variant and size
  const variantClasses = {
    primary: "bg-sky-600 hover:bg-sky-600/80 text-white",
    secondary: "bg-green-700 hover:bg-green-700/80 text-white",
    reject: "bg-red-700 hover:bg-red-700/80 text-white",
    outline:
      "bg-white text-sky-600 border border-sky-600 hover:bg-sky-600 hover:text-white",
    // Add more variants as needed
  };

  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-[10px] px-6 text-base",
    // Add more sizes as needed
  };

  // Combine classes based on the selected variant and size
  const buttonClasses = `rounded-md capitalize font-medium transition-colors flex items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed ${
    variantClasses[variant ? variant : "primary"]
  } ${sizeClasses[size ? size : "md"]}`;

  return (
    <button className={twMerge(buttonClasses, className)} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
