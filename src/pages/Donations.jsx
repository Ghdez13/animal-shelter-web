import SectionBackground from "../components/SectionBackground";
import BackgroundMobile from "../assets/images/background-mobile.webp";
import { useTranslation } from "react-i18next";
import DonationSection from "../components/DonationSection";

const Donations = () => {
  const { t } = useTranslation();

  return (
    <SectionBackground image={BackgroundMobile}>
      <section className="p-6">
        <h1 className="text-[50px] font-bold mb-6 text-[var(--color-text-dark)]">
          {t("donationSection.title")}
        </h1>
        {/* Donating inspirational message*/}
        <div className="mb-18">
          <p className="text-[20px]  text-[var(--color-text-dark)]">
            {t("donationSection.description")}
          </p>
        </div>
        {/* Donating section*/}
        <DonationSection />
      </section>
    </SectionBackground>
  );
};

export default Donations;
