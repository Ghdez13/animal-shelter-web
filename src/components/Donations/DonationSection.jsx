import { useState, useEffect } from "react";
import LazyImage from "../LazyImage";
import Donation1 from "../../assets/images/donation1.webp";
import Donation1Mobile from "../../assets/images/donation1Mobile.webp";
import Donation2 from "../../assets/images/donation2.webp";
import Donation2Mobile from "../../assets/images/donation2Mobile.webp";
import BackgroundBanner from "../../assets/images/BackgroundOrange.webp";
import Button from "../Button";
import { useTranslation } from "react-i18next";

// Component for individual donation cards
const DonationCard = ({
  title,
  description,
  icon,
  backIcon,
  isFlipped,
  onFlip,
  t,
  isMobile,
  index,
}) => (
  <div
    onClick={onFlip}
    className="relative w-full h-96 cursor-pointer perspective"
  >
    {/* Flip container */}
    <div
      className={`relative w-full h-full duration-700 transform-style-preserve-3d ${
        isFlipped ? "rotate-y-180" : ""
      }`}
    >
      {/* Front side */}
      <div className="absolute w-full h-full bg-(--color-bg-article) rounded-2xl shadow-md p-6 flex flex-col justify-center items-center hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 backface-hidden overflow-hidden will-change-transform">
        <LazyImage
          src={icon}
          alt={`${title} icon`}
          className="w-20 h-20 mb-3 object-contain"
        />
        <h3 className="text-[25px] font-semibold text-text-dark mb-2 text-center">
          {title}
        </h3>
        <p className="text-[20px] text-text-dark leading-snug text-left max-w-[85%]">
          {description}
        </p>
        {/* Blinking text shown only on the first card */}
        {index === 0 && (
          <span className="mt-4 text-(--color-text-tips) text-lg font-bold animate-blink">
            ✨ {t("donationCards.clickToFlip")} ✨
          </span>
        )}
      </div>

      {/* Back side */}
      <div className="absolute w-full h-full bg-(--color-bg-article) rounded-2xl shadow-md flex flex-col justify-center items-center hover:shadow-lg hover:-translate-y-1 rotate-y-180 backface-hidden p-6 border border-gray-300 overflow-hidden will-change-transform">
        <LazyImage
          src={isMobile ? backIcon.mobile : backIcon.desktop}
          alt="Construction icon"
          className="w-20 h-20 mb-3 object-contain"
        />
        <h3 className="text-[25px] font-semibold text-text-dark mb-2 text-center">
          {title}
        </h3>
        <p className="text-[20px] text-text-dark leading-snug text-left max-w-[85%]">
          {t("donationCards.message")}
        </p>
      </div>
    </div>
  </div>
);

// Main Donation component
const Donation = () => {
  const { t } = useTranslation();
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const donationIconsDesktop = [
    "/icons/bank.webp",
    "/icons/oxxo.webp",
    "/icons/transfer.webp",
    "/icons/amazon.webp",
  ];

  const donationIconsMobile = [
    "/icons/bankMobile.webp",
    "/icons/oxxoMobile.webp",
    "/icons/transferMobile.webp",
    "/icons/amazonMobile.webp",
  ];

  const backIcon = {
    desktop: "/icons/construction.webp",
    mobile: "/icons/constructionMobile.webp",
  };

  const donationTitles = t("donationCards.titleCard", { returnObjects: true });
  const donationDescriptions = t("donationCards.cardDescription", {
    returnObjects: true,
  });

  const handleFlip = (index) => {
    setFlippedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="w-full flex justify-center px-0 md:px-0 lg:px-6">
      <div className="w-full max-w-6xl flex flex-col items-center">
        {/* Intro Section with image and text */}
        <div className="flex flex-col md:flex-row w-full rounded-2xl overflow-hidden mt-6">
          {/* Image container */}
          <div className="flex-1">
            <LazyImage
              src={isMobile ? Donation1Mobile : Donation1}
              alt="Donation intro"
              className="w-full h-full object-contain md:object-cover"
            />
          </div>

          {/* Text container */}
          <div
            className="flex-1 flex flex-col justify-center items-center md:items-start text-left md:text-left p-6 md:p-12"
            style={{
              backgroundColor: "var(--color-bg-orange)",
              color: "var(--color-text-light)",
            }}
          >
            <h2 className="text-[40px] font-semibold mb-4">
              {t("donationSection.donationIntroTitle")}
            </h2>
            <p className="text-[20px]">{t("donationSection.donationIntro")}</p>
          </div>
        </div>

        {/* Donation Cards Section */}
        <div className="w-full text-text-dark text-center mt-12">
          <h2 className="text-[40px] font-bold mb-10">
            {t("donationCards.title")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {donationTitles.map((title, index) => (
              <DonationCard
                key={index}
                index={index}
                title={title}
                description={donationDescriptions[index]}
                icon={
                  isMobile
                    ? donationIconsMobile[index]
                    : donationIconsDesktop[index]
                }
                backIcon={backIcon}
                isFlipped={flippedIndex === index}
                onFlip={() => handleFlip(index)}
                t={t}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>

        {/* Donation Banner Section */}
        <div className="w-full mt-24">
          <div className="relative rounded-xl overflow-hidden h-64 md:h-50">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${BackgroundBanner})` }}
            />
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 py-4">
              <p className="text-[40px] font-semibold text-(--color-text-light) mb-4">
                {t("donationSection.donationBanner")}
              </p>
              <Button
                to="/events"
                aria-label={t("donationSection.button")}
                className="btn-green"
              >
                {t("donationSection.go")}
              </Button>
            </div>
          </div>
        </div>

        {/* Why Donate Section */}
        <div className="w-full mt-24 flex text-text-dark flex-col-reverse md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 text-left flex flex-col justify-center">
            <h2 className="text-[40px] font-bold mb-4">
              {t("donationSection.whyDonateTitle")}
            </h2>
            <p className="text-[20px] leading-relaxed">
              {t("donationSection.whyDonateDescription")}
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <LazyImage
              src={isMobile ? Donation2Mobile : Donation2}
              alt="Why donate"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;
