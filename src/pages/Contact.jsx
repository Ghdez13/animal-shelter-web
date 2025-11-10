import { useTranslation } from "react-i18next";
import ContactForm from "../components/Contact/ContactForm";
import SectionBackground from "../components/SectionBackground";
import BackgroundBanner from "../assets/images/BackgroundOrange.webp";
import BackgroundMobile from "../assets/images/background-mobile.webp";
import Button from "../components/Button";
import SEO from "../components/SEO/SEO";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Reusable SEO component using i18n keys */}
      <SEO
        pageKey="contact"
        url="https://jauspet.vercel.app/contact"
        image="/images/og-twitter-preview.webp"
      />

      {/* Wrap main content with responsive mobile background */}
      <SectionBackground
        image={BackgroundMobile}
        alt={t("contact.backgroundAlt")}
      >
        <main className="px-6">
          {/* Page title */}
          <div className="max-w-6xl text-text-dark mx-auto px-0 md:px-0 lg:px-6 md:mb-30">
            <h1 className="text-[50px] md:text-[70px] lg:text-[90px] font-extrabold mb-20">
              {t("contact.contactTitle")}
            </h1>
          </div>

          {/* Reusable contact form component */}
          <section className="text-text-dark mt-12">
            <div className="max-w-6xl mx-auto px-0 md:px-0 lg:px-6 md:mb-40">
              <p className="text-[20px]">{t("contact.formDescription")}</p>
              <ContactForm />
            </div>
          </section>

          {/* Banner linking to adoption */}
          <section
            aria-label={t("contact.bannerDescription")}
            className="mt-24"
          >
            <div className="max-w-6xl mx-auto px-0 md:px-0 lg:px-6">
              <div className="relative rounded-xl overflow-hidden h-64 md:h-50">
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${BackgroundBanner})` }}
                />

                {/* Banner adoption */}
                <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 py-4 h-full">
                  <p className="text-[40px] font-semibold text-(--color-text-light) mb-4">
                    {t("contact.bannerDescription")}
                  </p>
                  <Button
                    to="/adoptions"
                    aria-label={t("contact.button")}
                    className="btn-green"
                  >
                    {t("contact.go")}
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </SectionBackground>
    </>
  );
};

export default Contact;
