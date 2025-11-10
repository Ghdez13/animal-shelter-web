import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Button from "../Button";
import BackgroundOrange from "../../assets/images/BackgroundOrange.webp";
import BackgroundOrangeMobile from "../../assets/images/BackgroundOrangeMobile.webp";
import Filled from "../../assets/icons/filled-footprint.webp";
import Outline from "../../assets/icons/outline-footprint.webp";
import eventsUpcoming from "../../assets/data/eventsUpcoming";

const AdoptionEvents = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to open Google Maps link
  const openInMaps = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Function to add event to Google Calendar
  const addToCalendar = (event) => {
    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      "Adoption Campaign"
    )}&dates=${event.start.replace(/-|:|\.\d+/g, "")}/${event.end.replace(
      /-|:|\.\d+/g,
      ""
    )}&details=${encodeURIComponent(
      "Join our adoption campaign with JausPet 🐾"
    )}&location=${encodeURIComponent(
      event.location[lang] || event.location.es
    )}`;
    window.open(calendarUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      {/* === Swiper === */}
      <Swiper
        slidesPerView={1}
        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {eventsUpcoming.map((event, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden">
              {/* Left side: Day, Number, Month + Button with background image */}
              <div
                className="flex flex-col items-center justify-center w-full md:w-1/3 text-(--color-text-light) p-6 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${
                    window.innerWidth < 768
                      ? BackgroundOrangeMobile
                      : BackgroundOrange
                  })`,
                }}
              >
                <span className="text-xl md:text-2xl font-semibold">
                  {event.date.dayName[lang] || event.date.dayName.es}
                </span>
                <span className="text-[80px] md:text-[110px] font-black -mt-2">
                  {event.date.dayNumber}
                </span>
                <span className="text-xl md:text-2xl font-semibold">
                  {event.date.month[lang] || event.date.month.es}
                </span>

                <Button
                  onClick={() => addToCalendar(event)}
                  className="mt-4 btn-green"
                  aria-label={t(event.titleHoverCalendar[lang])}
                >
                  {t(event.titleHoverCalendar[lang])}
                </Button>
              </div>

              {/* Right side: Image + Location + Time */}
              <div className="flex flex-col justify-center w-full md:w-2/3 bg-(--color-bg-article) p-6 h-full">
                {/* Image */}
                <picture className="w-full mb-4">
                  <source
                    srcSet={event.imageMobile}
                    media="(max-width: 767px)"
                  />
                  <img
                    src={event.image}
                    alt={event.location[lang] || event.location.es}
                    className="w-full h-auto rounded-2xl object-cover"
                  />
                </picture>

                {/* Location and Time block */}
                <div className="flex flex-col justify-center text-left mt-4 h-full">
                  <p
                    className="text-[20px] cursor-pointer mb-2 transition-colors duration-300 hover:text-focus-tertiary"
                    onClick={() => openInMaps(event.mapUrl)}
                    title={t(event.titleHoverLocation[lang])}
                  >
                    📍 {event.location[lang] || event.location.es}
                  </p>
                  <p className="text-[20px]">🕐 {event.time}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* === Custom dots === */}
      <div className="flex justify-center mt-4 space-x-2">
        {eventsUpcoming.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => swiperRef.current?.slideToLoop(idx)}
            className="focus:outline-none focus-visible:ring-4 focus-visible:ring-(--color-focus-primary) rounded-full"
            aria-label={`${t("dots.goToSlide")} ${idx + 1}`}
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

      {/* Next upcoming events notice */}
      <p className="italic text-[20px] text-text-dark mt-4 text-center">
        {t("events.nextEvents")}
      </p>
    </div>
  );
};

export default AdoptionEvents;
