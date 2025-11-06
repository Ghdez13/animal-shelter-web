import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO/SEO";
import ServiceCard from "../components/Services/ServiceCard";
import Tips from "../components/Services/ServicesTips";
import SectionBackground from "../components/SectionBackground";
import BackgroundMobile from "../assets/images/background-mobile.webp";

const Services = () => {
  const [services, setServices] = useState([]); // Stores service card data
  const [loading, setLoading] = useState(true); // Loading state
  const { t } = useTranslation();

  // Dynamically load service cards data from JSON
  useEffect(() => {
    import("../assets/data/serviceCards.json")
      .then((module) => setServices(module.default))
      .catch((err) => console.error("Failed to load services:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* SEO meta tags */}
      <SEO
        title={`${t("servicesSection.title")} | JausPet`}
        description={t("servicesSection.description")}
        url="https://jauspet.vercel.app/services"
        image="/images/og-twitter-preview.webp"
      />

      {/* Main content wrapped with responsive background */}
      <SectionBackground
        image={BackgroundMobile}
        alt={t("servicesSection.backgroundAlt")}
      >
        <main className="px-6">
          {/* Main section title */}
          <div className="max-w-6xl mx-auto px-0 md:px-0 lg:px-6 md:mb-30">
            <h1 className="text-[50px] md:text-[70px] lg:text-[90px] font-extrabold mb-20 text-[var(--color-text-dark)]">
              {t("servicesSection.title")}
            </h1>
          </div>

          {/* Services grid */}
          {loading ? (
            <p className="text-center text-lg text-[var(--color-text-dark)]">
              {t("servicesSection.loading")}
            </p>
          ) : (
            <div className="max-w-6xl mx-auto px-0 md:px-0 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}

          {/* Tips section */}
          <div className="max-w-6xl mx-auto px-0 md:px-0 lg:px-6">
            <h2 className="text-[50px] font-bold mt-12 text-[var(--color-text-dark)]">
              {t("servicesSection.tipsTitle")}
            </h2>
          </div>
          <div className="mt-8">
            <Tips />
          </div>
        </main>
      </SectionBackground>
    </>
  );
};

export default Services;
