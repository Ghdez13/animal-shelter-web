import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import HeroImageMobile from "../../assets/images/hero-mobile.webp";
import HeroImageMobileTwo from "../../assets/images/hero-mobile-two.webp";
import HeroImageMobileThree from "../../assets/images/hero-mobile-three.webp";
import HeroDesktop from "../../assets/images/hero-desktop.webp";
import HeroDesktopTwo from "../../assets/images/hero-desktop-two.webp";
import HeroDesktopThree from "../../assets/images/hero-desktop-three.webp";
import Filled from "../../assets/icons/filled-footprint.webp";
import Outline from "../../assets/icons/outline-footprint.webp";

const Hero = () => {
  const { t } = useTranslation();

  const mobileImages = [
    HeroImageMobile,
    HeroImageMobileTwo,
    HeroImageMobileThree,
  ];

  const desktopImages = [HeroDesktop, HeroDesktopTwo, HeroDesktopThree];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload images to prevent flicker
  useEffect(() => {
    [...mobileImages, ...desktopImages].forEach((img) => {
      const image = new Image();
      image.src = img;
    });
  }, []);

  // Auto slide change every 15s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mobileImages.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [mobileImages.length]);

  return (
    <section
      className="w-full"
      aria-label={t("hero.carouselLabel")}
      role="region"
    >
      {/* === Mobile version === */}
      <div className="relative text-[var(--color-text-dark)] w-full min-[1140px]:hidden">
        <img
          src={mobileImages[currentIndex]}
          alt=""
          role="presentation"
          className="w-full h-auto object-cover transition-all animate-fadeIn"
        />

        {/* Content wrapper */}
        <div className="max-w-6xl mx-auto w-full px-6">
          <article className="flex flex-col text-left px-0 md:px-0 lg:px-6">
            <h1 className="text-[50px] font-extrabold text-left">
              {t(`hero.slides.${currentIndex}.title`)}
            </h1>

            <p className="mt-7 text-[20px]">
              {t(`hero.slides.${currentIndex}.text`)}
            </p>

            <div className="mt-8">
              <Button
                to={t(`hero.slides.${currentIndex}.buttonLink`)}
                type="button"
                aria-label={t(`hero.slides.${currentIndex}.altButtonText`)}
              >
                {t(`hero.slides.${currentIndex}.buttonText`)}{" "}
              </Button>
            </div>

            {/* Dots indicator */}
            <div
              className="mt-10 flex space-x-3 justify-start"
              role="group"
              aria-label={t("hero.slideNavigation")}
            >
              {mobileImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`${t("hero.goToSlide")} ${index + 1}`}
                  className={`w-8 h-8 md:w-10 md:h-10 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-focus-primary)] rounded-full`}
                >
                  <img
                    src={index === currentIndex ? Filled : Outline}
                    alt=""
                    role="presentation"
                    className="w-full h-full"
                  />
                </button>
              ))}
            </div>
          </article>
        </div>
      </div>

      {/* === Desktop version (>=1140px) === */}
      <div
        className="hidden min-[1140px]:flex relative text-[var(--color-text-dark)] w-full min-h-[1000px] bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url(${desktopImages[currentIndex]})`,
          maxWidth: "2000px",
          margin: "0 auto",
        }}
      >
        <div className="max-w-6xl w-full flex relative z-20 mt-48">
          <article className="flex flex-col justify-center max-w-[38%] ml-8">
            <h1 className="text-[60px] font-extrabold  leading-tight">
              {t(`hero.slides.${currentIndex}.title`)}
            </h1>

            <p className="mt-6 text-[22px]">
              {t(`hero.slides.${currentIndex}.text`)}
            </p>

            <div className="mt-8">
              <Button
                to={t(`hero.slides.${currentIndex}.buttonLink`)}
                type="button"
                aria-label={t(`hero.slides.${currentIndex}.altButtonText`)}
              >
                {t(`hero.slides.${currentIndex}.buttonText`)}{" "}
              </Button>
            </div>

            <div
              className="mt-8 flex space-x-3"
              role="group"
              aria-label={t("hero.slideNavigation")}
            >
              {desktopImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`${t("hero.goToSlide")} ${index + 1}`}
                  className={`w-8 h-8 md:w-10 md:h-10 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-focus-primary)] rounded-full`}
                >
                  <img
                    src={index === currentIndex ? Filled : Outline}
                    alt=""
                    role="presentation"
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
