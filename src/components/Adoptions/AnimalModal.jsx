import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AdoptionForm from "./AdoptionForm"; // Import the separated form component

const AnimalModal = ({ animal, isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const [interested, setInterested] = useState(false);

  // Reset interest state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setInterested(false);
    }
  }, [isOpen]);

  // Handle overlay click to close modal
  const handleOverlayClick = (e) => {
    if (e.target.id === "modalOverlay") onClose();
  };

  if (!isOpen || !animal) return null;

  return (
    <div
      id="modalOverlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 px-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      style={{
        height: "calc(var(--vh, 1vh) * 100)",
      }}
    >
      {/* Outer container with hidden overflow to keep scroll inside rounded corners */}
      <div
        className="relative rounded-2xl bg-[rgba(255,255,255,0.9)] shadow-2xl max-w-3xl w-[90%] md:w-[70%] border-t-4 animate-fadeIn my-10 max-h-[90vh]"
        style={{
          color: "var(--color-text-dark)",
          borderColor: "var(--color-focus-primary)",
          overflow: "hidden",
        }}
      >
        {/* Scrollable inner wrapper */}
        <div className="custom-scrollbar overflow-y-auto max-h-[90vh]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-5 text-[var(--color-focus-primary)] text-5xl font-extrabold hover:scale-110 transition-transform"
            aria-label={t("animalModal.close")}
            title={t("animalModal.close")}
          >
            ×
          </button>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left - image */}
            <div className="h-72 md:h-full">
              <img
                src={animal.images[0]}
                alt={animal.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right - info & form */}
            <div className="p-6 flex flex-col justify-between">
              {/* Animal info */}
              <div>
                <h2 className="text-3xl text-[var(--color-focus-secondary)] font-bold mb-4">
                  {animal.name}
                </h2>

                <ul className="space-y-1 mb-6 text-[18px]">
                  <li>
                    <strong>{t("animalModal.age")}:</strong>{" "}
                    {animal.age[i18n.language]}
                  </li>
                  <li>
                    <strong>{t("animalModal.sex")}:</strong>{" "}
                    {animal.sex[i18n.language]}
                  </li>
                  <li>
                    <strong>{t("animalModal.size")}:</strong>{" "}
                    {animal.size[i18n.language]}
                  </li>
                  <li>
                    <strong>{t("animalModal.sterilized")}:</strong>{" "}
                    {animal.sterilized[i18n.language]}
                  </li>
                  <li>
                    <strong>{t("animalModal.personality")}:</strong>{" "}
                    {animal.personality[i18n.language]}
                  </li>
                </ul>
              </div>

              {/* Adoption interest section */}
              <div className="mt-4">
                <label className="flex items-center space-x-2 text-[18px]">
                  <input
                    type="checkbox"
                    checked={interested}
                    onChange={() => setInterested(!interested)}
                  />
                  <span>
                    {t("animalModal.interestedIn", { name: animal.name })}
                  </span>
                </label>

                {/* Show form if interested */}
                {interested && (
                  <div className="mt-4">
                    <AdoptionForm animalName={animal.name} onClose={onClose} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AnimalModal.propTypes = {
  animal: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AnimalModal;
