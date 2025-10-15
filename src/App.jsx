import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Volunteer from "./pages/Volunteer";
import Donations from "./pages/Donations";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <>
      <Header />

      <ScrollToTopButton />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="services/" element={<Services />} />
        <Route path="volunteer/" element={<Volunteer />} />
        <Route path="donations/" element={<Donations />} />
        <Route path="about-us/" element={<AboutUs />} />
        <Route path="contact/" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
};
export default App;
