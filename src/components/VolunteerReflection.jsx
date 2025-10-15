import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Filled from "../assets/icons/filled-footprint.svg";
import Outline from "../assets/icons/outline-footprint.svg";

import Message1 from "../assets/images/message1.webp";
import Message2 from "../assets/images/message2.webp";
import Message3 from "../assets/images/message3.webp";

const VolunteerReflection = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const titles = t("volunteerReflection.title", { returnObjects: true });
  const descriptions = t("volunteerReflection.description", {
    returnObjects: true,
  });

  const images = [Message1, Message2, Message3];

  // Cambiar automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    // Padding general para toda la sección
    <section className="w-full mb-12">
      {/* Contenedor principal: mobile → columna, desktop → fila */}
      <div className="flex flex-col md:flex-row items-start md:items-center text-left">
        {/* Imagen */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img
            src={images[currentIndex]}
            alt={titles[currentIndex]}
            className="w-100 h-100 md:w-80 md:h-80 object-contain mx-auto md:mx-0"
          />
        </div>

        {/* Texto */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-[40px] font-bold text-[var(--color-text-dark)] mb-4">
            {titles[currentIndex]}
          </h2>
          <p className="text-[var(--color-text-dark)] text-[20px] leading-relaxed">
            {descriptions[currentIndex]}
          </p>
          {/* Dots debajo de todo */}
          <div className="flex justify-center md:justify-center mt-6 space-x-2 w-full">
            {images.map((_, idx) => (
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
        </div>
      </div>
    </section>
  );
};

export default VolunteerReflection;
