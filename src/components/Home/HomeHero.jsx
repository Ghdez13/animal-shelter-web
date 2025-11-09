import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
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
  const swiperRef = useRef(null);

  const mobileImages = [
    HeroImageMobile,
    HeroImageMobileTwo,
    HeroImageMobileThree,
  ];

  const desktopImages = [HeroDesktop, HeroDesktopTwo, HeroDesktopThree];

  const [currentIndex, setCurrentIndex] = useState(0);

  // === Keep track of Swiper changes ===
  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex);
  };

  // === Manual slide navigation (for both versions) ===
  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (swiperRef.current) swiperRef.current.slideToLoop(index);
  };

  // === Preload images ===
  useEffect(() => {
    [...mobileImages, ...desktopImages].forEach((img) => {
      const image = new Image();
      image.src = img;
    });
  }, []);

  // === Auto-slide for desktop (dots synced) ===
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % desktopImages.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [desktopImages.length]);

  // === Pause autoplay on hover ===
  const handleMouseEnter = () => {
    if (swiperRef.current?.autoplay?.stop) swiperRef.current.autoplay.stop();
  };
  const handleMouseLeave = () => {
    if (swiperRef.current?.autoplay?.start) swiperRef.current.autoplay.start();
  };

  return (
    <section
      className="w-full"
      aria-label={t("hero.carouselLabel")}
      role="region"
    >
      {/* === Mobile version (Swiper fade effect, autoHeight, flexible) === */}
      <div
        className="relative text-text-dark w-full min-[1140px]:hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          slidesPerView={1}
          loop={true}
          allowTouchMove={true}
          autoHeight={true} // <-- important to prevent button cutoff
          autoplay={{
            delay: 15000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          className="w-full"
        >
          {mobileImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative animate-fadeIn">
                <img
                  src={image}
                  alt=""
                  role="presentation"
                  className="w-full h-auto object-cover"
                />

                <div className="w-full px-4 py-6 mx-auto">
                  <article className="flex flex-col text-left">
                    <h1 className="text-[50px] font-extrabold text-left">
                      {t(`hero.slides.${index}.title`)}
                    </h1>

                    <p className="mt-4 sm:mt-7 text-[20px]">
                      {t(`hero.slides.${index}.text`)}
                    </p>

                    <div className="mt-6 sm:mt-8">
                      <Button
                        className="w-full sm:w-auto wrap-break-words whitespace-normal"
                        to={t(`hero.slides.${index}.buttonLink`)}
                        type="button"
                        aria-label={t(`hero.slides.${index}.altButtonText`)}
                      >
                        {t(`hero.slides.${index}.buttonText`)}
                      </Button>
                    </div>
                  </article>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* === Dots (custom indicators) === */}
        <div className="mt-8 flex space-x-3 justify-start px-6">
          {mobileImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`${t("hero.goToSlide")} ${index + 1}`}
              className="w-8 h-8 md:w-10 md:h-10 focus:outline-none focus-visible:ring-4 focus-visible:ring-(--color-focus-primary) rounded-full"
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
      </div>

      {/* === Desktop version (no Swiper but synced with dots) === */}
      <div
        className="hidden min-[1140px]:flex relative text-text-dark w-full min-h-[1000px] bg-no-repeat bg-center bg-cover transition-all duration-700"
        style={{
          backgroundImage: `url(${desktopImages[currentIndex]})`,
          maxWidth: "2000px",
          margin: "0 auto",
        }}
      >
        <div className="max-w-6xl w-full flex relative z-20 mt-48">
          <article className="flex flex-col justify-center max-w-[38%] ml-8 animate-fadeIn">
            <h1 className="text-[60px] font-extrabold leading-tight">
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
                {t(`hero.slides.${currentIndex}.buttonText`)}
              </Button>
            </div>

            {/* === Dots (synced) === */}
            <div
              className="mt-10 flex space-x-3"
              role="group"
              aria-label={t("hero.slideNavigation")}
            >
              {desktopImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`${t("hero.goToSlide")} ${index + 1}`}
                  className="w-8 h-8 md:w-10 md:h-10 focus:outline-none focus-visible:ring-4 focus-visible:ring-(--color-focus-primary) rounded-full"
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
