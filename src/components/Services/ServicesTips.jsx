import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Filled from "../../assets/icons/filled-footprint.webp";
import Outline from "../../assets/icons/outline-footprint.webp";

const Tips = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [tips, setTips] = useState([]);
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Load tips JSON dynamically
  useEffect(() => {
    import("../../assets/data/serviceTips.json").then((module) =>
      setTips(module.default)
    );
  }, []);

  // Group tips into slides of 2
  useEffect(() => {
    const grouped = [];
    for (let i = 0; i < tips.length; i += 2) {
      grouped.push(tips.slice(i, i + 2));
    }
    setSlides(grouped);
  }, [tips]);

  // Auto-slide effect
  useEffect(() => {
    if (!slides.length) return;
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 15000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered, slides]);

  if (!slides.length) return null;

  return (
    <section
      className="relative max-w-6xl mx-auto px-0 md:px-0 lg:px-6"
      // Pause autoplay on hover (desktop) or touch (mobile)
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Carousel slides */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((group, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row gap-4 md:gap-6 w-full flex-shrink-0"
            >
              {group.map((tip) => {
                const title = tip.title[lang] || tip.title["es"];
                const prefix = tip.prefix[lang] || tip.prefix["es"];
                const text = tip.text[lang] || tip.text["es"];
                return (
                  // Each tip is an article for semantic purposes
                  <article key={tip.id} className="flex-1">
                    <h3 className="text-[var(--color-text-dark)] font-bold text-[20px] sm:text-[40px] mb-6">
                      {title}
                    </h3>
                    <p className="text-[20px] font-bold mb-2 text-[var(--color-text-tips)]">
                      {prefix}
                    </p>
                    <p className="text-[20px] text-[var(--color-text-dark)]">
                      {text}
                    </p>
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((group, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            // Focus style consistent with global :focus-visible
            className="focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-focus-primary)] rounded-full"
            aria-label={`${t("dots.goToSlide")} ${idx + 1} - ${
              group[0].title[lang] || group[0].title["es"]
            }`}
          >
            <img
              src={idx === currentIndex ? Filled : Outline}
              alt={
                idx === currentIndex
                  ? `${t("dots.activeSlide")} ${idx + 1}`
                  : `${t("dots.slide")} ${idx + 1}`
              }
              className="w-8 h-8 md:w-10 md:h-10"
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Tips;
