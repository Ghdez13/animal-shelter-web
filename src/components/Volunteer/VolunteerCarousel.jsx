import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Filled from "../../assets/icons/filled-footprint.svg";
import Outline from "../../assets/icons/outline-footprint.svg";

const VolunteerCarousel = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(1);

  // Load captions safely
  const captions = Array.from(
    { length: 8 },
    (_, i) => t(`volunteerSection.captions.${i}`) || ""
  );

  // Build images array
  const images = captions.map((caption, index) => ({
    src: `/images/carousel${index + 1}.webp`,
    caption,
  }));

  // Determine cards per slide based on screen width
  useEffect(() => {
    const updateCardsPerSlide = () =>
      setCardsPerSlide(window.innerWidth >= 768 ? 2 : 1);

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  // Group images into slides safely
  const slides = [];
  for (let i = 0; i < images.length; i += cardsPerSlide) {
    slides.push(images.slice(i, i + cardsPerSlide));
  }

  // Fallback to avoid undefined
  const safeSlides = slides.length > 0 ? slides : [[]];

  // Autoplay carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % safeSlides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [safeSlides.length]);

  if (!safeSlides.length) return null; // nothing to render

  return (
    <div className="w-full flex justify-center pb-6">
      <div className="w-full max-w-6xl md:px-6 py-8">
        {/* Slide container */}
        <div className="flex gap-4 overflow-hidden">
          {safeSlides[currentIndex]?.map((img, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0 w-full ${
                cardsPerSlide === 2 ? "md:w-1/2" : ""
              }`}
            >
              {/* Card */}
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
