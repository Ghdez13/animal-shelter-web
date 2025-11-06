import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Filled from "../../assets/icons/filled-footprint.webp";
import Outline from "../../assets/icons/outline-footprint.webp";
import LazyImage from "../LazyImage";

const VolunteerCarousel = () => {
  const { t } = useTranslation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Load captions safely from translation
  const captions = Array.from(
    { length: 8 },
    (_, i) => t(`volunteerSection.captions.${i}`) || ""
  );

  // Map images with desktop and mobile sources
  const images = captions.map((caption, index) => ({
    src: `/images/carousel${index + 1}.webp`,
    srcMobile: `/images/carousel${index + 1}Mobile.webp`,
    caption,
  }));

  // Update cards per slide on window resize
  useEffect(() => {
    const updateCardsPerSlide = () =>
      setCardsPerSlide(window.innerWidth >= 768 ? 2 : 1);
    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  // Group images into slides
  const slides = [];
  for (let i = 0; i < images.length; i += cardsPerSlide) {
    slides.push(images.slice(i, i + cardsPerSlide));
  }
  const safeSlides = slides.length > 0 ? slides : [[]];

  // Autoplay logic
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % safeSlides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [safeSlides.length, isPaused]);

  if (!safeSlides.length) return null;

  return (
    <div className="w-full flex justify-center pb-6">
      <div className="w-full max-w-6xl px-0 md:px-0 lg:px-6 py-8">
        {/* Slide container */}
        <div
          className="flex gap-4 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {safeSlides[currentIndex]?.map((img, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0 w-full ${
                cardsPerSlide === 2 ? "md:w-1/2" : ""
              }`}
            >
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden h-[400px]">
                <div className="flex-1 overflow-hidden">
                  {/* LazyImage component handles lazy loading and srcSet */}
                  <LazyImage
                    src={img.src}
                    srcMobile={img.srcMobile}
                    alt={img.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="p-4 text-center text-[20px]"
                  style={{
                    backgroundColor: "var(--color-bg-orange)",
                    color: "var(--color-text-light)",
                  }}
                >
                  {img.caption}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="mt-6 flex justify-center space-x-3">
          {safeSlides.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-focus-primary)] focus-visible:ring-offset-2 transition-transform duration-200 ${
                  isActive ? "scale-110" : "opacity-80 hover:opacity-100"
                }`}
                aria-label={
                  isActive
                    ? `${t("dots.activeSlide", { index: index + 1 })} ${
                        index + 1
                      }`
                    : `${t("dots.goToSlide", { index: index + 1 })} ${
                        index + 1
                      }`
                }
              >
                {/* Navigation icon */}
                <img
                  src={isActive ? Filled : Outline}
                  alt={
                    isActive
                      ? `${t("dots.activeSlide")} ${index + 1}`
                      : `${t("dots.slide")} ${index + 1}`
                  }
                  className="w-full h-full"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VolunteerCarousel;
