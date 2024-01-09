import { useTranslation } from "react-i18next";
import { MdAssignment, MdFileOpen } from "react-icons/md";
import { NavLink } from "react-router-dom";

const navStyle = "flex items-center gap-1 font-medium";

const MuniNavLinks = () => {
  //translation hook
  const { t } = useTranslation();
  return (
    <>
      <NavLink className={navStyle} to="active-call-for-proposals">
        {({ isActive }) => (
          <>
            <MdAssignment
              className={`${isActive ? "text-sky-600" : "text-gray-500"}`}
              size={24}
            />
            <span className={`${isActive ? "text-sky-600" : "text-gray-900"}`}>
              {t("Active Proposals")}
            </span>
          </>
        )}
      </NavLink>
      <NavLink className={navStyle} to="all-applications">
        {({ isActive }) => (
          <>
            <MdFileOpen
              className={`${isActive ? "text-sky-600" : "text-gray-500"}`}
              size={24}
            />
            <span className={`${isActive ? "text-sky-600" : "text-gray-900"}`}>
              {t("My Applications")}
            </span>
          </>
        )}
      </NavLink>
    </>
  );
};

export default MuniNavLinks;
