import { useTranslation } from "react-i18next";
import { MdAssignment, MdDescription, MdFileOpen } from "react-icons/md";
import { NavLink } from "react-router-dom";

const navStyle = "flex items-center gap-1 font-medium";

const EvaNavLinks = () => {
  //translation hook
  const { t } = useTranslation();

  return (
    <>
      <NavLink className={navStyle} to="/proposals">
        {({ isActive }) => (
          <>
            <MdAssignment
              className={`${isActive ? "text-sky-600" : "text-gray-500"}`}
              size={24}
            />
            <span className={`${isActive ? "text-sky-600" : "text-gray-900"}`}>
              {t("Applications Evaluation")}
            </span>
          </>
        )}
      </NavLink>
    </>
  );
};

export default EvaNavLinks;
