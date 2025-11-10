import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AdoptionForm from "./AdoptionForm";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const AnimalModal = ({ animal, isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const [interested, setInterested] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) setInterested(false);
  }, [isOpen]);

  // Close modal if overlay clicked
  const handleOverlayClick = (e) => {
    if (e.target.id === "modalOverlay") onClose();
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
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
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
          className="absolute top-3 right-4 z-20 text-(--color-focus-primary) text-5xl font-extrabold hover:scale-110 transition-transform"
          aria-label={t("animalModal.close")}
          title={t("animalModal.close")}
        >
          ×
        </button>

        {/* Inner scrollable content */}
        <div className="custom-scrollbar overflow-y-auto max-h-[90vh] px-1">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left - Swiper carousel */}
            <div className="relative h-72 md:h-full flex items-center justify-center">
              <Swiper
                modules={[Navigation, Pagination]}
                loop={images.length > 1}
                navigation={{
                  prevEl: ".swiper-button-prev-custom",
                  nextEl: ".swiper-button-next-custom",
                }}
                pagination={{
                  clickable: true,
                  bulletClass: "swiper-dot-custom",
                  bulletActiveClass: "swiper-dot-custom-active",
                }}
                className="h-full w-full"
              >
                {images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={`${animal.name}, image ${idx + 1} of ${
                        images.length
                      }`}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}

                {/* Custom arrows - always in DOM, hidden on mobile */}
                <div className="swiper-button-prev-custom hidden md:flex">
                  ‹
                </div>
                <div className="swiper-button-next-custom hidden md:flex">
                  ›
                </div>
              </Swiper>
            </div>

            {/* Right - info & form */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl text-(--color-focus-secondary) font-bold mb-4">
                  {animal.name}
                </h2>

                {/* Animal details */}
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
