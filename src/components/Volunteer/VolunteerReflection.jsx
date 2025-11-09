import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
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
  const swiperRef = useRef(null);

  const titles = t("volunteerReflection.title", { returnObjects: true });
  const descriptions = t("volunteerReflection.description", {
    returnObjects: true,
  });

  const imagesDesktop = [Message1, Message2, Message3];
  const imagesMobile = [Message1Mobile, Message2Mobile, Message3Mobile];

  const [images, setImages] = useState(
    window.innerWidth >= 768 ? imagesDesktop : imagesMobile
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update images on resize
  useEffect(() => {
    const handleResize = () =>
      setImages(window.innerWidth >= 768 ? imagesDesktop : imagesMobile);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full text-text-dark mt-20 overflow-hidden">
      <div
        className="max-w-6xl mx-auto w-full"
        onMouseEnter={() => swiperRef.current?.autoplay?.stop?.()}
        onMouseLeave={() => swiperRef.current?.autoplay?.start?.()}
        onTouchStart={() => swiperRef.current?.autoplay?.stop?.()}
        onTouchEnd={() => swiperRef.current?.autoplay?.start?.()}
      >
        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          slidesPerView={1}
          loop={true}
          loopedSlides={images.length}
          autoplay={{ delay: 13000, disableOnInteraction: false }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)} //Update real index
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col md:flex-row items-start md:items-center px-4 md:px-8">
                {/* Image */}
                <div className="w-full md:w-1/2 flex justify-center items-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px] overflow-visible relative mb-6 md:mb-0">
                  <LazyImage
                    src={images[index]} // Use images state directly
                    alt={`${titles[index]} reflection`}
                    className="object-contain object-center w-[90%] mx-auto max-h-[650px]"
                  />
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <h2 className="text-[32px] md:text-[40px] font-bold mb-4">
                    {titles[index]}
                  </h2>
                  <p className="text-[18px] md:text-[20px] leading-relaxed">
                    {descriptions[index]}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 md:-mt-12 space-x-2 w-full px-4 md:px-8">
          {images.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                type="button"
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={`focus:outline-none focus-visible:ring-4 focus-visible:ring-(--color-focus-primary) focus-visible:ring-offset-2 rounded-full transition-transform duration-200 ${
                  isActive ? "scale-110" : "opacity-80 hover:opacity-100"
                }`}
                aria-label={
                  isActive
                    ? `${t("dots.activeSlide")} ${index + 1}`
                    : `${t("dots.goToSlide")} ${index + 1}`
                }
                aria-current={isActive ? "true" : "false"}
              >
                <img
                  src={isActive ? Filled : Outline}
                  alt={
                    isActive
                      ? `${t("dots.activeSlide")} ${index + 1}`
                      : `${t("dots.slide")} ${index + 1}`
                  }
                  className="w-8 h-8 md:w-10 md:h-10"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VolunteerReflection;
