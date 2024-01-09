import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";
import UserLinks from "./UserLinks";
import { avatar, ukraineLogo, USFlag } from "../../assets";

import { useTranslation } from "react-i18next";
import useAuthContext from "../../utils/hooks/useAuthContext";

const RootLayout = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <>
      <Navbar sidebarToggle={handleToggle} isSidebar={isOpen} />

      <Sidebar
        isOpen={isOpen}
        handleToggle={handleToggle}
        setIsOpen={setIsOpen}
      >
        <Link to="/" className="flex-left gap-1 md:gap-2">
          <img src={ukraineLogo} alt="ukraine logo" />
          <h1 className="text-base md:text-lg text-gray-900 font-semibold">
            PMPU
          </h1>
        </Link>
        <UserLinks />
      </Sidebar>
      <main className="min-h-screen pt-4 sm:p-4 bg-gray-50 overflow-hidden z-0">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
