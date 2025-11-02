import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import AutoCloseModal from "../AutoCloseModal";

const ServiceCard = ({ service }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [showModal, setShowModal] = useState(false);

  // Localized texts
  const title = service.title[lang] || service.title["es"];
  const text = service.text[lang] || service.text["es"];
  const buttonText = service.button[lang] || service.button["es"];

  // Identify which services are under construction
  const isUnderConstruction =
    service.link === "/hotel" ||
    service.link === "/campanas" ||
    service.link === "/perdidos";

  return (
    <>
      {/* Card Container */}
      <div className="bg-[var(--color-bg-article)] rounded-lg shadow-md py-[50px] px-[20px] flex flex-col items-start text-left hover:-translate-y-1 transition-transform duration-300">
        {/* Header: icon + title */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={service.icon}
            alt={title}
            className="w-20 h-20 sm:w-28 sm:h-28"
          />
          <h2 className="text-[25px] md:text-[30px] font-bold text-[var(--color-text-dark)] break-words text-start">
            {title}
          </h2>
        </div>

        {/* Description */}
        <p className="mt-2 text-[20px] text-[var(--color-text-dark)]">{text}</p>

        {/* Action Button */}
        <div className="mt-2">
          <Button
            to={isUnderConstruction ? undefined : service.link}
            onClick={isUnderConstruction ? () => setShowModal(true) : undefined}
            aria-label={title}
          >
            {buttonText}
          </Button>
        </div>
      </div>

      {/* Modal alert for under construction sections */}
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

