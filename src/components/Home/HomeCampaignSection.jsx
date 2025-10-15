//Imports
import { useTranslation } from "react-i18next";
import Button from "../Button";

const CampaignSection = () => {
  //Hooks
  const { t } = useTranslation();

  return (
    <div className="campaign-container flex flex-col items-center text-left px-6 py-8 lg:hidden">
      <img
        src="/images/abandon1.webp"
        alt={t("campaignSection.imageAlt")}
        className="campaign-image rounded-full shadow-lg shadow-gray-500/50"
      />
      <div className="campaign-content mt-7">
        <h2 className="campaign-title text-[40px] font-bold text-[var(--color-text-dark)]">
          {t("campaignSection.title")}
        </h2>
        <p className="campaign-text mt-7 text-[20px] text-[var(--color-text-dark)] max-w-md">
          {t("campaignSection.text")}
        </p>
        {/*Reusable button*/}
        <Button link="#">{t("campaignSection.button")}</Button>
      </div>
    </div>
  );
};

export default CampaignSection;
