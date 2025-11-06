import Hero from "../components/Home/HomeHero";
import Cards from "../components/Home/HomeCards";
import CampaignSection from "../components/Home/HomeCampaignSection";
import TestimonialSlider from "../components/Home/HomeTestimonialsSlider";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO/SEO";

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* SEO meta tags */}
      <SEO
        title={`${t("home.title")} | JausPet`}
        description={t("home.description")}
        url="https://jauspet.vercel.app/"
        image="/images/og-twitter-preview.webp"
      />

      {/* Main content of the homepage */}
      <main>
        {/* Hero/banner section */}
        <Hero />

        {/* Informational cards section */}
        <Cards />

        {/* Campaign promotion section */}
        <CampaignSection />

        {/* Testimonials slider section */}
        <TestimonialSlider />
      </main>
    </>
  );
};

export default Home;
