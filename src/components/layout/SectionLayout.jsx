import { twMerge } from "tailwind-merge";

const SectionLayout = ({ children, className }) => {
  return <section className={twMerge("", className)}>{children}</section>;
};

export default SectionLayout;
