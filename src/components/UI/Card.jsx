import { twMerge } from "tailwind-merge";

const Card = ({ children, className, HC }) => {
  const classes = twMerge(
    "p-4 sm:p-5 bg-white rounded-lg shadow-sm",
    className
  );
  return HC ? (
    <header className={classes}>{children}</header>
  ) : (
    <div className={classes}>{children}</div>
  );
};

export default Card;
