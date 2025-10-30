import Donation1 from "../../assets/images/donation1.webp";
import Donation2 from "../../assets/images/donation2.webp";
import BackgroundBanner from "../../assets/images/BackgroundOrange.webp";
import Button from "../Button";
import { useTranslation } from "react-i18next";

// Component for individual donation cards
const DonationCard = ({ title, description, icon }) => (
  <div className="bg-[var(--color-bg-article)] rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
    <img
      src={icon}
      alt={`${title} icon`}
      className="w-20 h-20 mb-3 object-contain"
    />
    <h3 className="text-[25px] font-semibold text-[var(--color-text-dark)] mb-2">
      {title}
    </h3>
    <p className="text-[20px] text-[var(--color-text-dark)]">{description}</p>
  </div>
);

const Donation = () => {
  const { t } = useTranslation();

  const donationIcons = [
    "/icons/bank.webp",
    "/icons/oxxo.webp",
    "/icons/transfer.webp",
    "/icons/amazon.webp",
  ];

  const donationTitles = t("donationCards.titleCard", { returnObjects: true });
  const donationDescriptions = t("donationCards.description", {
    returnObjects: true,
  });

  return (
    // Main container with same padding as footer and centered content
    <section className="w-full flex justify-center px-0 md:px-0 lg:px-6">
      {/* Central content wrapper */}
      <div className="w-full max-w-6xl flex flex-col items-center">
        {/* Intro Section with image and orange background text */}
        <div className="flex flex-col md:flex-row w-full rounded-2xl overflow-hidden mt-6">
          <img
            src={Donation1}
            alt="Donation intro"
            className="w-full md:w-1/2 object-cover h-64 md:h-auto"
          />
          <div
            className="flex flex-col justify-center items-center text-start p-6 md:p-13"
            style={{
              backgroundColor: "var(--color-bg-orange)",
              color: "var(--color-text-light)",
            }}
          >
            <h2 className="text-[40px] font-semibold mb-4">
              {t("donationSection.donationIntroTitle")}
            </h2>
            <p className="max-w-md text-[20px]">
              {t("donationSection.donationIntro")}
            </p>
          </div>
        </div>

        {/* Donation Cards Section */}
        <div className="w-full text-center mt-12">
          <h2 className="text-[40px] font-bold text-[var(--color-text-dark)] mb-10">
            {t("donationCards.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationTitles.map((title, index) => (
              <DonationCard
                key={index}
                title={title}
                description={donationDescriptions[index]}
                icon={donationIcons[index]}
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
              <p className="text-[40px] font-semibold text-[var(--color-text-light)] mb-4">
                {t("donationSection.donationBanner")}
              </p>
              <Button to="/volunteer" className="btn-green">
                {t("donationSection.button")}
              </Button>
            </div>
          </div>
        </div>

        {/* Why Donate Section */}
        <div className="w-full mt-24 flex flex-col-reverse md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 text-left flex flex-col justify-center">
            <h2 className="text-[40px] font-bold text-[var(--color-text-dark)] mb-4">
              {t("donationSection.whyDonateTitle")}
            </h2>
            <p className="text-[var(--color-text-dark)] text-[20px] leading-relaxed">
              {t("donationSection.whyDonateDescription")}
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <img
              src={Donation2}
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
