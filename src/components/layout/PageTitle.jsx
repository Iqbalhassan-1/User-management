import { twMerge } from "tailwind-merge";

const PageTitle = ({ children, className }) => {
  return <h1 className={twMerge("", className)}>{children}</h1>;
};

export default PageTitle;
