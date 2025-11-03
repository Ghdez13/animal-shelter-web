// src/components/Adoptions/AnimalModal.jsx
import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button";

const AnimalModal = ({ animal, isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const [interested, setInterested] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  // Don't render anything if modal is closed
  if (!isOpen || !animal) return null;

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In the future, you can connect this with a backend API call
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[var(--color-bg-light)] rounded-2xl shadow-xl max-w-3xl w-full overflow-hidden relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-text-dark)] text-2xl font-bold hover:scale-110 transition-transform"
          aria-label={t("animalModal.close")}
        >
          ×
        </button>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left side - image */}
          <div className="h-80 md:h-full overflow-hidden">
            <img
              src={animal.images[0]}
              alt={animal.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right side - info and form */}
          <div className="p-6 flex flex-col justify-between text-[var(--color-text-dark)]">
            <div>
              <h2 className="text-3xl font-bold mb-4">{animal.name}</h2>

              {/* Animal details */}
              <ul className="space-y-1 mb-6 text-[18px]">
                <li>
                  <strong>{t("animalModal.age")}:</strong>{" "}
                  {animal.age[i18n.language]}
                </li>
                <li>
                  <strong>{t("animalModal.sex")}:</strong>{" "}
                  {animal.sex[i18n.language]}
                </li>
                <li>
                  <strong>{t("animalModal.size")}:</strong>{" "}
                  {animal.size[i18n.language]}
                </li>
                <li>
                  <strong>{t("animalModal.sterilized")}:</strong>{" "}
                  {animal.sterilized[i18n.language]}
                </li>
                <li>
                  <strong>{t("animalModal.personality")}:</strong>{" "}
                  {animal.personality[i18n.language]}
                </li>
              </ul>
            </div>

            {/* Interest form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="flex items-center space-x-2 text-[18px]">
                <input
                  type="checkbox"
                  checked={interested}
                  onChange={() => setInterested(!interested)}
                />
                <span>
                  {t("animalModal.interestedIn", { name: animal.name })}
                </span>
              </label>

              {interested && (
                <div className="space-y-3 mt-3">
                  <input
                    type="text"
                    name="name"
                    placeholder={t("animalModal.namePlaceholder")}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={t("animalModal.emailPlaceholder")}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                  <Button type="submit">{t("animalModal.submitButton")}</Button>
                </div>
              )}

              {submitted && (
                <p className="text-green-600 mt-4 font-medium">
                  {t("animalModal.thankYou")}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

AnimalModal.propTypes = {
  animal: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AnimalModal;
