import { useTranslation } from "react-i18next";
import AboutUsOurHistory from "../../assets/images/aboutUsOurHistory.webp";
import AboutUsOurHistoryMobile from "../../assets/images/aboutUsOurHistoryMobile.webp";
import LazyImage from "../LazyImage";
import aboutUs from "../../assets/data/aboutUs.json";

const AboutUsValues = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const data = aboutUs[lang];

  // Titles and descriptions for each value card from i18n
  const titles = t("aboutUsValues.title", { returnObjects: true }) || [];
  const descriptions =
    t("aboutUsValues.description", { returnObjects: true }) || [];

  // Icons for values, desktop by default
  const iconsDesktop = [
    "/icons/animalWelfare.webp",
    "/icons/respect.webp",
    "/icons/loveHelping.webp",
    "/icons/passion.webp",
  ];

  // Mobile versions of icons
  const iconsMobile = [
    "/icons/animalWelfareMobile.webp",
    "/icons/respectMobile.webp",
    "/icons/loveHelpingMobile.webp",
    "/icons/passionMobile.webp",
  ];

  // Detect mobile screen for responsive icons
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  // Combine titles, descriptions, and icons into an array of value objects
  const values = titles.map((title, index) => ({
    title,
    description: descriptions[index],
    icon: isMobile ? iconsMobile[index] : iconsDesktop[index],
  }));

  return (
    <section className="bg-transparent text-[var(--color-text-dark)]">
      {/* === Values section === */}
      <div className="max-w-6xl mx-auto px-0 md:px-0 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        {values.map(({ title, description, icon }, index) => (
          <div key={index} className="flex flex-col items-start text-left">
            {/* Value icon and title */}
            <div className="flex items-center gap-3 mb-2">
              <LazyImage
                src={icon}
                alt={`${title} icon`}
                className="w-20 h-20 object-contain"
              />
              <h2 className="text-[25px]  md:text-[30px] font-bold">{title}</h2>
            </div>
            {/* Value description */}
            <p className="text-[20px] ">{description}</p>
          </div>
        ))}
      </div>

      {/* === Our Story section === */}
      <div className="flex flex-col px-0 md:px-0 lg:px-6 lg:flex-row w-full max-w-6xl mx-auto rounded-2xl overflow-hidden mt-6">
        {/* Section image with responsive support using srcSet */}
        <LazyImage
          src={AboutUsOurHistory} // default desktop
          srcSet={`${AboutUsOurHistoryMobile} 600w, ${AboutUsOurHistory} 1600w`}
          sizes="(max-width: 1139px) 600px, 1600px"
          alt={t("aboutUsValues.imageAlt", "Donation helping animals")}
          className="w-full lg:w-1/2 object-cover h-80 lg:h-auto lg:rounded-l-2xl"
        />

        {/* Text content area */}
        <div
          className="flex flex-col items-center justify-center w-full lg:w-1/2 px-6 lg:rounded-r-2xl"
          style={{
            backgroundColor: "var(--color-bg-orange)",
            color: "var(--color-text-light)",
          }}
        >
          <div className="w-full max-w-md text-left">
            {/* Section title */}
            <h2 className="text-[40px]font-semibold mb-4">
              {data.ourStoryTitle}
            </h2>
            {/* Section paragraphs */}
            {data.storyText.map((paragraph, index) => (
              <p key={index} className="text-[20px]  mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsValues;
