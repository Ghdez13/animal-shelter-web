import { useTranslation } from "react-i18next";
import ContactForm from "../components/Contact/ContactForm";
import SectionBackground from "../components/SectionBackground";
import BackgroundBanner from "../assets/images/BackgroundOrange.webp";
import BackgroundMobile from "../assets/images/background-mobile.webp";
import Button from "../components/Button";

const Contact = () => {
  const { t } = useTranslation();

  return (
    // Wrap main content with responsive mobile background
    <SectionBackground image={BackgroundMobile} alt="Contact page background">
      <main className="px-6 md:px-12 py-8">
        {/* Page title */}
        <h1 className="text-[50px] font-extrabold mb-20 text-[var(--color-text-dark)]">
          {t("contact.title")}
        </h1>

        {/* Page description */}
        <div className="mb-20">
          <p className="text-[20px] text-[var(--color-text-dark)]">
            {t("contact.description")}
          </p>
        </div>

        {/* Reusable contact form component */}
        <ContactForm />

        {/* Promotional banner linking to adoption/services */}
        <section aria-label={t("contact.bannerDescription")} className="mb-20">
          <div
            className="w-full h-64 md:h-80 flex flex-col justify-center items-center text-center bg-cover bg-center relative rounded-xl"
            style={{ backgroundImage: `url(${BackgroundBanner})` }}
          >
            <div className="relative z-10 px-4">
              {/* Banner description */}
              <p className="text-[var(--color-text-light)] text-[40px] font-semibold mb-4">
                {t("contact.bannerDescription")}
              </p>
              {/* Button linking to services/adoption page */}
              <Button to="/services" className="btn-green">
                {t("contact.button")}
              </Button>
            </div>
          </div>
        </section>
      </main>
    </SectionBackground>
  );
};

export default Contact;
