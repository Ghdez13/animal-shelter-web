import { useState, useEffect } from "react";

const LazyImage = ({ src, srcMobile, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    // Detect screen width and set appropriate image
    const updateSrc = () => {
      if (window.innerWidth < 768 && srcMobile) {
        setCurrentSrc(srcMobile);
      } else {
        setCurrentSrc(src);
      }
    };

    updateSrc();
    window.addEventListener("resize", updateSrc);

    return () => window.removeEventListener("resize", updateSrc);
  }, [src, srcMobile]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
      )}

      {/* Image */}
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default LazyImage;
