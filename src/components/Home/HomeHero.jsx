import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import HeroImageMobile from "../../assets/images/hero-mobile.webp";
import HeroImageMobileTwo from "../../assets/images/hero-mobile-two.webp";
import HeroImageMobileThree from "../../assets/images/hero-mobile-three.webp";
import HeroDesktop from "../../assets/images/hero-desktop.webp";
import HeroDesktopTwo from "../../assets/images/hero-desktop-two.webp";
import HeroDesktopThree from "../../assets/images/hero-desktop-three.webp";
import Filled from "../../assets/icons/filled-footprint.svg";
import Outline from "../../assets/icons/outline-footprint.svg";

const Hero = () => {
  const { t } = useTranslation();

  const mobileImages = [
    HeroImageMobile,
    HeroImageMobileTwo,
    HeroImageMobileThree,
  ];
  const desktopImages = [HeroDesktop, HeroDesktopTwo, HeroDesktopThree];

  const [currentIndex, setCurrentIndex] = useState(0);

  // === Preload images to avoid flicker ===
  useEffect(() => {
    [...mobileImages, ...desktopImages].forEach(
      (img) => (new Image().src = img)
    );
  }, []);

  // === Automatic slide change every 9s ===
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mobileImages.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [mobileImages.length]);

  return (
    <section className="w-full">
      {/* === Mobile version === */}
      <div className="relative w-full min-[1140px]:hidden">
        {/* Background image */}
        <img
          key={currentIndex}
          src={mobileImages[currentIndex]}
          alt={t(`hero.${currentIndex}.title`)}
          className="w-full h-auto object-cover transition-all animate-fadeIn"
        />

        {/* Content wrapper aligned with footer width */}
        <div className="max-w-6xl mx-auto w-full px-6">
          <article className="flex flex-col text-left px-0 md:px-0 lg:px-6">
            <h1 className="text-[50px] font-extrabold text-[var(--color-text-dark)] text-left">
              {t(`hero.${currentIndex}.title`)}
            </h1>
            <p className="mt-7 text-[20px] text-[var(--color-text-dark)]">
              {t(`hero.${currentIndex}.text`)}
            </p>
            <Button to={t(`hero.${currentIndex}.buttonLink`)}>
              {t(`hero.${currentIndex}.buttonText`)}
            </Button>

            {/* Dots indicator */}
            <div className="mt-10 flex space-x-3 justify-start">
              {mobileImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className="w-8 h-8 md:w-10 md:h-10 "
                >
                  <img
                    src={index === currentIndex ? Filled : Outline}
                    alt={
                      index === currentIndex
                        ? `Slide ${index + 1} active`
                        : `Slide ${index + 1}`
                    }
                    className="w-full h-full"
                  />
                </button>
              ))}
            </div>
          </article>
        </div>
      </div>

      {/* === Desktop version (>=1200px) === */}
      <div className="hidden min-[1140px]:flex min-[1140px]:relative justify-center bg-transparent py-10">
        {/* Centered container with the same width and padding as the footer */}
        <div className="max-w-6xl w-full flex  gap-10 relative">
          {/* Background image (outside the padding area) */}
          <img
            key={currentIndex}
            src={desktopImages[currentIndex]}
            alt={t(`hero.${currentIndex}.title`)}
            className="absolute top-0 right-0 w-[58%] h-full object-cover -z-10"
          />

          {/* Left side: title, text, button, and dots */}
          <article className="flex flex-col max-w-[40%] z-10">
            <h1 className="text-[60px] font-extrabold text-[var(--color-text-dark)] leading-tight">
              {t(`hero.${currentIndex}.title`)}
            </h1>
            <p className="mt-6 text-[22px] text-[var(--color-text-dark)]">
              {t(`hero.${currentIndex}.text`)}
            </p>
            <div className="mt-8">
              <Button to={t(`hero.${currentIndex}.buttonLink`)}>
                {t(`hero.${currentIndex}.buttonText`)}
              </Button>
            </div>

            {/* Navigation dots */}
            <div className="mt-8 flex space-x-3">
              {desktopImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className="w-8 h-8 md:w-10 md:h-10"
                >
                  <img
                    src={index === currentIndex ? Filled : Outline}
                    alt={
                      index === currentIndex
                        ? `Slide ${index + 1} active`
                        : `Slide ${index + 1}`
                    }
                    className="w-full h-full"
                  />
                </button>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Hero;
