import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Filled from "../../assets/icons/filled-footprint.svg";
import Outline from "../../assets/icons/outline-footprint.svg";

import Message1 from "../../assets/images/message1.webp";
import Message2 from "../../assets/images/message2.webp";
import Message3 from "../../assets/images/message3.webp";

const VolunteerReflection = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const titles = t("volunteerReflection.title", { returnObjects: true });
  const descriptions = t("volunteerReflection.description", {
    returnObjects: true,
  });
  const images = [Message1, Message2, Message3];

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full mt-24">
      <div className="max-w-6xl mx-auto w-full md:px-6 flex flex-col md:flex-row items-start md:items-center text-left">
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img
            src={images[currentIndex]}
            alt={`${titles[currentIndex]} reflection`}
            className="w-full h-auto md:w-120 md:h-120 object-contain"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-[40px] font-bold text-[var(--color-text-dark)] mb-4">
            {titles[currentIndex]}
          </h2>
          <p className="text-[var(--color-text-dark)] text-[20px] leading-relaxed">
            {descriptions[currentIndex]}
          </p>

          {/* Dots */}
          <div className="flex justify-start mt-6 space-x-2 w-full">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="focus:outline-none"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
              >
                <img
                  src={index === currentIndex ? Filled : Outline}
                  alt="dot"
                  className="w-6 h-6"
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
