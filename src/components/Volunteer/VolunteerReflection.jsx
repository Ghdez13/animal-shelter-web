import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LazyImage from "../LazyImage";
import Filled from "../../assets/icons/filled-footprint.webp";
import Outline from "../../assets/icons/outline-footprint.webp";
import Message1 from "../../assets/images/message1.webp";
import Message1Mobile from "../../assets/images/message1Mobile.webp";
import Message2 from "../../assets/images/message2.webp";
import Message2Mobile from "../../assets/images/message2Mobile.webp";
import Message3 from "../../assets/images/message3.webp";
import Message3Mobile from "../../assets/images/message3Mobile.webp";

const VolunteerReflection = () => {
  const { t } = useTranslation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const titles = t("volunteerReflection.title", { returnObjects: true });
  const descriptions = t("volunteerReflection.description", {
    returnObjects: true,
  });

  // Arrays for desktop and mobile images
  const imagesMobile = [Message1Mobile, Message2Mobile, Message3Mobile];
  const imagesDesktop = [Message1, Message2, Message3];

  // Autoplay with pause support on hover or touch
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imagesDesktop.length);
    }, 13000);
    return () => clearInterval(interval);
  }, [isPaused, imagesDesktop.length]);

  return (
    <section className="w-full text-[var(--color-text-dark)] mt-24">
      {/* Container handling pause on interaction */}
      <div
        className="max-w-6xl mx-auto w-full px-0 md:px-0 lg:px-6 flex flex-col md:flex-row items-start md:items-center text-left"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Responsive image section */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          {/* Mobile image */}
          <LazyImage
            src={imagesMobile[currentIndex]}
            alt={`${titles[currentIndex]} reflection mobile`}
            className="block md:hidden w-full h-auto object-contain"
          />
          {/* Desktop image */}
          <LazyImage
            src={imagesDesktop[currentIndex]}
            alt={`${titles[currentIndex]} reflection desktop`}
            className="hidden md:block w-full md:w-120 md:h-120 object-contain"
          />
        </div>

        {/* Text section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-[40px] font-bold mb-4">{titles[currentIndex]}</h2>
          <p className="text-[20px] leading-relaxed">
            {descriptions[currentIndex]}
          </p>

          {/* Navigation dots */}
          <div className="flex justify-start mt-6 space-x-2 w-full">
            {imagesDesktop.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className="focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-focus-primary)] focus-visible:ring-offset-2 rounded-full transition-transform duration-200"
                aria-label={`${t("dots.goToSlide")} ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
              >
                {/* Dot icon changes based on current slide */}
                <img
                  src={index === currentIndex ? Filled : Outline}
                  alt={
                    index === currentIndex
                      ? `${t("dots.activeSlide")} ${index + 1}`
                      : `${t("dots.slide")} ${index + 1}`
                  }
                  className="w-8 h-8 md:w-10 md:h-10"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerReflection;
