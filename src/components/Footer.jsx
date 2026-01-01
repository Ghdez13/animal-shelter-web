import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AutoCloseModal from "./AutoCloseModal";
import FooterContact from "./FooterContact";

// Logos
import LogoDesktop from "../assets/logo/footer-logo.webp";
import LogoMobile from "../assets/logo/footer-logoMobile.webp";

// Backgrounds
import BackgroundOrange from "../assets/images/BackgroundOrange.webp";
import BackgroundOrangeMobile from "../assets/images/BackgroundOrangeMobile.webp";

// Decorative images
import DecorativeImage from "../assets/images/footer.webp";
import DecorativeImageMobile from "../assets/images/footerMobile.webp";

const MENU_ITEMS = [
  "services",
  "volunteer",
  "donations",
  "about-us",
  "contact",
];

const Footer = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const emailParts = [
    String.fromCharCode(
      115,
      104,
      101,
      108,
      116,
      101,
      114,
      106,
      97,
      117,
      115,
      112,
      101,
      116
    ),
    "@",
    "outlook.com",
  ];

  return (
    <footer className="text-text-dark font-semibold bg-transparent px-6 py-10 mt-12">
      <div className="max-w-6xl mx-auto w-full px-0 lg:px-6 flex flex-col gap-5">
        {/* Logo + Menu */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-center w-full px-5 mb-6 gap-8 md:gap-16">
          {/* Logo */}
          <div className="flex justify-start">
            <Link
              to="/"
              aria-label={t("footer.goHome")}
              title={t("footer.goHome")}
              className="focus-visible:outline-2 focus:outline-offset-4"
              style={{ outlineColor: "var(--color-focus-primary)" }}
            >
              <picture>
                <source srcSet={LogoDesktop} media="(min-width: 1140px)" />
                <img
                  src={LogoMobile}
                  alt={t("footer.logoAlt")}
                  className="h-15 lg:h-20 object-contain md:-mt-5"
                />
              </picture>
            </Link>
          </div>

          {/* Menu */}
          <div className="text-lg md:text-2xl flex flex-row w-full md:w-auto justify-around md:gap-16">
            <div className="flex flex-col gap-2 text-center md:text-left">
              {MENU_ITEMS.slice(0, 2).map((item) => (
                <Link
                  key={item}
                  to={`/${item}`}
                  className="hover:underline hover:decoration-(--color-focus-primary) hover:decoration-3 focus-visible:outline-none"
                  aria-label={t(`menu.alt${item}`)}
                >
                  {t(`menu.${item}`)}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2 text-center md:text-left">
              {MENU_ITEMS.slice(2, 4).map((item) => (
                <Link
                  key={item}
                  to={`/${item}`}
                  className="hover:underline hover:decoration-(--color-focus-primary) hover:decoration-3 focus-visible:outline-none"
                  aria-label={t(`menu.alt${item}`)}
                >
                  {t(`menu.${item}`)}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2 text-center md:text-left">
              <Link
                to="/contact"
                className="hover:underline hover:decoration-(--color-focus-primary) hover:decoration-3 focus-visible:outline-none"
                aria-label={t("menu.altContact")}
              >
                {t("menu.contact")}
              </Link>

              {/* Social */}
              <div className="flex justify-center md:justify-start space-x-4 pt-1">
                <a
                  href="https://www.facebook.com/share/g/1UWTcoS6Yx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("footer.facebook")}
                  title={t("footer.facebook")}
                  className="-mt-2 md:-mt-1 w-8 h-8 block bg-[url('/icons/facebook.webp')] hover:bg-[url('/icons/facebookhover.webp')] bg-contain bg-no-repeat transition-all duration-200 focus-visible:ring-2 focus-visible:ring-(--color-focus-primary)"
                />

                <button
                  aria-label={t("footer.instagram")}
                  title={t("footer.instagram")}
                  className="-mt-2 md:-mt-1 w-8 h-8 block bg-[url('/icons/instagram.webp')] hover:bg-[url('/icons/instagramhover.webp')] bg-contain bg-no-repeat transition-all duration-200 focus-visible:ring-2 focus-visible:ring-(--color-focus-primary)"
                  onClick={() => openModal("instagramUnderConstruction")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact section */}
        <div
          className="relative text-lg md:text-2xl flex flex-col items-start p-6 rounded-lg text-(--color-text-light) gap-6 overflow-hidden"
          style={{
            backgroundImage: `url(${
              window.innerWidth < 1140
                ? BackgroundOrangeMobile
                : BackgroundOrange
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col gap-3 z-10">
            <h3 className="font-extrabold">{t("footer.contactTitle")}</h3>
            <FooterContact emailParts={emailParts} />
          </div>

          <div className="flex flex-col gap-3 z-10">
            <h3 className="font-extrabold">
              {t("footer.visitUs")}{" "}
              <span role="img" aria-label="Location pin">
                📍
              </span>
            </h3>
            <a
              href="https://maps.app.goo.gl/wTxnETvNsVKJXiEG6"
              target="_blank"
              rel="noopener noreferrer"
              className="leading-6 font-normal transition-colors hover:text-focus-tertiary focus-visible:outline-none"
            >
              5ta Av. esquina con Av. Constituyentes s/n,
              <br />
              Centro, Playa del Carmen, Q.R.
            </a>
          </div>

          {/* Decorative */}
          <div className="block md:hidden relative w-full max-w-[280px] mx-auto mt-20">
            <img
              src={DecorativeImageMobile}
              alt="Decorative footer mobile"
              className="w-full absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-90"
            />
          </div>

          <div className="hidden md:block absolute bottom-0 right-0 w-[300px] lg:w-[500px] opacity-90">
            <img
              src={DecorativeImage}
              alt="Decorative footer"
              className="w-full transform translate-y-10"
            />
          </div>
        </div>

        {/* Rights */}
        <div className="text-xs md:text-lg flex justify-between mt-4">
          <p>
            © {new Date().getFullYear()}. {t("footer.rights")} <br />
            {t("footer.allRightsReserved")}.
          </p>
          <p>
            {t("footer.developedBy")}
            <br />
            <a
              href="https://www.linkedin.com/in/jerry-hernandez-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Jerry Hernández.
            </a>
          </p>
        </div>
      </div>

      {isModalOpen && (
        <AutoCloseModal
          type={modalType}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </footer>
  );
};

export default Footer;
