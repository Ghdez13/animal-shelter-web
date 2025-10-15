import { useTranslation } from "react-i18next";
import Button from "../components/Button";

const ServiceCard = ({ service }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language; // idioma actual

  return (
    <div className="bg-[var(--color-bg-article)] rounded-lg shadow-md py-[50px] px-[20px] flex flex-col items-start text-left hover:scale-105 transition-transform duration-300">
      {/* Header: icon + title */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={service.icon}
          alt={service.title[lang]}
          className="w-20 h-20 sm:w-28 sm:h-28"
        />
        <h2 className="text-[30px] font-bold text-[var(--color-text-dark)]">
          {service.title[lang]}
        </h2>
      </div>

      {/* Text */}
      <p className="mt-2 text-[20px] text-[var(--color-text-dark)]">
        {service.text[lang]}
      </p>

      {/* Button */}
      <div className="mt-2">
        <Button link={service.link}>{service.button[lang]}</Button>
      </div>
    </div>
  );
};

export default ServiceCard;
