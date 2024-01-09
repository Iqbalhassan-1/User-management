import React, { useState, useEffect, useRef } from "react";
import { MdExpandMore } from "react-icons/md";
import { twMerge } from "tailwind-merge";

function Dropdown({ children, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={twMerge("relative", className)}>
      {React.Children.map(children, (child) => {
        if (child.type === DropdownButton) {
          return React.cloneElement(child, { onClick: toggleDropdown, isOpen });
        } else if (child.type === DropdownList) {
          return isOpen && child;
        }
        return child;
      })}
    </div>
  );
}

function DropdownButton({ children, onClick, isOpen, className }) {
  return (
    <button
      type="button"
      className={twMerge("flex items-center", className)}
      onClick={onClick}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    >
      {children}
    </button>
  );
}

function DropdownList({ children, className }) {
  return (
    <ul
      className={twMerge(
        `absolute bg-white top-14 w-full border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg z-[9999] max-h-[15rem] overflow-x-auto`,
        className
      )}
      role="listbox"
      aria-multiselectable="false"
    >
      {children}
    </ul>
  );
}

function DropdownItem({ children }) {
  return (
    <li
      className="text-gray-700 hover:bg-slate-100"
      role="option"
      aria-selected={true}
    >
      {children}
    </li>
  );
}

export { Dropdown, DropdownButton, DropdownList, DropdownItem };
