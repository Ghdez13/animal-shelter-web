// src/components/Adoptions/AnimalCard.jsx
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Button from "../Button";

const AnimalCard = ({ animal, onSelect }) => {
  const { t } = useTranslation();

  // Get the first image for preview in the card
  const mainImage =
    animal.images && animal.images.length > 0 ? animal.images[0] : "";

  return (
    <article
      className="flex flex-col items-center  bg-transparent  rounded-2xl shadow-lg overflow-hidden hover:-translate-y-1 transition-transform duration-300"
      aria-label={animal.name}
    >
      {/* Animal image */}
      <img
        src={mainImage}
        alt={animal.name}
        className="w-full h-64 object-cover"
      />

      {/* Animal info */}
      <div className="p-6  flex flex-col items-center text-center text-[var(--color-text-dark)]">
        <h2 className="text-[24px] md:text-[28px] font-semibold mb-4">
          {animal.name}
        </h2>

        {/* Button to open modal */}
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
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default AnimalCard;
