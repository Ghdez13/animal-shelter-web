import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper"; // Swiper 9
import { useTranslation } from "react-i18next";
import Filled from "../assets/icons/filled-footprint.svg";
import Outline from "../assets/icons/outline-footprint.svg";
import "swiper/css";
import "swiper/css/navigation";

const VolunteerCarousel = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null); // ✅ referencia estable

  const images = [
    {
      src: "/images/carousel1.webp",
      caption: t("volunteerSection.captions.0"),
    },
    {
      src: "/images/carousel2.webp",
      caption: t("volunteerSection.captions.1"),
    },
    {
      src: "/images/carousel3.webp",
      caption: t("volunteerSection.captions.2"),
    },
    {
      src: "/images/carousel4.webp",
      caption: t("volunteerSection.captions.3"),
    },
    {
      src: "/images/carousel5.webp",
      caption: t("volunteerSection.captions.4"),
    },
    {
      src: "/images/carousel6.webp",
      caption: t("volunteerSection.captions.5"),
    },
    {
      src: "/images/carousel7.webp",
      caption: t("volunteerSection.captions.6"),
    },
    {
      src: "/images/carousel8.webp",
      caption: t("volunteerSection.captions.7"),
    },
  ];

  return (
    <div className="w-full py-8 relative mb-12">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // ✅ guardar referencia estable
        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)} // ✅ usar realIndex
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-70 md:h-72 lg:h-64 xl:h-72 overflow-hidden rounded-lg shadow-md">
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {img.caption}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom dots indicator */}
      <div className="mt-6 flex space-x-3 justify-center">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (swiperRef.current) {
                swiperRef.current.slideToLoop(index); // ✅ funciona con loop
              }
              setCurrentIndex(index);
            }}
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
    </div>
  );
};

export default VolunteerCarousel;
