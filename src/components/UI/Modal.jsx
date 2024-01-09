import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  maxWidth = "max-w-xl",
  hasTitle,
  className,
}) => {
  //translation hook
  const { t } = useTranslation();
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".modal-content") &&
        !event.target.closest(".modal-close-button")
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="fixed inset-0 bg-black/60 transition-opacity duration-300 z-[9999]"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-[9999] p-2">
        <div
          className={`bg-white container ${maxWidth} mx-auto rounded-md shadow-lg modal-content opac h-auto`}
        >
          <header className="flex items-center justify-between gap-2 p-3 border-b border-gray-100">
            {!hasTitle && (
              <h2 className="text-lg text-gray-900 font-semibold">
                {t(title)}
              </h2>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 ml-auto hover:scale-110 hover:text-gray-900 transition-all"
            >
              <MdClose size={20} />
            </button>
          </header>
          <div
            className={twMerge(
              "p-6 space-y-6 overflow-y-auto z-[9999]",
              className
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
