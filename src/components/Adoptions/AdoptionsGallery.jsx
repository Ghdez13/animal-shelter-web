import { useState } from "react";
import { useTranslation } from "react-i18next";
import animalsCandidates from "../../assets/data/animalCandidates";
import AnimalCard from "../../components/Adoptions/AnimalCard";
import AnimalModal from "../../components/Adoptions/AnimalModal";

const AdoptionsGallery = () => {
  const { t } = useTranslation();
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Handle "Take Home" button click
  const handleSelectAnimal = (animal) => {
    setSelectedAnimal(animal);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedAnimal(null);
    setIsModalOpen(false);
  };

  // Handle filter checkbox changes
  const handleFilterChange = (type) => {
    setSelectedFilters((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  // Filter animals based on selected filters
  const filteredAnimals =
    selectedFilters.length === 0
      ? animalsCandidates
      : animalsCandidates.filter((animal) =>
          selectedFilters.includes(animal.type)
        );

  return (
    <section className="relative flex flex-col items-start gap-10 text-text-dark">
      {/* Page description */}
      <div className="w-full max-w-6xl px-0 md:px-0 lg:px-6 mx-auto">
        <h2 className="text-[25px] font-semibold">
          {t("adoptionsGallery.description")}
        </h2>
      </div>

      {/* Filter section */}
      <div className="w-full flex justify-center">
        <div
          className="inline-flex flex-wrap justify-center items-center gap-6 p-4 rounded-xl shadow-md border-t-4"
          style={{
            backgroundColor: "var(--color-bg-orange)",
            color: "var(--color-text-light)",
            borderColor: "var(--color-focus-secondary)",
          }}
        >
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFilters.includes("dog")}
              onChange={() => handleFilterChange("dog")}
              className="w-5 h-5"
              style={{ accentColor: "var(--color-focus-secondary)" }}
            />
            <span className="text-lg">{t("adoptionsGallery.filterDogs")}</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFilters.includes("cat")}
              onChange={() => handleFilterChange("cat")}
              className="w-5 h-5"
              style={{ accentColor: "var(--color-focus-secondary)" }}
            />
            <span className="text-lg">{t("adoptionsGallery.filterCats")}</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFilters.includes("other")}
              onChange={() => handleFilterChange("other")}
              className="w-5 h-5"
              style={{ accentColor: "var(--color-focus-secondary)" }}
            />
            <span className="text-lg">
              {t("adoptionsGallery.filterOthers")}
            </span>
          </label>
        </div>
      </div>

      {/* Gallery of adoption candidates */}
      <div className="w-full max-w-6xl px-0 md:px-0 lg:px-6 mx-auto">
        {filteredAnimals.length === 0 ? (
          <p
            className="text-center text-lg md:text-xl p-6 rounded-xl"
            style={{
              backgroundColor: "var(--color-bg-light)",
              color: "var(--color-text-dark)",
            }}
          >
            {t("adoptionsGallery.noResults")}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredAnimals.map((animal) => (
              <AnimalCard
                key={animal.name}
                animal={animal}
                onSelect={() => handleSelectAnimal(animal)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal for animal details */}
      <AnimalModal
        animal={selectedAnimal}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default AdoptionsGallery;
