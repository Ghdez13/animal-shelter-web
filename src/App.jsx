import { Routes, Route } from "react-router-dom";
// Layout components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ScrollToTop from "./components/ScrollToTop";
// Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Volunteer from "./pages/Volunteer";
import Donations from "./pages/Donations";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Adoptions from "./pages/Adoptions";

const App = () => {
  return (
    <>
      {/* Fixed header/navbar at the top of the page */}
      <Header />

      {/* Automatically scrolls to top on route change */}
      <ScrollToTop />

      {/* Button to scroll back to top */}
      <ScrollToTopButton />

      {/* Main content container */}
      <main>
        {/* Routes for SPA navigation */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="volunteer" element={<Volunteer />} />
          <Route path="donations" element={<Donations />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/adoptions" element={<Adoptions />} />
        </Routes>
      </main>

      {/* Footer displayed on all pages */}
      <Footer />
    </>
  );
};

export default App;
