import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Button from "../Button";

const AnimalCard = ({ animal, onSelect }) => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Listen to screen size changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Choose correct image array (mobile or desktop)
  const images = animal.images
    ? isMobile
      ? animal.images.mobile
      : animal.images.desktop
    : [];

  // Get the first image for preview
  const mainImage = images.length > 0 ? images[0] : "";

  return (
    <article
      className="flex flex-col text-[var(--color-text-dark)] items-center bg-transparent rounded-2xl shadow-lg overflow-hidden hover:-translate-y-1 transition-transform duration-300"
      aria-label={animal.name}
    >
      {/* Animal image */}
      <img
        src={mainImage}
        alt={animal.name}
        className="w-full h-64 object-cover"
        loading="lazy"
      />

      {/* Animal info */}
      <div className="p-6 flex flex-col items-center text-center text-[var(--color-text-dark)]">
        <h2 className="text-[24px] md:text-[28px] font-semibold mb-4">
          {animal.name}
        </h2>

        <Button onClick={() => onSelect(animal)}>
          {t("animalCard.button")}
        </Button>
      </div>
    </article>
  );
};

// Prop validation
AnimalCard.propTypes = {
  animal: PropTypes.shape({
    name: PropTypes.string.isRequired,
    images: PropTypes.shape({
      desktop: PropTypes.arrayOf(PropTypes.string).isRequired,
      mobile: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default AnimalCard;
