import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AdoptionForm from "./AdoptionForm";

const AnimalModal = ({ animal, isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const [interested, setInterested] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setInterested(false);
      setCurrentImage(0);
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target.id === "modalOverlay") onClose();
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!isOpen || !animal) return null;

  // Choose image set based on device type
  const images =
    isMobile && animal.images.mobile?.length > 0
      ? animal.images.mobile
      : animal.images.desktop;

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
      <div
        className="relative rounded-2xl bg-[rgba(255,255,255,0.9)] shadow-2xl max-w-3xl w-[90%] md:w-[70%] border-t-4 animate-fadeIn my-10 max-h-[90vh]"
        style={{
          color: "var(--color-text-dark)",
          borderColor: "var(--color-focus-primary)",
          overflow: "hidden",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 z-20 text-[var(--color-focus-primary)] text-5xl font-extrabold hover:scale-110 transition-transform"
          aria-label={t("animalModal.close")}
          title={t("animalModal.close")}
        >
          ×
        </button>

        {/* Inner scrollable content */}
        <div className="custom-scrollbar overflow-y-auto max-h-[90vh] px-1">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left - carousel */}
            <div className="relative h-72 md:h-full flex items-center justify-center">
              <img
                src={images[currentImage]}
                alt={`${animal.name}, imagen ${currentImage + 1} de ${images.length}`}
                className="w-full h-full object-cover rounded-lg transition-all duration-300"
                loading="lazy"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 bg-white/60 hover:bg-white text-gray-800 rounded-full p-2 transition"
                    aria-label={t("animalModal.previousImage")}

                  >
                    ‹
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-2 bg-white/60 hover:bg-white text-gray-800 rounded-full p-2 transition"
                    aria-label={t("animalModal.nextImage")}

                  >
                    ›
                  </button>
                </>
              )}

              {images.length > 1 && (
                <div className="absolute bottom-3 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImage
                          ? "bg-[var(--color-focus-primary)]"
                          : "bg-gray-300"
                      }`}
                      aria-label={`${t("animalModal.goToImage")} ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right - info & form */}
            <div className="p-6 flex flex-col justify-between">
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

              {/* Adoption interest */}
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
