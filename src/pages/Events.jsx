import { useTranslation } from "react-i18next";
import SectionBackground from "../components/SectionBackground";
import BackgroundMobile from "../assets/images/background-mobile.webp";
import AdoptionEvents from "../components/Events/AdoptionEvents";
import EventsCarousel from "../components/Events/EventCarousel";
import SEO from "../components/SEO/SEO";

const Events = () => {
  const { t } = useTranslation();

  return (
    // Wrap main content with responsive mobile background
    <SectionBackground image={BackgroundMobile} alt={t("events.backgroundAlt")}>
      {/* Reusable SEO component using i18n keys */}
      <SEO
        pageKey="events"
        url="https://jauspet.vercel.app/events"
        image="/images/og-twitter-preview.webp"
      />

      <main className="px-6">
        {/* Page title */}
        <div className="max-w-6xl text-text-dark mx-auto mb-20 px-0 md:px-0 lg:px-6">
          <h1 className="text-[50px] md:text-[70px] lg:text-[90px] font-extrabold">
            {t("events.eventsTitle")}
          </h1>
        </div>

        {/* Events list */}
        <div className="max-w-6xl font-bold text-text-dark mx-auto mb-0 mt-12 px-0 md:px-0 lg:px-6">
          <p className="text-[20px]">{t("events.description")}</p>
        </div>
        <AdoptionEvents />

        {/* Events photos */}
        <div className="max-w-6xl text-text-dark mx-auto mb-0 mt-12 px-0 md:px-0 lg:px-6">
          <h2 className="text-[40px]  font-extrabold">
            {t("events.carouselTitle")}
          </h2>
        </div>
        <EventsCarousel />
      </main>
    </SectionBackground>
  );
};

export default Events;
