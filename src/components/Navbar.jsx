import LogoBlack from "../assets/logo/navbar-logo.webP";
import BackgroundOrange from "../assets/images/BackgroundOrange.webp";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-primary)]";

  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      document.body.classList.add("modal-open");
    } else {
      document.removeEventListener("click", handleClickOutside);
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  return (
    <nav className="w-full bg-transparent text-[var(--color-text-dark)] font-semibold z-50">
      <div className="max-w-6xl mx-auto w-full pl-5 pr-5 py-3 flex justify-between items-center">
        {/* Logo */}
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

        {/* Hamburger / Close Button */}
        <button
          onClick={(event) => {
            event.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className={`absolute top-6 right-6 w-20 h-4 flex items-center justify-center lg:hidden ${focusRing} z-60`}
          aria-label={t("navbar.toggleMenu")}
          aria-expanded={isOpen}
        >
          <span
            className={`absolute w-16 h-1.5 rounded transition-transform duration-300 ease-in-out ${
              isOpen
                ? "bg-[var(--color-text-light)] rotate-45"
                : "bg-[var(--color-text-light)] -translate-y-2"
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
                ? "bg-[var(--color-text-light)] -rotate-45"
                : "bg-[var(--color-text-light)] translate-y-2"
            }`}
          ></span>

          <span
            className={`absolute top-full mt-2 text-lg tracking-widest select-none ${
              isOpen
                ? "text-[var(--color-text-light)]"
                : "text-[var(--color-text-light)]"
            }`}
          >
            {isOpen ? t("navbar.close") : t("navbar.menu")}
          </span>
        </button>

        {/* Desktop navigation links */}
        <div className="hidden lg:flex lg:space-x-6 items-center">
          <Link
            to="/services"
            aria-label={t("navbar.learnOurServices")}
            className={`text-2xl hover:underline focus:outline-none focus:text-[var(--color-focus-primary)]`}
          >
            {t("menu.services")}
          </Link>
          <Link
            to="/volunteer"
            aria-label={t("navbar.learnVolunteerOpportunities")}
            className={`text-2xl hover:underline focus:outline-none focus:text-[var(--color-focus-primary)]`}
          >
            {t("menu.volunteer")}
          </Link>
          <Link
            to="/donations"
            aria-label={t("navbar.donateAnimalShelter")}
            className={`text-2xl hover:underline focus:outline-none focus:text-[var(--color-focus-primary)]`}
          >
            {t("menu.donations")}
          </Link>
          <Link
            to="/about-us"
            aria-label={t("navbar.learnAboutUs")}
            className={`text-2xl hover:underline focus:outline-none focus:text-[var(--color-focus-primary)]`}
          >
            {t("menu.about-us")}
          </Link>
          <Link
            to="/contact"
            aria-label={t("navbar.contactUs")}
            className={`text-2xl hover:underline focus:outline-none focus:text-[var(--color-focus-primary)]`}
          >
            {t("menu.contact")}
          </Link>
          {/* Language selection buttons for desktop */}
          <div className="flex space-x-4">
            {["es", "en", "fr"].map((code) => (
              <button
                key={code}
                onClick={() => i18n.changeLanguage(code)}
                className={`font-semibold transition ${
                  i18n.language === code
                    ? "text-[var(--color-focus-primary)]"
                    : "text-[var(--color-text-dark)]"
                }`}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal overlay + mobile nav */}
      {isOpen && (
        <div
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
            {["services", "volunteer", "donations", "about-us", "contact"].map(
              (path) => (
                <Link
                  key={path}
                  to={`/${path}`}
                  aria-label={t(`navbar.${path.replace("-", "")}`)}
                  className="text-2xl text-[var(--color-text-light)] hover:underline focus-visible:outline-none focus:text-[var(--color-focus-secondary)]"
                  onClick={() => setIsOpen(false)}
                >
                  {t(`menu.${path}`)}
                </Link>
              )
            )}

            {/* Language selection buttons */}
            <div className="flex justify-center space-x-4 pt-6 border-t border-[var(--color-text-light)]">
              {[
                { code: "es", label: "ES" },
                { code: "en", label: "EN" },
                { code: "fr", label: "FR" },
              ].map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => {
                    i18n.changeLanguage(code);
                    setIsOpen(false); // cerrar menú tras elegir idioma
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
