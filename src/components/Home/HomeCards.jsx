//Imports
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const Cards = () => {
  //Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [imgIndices, setImgIndices] = useState({}); // Current image index per card

  //Effect: Load cards data from JSON
  useEffect(() => {
    import("../../assets/data/cards.json").then((module) =>
      setCards(module.default)
    );
  }, []);

  //Effect: Set up timers for image rotation per card
  useEffect(() => {
    const timers = [];

    cards.forEach((card, i) => {
      if (card.images && card.images.length > 1) {
        const delay = i * 500; // 0.5s stagger for starting the timer

        const timer = setTimeout(function change() {
          setImgIndices((prev) => ({
            ...prev,
            [card.id]: ((prev[card.id] || 0) + 1) % card.images.length,
          }));
          setTimeout(change, 5000); // Repeat every 5s
        }, delay);

        timers.push(timer);
      }
    });

    return () => timers.forEach((t) => clearTimeout(t));
  }, [cards]);

  const handleClick = (link) => {
    if (link) navigate(link);
  };

  //Handlers
  return (
    <div className="cards-container grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
      {cards.map((card, i) => {
        const currentIndex = imgIndices[card.id] || 0;

        return (
          <div
            key={card.id}
            className="card bg-[var(--color-bg-article)] rounded-lg shadow-md overflow-hidden transition"
          >
            {/* Image card with crossfade */}
            {card.type === "image" && (
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                {card.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={t(card.alt)}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
                      idx === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: `${i * 0.1}s` }} // stagger fade
                  />
                ))}
              </div>
            )}

            {/* Text card */}
            {card.type === "text" && (
              <div className="p-12 aspect-[4/3] flex flex-col justify-between">
                <h2 className="text-[40px] font-bold mb-2">{t(card.title)}</h2>
                <p className="text-[var(--color-text-dark)] text-[20px] mb-4">
                  {t(card.content)}
                </p>
                {card.link && (
                  <Button
                    link={card.link}
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
