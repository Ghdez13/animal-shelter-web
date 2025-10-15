import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Filled from "../assets/icons/filled-footprint.svg";
import Outline from "../assets/icons/outline-footprint.svg";

const Tips = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [tips, setTips] = useState([]);
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const carouselRef = useRef(null);

  // Cargar tips desde JSON
  useEffect(() => {
    import("../assets/data/tips.json").then((module) => {
      setTips(module.default);
    });
  }, []);

  // Agrupar tips en slides de 2
  useEffect(() => {
    const grouped = [];
    for (let i = 0; i < tips.length; i += 2) {
      grouped.push(tips.slice(i, i + 2));
    }
    setSlides(grouped);
  }, [tips]);

  // Autoplay + pausa al hover
  useEffect(() => {
    if (!slides.length) return;

    clearInterval(intervalRef.current);

    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 4000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isHovered, slides]);

  if (slides.length === 0) return null;

  return (
    <section
      ref={carouselRef}
      className="relative max-w-6xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((group, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row gap-6 w-full flex-shrink-0"
            >
              {group.map((tip) => (
                <div key={tip.id} className="flex-1 ">
                  <h3 className="text-[var(--color-text-dark)] font-bold text-[20px] sm:text-[40px] mb-6">
                    {tip.title[lang]}
                  </h3>
                  <p className="text-[20px] font-bold mb-2 text-[var(--color-text-tips)]">
                    {tip.prefix[lang]}
                  </p>
                  <p className="text-[20px] text-[var(--color-text-dark)]">
                    {tip.text[lang]}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className="focus:outline-none"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <img
              src={idx === currentIndex ? Filled : Outline}
              alt="dot"
              className="w-6 h-6"
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Tips;
