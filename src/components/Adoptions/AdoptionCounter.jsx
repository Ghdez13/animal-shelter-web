import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Confetti from "react-confetti";

const AdoptionCounter = ({ max = 250, speed = 20 }) => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [showNumber, setShowNumber] = useState(true); // Visibility for blinking
  const [hasFinished, setHasFinished] = useState(false); // Counter reached max
  const [isBlinking, setIsBlinking] = useState(false); // Track if blinking is active
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Set window size for confetti
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Increment counter
  useEffect(() => {
    if (count < max) {
      const increment = Math.ceil(max / 100);
      const timer = setTimeout(() => {
        setCount((prev) => {
          const next = Math.min(prev + increment, max);
          if (next === max) setHasFinished(true);
          return next;
        });
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [count, max, speed]);

  // Blink number after counter finishes
  useEffect(() => {
    if (!hasFinished) return;

    setIsBlinking(true);
    const blinkDuration = 10000; // 10 seconds
    const blinkInterval = 500;
    let elapsed = 0;

    const interval = setInterval(() => {
      setShowNumber((prev) => !prev);
      elapsed += blinkInterval;
      if (elapsed >= blinkDuration) {
        clearInterval(interval);
        setShowNumber(true);
        setIsBlinking(false); // Stop blinking and confetti
      }
    }, blinkInterval);

    return () => clearInterval(interval);
  }, [hasFinished]);

  return (
    <div className="w-full flex justify-center mb-10 relative">
      {/* Confetti only while blinking */}
      {isBlinking && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}
      <div
        className="inline-flex flex-col justify-center items-center gap-6 p-4 rounded-xl shadow-md border-t-4 z-10"
        style={{
          backgroundColor: "var(--color-bg-orange)",
          color: "var(--color-text-light)",
          borderColor: "var(--color-focus-secondary)",
        }}
      >
        <h2 className="text-2xl font-bold text-center">
          {t("adoptions.counterTitle")}
        </h2>
        <p
          className="text-4xl font-extrabold"
          style={{ visibility: showNumber ? "visible" : "hidden" }}
        >
          {count}
        </p>
      </div>
    </div>
  );
};

export default AdoptionCounter;
