import { NavLink } from "react-router-dom";
import { DebounceInput } from "../../components";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import useDataContext from "../../utils/hooks/useDataContext";

const CFPTabs = ({ children, className, noSearch }) => {
  const { searchText, setSearchText } = useDataContext();

  return (
    <nav
      className={twMerge(
        "bg-white rounded-t-lg border-b border-gray-200 shadow-sm w-full",
        className
      )}
    >
      <div className="space-y-6 px-4 pt-4">
        {!noSearch && (
          <DebounceInput
            value={searchText}
            onChange={(text) => setSearchText(text)}
          />
        )}
        <div className="flex-left gap-5 overflow-x-auto tabs-scroll">
          {children}
        </div>
      </div>
    </nav>
  );
};

export default CFPTabs;
