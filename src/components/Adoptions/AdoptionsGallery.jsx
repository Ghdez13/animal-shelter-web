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
    <main className="px-6">
      {/* Page description */}
      <div className="max-w-6xl mx-auto px-6 md:px-6 lg:px-6">
        <p className="text-[20px] text-[var(--color-text-dark)]">
          {t("adoptionsGallery.description")}
        </p>
      </div>

      {/* Filter section */}
      <div
        className="max-w-6xl mx-auto my-10 p-4 rounded-xl flex flex-wrap justify-center gap-6"
        style={{
          backgroundColor: "var(--color-bg-orange)",
          color: "var(--color-text-light)",
        }}
      >
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedFilters.includes("dog")}
            onChange={() => handleFilterChange("dog")}
            className="w-5 h-5"
            style={{
              accentColor: "var(--color-focus-secondary)",
              color: "#eeeeee",
            }}
          />
          <span className="text-lg">{t("adoptionsGallery.filterDogs")}</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedFilters.includes("cat")}
            onChange={() => handleFilterChange("cat")}
            className="w-5 h-5"
            style={{
              accentColor: "var(--color-focus-secondary)",
              color: "#eeeeee",
            }}
          />
          <span className="text-lg">{t("adoptionsGallery.filterCats")}</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedFilters.includes("other")}
            onChange={() => handleFilterChange("other")}
            className="w-5 h-5"
            style={{
              accentColor: "var(--color-focus-secondary)",
              color: "#eeeeee",
            }}
          />
          <span className="text-lg">{t("adoptionsGallery.filterOthers")}</span>
        </label>
      </div>

      {/* Gallery of adoption candidates */}
      <section className="max-w-6xl mx-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredAnimals.map((animal) => (
          <AnimalCard
            key={animal.name}
            animal={animal}
            onSelect={() => handleSelectAnimal(animal)}
          />
        ))}
      </section>

      {/* Modal for animal details */}
      <AnimalModal
        animal={selectedAnimal}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
};

export default AdoptionsGallery;
