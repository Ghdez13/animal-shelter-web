import { useTranslation } from "react-i18next";
import AboutUsValues from "../components/AboutUs/AboutUsValues";
import SectionBackground from "../components/SectionBackground";
import BackgroundMobile from "../assets/images/background-mobile.webp";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    // Wrap main content with a responsive background image
    <SectionBackground image={BackgroundMobile} alt="About Us background">
      <main className="px-6 md:px-12 py-8">
        {/* Page title */}
        <h1 className="text-[50px] font-extrabold mb-20 text-[var(--color-text-dark)]">
          {t("aboutUs.title")}
        </h1>

        {/* Core values of the organization */}
        <AboutUsValues />
      </main>
    </SectionBackground>
  );
};

export default AboutUs;
