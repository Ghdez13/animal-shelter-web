import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Quote } from "lucide-react";
import testimonialsData from "../../assets/data/homeTestimonials.json";
import Filled from "../../assets/icons/filled-footprint.svg";
import Outline from "../../assets/icons/outline-footprint.svg";

export default function TestimonialSlider() {
  const { i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Load testimonials on mount
  useEffect(() => {
    setTestimonials(testimonialsData);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (!testimonials.length) return;

    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isHovered, testimonials]);

  if (!testimonials.length) return null;

  return (
    <section
      className="w-full flex flex-col items-center text-center p-6 mt-12 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slider container */}
      <div className="relative w-full max-w-xl overflow-hidden">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {/* Individual testimonial card */}
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex-shrink-0 w-full px-4">
              <Quote
                className="w-10 h-10 text-[var(--color-button-bg-hover-primary)] mx-auto mb-4"
                aria-hidden="true"
              />
              <p className="text-[20px] italic text-gray-700">
                "{testimonial.text[i18n.language] || testimonial.text["es"]}"
              </p>
              <p className="mt-4 text-[20px] font-semibold text-gray-900">
                - {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="mt-8 flex space-x-3 justify-center">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className="w-8 h-8"
            aria-label={`Go to testimonial by ${testimonial.author}`}
          >
            <img
              src={index === currentIndex ? Filled : Outline}
              alt={`Slide ${index + 1} – ${testimonial.author}`}
              className="w-full h-full"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
