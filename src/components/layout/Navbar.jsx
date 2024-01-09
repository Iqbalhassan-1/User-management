import { Link, NavLink } from "react-router-dom";
import {
  MdApartment,
  MdPerson,
  MdAssignment,
  MdExpandMore,
  MdMenu,
} from "react-icons/md";
import { avatar, ukraineLogo, USFlag } from "../../assets";
import UKFlag from "../../assets/UKFlag.svg";
import {
  Dropdown,
  DropdownButton,
  DropdownList,
  DropdownItem,
} from "../UI/DropDown";
import Wrapper from "./Wrapper";
// import MCTDNavLinks from "./MCTDNavLinks";
// import MuniNavLinks from "./MuniNavLinks";
// import EvaNavLinks from "./EvaNavLinks";
import useAuthContext from "../../utils/hooks/useAuthContext";
import { FaUser } from "react-icons/fa";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useState } from "react";
import UserLinks from "./UserLinks";

// bg-primary-50 px-3 py-2 rounded-md text-primary-600

const Navbar = ({ sidebarToggle, isSidebar }) => {
  const { user, handleLogout, isLoading } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  //get selected from local storage
  const selectedLanguage = localStorage.getItem("SelectedLanguage") || "en";

  //translation hook
  const { t } = useTranslation();

  //toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguage = (lng) => {
    //set SelectedLamgauge in local storage
    localStorage.setItem("SelectedLanguage", lng);

    //toggle
    setIsOpen(!isOpen);
    //set i18n language
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="py-4 bg-white drop-shadow-sm relative">
      <Wrapper className="flex-btw">
        <div className="flex-left gap-10">
          {/* Logo */}

          <Link to="/" className="flex-left gap-1 md:gap-2">
            <img src={ukraineLogo} alt="ukraine logo" />
            <h1 className="text-base md:text-lg text-gray-900 font-semibold">
              PMPU
            </h1>
          </Link>

          {/* Links */}
          <div className="hidden lg:flex-left gap-3">
            <UserLinks />
          </div>
        </div>
        {/* Lan & Profile */}
        <div className="flex-left gap-4">
          <div className="relative inline-block">
            <button
              className={`flex items-center gap-1 text-dark-medium p-2 rounded focus:outline-none ${
                isOpen ? "bg-gray-200" : ""
              }`}
              onClick={toggleDropdown}
            >
              <span
                className={`fi ${
                  selectedLanguage === "ukr" ? "fi-ua" : "fi-us"
                } fis`}
              ></span>{" "}
              {selectedLanguage.toUpperCase()}
            </button>
            {isOpen && (
              <div className="absolute mt-2 w-24 bg-white border border-gray-300 rounded shadow-md z-10">
                <button
                  className="flex items-center gap-1 text-dark-medium p-2 hover:bg-gray-100 focus:outline-none w-full"
                  onClick={() => handleLanguage("en")}
                >
                  <span className="fi fi-us fis"></span> EN
                </button>
                <button
                  className="flex items-center gap-1 text-dark-medium p-2 hover:bg-gray-100 focus:outline-none w-full"
                  onClick={() => handleLanguage("ukr")}
                >
                  <span className="fi fi-ua fis"></span> UKR
                </button>
              </div>
            )}
          </div>

          <Dropdown className="hidden lg:flex">
            <DropdownButton className="flex-left gap-2 border border-gray-100 px-3 py-1 hover:bg-gray-100 transition-colors rounded-md">
              <FaUser size={24} />
              <div>
                <h3 className="text-sm md:text-dark-medium leading-none text-left">
                  {user?.firstName + " " + user?.lastName}
                </h3>
                <span className="text-xs">{user?.role}</span>
              </div>
              <MdExpandMore />
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
          <button className="block lg:hidden text-xl" onClick={sidebarToggle}>
            <MdMenu size={30} />
          </button>
        </div>
      </Wrapper>
    </nav>
  );
};

export default Navbar;
