import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdArrowDropDown, MdCheckCircle } from "react-icons/md";
import { twMerge } from "tailwind-merge";

const Accordian = ({
  children,
  accordianTitle,
  className,
  evaluationStatus = "",
  defaultOpen,
}) => {
  //translation hook
  const { t } = useTranslation();

  const [toggle, setToggle] = useState(defaultOpen || false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className="border border-gray-200 rounded-t-md relative">
      <button
        type="button"
        className={twMerge(
          `p-3 bg-gray-100 w-full flex items-center justify-between gap-3 font-medium rounded-t-md text-start`,
          className
        )}
        onClick={handleToggle}
      >
        {t(accordianTitle)}
        <span>
          {evaluationStatus && evaluationStatus === "Pending" ? (
            <MdArrowDropDown />
          ) : evaluationStatus === "Correction" ? (
            <MdCheckCircle className="text-blue-500" />
          ) : evaluationStatus === "Reject" ? (
            <MdCheckCircle className="text-blue-500" />
          ) : evaluationStatus === "Approved" ? (
            <MdCheckCircle className="text-blue-500" />
          ) : (
            <MdArrowDropDown />
          )}
        </span>
      </button>
      <div
        className={`grid overflow-hidden transition-grid-row duration-500 ease-in-out ${
          toggle ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 bg-white rounded-b-md">{children}</div>
      </div>
    </div>
  );
};

export default Accordian;
