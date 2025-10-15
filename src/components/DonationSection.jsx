import Donation1 from "../assets/images/donation1.webp";
import Donation2 from "../assets/images/donation2.webp";
import BackgroundBanner from "../assets/images/BackgroundOrange.webp";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";

const DonationCard = ({ title, description, icon }) => (
  <div className="bg-[var(--color-bg-article)] rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
    <img
      src={icon}
      alt={title}
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

  return (
    <section className="w-full flex flex-col items-center">
      {/* === Image + Description section === */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl mb-16 rounded-2xl overflow-hidden">
        {/* Image (donation1) */}
        <img
          src={Donation1}
          alt="Donation"
          className="w-full md:w-1/2 object-cover h-64 md:h-auto"
        />

        {/* Orange background text area */}
        <div
          className="flex flex-col justify-center items-center text-start p-8 md:p-12"
          style={{
            backgroundColor: "var(--color-bg-orange)",
            color: "var(--color-text-light)",
          }}
        >
          <h2 className="text-[40px] font-semibold mb-4">
            {t("donationSection.donationIntroTitle")}
          </h2>
          <p className="max-w-md text-[20px]">{t("donationSection.donationIntro")}</p>
        </div>
      </div>

      {/* === Ways to donate cards === */}
      <div className="w-full max-w-6xl text-center mb-16">
        {/* Título general */}
        <h2 className="text-[40px] font-bold text-[var(--color-text-dark)] mb-10">
          {t("donationCards.title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t("donationCards.titleCard", { returnObjects: true }).map(
            (cardTitle, index) => (
              <DonationCard
                key={index}
                title={cardTitle} // Título de la tarjeta
                description={
                  t("donationCards.description", { returnObjects: true })[index]
                } // Descripción correspondiente
                icon={["/icons/bank.webp", "/icons/oxxo.webp", "/icons/transfer.webp", "/icons/amazon.webp"][index]} // Íconos asociados
              />
            )
          )}
        </div>
      </div>

      {/* === Volunteer banner === */}
<div className="w-full max-w-6xl mx-auto mb-20">
  <div
    className="h-64 md:h-80 flex flex-col justify-center text-center bg-cover bg-center relative rounded-xl"
    style={{ backgroundImage: `url(${BackgroundBanner})` }}
  >
    <div className="relative z-10 flex flex-col items-center px-6">
      <p className="text-[var(--color-text-light)] text-[40px] font-semibold mb-4">
        {t("donationSection.donationBanner")}
      </p>
      <Button link="/volunteer" className="btn-green">
        {t("donationSection.button")}
      </Button>
    </div>
  </div>
</div>

      {/* === Why donate section === */}
      <div className="flex flex-col-reverse md:flex-row items-center max-w-6xl gap-8 mb-12">
        {/* Text */}
        <div className="md:w-1/2 text-left">
          <h2 className="text-[40px] font-bold text-[var(--color-text-dark)] mb-4">
            {t("donationSection.whyDonateTitle")}
          </h2>
          <p className="text-[var(--color-text-dark)] text-[20px] leading-relaxed">
            {t("donationSection.whyDonateDescription")}
          </p>
        </div>

        {/* Image (donation2) */}
        <img src={Donation2} alt="Why donate" className="w-full md:w-1/2" />
      </div>
    </section>
  );
};

export default Donation;
