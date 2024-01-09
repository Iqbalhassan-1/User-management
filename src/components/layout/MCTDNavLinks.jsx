import {
  MdApartment,
  MdAssignment,
  MdDashboardCustomize,
  MdExpandMore,
  MdPerson,
  MdQuestionMark,
} from "react-icons/md";
import { CgTemplate } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownList,
} from "../UI/DropDown";

const navStyle =
  "flex items-center gap-1 font-medium text-base whitespace-nowrap";

// const isLinkActive = () => {

// }

const MCTDNavLinks = () => {
  //translation hook
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <NavLink className={navStyle} to="/">
        {({ isActive }) => (
          <>
            <MdDashboardCustomize
              className={`${isActive ? "text-sky-600" : "text-gray-500"}`}
              size={24}
            />
            <span className={`${isActive ? "text-sky-600" : "text-gray-900"}`}>
              {t("Dashboard")}
            </span>
          </>
        )}
      </NavLink>
      <NavLink className={navStyle} to="call-for-proposals">
        {({ isActive }) => (
          <>
            <MdAssignment
              className={`${isActive ? "text-sky-600" : "text-gray-500"}`}
              size={24}
            />

            <span className={`${isActive ? "text-sky-600" : "text-gray-900"}`}>
              {t("Call For Proposals")}
            </span>
          </>
        )}
      </NavLink>
      {/* <NavLink className={navStyle} to="evaluators">
        {({ isActive }) => (
          <>
            <MdPerson
              className={`${isActive ? "text-sky-600" : "text-gray-500"}`}
              size={24}
            />
            <span className={`${isActive ? "text-sky-600" : "text-gray-900"}`}>
              {t("Evaluators")}
            </span>
          </>
        )}
      </NavLink>
      <NavLink className={navStyle} to="municipalities">
        {({ isActive }) => (
          <>
            <MdApartment
              className={`${isActive ? "text-sky-600" : "text-gray-500"}`}
              size={24}
            />
            <span className={`${isActive ? "text-sky-600" : "text-gray-900"}`}>
              {t("Municipality")}
            </span>
          </>
        )}
      </NavLink>
      <NavLink className={navStyle} to="/mctdies">
        {({ isActive }) => (
          <>
            <CgTemplate
              className={`${isActive ? "text-sky-600" : "text-gray-500"}`}
              size={24}
            />
            <span className={`${isActive ? "text-sky-600" : "text-gray-900"}`}>
              {t("MCTD")}
            </span>
          </>
        )}
      </NavLink> */}
      <NavLink className={navStyle} to="/questions">
        {({ isActive }) => (
          <>
            <CgTemplate
              className={`${isActive ? "text-sky-600" : "text-gray-500"}`}
              size={24}
            />
            <span className={`${isActive ? "text-sky-600" : "text-gray-900"}`}>
              {t("Evaluation Template")}
            </span>
          </>
        )}
      </NavLink>

      <Dropdown className="inline-block text-left font-medium text-base whitespace-nowrap">
        <DropdownButton className="flex items-center justify-between w-full gap-1">
          <div className="flex items-center gap-1">
            <span className="text-gray-500">
              <FaUsers size={24} />
            </span>
            Users
          </div>

          <span className="mt-1 text-gray-500">
            <MdExpandMore size={24} className="text-gray-500" />
            {/* <RiArrowDownSLine size={24} /> */}
          </span>
        </DropdownButton>
        <DropdownList className="w-[13rem] lg:w-[10rem] left-0 top-10 border-0">
          <DropdownItem>
            <NavLink className={`${navStyle} py-2 px-1`} to="/mctd">
              {({ isActive }) => (
                <>
                  <CgTemplate
                    className={`${isActive ? "text-sky-600" : "text-gray-500"}`}
                    size={24}
                  />
                  <span
                    className={`${isActive ? "text-sky-600" : "text-gray-900"}`}
                  >
                    {t("MCTD")}
                  </span>
                </>
              )}
            </NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink className={`${navStyle} py-2 px-1`} to="municipalities">
              {({ isActive }) => (
                <>
                  <MdApartment
                    className={`${isActive ? "text-sky-600" : "text-gray-500"}`}
                    size={24}
                  />
                  <span
                    className={`${isActive ? "text-sky-600" : "text-gray-900"}`}
                  >
                    {t("Municipality")}
                  </span>
                </>
              )}
            </NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink className={`${navStyle} py-2 px-1`} to="evaluators">
              {({ isActive }) => (
                <>
                  <MdPerson
                    className={`${isActive ? "text-sky-600" : "text-gray-500"}`}
                    size={24}
                  />
                  <span
                    className={`${isActive ? "text-sky-600" : "text-gray-900"}`}
                  >
                    {t("Evaluators")}
                  </span>
                </>
              )}
            </NavLink>
          </DropdownItem>
        </DropdownList>
      </Dropdown>

      {/* <div className="relative inline-block text-left font-medium text-base whitespace-nowrap">
        <button
          id="dropdownNavbarLink"
          onClick={toggleDropdown}
          className="flex items-center justify-between w-full gap-1"
        >
          <div className="flex items-center gap-1">
            <span className="text-gray-500">
              <FaUsers size={24} />
            </span>
            Users
          </div>

          <span className="mt-1 text-gray-500">
            <RiArrowDownSLine size={24} />
          </span>
        </button>

        {isDropdownOpen && (
          <div
            id="dropdownNavbar"
            className="z-10 absolute -left-2 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow w-44"
          >
            <ul
              className="p-2 text-sm space-y-4"
              aria-labelledby="dropdownLargeButton"
            >
              <li>
                <NavLink className={navStyle} to="/mctdies">
                  {({ isActive }) => (
                    <>
                      <CgTemplate
                        className={`${
                          isActive ? "text-sky-600" : "text-gray-500"
                        }`}
                        size={24}
                      />
                      <span
                        className={`${
                          isActive ? "text-sky-600" : "text-gray-900"
                        }`}
                      >
                        {t("MCTD")}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink className={navStyle} to="municipalities">
                  {({ isActive }) => (
                    <>
                      <MdApartment
                        className={`${
                          isActive ? "text-sky-600" : "text-gray-500"
                        }`}
                        size={24}
                      />
                      <span
                        className={`${
                          isActive ? "text-sky-600" : "text-gray-900"
                        }`}
                      >
                        {t("Municipality")}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink className={navStyle} to="evaluators">
                  {({ isActive }) => (
                    <>
                      <MdPerson
                        className={`${
                          isActive ? "text-sky-600" : "text-gray-500"
                        }`}
                        size={24}
                      />
                      <span
                        className={`${
                          isActive ? "text-sky-600" : "text-gray-900"
                        }`}
                      >
                        {t("Evaluators")}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div> */}
    </>
  );
};

export default MCTDNavLinks;
