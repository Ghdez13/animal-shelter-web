import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const AutoCloseModal = ({ type, onClose, duration = 3000, values = {} }) => {
  const { t } = useTranslation();

  // Automatically close modal after `duration` milliseconds
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer); // Cleanup if component unmounts
  }, [onClose, duration]);

  return (
    // Overlay covering the entire screen
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
      onClick={onClose} // Click outside closes modal
    >
      {/* Modal box */}
      <div
        className="bg-[var(--color-bg-article)] text-[var(--color-text-dark)] rounded-lg border-t-4 border-[#ef7a2b] p-6 w-11/12 max-w-sm text-center shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Interpolates variables from `values` */}
        <p className="text-[20px]">{t(`alerts.${type}`, values)}</p>
      </div>
    </div>
  );
};

export default AutoCloseModal;