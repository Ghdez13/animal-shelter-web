import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Quote } from "lucide-react";
import testimonialsData from "../../assets/data/homeTestimonials.json";
import Filled from "../../assets/icons/filled-footprint.webp";
import Outline from "../../assets/icons/outline-footprint.webp";

export default function TestimonialSlider() {
  const { i18n, t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const currentLang = i18n.language || "es";

  // Auto-slide (pausable)
  useEffect(() => {
    if (isPaused || !testimonialsData.length) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonialsData.length - 1 ? 0 : prev + 1
      );
    }, 13000);

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  const handleFocus = () => setIsPaused(true);
  const handleBlur = () => setIsPaused(false);

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) =>
          prev === testimonialsData.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) =>
          prev === 0 ? testimonialsData.length - 1 : prev - 1
        );
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section
      className="w-full flex flex-col items-center text-center text-[var(--color-text-dark)] p-6 mt-12 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slider container */}
      <div className="relative w-full max-w-xl overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-full px-6"
              role="group"
              aria-roledescription="testimonial"
              aria-label={`Testimonial by ${testimonial.author}`}
            >
              <Quote
                className="w-10 h-10 text-[var(--color-button-bg-hover-primary)] mx-auto mb-4"
                aria-hidden="true"
              />
              <p className="text-[20px] italic leading-relaxed">
                “{testimonial.text[currentLang] || testimonial.text["es"]}”
              </p>
              <p className="mt-4 text-[20px] font-semibold">
                - {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Dots footprints with accessible focus */}
      <div className="mt-8 flex space-x-3 justify-center">
        {testimonialsData.map((testimonial, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => setCurrentIndex(index)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-focus-primary)] focus-visible:ring-offset-2 transition-transform duration-200 ${
                isActive ? "scale-110" : "opacity-80 hover:opacity-100"
              }`}
              aria-label={`${t("dots.goToSlide")} ${index + 1} – ${
                testimonial.author
              }`}
            >
              <img
                src={isActive ? Filled : Outline}
                alt={
                  isActive
                    ? `${t("dots.activeSlide")} ${index + 1} – ${
                        testimonial.author
                      }`
                    : `${t("dots.slide")} ${index + 1} – ${testimonial.author}`
                }
                className="w-full h-full"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
