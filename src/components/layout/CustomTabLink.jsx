import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const CustomTabLink = ({ to, text, count, ...rest }) => {
  //translation hook
  const { t } = useTranslation();

  return (
    <NavLink
      to={to}
      {...rest}
      className="flex-left gap-2 pb-3 font-medium active-route whitespace-nowrap"
    >
      {({ isActive }) => (
        <>
          <span className={`${isActive ? "text-sky-600" : "text-gray-400"}`}>
            {t(text)}
          </span>
          {count !== undefined && (
            <span
              className={`text-sm rounded-full h-5 w-5 grid place-items-center ${
                isActive ? "text-white bg-sky-600" : "text-gray-500 bg-gray-100"
              }`}
            >
              {count}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
};

export default CustomTabLink;
