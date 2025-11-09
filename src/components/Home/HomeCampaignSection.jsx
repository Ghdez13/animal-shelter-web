import { useTranslation } from "react-i18next";
import Button from "../Button";
import LazyImage from "../LazyImage";

const CampaignSection = () => {
  const { t } = useTranslation();

  return (
    <section className="px-6 ">
      <div className="campaign-container text-text-dark flex flex-col px-0 md:px-0 lg:px-6 min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-12 max-w-6xl mx-auto mt-12">
        {/* Image wrapper: mobile first (top), desktop right */}
        <div className="flex justify-center w-full mb-6 min-[900px]:mb-0 min-[900px]:flex-1 min-[900px]:justify-end min-[900px]:order-2">
          {/* Mobile image */}
          <LazyImage
            src="/images/abandon1Mobile.webp"
            alt={t("campaignSection.imageAlt") + " mobile"}
            className="block md:hidden w-full max-w-full sm:max-w-md object-cover"
          />
          {/* Desktop image */}
          <LazyImage
            src="/images/abandon1.webp"
            alt={t("campaignSection.imageAlt") + " desktop"}
            className="hidden md:block w-full max-w-md lg:max-w-lg object-cover"
          />
        </div>

        {/* Campaign text content */}
        <div className="campaign-content texttext-dark flex flex-col text-left min-[900px]:flex-1 min-[900px]:order-1">
          <h2 className="campaign-title text-[40px] font-bold ">
            {t("campaignSection.title")}
          </h2>
          <p className="campaign-text mt-7 text-[20px]">
            {t("campaignSection.text")}
          </p>
          <Button
            to="/services"
            aria-label={t("campaignSection.button")}
            className="mt-6"
          >
            {t("campaignSection.go")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CampaignSection;
