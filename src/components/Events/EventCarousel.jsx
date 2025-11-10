import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Filled from "../../assets/icons/filled-footprint.webp";
import Outline from "../../assets/icons/outline-footprint.webp";
import LazyImage from "../LazyImage";

const EventCarousel = () => {
  const [cardsPerSlide, setCardsPerSlide] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);

  // === Images configuration ===
  const images = Array.from({ length: 10 }, (_, i) => ({
    src: `/adoptionEvents/event${i + 1}.webp`,
    srcMobile: `/adoptionEvents/event${i + 1}Mobile.webp`,
    alt: `Adoption event ${i + 1}`,
  }));

  // === Adjust cards per slide depending on screen width ===
  useEffect(() => {
    const updateCardsPerSlide = () =>
      setCardsPerSlide(window.innerWidth >= 768 ? 2 : 1);
    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  // === Group images into slides ===
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
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
          allowTouchMove={true}
          className="overflow-hidden"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
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
                    <div className="flex flex-col overflow-hidden h-[400px] rounded-2xl shadow-lg">
                      <LazyImage
                        src={img.src}
                        srcMobile={img.srcMobile}
                        alt={img.alt}
                        className="w-full h-full object-cover rounded-2xl"
                      />
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
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-(--color-focus-primary) focus-visible:ring-offset-2 transition-transform duration-200 ${
                  isActive ? "scale-110" : "opacity-80 hover:opacity-100"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <img
                  src={isActive ? Filled : Outline}
                  alt={`Slide ${index + 1}`}
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

export default EventCarousel;
