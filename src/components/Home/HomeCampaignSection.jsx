import { useTranslation } from "react-i18next";
import Button from "../Button";

const CampaignSection = () => {
  const { t } = useTranslation();
  const campaignImage = "/images/abandon1.webp";

  return (
    <section className="px-6">
    <div className="campaign-container flex flex-col px-0 md:px-0 lg:px-6 min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-12 max-w-6xl mx-auto mt-12">
      {/* Image wrapper: mobile first (top), desktop right */}
      <div className="flex justify-center w-full mb-6 min-[900px]:mb-0 min-[900px]:flex-1 min-[900px]:justify-end min-[900px]:order-2">
        <img
          src={campaignImage}
          alt={t("campaignSection.imageAlt")}
          className="campaign-image w-full max-w-full sm:max-w-lg min-[900px]:max-w-sm object-cover"
        />
      </div>

      {/* Campaign text content */}
      <div className="campaign-content  flex flex-col text-left min-[900px]:flex-1 min-[900px]:order-1">
        <h2 className="campaign-title text-[40px] font-bold text-[var(--color-text-dark)]">
          {t("campaignSection.title")}
        </h2>
        <p className="campaign-text mt-7 text-[20px] text-[var(--color-text-dark)]">
          {t("campaignSection.text")}
        </p>
        <Button
          to="/services"
          aria-label={t("campaignSection.button")}
          className="mt-6"
        >
          {t("campaignSection.button")}
        </Button>
      </div>
    </div>
    </section>
  );
};

export default CampaignSection;
