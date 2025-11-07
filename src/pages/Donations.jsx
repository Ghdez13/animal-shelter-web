import SectionBackground from "../components/SectionBackground";
import BackgroundMobile from "../assets/images/background-mobile.webp";
import { useTranslation } from "react-i18next";
import DonationSection from "../components/Donations/DonationSection";
import SEO from "../components/SEO/SEO";

const Donations = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Reusable SEO component using i18n keys */}
      <SEO
        pageKey="donationSection"
        url="https://jauspet.vercel.app/donations"
        image="/images/og-twitter-preview.webp"
      />

      {/* Page layout with responsive background */}
      <SectionBackground
        image={BackgroundMobile}
        alt={t("donationSection.backgroundAlt")}
      >
        <main className="px-6">
          <div className="w-full text-[var(--color-text-dark)] max-w-6xl mx-auto">
            {/* Page title */}
            <div className="max-w-6xl mx-auto px-0 md:px-0 lg:px-6 md:mb-30">
              <h1 className="text-[50px] md:text-[70px] lg:text-[90px] font-extrabold mb-20">
                {t("donationSection.donationTitle")}
              </h1>
            </div>

            {/* Inspirational message */}
            <div className="max-w-6xl mx-auto px-0 md:px-0 lg:px-6">
              <p className="text-[20px]">
                {t("donationSection.inspirationalDescription")}
              </p>
            </div>

            {/* Donation section */}
            <DonationSection />
          </div>
        </main>
      </SectionBackground>
    </>
  );
};

export default Donations;
