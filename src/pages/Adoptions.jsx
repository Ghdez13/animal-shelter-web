import { useTranslation } from "react-i18next";
import SectionBackground from "../components/SectionBackground";
import BackgroundMobile from "../assets/images/background-mobile.webp";
import AdoptionsGallery from "../components/Adoptions/AdoptionsGallery";
import AdoptionCounter from "../components/Adoptions/AdoptionCounter";
import SEO from "../components/SEO/SEO";

const Adoptions = () => {
  const { t } = useTranslation();

  return (
    // Wrap main content with responsive mobile background
    <SectionBackground
      image={BackgroundMobile}
      alt={t("adoptions.backgroundAlt")}
    >
      {/* Reusable SEO component using i18n keys */}
      <SEO pageKey="adoptions" url="https://jauspet.vercel.app/adoptions" />

      <main className="px-6">
        {/* Page title */}
        <div className="max-w-6xl text-text-dark mx-auto mb-20 px-0 md:px-0 lg:px-6">
          <h1 className="text-[50px] md:text-[70px] lg:text-[90px] font-extrabold">
            {t("adoptions.adoptionsTitle")}
          </h1>
        </div>
        {/* Adoption counter */}
        <AdoptionCounter max={215} />
        {/* Gallery Section */}
        <AdoptionsGallery />
      </main>
    </SectionBackground>
  );
};

export default Adoptions;
