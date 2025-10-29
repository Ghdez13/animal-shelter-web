import { useState, useEffect } from "react";
import ScrollIcon from "../assets/icons/to-back.svg"; // your SVG icon

const ScrollToTopButton = ({
  scrollThreshold = 300, // pixels
  smooth = true, // scroll behavior
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full 
                 bg-white border-2 border-[#2c7d7a] shadow-lg hover:bg-[#ef7a2b] transition-colors 
                 opacity-90 hover:opacity-100"
    >
      <img src={ScrollIcon} alt="Scroll to top" className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTopButton;
