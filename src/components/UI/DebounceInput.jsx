import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdSearch } from "react-icons/md";
import { twMerge } from "tailwind-merge";

const inputStyles =
  "box-border text-gray-900 bg-gray-50 border focus-within:outline-none rounded-md p-2 transition-colors py-2 pl-8 w-full focus:outline-none focus:border-blue-500 border-gray-300";

// A Debounce Input Component
const DebounceInput = ({
  value: initialValue,
  onChange = () => {},
  debounce = 500,
  icon: Icon,
  className,
  ...props
}) => {

  //translation hook
  const { t } = useTranslation();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div
      className={twMerge(
        "relative flex items-center w-full sm:max-w-sm",
        className
      )}
    >
      <span className="absolute left-3 top-[55%] transform -translate-y-1/2">
        <MdSearch className="w-4 h-4 text-gray-400" />
      </span>
      <input
        {...props}
        value={value}
        id="search"
        name="search"
        onChange={(e) => setValue(e.target.value)}
        className={inputStyles}
        placeholder={t("Search")}
      />
    </div>
  );
};

export default DebounceInput;
