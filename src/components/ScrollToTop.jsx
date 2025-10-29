import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ smooth = true }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({
      top: 0,
      behavior: smooth ? "smooth" : "auto", // Optional smooth behavior
    });
  }, [pathname, smooth]);

  return null; // No UI rendered
};

export default ScrollToTop;
