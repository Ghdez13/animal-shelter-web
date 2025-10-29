import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button";

const Cards = () => {
  const { t } = useTranslation();
  const [cards, setCards] = useState([]);
  const [imgIndices, setImgIndices] = useState({});

  useEffect(() => {
    import("../../assets/data/homeCards.json").then((module) =>
      setCards(module.default)
    );
  }, []);

  useEffect(() => {
    const timers = [];

    cards.forEach((card, i) => {
      if (card.images?.length > 1) {
        const delay = i * 500;
        const rotate = () => {
          setImgIndices((prev) => ({
            ...prev,
            [card.id]: ((prev[card.id] || 0) + 1) % card.images.length,
          }));
          timers[i] = setTimeout(rotate, 5000);
        };
        timers[i] = setTimeout(rotate, delay);
      }
    });

    return () => timers.forEach((t) => clearTimeout(t));
  }, [cards]);

  return (
    <div className="cards-container grid gap-6 p-6 md:max-w-6xl md:mx-auto md:grid-cols-2 mt-12">
      {cards.map((card, i) => {
        const currentIndex = imgIndices[card.id] || 0;
        const rowReverse = i >= 2; // second row reversed

        return (
          <div
            key={card.id}
            className={`bg-[var(--color-bg-article)] rounded-lg shadow-md overflow-hidden transition md:flex md:items-stretch md:gap-6 ${
              rowReverse ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image card */}
            {card.type === "image" && (
              <div className="w-full md:flex-1">
                <img
                  src={card.images[currentIndex]}
                  alt={t(card.alt)}
                  className="w-full h-auto md:h-full object-contain md:object-cover"
                />
              </div>
            )}

            {/* Text card */}
            {card.type === "text" && (
              <div className="p-6 md:p-12 flex-1 flex flex-col justify-center">
                <h2 className="text-[40px] font-bold mb-2">{t(card.title)}</h2>
                <p className="text-[var(--color-text-dark)] text-[20px] mb-4">
                  {t(card.content)}
                </p>
                {card.link && (
                  <Button
                    to={card.link}
                    aria-label={`Learn more about ${t(card.title)}`}
                  >
                    {t("card.learn_more")}
                  </Button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Cards;

