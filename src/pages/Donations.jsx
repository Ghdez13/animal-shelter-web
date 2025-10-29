import SectionBackground from "../components/SectionBackground";
import BackgroundMobile from "../assets/images/background-mobile.webp";
import { useTranslation } from "react-i18next";
import DonationSection from "../components/Donations/DonationSection";

const Donations = () => {
  const { t } = useTranslation();

  return (
    // Wrap main content with responsive background
    <SectionBackground image={BackgroundMobile} alt="Donations page background">
      <main className="px-6">
  <div className="w-full max-w-6xl mx-auto">
    {/* Page title */}
    <div className="max-w-6xl mx-auto md:px-6">
    <h1 className="text-[50px] font-extrabold mb-20 text-[var(--color-text-dark)]">
      {t("donationSection.title")}
    </h1>
    </div>

    {/* Inspirational message */}
    <div className="max-w-6xl mx-auto md:px-6">
    <p className="text-[20px] text-[var(--color-text-dark)]">
      {t("donationSection.description")}
    </p>
    </div>

    {/* DonationSection */}
    <DonationSection />
  </div>
</main>
    </SectionBackground>
  );
};

export default Donations;
