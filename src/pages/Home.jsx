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
        pageKey="home" 
        url="https://jauspet.vercel.app/"
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
