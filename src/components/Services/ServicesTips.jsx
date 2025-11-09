import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Filled from "../../assets/icons/filled-footprint.webp";
import Outline from "../../assets/icons/outline-footprint.webp";

const Tips = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const swiperRef = useRef(null);

  const [tips, setTips] = useState([]);
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load tips JSON dynamically
  useEffect(() => {
    import("../../assets/data/serviceTips.json").then((module) =>
      setTips(module.default)
    );
  }, []);

  // Group tips into slides of 2
  useEffect(() => {
    const grouped = [];
    for (let i = 0; i < tips.length; i += 2) {
      grouped.push(tips.slice(i, i + 2));
    }
    setSlides(grouped);
  }, [tips]);

  if (!slides.length) return null;

  return (
    <section
      className="relative text-text-dark max-w-6xl mx-auto px-0 md:px-0 lg:px-6"
      onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay?.start()}
      onTouchStart={() => swiperRef.current?.autoplay?.stop()}
      onTouchEnd={() => swiperRef.current?.autoplay?.start()}
    >
      {/* === Swiper container === */}
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        allowTouchMove={true}
        autoplay={{
          delay: 15000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
        className="w-full overflow-hidden"
      >
        {slides.map((group, i) => (
          <SwiperSlide key={i}>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
              {group.map((tip) => {
                const title = tip.title[lang] || tip.title["es"];
                const prefix = tip.prefix[lang] || tip.prefix["es"];
                const text = tip.text[lang] || tip.text["es"];
                return (
                  <article key={tip.id} className="flex-1">
                    <h3 className="font-bold text-[20px] sm:text-[40px] mb-6">
                      {title}
                    </h3>
                    <p className="text-[20px] font-extrabold mb-2 text-(--color-text-tips)">
                      {prefix}
                    </p>
                    <p className="text-[20px]">{text}</p>
                  </article>
                );
              })}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* === Custom dots === */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((group, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => swiperRef.current?.slideToLoop(idx)}
            className="focus:outline-none focus-visible:ring-4 focus-visible:ring-(--color-focus-primary) rounded-full"
            aria-label={`${t("dots.goToSlide")} ${idx + 1} - ${
              group[0].title[lang] || group[0].title["es"]
            }`}
          >
            <img
              src={idx === currentIndex ? Filled : Outline}
              alt={
                idx === currentIndex
                  ? `${t("dots.activeSlide")} ${idx + 1}`
                  : `${t("dots.slide")} ${idx + 1}`
              }
              className="w-8 h-8 md:w-10 md:h-10"
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Tips;
