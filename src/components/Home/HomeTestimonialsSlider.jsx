// Imports
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Quote } from "lucide-react";
import testimonialsData from "../../assets/data/testimonials.json";
import Filled from "../../assets/icons/filled-footprint.svg";
import Outline from "../../assets/icons/outline-footprint.svg";

export default function TestimonialSlider() {
  // Hooks / State
  const { i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Load testimonials data on mount
  useEffect(() => {
    setTestimonials(testimonialsData);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (!testimonials.length) return;

    clearInterval(intervalRef.current);

    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isHovered, testimonials]);

  // Return null if no testimonials
  if (testimonials.length === 0) return null;

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
          {/* Individual testimonial */}
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex-shrink-0 w-full px-4">
              <Quote className="w-10 h-10 text-[var(--color-button-bg-hover-primary)] mx-auto mb-4" />
              <p className="text-[20px] italic text-gray-700">
                "{testimonial.text[i18n.language]}"
              </p>
              <p className="mt-4 text-[20px] font-semibold text-gray-900">
                - {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots footprints */}
      <div className="mt-6 flex space-x-3 justify-center">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="w-6 h-6"
            aria-label={`Go to testimonial by ${testimonial.author}`} // accesibility
          >
            <img
              src={index === currentIndex ? Filled : Outline}
              alt={`Slide ${index + 1} – ${testimonial.author}`} // descriptive alt
              className="w-full h-full"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
