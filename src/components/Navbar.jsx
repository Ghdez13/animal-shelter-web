import LogoBlack from "../assets/logo/navbar-logo.webP";
import BackgroundOrange from "../assets/images/BackgroundOrange.webp";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Menu paths and translations
const MENU_ITEMS = [
  "services",
  "volunteer",
  "donations",
  "about-us",
  "contact",
];
const LANGUAGES = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-primary)]";

  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.classList.toggle("modal-open", isOpen);
  }, [isOpen]);

  return (
    <nav
      className="w-full bg-transparent text-[var(--color-text-dark)] font-semibold z-50"
      role="navigation"
    >
      <div className="max-w-6xl mx-auto w-full pl-5 pr-5 py-3 flex justify-between items-center">
        {/* Logo linking to home */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="focus-visible:outline-2 focus:outline-offset-4"
          style={{ outlineColor: "var(--color-focus-primary)" }}
        >
          <img
            src={LogoBlack}
            alt={t("navbar.logoAlt")}
            className="h-15 lg:h-28 object-contain"
          />
        </Link>

        {/* Hamburger button for mobile */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className={`absolute top-6 right-6 w-20 h-4 flex items-center justify-center min-[1200px]:hidden ${focusRing} z-60`}
          aria-label={t("navbar.toggleMenu")}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {/* Hamburger animation spans */}
          <span
            className={`absolute w-16 h-1.5 rounded transition-transform duration-300 ease-in-out ${
              isOpen
                ? "rotate-45 bg-[var(--color-text-light)]"
                : "-translate-y-2 bg-[var(--color-text-light)]"
            }`}
          ></span>
          <span
            className={`absolute w-16 h-1.5 rounded transition-opacity duration-300 ease-in-out ${
              isOpen ? "opacity-0" : "opacity-100 bg-[var(--color-text-light)]"
            }`}
          ></span>
          <span
            className={`absolute w-16 h-1.5 rounded transition-transform duration-300 ease-in-out ${
              isOpen
                ? "-rotate-45 bg-[var(--color-text-light)]"
                : "translate-y-2 bg-[var(--color-text-light)]"
            }`}
          ></span>
        </button>

        {/* Desktop menu (visible only from 1200px and up) */}
        <div className="hidden min-[1200px]:flex min-[1200px]:space-x-6 items-center">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item}
              to={`/${item}`}
              aria-label={t(`menu.${item.replace("-", "")}`)}
              className="text-2xl hover:underline focus:outline-none focus:text-[var(--color-focus-primary)]"
            >
              {t(`menu.${item}`)}
            </Link>
          ))}

          {/* Desktop language selector */}
          <div className="flex space-x-4">
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => i18n.changeLanguage(code)}
                className={`font-semibold transition ${
                  i18n.language === code
                    ? "text-[var(--color-focus-primary)]"
                    : "text-[var(--color-text-dark)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 bg-transparent z-50 flex justify-end"
          onClick={() => setIsOpen(false)}
        >
          <div
            ref={modalRef}
            className="w-3/4 max-w-xs h-full p-8 pt-25 flex flex-col space-y-8 shadow-lg"
            style={{
              backgroundImage: `url(${BackgroundOrange})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {MENU_ITEMS.map((item) => (
              <Link
                key={item}
                to={`/${item}`}
                aria-label={t(`menu.${item.replace("-", "")}`)}
                className="text-2xl text-[var(--color-text-light)] hover:underline focus-visible:outline-none focus:text-[var(--color-focus-secondary)]"
                onClick={() => setIsOpen(false)}
              >
                {t(`menu.${item}`)}
              </Link>
            ))}

            <div className="flex justify-center space-x-4 pt-6 border-t border-[var(--color-text-light)]">
              {LANGUAGES.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => {
                    i18n.changeLanguage(code);
                    setIsOpen(false);
                  }}
                  className={`text-lg font-semibold transition ${
                    i18n.language === code
                      ? "text-[var(--color-focus-secondary)]"
                      : "text-[var(--color-text-light)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
