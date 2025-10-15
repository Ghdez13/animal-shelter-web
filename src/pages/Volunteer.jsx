import SectionBackground from "../components/SectionBackground";
import BackgroundMobile from "../assets/images/background-mobile.webp";
import BackgroundBanner from "../assets/images/BackgroundOrange.webp";
import { useTranslation } from "react-i18next";
import VolunteerCarousel from "../components/VolunteerCarousel";
import VolunteerReflection from "../components/VolunteerReflection";
import VolunteerForm from "../components/VolunteerForm";
import Button from "../components/Button";

const Volunteer = () => {
  const { t } = useTranslation();

  return (
    <SectionBackground image={BackgroundMobile}>
      <section className="p-6">
        {/* Título principal de la sección */}
        <h1 className="text-[50px] font-bold mb-6 text-[var(--color-text-dark)]">
          {t("volunteerSection.title")}
        </h1>
        {/* Volunteering inspiratonal message*/}
        <div>
          <p className="text-[20px]  text-[var(--color-text-dark)]">
            {t("volunteerSection.introPhrase")}
          </p>
        </div>
        {/* Images carousel*/}
        <VolunteerCarousel />
        {/* Volunteer form*/}
        <h2 className="text-[40px] font-bold mb-6 text-[var(--color-text-dark)]">
          {t("form.title")}
        </h2>
        <p className="text-[20px] text-[var(--color-text-dark)]">
          {t("form.description")}
        </p>
        <VolunteerForm />
        {/* Banner to Donation*/}
        <div className=" mb-20 ">
          <div
            className="w-full h-64 md:h-80 flex flex-col justify-center items-center text-center bg-cover bg-center relative rounded-xl"
            style={{ backgroundImage: `url(${BackgroundBanner})` }}
          >
            <div className="relative z-10 px-4">
              <p className="text-[var(--color-text-light)] text-[40px] font-semibold mb-4">
                {t("volunteerSection.bannerDescription")}
              </p>
              <Button link="/donations" className="btn-green">
                {t("volunteerSection.button")}
              </Button>
            </div>
          </div>
        </div>
        {/*Volunteer Reflection*/}
        <VolunteerReflection />
      </section>
    </SectionBackground>
  );
};

export default Volunteer;
