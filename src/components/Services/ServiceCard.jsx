import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import AutoCloseModal from "../AutoCloseModal";

const ServiceCard = ({ service }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen safely
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Localized texts
  const title = service.title[lang] || service.title["es"];
  const text = service.text[lang] || service.text["es"];
  const ariaLabelText = service.button[lang] || service.button["es"]; // Texto largo para accesibilidad y SEO
  const buttonText = service.go?.[lang] || service.go?.["es"] || "Ver más"; // Texto corto visible en el botón

  // Identify which services are under construction
  const isUnderConstruction =
    service.link === "/hotel" ||
    service.link === "/campaigns" ||
    service.link === "/lostFound";

  return (
    <>
      <div className="bg-[var(--color-bg-article)] rounded-lg shadow-md py-[50px] px-[20px] flex flex-col items-start text-left hover:-translate-y-1 transition-transform duration-300">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={isMobile ? service.iconMobile || service.icon : service.icon}
            alt={title}
            className="w-20 h-20 sm:w-28 sm:h-28"
          />
          <h2 className="text-[25px] md:text-[30px] font-bold text-[var(--color-text-dark)] break-words text-start">
            {title}
          </h2>
        </div>

        <p className="mt-2 text-[20px] text-[var(--color-text-dark)]">{text}</p>

        <div className="mt-2">
          <Button
            to={isUnderConstruction ? undefined : service.link}
            onClick={isUnderConstruction ? () => setShowModal(true) : undefined}
            aria-label={ariaLabelText}
          >
            {buttonText}
          </Button>
        </div>
      </div>

      {showModal && (
        <AutoCloseModal
          type="sectionUnderConstruction"
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ServiceCard;
