import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const toggleModal = (item = null) => {
    setIsOpen((prev) => !prev);
    setSelectedValue(item);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedValue(null);
  };

  return { isOpen, selectedValue, toggleModal, closeModal };
};

export default useModal;
