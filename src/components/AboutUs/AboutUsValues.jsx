import { useTranslation } from "react-i18next";
import AboutUsOurHistory from "../../assets/images/aboutUsOurHistory.webp";
import LazyImage from "../LazyImage";
import aboutUs from "../../assets/data/aboutUs.json";

const AboutUsValues = () => {
  // i18n hook to get translation function and current language
  const { t, i18n } = useTranslation();

  // Get current language from i18n
  const lang = i18n.language;

  // Access the appropriate language content from the aboutUs JSON
  const data = aboutUs[lang];

  // Get data from i18n JSON
  const titles = t("aboutUsValues.title", { returnObjects: true }) || [];
  const descriptions =
    t("aboutUsValues.description", { returnObjects: true }) || [];

  // Icons path (same order as in JSON)
  const icons = [
    "/icons/animalWelfare.webp",
    "/icons/respect.webp",
    "/icons/loveHelping.webp",
    "/icons/passion.webp",
  ];

  // Combine titles, descriptions, and icons into a single array for cleaner mapping
  const values = titles.map((title, index) => ({
    title,
    description: descriptions[index],
    icon: icons[index],
  }));

  return (
    <section className="bg-transparent text-[var(--color-text-dark)]">
      {/* === Values section === */}
      <div className="max-w-6xl mx-auto px-0 md:px-0 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        {values.map(({ title, description, icon }, index) => (
          <div key={index} className="flex flex-col  items-start text-left">
            <div className="flex items-center gap-3 mb-2">
              <LazyImage
                src={icon}
                alt={`${title} icon`}
                className="w-20 h-20 object-contain"
              />
              <h2 className="text-[40px] font-semibold">{title}</h2>
            </div>
            <p className="text-[20px] text-[var(--color-text-dark)]">
              {description}
            </p>
          </div>
        ))}
      </div>

      {/* === Story section === */}
      <div className="flex flex-col px-0 md:px-0 lg:px-6 lg:flex-row w-full max-w-6xl mx-auto rounded-2xl overflow-hidden mt-6">
        {/* Section image */}
        <LazyImage
          src={AboutUsOurHistory}
          alt={t("aboutUsValues.imageAlt", "Donation helping animals")}
          className="w-full lg:w-1/2 object-cover h-80 lg:h-auto lg:rounded-l-2xl"
        />

        {/* Text area with story */}
        <div
          className="flex flex-col items-center justify-center w-full lg:w-1/2 px-6 lg:rounded-r-2xl"
          style={{
            backgroundColor: "var(--color-bg-orange)",
            color: "var(--color-text-light)",
          }}
        >
          {/* Wrapper interno para alinear título y párrafos */}
          <div className="w-full max-w-md text-left">
            <h2 className="text-[40px] font-semibold mb-4">
              {data.ourStoryTitle}
            </h2>
            {data.storyText.map((paragraph, index) => (
              <p key={index} className="text-[20px] mb-4">
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
