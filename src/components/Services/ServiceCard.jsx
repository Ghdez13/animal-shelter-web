import { useTranslation } from "react-i18next";
import Button from "../Button";

const ServiceCard = ({ service }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // Fallback values in case translation is missing
  const title = service.title[lang] || service.title["es"];
  const text = service.text[lang] || service.text["es"];
  const buttonText = service.button[lang] || service.button["es"];

  return (
    <div className="bg-[var(--color-bg-article)] rounded-lg shadow-md py-[50px] px-[20px] flex flex-col items-start text-left hover:scale-105 transition-transform duration-300">
      {/* Header: icon + title */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={service.icon}
          alt={title}
          className="w-20 h-20 sm:w-28 sm:h-28"
        />
        <h2 className="text-[25px] sm:text-[25px] md:text-[30px] font-bold text-[var(--color-text-dark)] break-words">
          {title}
        </h2>
      </div>

      {/* Text */}
      <p className="mt-2 text-[20px] text-[var(--color-text-dark)]">{text}</p>

      {/* Button */}
      <div className="mt-2">
        <Button to={service.link} aria-label={title}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
