import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ServiceCard from "../components/ServiceCard";
import Tips from "../components/Tips";
import SectionBackground from "../components/SectionBackground";
import BackgroundMobile from "../assets/images/background-mobile.webp";

const Services = () => {
  const [services, setServices] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    import("../assets/data/serviceCards.json").then((module) =>
      setServices(module.default)
    );
  }, []);

  return (
    <SectionBackground image={BackgroundMobile}>
      <section className="p-6">
        {/* Título principal de la sección */}
        <h1 className="text-[50px] font-bold mb-6 text-[var(--color-text-dark)]">
          {t("servicesSection.title")}
        </h1>

        {/* Grid de cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        {/* Sección de Tips */}
        {/* Título principal de section tips */}
        <h1 className="text-[50px] font-bold mt-16 text-[var(--color-text-dark)]">
          {t("servicesSection.tipsTittle")}
        </h1>
        <div className="mt-8">
          <Tips />
        </div>
      </section>
    </SectionBackground>
  );
};

export default Services;
