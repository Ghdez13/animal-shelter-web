import SectionBackground from "../components/SectionBackground";
import BackgroundMobile from "../assets/images/background-mobile.webp";
import BackgroundBanner from "../assets/images/BackgroundOrange.webp";
import { useTranslation } from "react-i18next";
import VolunteerCarousel from "../components/Volunteer/VolunteerCarousel";
import VolunteerReflection from "../components/Volunteer/VolunteerReflection";
import VolunteerForm from "../components/Volunteer/VolunteerForm";
import Button from "../components/Button";
import SEO from "../components/SEO/SEO";

const Volunteer = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* SEO meta tags */}
      <SEO
        pageKey="volunteerSection"
        url="https://jauspet.vercel.app/volunteer"
        image="/images/og-twitter-preview.webp"
      />

      <SectionBackground
        image={BackgroundMobile}
        alt={t("volunteerSection.backgroundAlt")}
      >
        {/* Main section with bottom padding to respect footer */}
        <main className="px-6">
          {/* Main section title */}
          <div className="max-w-6xl mx-auto px-0 md:px-0 lg:px-6 md:mb-30">
            <h1 className="text-[50px] md:text-[70px] lg:text-[90px] font-extrabold mb-20 text-[var(--color-text-dark)]">
              {t("volunteerSection.title")}
            </h1>
          </div>

          {/* Volunteering introductory message */}
          <div className="max-w-6xl mx-auto px-0 md:px-0 lg:px-6">
            <p className="text-[20px] text-[var(--color-text-dark)]">
              {t("volunteerSection.description")}
            </p>
          </div>

          {/* Images carousel */}
          <VolunteerCarousel />

          {/* Volunteer form */}
          <section aria-labelledby="volunteer-form-title" className="mt-12">
            <div className="max-w-6xl mx-auto px-0 md:px-0 lg:px-6">
              <h2
                id="volunteer-form-title"
                className="text-[40px] font-bold mb-6 text-[var(--color-text-dark)]"
              >
                {t("form.title")}
              </h2>
              <p className="text-[20px] text-[var(--color-text-dark)]">
                {t("form.description")}
              </p>
              <VolunteerForm />
            </div>
          </section>

          {/* Banner linking to Donations section */}
          <section className="mt-24">
            <div className="max-w-6xl mx-auto px-0 md:px-0 lg:px-6">
              <div className="relative rounded-xl overflow-hidden h-64 md:h-50">
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${BackgroundBanner})` }}
                />

                {/* Content with controlled padding */}
                <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 py-4">
                  <p className="text-[40px] md:text-[40px] font-semibold text-[var(--color-text-light)] mb-4">
                    {t("volunteerSection.bannerDescription")}
                  </p>
                  <Button to="/donations" className="btn-green">
                    {t("volunteerSection.button")}
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Volunteer reflections/testimonials */}
          <VolunteerReflection />
        </main>
      </SectionBackground>
    </>
  );
};

export default Volunteer;
