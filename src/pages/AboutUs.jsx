import { useTranslation } from "react-i18next";
import AboutUsValues from "../components/AboutUs/AboutUsValues";
import SectionBackground from "../components/SectionBackground";
import BackgroundMobile from "../assets/images/background-mobile.webp";
import SEO from "../components/SEO/SEO";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    // Wrap page content with a responsive background
    <SectionBackground
      image={BackgroundMobile}
      alt={t("aboutUs.backgroundAlt")}
    >
      {/* Reusable SEO component using i18n keys */}
      <SEO
        pageKey="aboutUs"
        url="https://jauspet.vercel.app/about"
        image="/images/og-twitter-preview.webp"
      />

      <main className="px-6">
        {/* Page title */}
        <div className="max-w-6xl mx-auto text-[var(--color-text-dark)] px-0 md:px-0 lg:px-6 md:mb-30">
          <h1 className="text-[50px] md:text-[70px] lg:text-[90px] font-extrabold mb-20">
            {t("aboutUs.aboutUsTitle")}
          </h1>
        </div>

        {/* Core values section */}
        <AboutUsValues />
      </main>
    </SectionBackground>
  );
};

export default AboutUs;
