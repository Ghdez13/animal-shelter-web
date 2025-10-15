import { useState, useEffect } from "react";
import ScrollIcon from "../assets/icons/to-back.svg"; // your SVG icon

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling down 300px
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll smoothly to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null; // Don't render if not visible

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white border-2 border-[#2c7d7a] shadow-lg hover:bg-[#ef7a2b] transition-colors"
    >
      <img src={ScrollIcon} alt="Scroll to top" className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTopButton;
