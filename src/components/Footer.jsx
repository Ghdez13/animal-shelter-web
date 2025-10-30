import { useState } from "react"; // for modal state
import { useTranslation } from "react-i18next";
import AutoCloseModal from "./AutoCloseModal";
import FooterContact from "./FooterContact";
import LogoSmall from "../assets/logo/footer-logo.webp";
import BackgroundOrange from "../assets/images/BackgroundOrange.webp";
import DecorativeImage from "../assets/images/footer.webp";

const Footer = () => {
  const { t } = useTranslation();

  // Accessibility focus styles
  const focusTextPrimary =
    "focus:outline-none focus:text-[var(--color-focus-primary)]";
  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-primary)]";

  // Modal state
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
    ), // "shelterjauspet"
    "@",
    "outlook.com",
  ];

  return (
    <footer className="text-[var(--color-text-dark)] font-semibold bg-transparent px-6 py-10 mt-12">
      <div className="max-w-6xl mx-auto w-full px-0 md:px-0 lg:px-6 flex flex-col gap-5">
        {/* Logo + Menu section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-center w-full px-5 mb-6 gap-8 md:gap-16">
          {/* Logo */}
          <div className="flex justify-star">
            <a
              href="/"
              aria-label={t("footer.goHome")}
              className="focus-visible:outline-2 focus:outline-offset-4"
              style={{ outlineColor: "var(--color-focus-primary)" }}
            >
              <img
                src={LogoSmall}
                alt={t("footer.logoAlt")}
                className="h-15 lg:h-20 object-contain"
              />
            </a>
          </div>

          {/* Menu and social section */}
          <div className="text-lg md:text-2xl flex flex-row w-full md:w-auto justify-around md:justify-end md:gap-16">
            {/* Menu group 1 */}
            <div className="flex flex-col gap-2 text-center md:text-left">
              <a
                href="/services"
                className={`hover:underline ${focusTextPrimary}`}
              >
                {t("menu.services")}
              </a>
              <a
                href="/volunteer"
                className={`hover:underline ${focusTextPrimary}`}
              >
                {t("menu.volunteer")}
              </a>
            </div>

            {/* Menu group 2 */}
            <div className="flex flex-col gap-2 text-center md:text-left">
              <a
                href="/donations"
                className={`hover:underline ${focusTextPrimary}`}
              >
                {t("menu.donations")}
              </a>
              <a
                href="/about-us"
                className={`hover:underline ${focusTextPrimary}`}
              >
                {t("menu.about-us")}
              </a>
            </div>

            {/* Menu group 3 + social icons */}
            <div className="flex flex-col gap-2 text-center md:text-left">
              <a
                href="/contact"
                className={`hover:underline ${focusTextPrimary}`}
              >
                {t("menu.contact")}
              </a>

              {/* Social Media Icons */}
              <div className="flex justify-center md:justify-start space-x-4 pt-1">
                {/* Facebook icon */}
                <a
                  href="https://www.facebook.com/share/g/1UWTcoS6Yx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("footer.facebook")}
                  className={`
            w-5 h-5 md:w-8 md:h-8 block
            bg-[url('/icons/facebook.webp')]
            hover:bg-[url('/icons/facebookhover.webp')]
            bg-contain bg-no-repeat
            transition-all duration-200
            ${focusRing}
          `}
                />
                {/* Instagram icon */}
                <button
                  aria-label={t("footer.instagram")}
                  className={`w-5 h-5 md:w-8 md:h-8 block bg-[url('/icons/instagram.webp')] hover:bg-[url('/icons/instagramhover.webp')] bg-contain bg-no-repeat transition-all duration-200 ${focusRing}`}
                  onClick={() => openModal("instagramUnderConstruction")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact section with orange background */}
        <div
          className="relative text-lg md:text-2xl flex flex-col items-start p-6 rounded-lg text-[var(--color-text-light)] gap-6 overflow-hidden"
          style={{
            backgroundImage: `url(${BackgroundOrange})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Contact info group */}
          <div className="flex flex-col gap-3 z-10">
            <h3 className="font-extrabold">{t("footer.contactTitle")}</h3>
            <FooterContact emailParts={emailParts} />
          </div>

          {/* Address group */}
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
              aria-label={t("footer.viewExactLocation")}
              className="hover:underline leading-6 block font-normal focus-visible:outline-none focus:text-[var(--color-focus-secondary)]"
            >
              5ta Av. esquina con Av. Constituyentes s/n,
              <br />
              Centro, Playa del Carmen, Q.R.
            </a>
          </div>

          {/* Decorative image for mobile */}
          <div className="block md:hidden relative w-[250px] mx-auto mt-16">
            <img
              src={DecorativeImage}
              alt="Decorative footer mobile"
              className="
      w-full h-auto absolute -bottom-8 left-1/2 transform -translate-x-1/2 sm:w-[280px] sm:-bottom-8"
            />
          </div>

          {/* Decorative image for md and up */}
          <div className="hidden md:block absolute bottom-0 right-0 w-[320px] md:w-[300px] [@media(min-width:920px)]:w-[500px] opacity-90">
            <img
              src={DecorativeImage}
              alt="Decorative footer md+"
              className="absolute -right-8 bottom-7 w-full h-auto opacity-90 transform translate-y-10"
            />
          </div>
        </div>

        {/* Rights and developer info */}
        <div className="text-xs md:text-lg text-[var(--color-text-dark)] flex justify-between items-start w-full mt-4">
          {/* Left: rights */}
          <p>
            © {new Date().getFullYear()}. {t("footer.rights")} <br />
            {t("footer.allRightsReserved")}.
          </p>
          {/* Right: developer */}
          <p>
            {t("footer.developedBy") + " "}
            <br />
            <a href="#" className={`hover:underline ${focusTextPrimary}`}>
              Jerry Hernández.
            </a>
          </p>
        </div>
      </div>

      {/* Render CustomModal only if it is open */}
      {isModalOpen && (
        <AutoCloseModal
          type={modalType} // Pass translation key
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </footer>
  );
};

export default Footer;
