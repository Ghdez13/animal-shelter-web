import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import HeroImageMobile from "../../assets/images/hero-mobile.webp";
import HeroImageMobileTwo from "../../assets/images/hero-mobile-two.webp";
import HeroImageMobileThree from "../../assets/images/hero-mobile-three.webp";
import Filled from "../../assets/icons/filled-footprint.svg";
import Outline from "../../assets/icons/outline-footprint.svg";
const Hero = () => {
  const { t } = useTranslation();

  const images = [HeroImageMobile, HeroImageMobileTwo, HeroImageMobileThree];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload images
  useEffect(() => {
    images.forEach((img) => {
      const image = new Image();
      image.src = img;
    });
  }, []);

  // Automatic slide change every 9 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 9000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="w-full">
      {/*Hero image*/}
      <div className="relative w-full">
        <img
          key={currentIndex}
          src={images[currentIndex]}
          alt={t("hero.${currentIndex}.title")}
          className="lg:hidden w-full h-auto object-cover transition-all animate-fadeIn"
        />
      </div>

      {/* Contect area*/}
      <article className="flex flex-col items-center text-left p-6 lg:hidden">
        <h1 className="text-[50px] font-extrabold text-[var(--color-text-dark)]">
          {t(`hero.${currentIndex}.title`)}
        </h1>
        <p className="mt-7 text-[20px] text-[var(--color-text-dark)] max-w-md">
          {t(`hero.${currentIndex}.text`)}
        </p>
        <Button link={t(`hero.${currentIndex}.buttonLink`)}>
          {t(`hero.${currentIndex}.buttonText`)}
        </Button>

        {/* Dots indicator */}
        <div className="mt-6 flex space-x-3 justify-center">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="w-6 h-6"
            >
              <img
                src={index === currentIndex ? Filled : Outline}
                alt="dot"
                className="w-full h-full"
              />
            </button>
          ))}
        </div>
      </article>
    </section>
  );
};

export default Hero;
