import React from "react";
import useAuthContext from "../../utils/hooks/useAuthContext";
import {
  Dropdown,
  DropdownButton,
  DropdownList,
  DropdownItem,
} from "../UI/DropDown";
import { FaUser } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar = ({ children, isOpen }) => {
  const { t } = useTranslation();

  const { user, handleLogout, isLoading } = useAuthContext();

  return (
    <aside
      className={`top-0 left-0 fixed h-screen border-r border-slate-200 bg-white flex items-start flex-col justify-between gap-3 -translate-x-full w-[15rem] transition-transform duration-300 z-10 lg:-translate-x-full ${
        isOpen ? "translate-x-0 lg:-translate-x-full" : ""
      }`}
    >
      <div className="px-4 pt-6 space-y-8">{children}</div>
      <Dropdown className="w-full p-0 left-0 right-0 mb-24">
        <DropdownButton className="w-full flex px-4 items-center gap-2 border border-gray-100 py-1 hover:bg-gray-100 transition-colors rounded-md">
          <FaUser size={24} className="text-gray-500" />
          <div>
            <h3 className="font-medium leading-none text-left">
              {user?.firstName + " " + user?.lastName}
            </h3>
            <span className="text-xs text-gray-500 font-medium">
              {user?.role}
            </span>
          </div>
          <MdExpandMore size={24} className="text-gray-500" />
        </DropdownButton>
        <DropdownList>
          <DropdownItem>
            <Link to="user-setting">
              <button className="px-4 py-2 text-left w-full">
                {t("Profile")}
              </button>
            </Link>
          </DropdownItem>
          <DropdownItem>
            <button
              className="px-4 py-2 text-left w-full"
              onClick={handleLogout}
            >
              {t("Logout")}
            </button>
          </DropdownItem>
        </DropdownList>
      </Dropdown>
    </aside>
  );
};

export default Sidebar;
