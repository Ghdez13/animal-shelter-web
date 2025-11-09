import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import testimonialsData from "../../assets/data/homeTestimonials.json";
import Filled from "../../assets/icons/filled-footprint.webp";
import Outline from "../../assets/icons/outline-footprint.webp";

export default function TestimonialSlider() {
  const { i18n, t } = useTranslation();
  const swiperRef = useRef(null);
  const currentLang = i18n.language || "es";

  const [currentIndex, setCurrentIndex] = useState(0); // <-- track current slide

  return (
    <section
      className="w-full flex flex-col items-center text-center text-text-dark p-6 mt-12 overflow-hidden"
      onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay?.start()}
    >
      {/* === Swiper container === */}
      <div className="relative w-full max-w-xl overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          loop={true}
          allowTouchMove={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)} // <-- update state
          className="w-full"
        >
          {testimonialsData.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div
                className="px-6"
                role="group"
                aria-roledescription="testimonial"
                aria-label={`Testimonial by ${testimonial.author}`}
              >
                <Quote
                  className="w-10 h-10 text-(--color-button-bg-hover-primary) mx-auto mb-4"
                  aria-hidden="true"
                />
                <p className="text-[20px] italic leading-relaxed">
                  “{testimonial.text[currentLang] || testimonial.text["es"]}”
                </p>
                <p className="mt-4 text-[20px] font-semibold">
                  - {testimonial.author}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* === Dots (footprints) === */}
      <div className="mt-8 flex space-x-3 justify-center">
        {testimonialsData.map((testimonial, index) => {
          const isActive = index === currentIndex; // <-- use state
          return (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => {
                swiperRef.current?.slideToLoop(index);
                setCurrentIndex(index); // <-- update state immediately
              }}
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-(--color-focus-primary) focus-visible:ring-offset-2 transition-transform duration-200 ${
                isActive ? "scale-110" : "opacity-80 hover:opacity-100"
              }`}
              aria-label={`${t("dots.goToSlide")} ${index + 1} – ${
                testimonial.author
              }`}
            >
              <img
                src={isActive ? Filled : Outline}
                alt={
                  isActive
                    ? `${t("dots.activeSlide")} ${index + 1} – ${
                        testimonial.author
                      }`
                    : `${t("dots.slide")} ${index + 1} – ${testimonial.author}`
                }
                className="w-full h-full"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
