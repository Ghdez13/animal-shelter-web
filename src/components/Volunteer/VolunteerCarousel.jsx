import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Filled from "../../assets/icons/filled-footprint.svg";
import Outline from "../../assets/icons/outline-footprint.svg";

const VolunteerCarousel = () => {
  const { t } = useTranslation();

  // Current slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Number of cards per slide (1 for mobile, 2 for desktop)
  const [cardsPerSlide, setCardsPerSlide] = useState(1);

  // Control autoplay pause
  const [isPaused, setIsPaused] = useState(false);

  // Load captions safely from translation
  const captions = Array.from(
    { length: 8 },
    (_, i) => t(`volunteerSection.captions.${i}`) || ""
  );

  // Build images array with captions
  const images = captions.map((caption, index) => ({
    src: `/images/carousel${index + 1}.webp`,
    caption,
  }));

  // Update number of cards per slide on window resize
  useEffect(() => {
    const updateCardsPerSlide = () =>
      setCardsPerSlide(window.innerWidth >= 768 ? 2 : 1);

    updateCardsPerSlide(); // set initially
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  // Group images into slides based on cards per slide
  const slides = [];
  for (let i = 0; i < images.length; i += cardsPerSlide) {
    slides.push(images.slice(i, i + cardsPerSlide));
  }
  const safeSlides = slides.length > 0 ? slides : [[]]; // fallback

  // Autoplay carousel with pause support
  useEffect(() => {
    if (isPaused) return; // do not run interval if paused
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % safeSlides.length);
    }, 2000);
    return () => clearInterval(interval); // cleanup
  }, [safeSlides.length, isPaused]);

  if (!safeSlides.length) return null; // nothing to render

  return (
    <div className="w-full flex justify-center pb-6">
      <div className="w-full max-w-6xl px-0 md:px-0 lg:px-6 py-8">
        {/* Slide container */}
        <div
          className="flex gap-4 overflow-hidden"
          // Pause autoplay on hover (desktop)
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          // Pause autoplay on touch (mobile)
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
              {/* Single card */}
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden h-[400px]">
                {/* Image container */}
                <div className="flex-1 overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Caption */}
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
        <div className="mt-6 flex space-x-3 justify-center">
          {safeSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="w-8 h-8"
            >
              <img
                src={index === currentIndex ? Filled : Outline}
                alt={
                  index === currentIndex
                    ? `Active slide ${index + 1}`
                    : `Slide ${index + 1}`
                }
                className="w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VolunteerCarousel;
