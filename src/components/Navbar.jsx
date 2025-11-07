import LogoDesktop from "../assets/logo/navbar-logo.webp";
import LogoMobile from "../assets/logo/navbar-logoMobile.webp";
import BackgroundOrange from "../assets/images/BackgroundOrange.webp";
import BackgroundOrangeMobile from "../assets/images/BackgroundOrangeMobile.webp";
import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
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
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  // Close mobile menu when clicking outside
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
        {/* Logo linking to home with dynamic title based on language */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-focus-secondary)] rounded-xl transition"
          title={t("navbar.logoTitle")}
        >
          <picture>
            {/* Desktop */}
            <source srcSet={LogoDesktop} media="(min-width: 1140px)" />
            {/* Mobile */}
            <img
              src={LogoMobile}
              alt={t("navbar.logoAlt")}
              className="h-15 md:h-25 lg:h-28 object-contain"
            />
          </picture>
        </Link>

        {/* Hamburger button for mobile */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="absolute top-6 right-6 w-20 h-4 flex items-center justify-center min-[1140px]:hidden z-60 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-focus-secondary)] focus-visible:rounded-lg transition"
          aria-label={t("navbar.toggleMenu")}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          title={
            isOpen ? t("navbar.toggleMenuClose") : t("navbar.toggleMenuOpen")
          } // ✅ Title changes dynamically
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

        {/* Desktop menu */}
        <div className="hidden min-[1140px]:flex min-[1140px]:space-x-6 items-center">
          {MENU_ITEMS.map((item) => (
            <NavLink
              key={item}
              to={`/${item}`}
              aria-label={t(`menu.${item}`)}
              className={({ isActive }) =>
                `relative text-2xl transition focus:outline-none hover:after:w-full focus-visible:after:w-full after:absolute after:-bottom-1 after:left-0 after:h-1 after:bg-[var(--color-focus-secondary)] after:w-0 after:transition-all after:duration-300 ${
                  isActive
                    ? "after:w-full text-[var(--color-text-light)]"
                    : "text-[var(--color-text-light)]"
                }`
              }
            >
              {t(`menu.${item}`)}
            </NavLink>
          ))}

          {/* Desktop language selector */}
          <div className="flex space-x-4">
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => i18n.changeLanguage(code)}
                className={`relative font-semibold transition hover:after:w-full focus-visible:after:w-full after:absolute after:-bottom-1 after:left-0 after:h-1 after:bg-[var(--color-focus-secondary)] after:w-0 after:transition-all after:duration-300 ${
                  i18n.language === code
                    ? "after:w-full text-[var(--color-text-light)]"
                    : "text-[var(--color-text-light)]"
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
          {/* Menu container with mobile optimized background */}
          <div
            ref={modalRef}
            className="w-3/4 max-w-xs h-full p-8 pt-25 flex flex-col space-y-8 shadow-lg"
            style={{
              backgroundImage: `url(${
                window.innerWidth < 1140
                  ? BackgroundOrangeMobile
                  : BackgroundOrange
              })`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu links */}
            {MENU_ITEMS.map((item) => (
              <Link
                key={item}
                to={`/${item}`}
                aria-label={t(`menu.${item}`)}
                onClick={() => setIsOpen(false)}
                className="relative inline-block text-2xl text-[var(--color-text-light)] transition focus:outline-none hover:after:w-full focus-visible:after:w-full after:absolute after:-bottom-1 after:left-0 after:h-1 after:bg-[var(--color-focus-secondary)] after:w-0 after:transition-all after:duration-300"
              >
                {t(`menu.${item}`)}
              </Link>
            ))}

            {/* Mobile language selector */}
            <div className="flex justify-center space-x-4 pt-6 border-t border-[var(--color-text-light)]">
              {LANGUAGES.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => {
                    i18n.changeLanguage(code);
                    setIsOpen(false);
                  }}
                  className={`relative inline-block font-semibold transition hover:after:w-full focus-visible:after:w-full after:absolute after:-bottom-1 after:left-0 after:h-1 after:bg-[var(--color-focus-secondary)] after:w-0 after:transition-all after:duration-300 ${
                    i18n.language === code
                      ? "after:w-full text-[var(--color-text-light)]"
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
