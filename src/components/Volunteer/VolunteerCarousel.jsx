import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Filled from "../../assets/icons/filled-footprint.webp";
import Outline from "../../assets/icons/outline-footprint.webp";
import LazyImage from "../LazyImage";

const VolunteerCarousel = () => {
  const { t } = useTranslation();

  const [cardsPerSlide, setCardsPerSlide] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const swiperRef = useRef(null); // <-- Ref to control Swiper programmatically

  // Load captions from i18n
  const captions = Array.from(
    { length: 8 },
    (_, i) => t(`volunteerSection.captions.${i}`) || ""
  );

  // Map images with desktop and mobile sources
  const images = captions.map((caption, index) => ({
    src: `/images/carousel${index + 1}.webp`,
    srcMobile: `/images/carousel${index + 1}Mobile.webp`,
    caption,
  }));

  // Update cards per slide based on screen width
  useEffect(() => {
    const updateCardsPerSlide = () =>
      setCardsPerSlide(window.innerWidth >= 768 ? 2 : 1);
    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  // Group images into slides
  const slides = [];
  for (let i = 0; i < images.length; i += cardsPerSlide) {
    slides.push(images.slice(i, i + cardsPerSlide));
  }
  const safeSlides = slides.length > 0 ? slides : [[]];

  if (!safeSlides.length) return null;

  return (
    <div className="w-full flex justify-center pb-6">
      <div className="w-full max-w-6xl px-0 md:px-0 lg:px-6 py-8">
        {/* === Swiper Carousel === */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)} // Update currentIndex on slide change
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          allowTouchMove={true} // Enables swipe
          className="overflow-hidden"
          onSwiper={(swiper) => (swiperRef.current = swiper)} // Save Swiper instance
        >
          {safeSlides.map((group, index) => (
            <SwiperSlide key={index}>
              <div className="flex gap-4">
                {group.map((img, idx) => (
                  <div
                    key={idx}
                    className={`shrink-0 w-full ${
                      cardsPerSlide === 2 ? "md:w-1/2" : ""
                    }`}
                  >
                    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden h-[400px]">
                      <div className="flex-1 overflow-hidden">
                        {/* LazyImage component handles lazy loading and srcSet */}
                        <LazyImage
                          src={img.src}
                          srcMobile={img.srcMobile}
                          alt={img.caption}
                          className="w-full h-full object-cover"
                        />
                      </div>
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
            </SwiperSlide>
          ))}
        </Swiper>

        {/* === Navigation Dots === */}
        <div className="mt-6 flex justify-center space-x-3">
          {safeSlides.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                type="button"
                onClick={() => swiperRef.current?.slideToLoop(index)} // <-- Move Swiper to clicked slide
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-(--color-focus-primary) focus-visible:ring-offset-2 transition-transform duration-200 ${
                  isActive ? "scale-110" : "opacity-80 hover:opacity-100"
                }`}
                aria-label={
                  isActive
                    ? `${t("dots.activeSlide")} ${index + 1}`
                    : `${t("dots.goToSlide")} ${index + 1}`
                }
              >
                <img
                  src={isActive ? Filled : Outline}
                  alt={
                    isActive
                      ? `${t("dots.activeSlide")} ${index + 1}`
                      : `${t("dots.slide")} ${index + 1}`
                  }
                  className="w-full h-full"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VolunteerCarousel;
