import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import LazyImage from "../LazyImage"; // Import LazyImage component for optimized image loading

const Cards = () => {
  const { t, i18n } = useTranslation(); // Access translation function and current language
  const [cards, setCards] = useState([]); // State to hold card data
  const [imgIndices, setImgIndices] = useState({}); // Track current image index for cards with multiple images

  // Load card data from JSON file
  useEffect(() => {
    import("../../assets/data/homeCards.json").then((module) =>
      setCards(module.default)
    );
  }, []);

  // Setup image rotation for cards that have multiple images
  useEffect(() => {
    const timers = [];

    cards.forEach((card, i) => {
      if (card.images?.length > 1) {
        const delay = i * 500; // stagger start times for rotation

        const rotate = () => {
          setImgIndices((prev) => ({
            ...prev,
            [card.id]: ((prev[card.id] || 0) + 1) % card.images.length,
          }));
          timers[i] = setTimeout(rotate, 5000); // rotate every 5 seconds
        };

        timers[i] = setTimeout(rotate, delay);
      }
    });

    // Clear all timers on component unmount
    return () => timers.forEach((t) => clearTimeout(t));
  }, [cards]);

  return (
    <section className="px-6">
      <div className="cards-container grid gap-6 px-0 md:px-0 lg:px-6 md:max-w-6xl md:mx-auto md:grid-cols-2 mt-20">
        {cards.map((card, i) => {
          const currentIndex = imgIndices[card.id] || 0; // get current image index
          const rowReverse = i >= 2; // reverse layout for second row

          return (
            <div
              key={card.id}
              className={`bg-[var(--color-bg-article)] rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 md:flex md:items-stretch md:gap-6 ${
                rowReverse ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image card using LazyImage for desktop and mobile */}
              {card.type === "image" && (
                <div className="w-full md:flex-1 aspect-[16/9]">
                  {/* Desktop image */}
                  <LazyImage
                    src={card.images[currentIndex].desktop}
                    alt={t(card.alt)}
                    className="hidden md:block w-full h-full object-cover"
                  />

                  {/* Mobile image */}
                  <LazyImage
                    src={card.images[currentIndex].mobile}
                    alt={t(card.alt) + " mobile"}
                    className="block md:hidden w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Text card */}
              {card.type === "text" && (
                <div className="p-6 md:p-12 text-[var(--color-text-dark)] flex-1 flex flex-col justify-center hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
                  <h2 className="text-[40px]  font-bold mb-2">
                    {t(card.title)}
                  </h2>
                  <p className="text-[20px] mb-4">{t(card.content)}</p>
                  {card.link && (
                    <Button
                      to={card.link}
                      aria-label={
                        card.button[i18n.language] || card.button["es"]
                      }
                    >
                      {card.button[i18n.language] || card.button["es"]}
                    </Button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Cards;
