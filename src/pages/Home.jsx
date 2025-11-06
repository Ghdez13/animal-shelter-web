import Hero from "../components/Home/HomeHero";
import Cards from "../components/Home/HomeCards";
import CampaignSection from "../components/Home/HomeCampaignSection";
import TestimonialSlider from "../components/Home/HomeTestimonialsSlider";
import SEO from "../components/SEO/SEO";

const Home = () => {
  return (
    <>
      {/* SEO meta tags */}
      <SEO
        pageKey="home" // Clave del JSON para traducir title y description
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
