import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FooterContact from "./FooterContact";
import BackgroundOrange from "../assets/images/BackgroundOrange.webp";
import LogoSmall from "../assets/logo/footer-logo.webp";
import IconFacebook from "../assets/icons/facebook.webp";
import IconInstagram from "../assets/icons/instagram.webp";
import DecorativeImage from "../assets/images/footer.webp";

const Footer = () => {
  const { t } = useTranslation();
  const focusTextPrimary =
    "focus:outline-none focus:text-[var(--color-focus-primary)]";
  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-primary)]";

  return (
    <footer className="text-[var(--color-text-dark)] font-semibold bg-transparent py-10">
      <div className="max-w-6xl mx-auto w-full">
        <div className="px-6 flex flex-col gap-5">
          {/* Row 2: Navigation + Social icons */}
          <div className="flex flex-col md:flex-col lg:flex-row items-center gap-4 pr-4 pl-3">
            {/* Group 0: Logo link Home */}
            <div className="flex px-5 mb-4 md:mb-6 lg:mb-0 w-full">
              <Link
                to="/"
                aria-label={t("footer.goHome")}
                className="focus-visible:outline-2 focus:outline-offset-4"
                style={{ outlineColor: "var(--color-focus-primary)" }}
              >
                <img
                  src={LogoSmall}
                  alt={t("footer.logoAlt")}
                  className="h-15 lg:h-20 object-contain"
                />
              </Link>
            </div>

            {/* Menu groups */}
            <div className="text-lg flex flex-row w-full justify-around">
              {/* Group 1: Services + Volunteer */}
              <div className="flex flex-col gap-2">
                <Link
                  to="/services"
                  className={`hover:underline ${focusTextPrimary}`}
                >
                  {t("menu.services")}
                </Link>
                <Link
                  to="/volunteer"
                  className={`hover:underline ${focusTextPrimary}`}
                >
                  {t("menu.volunteer")}
                </Link>
              </div>

              {/* Group 2: Donations + About Us */}
              <div className="flex flex-col gap-2">
                <Link
                  to="/donations"
                  className={`hover:underline ${focusTextPrimary}`}
                >
                  {t("menu.donations")}
                </Link>
                <Link
                  to="/about-us"
                  className={`hover:underline ${focusTextPrimary}`}
                >
                  {t("menu.about-us")}
                </Link>
              </div>

              {/* Group 3: Contact + Social Media */}
              <div className="flex flex-col gap-2">
                <Link
                  to="/contact"
                  className={`hover:underline ${focusTextPrimary}`}
                >
                  {t("menu.contact")}
                </Link>
                <div className="flex space-x-4 pt-1">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("footer.facebook")}
                    className={`hover:underline ${focusRing}`}
                  >
                    <img
                      src={IconFacebook}
                      alt={t("footer.facebook")}
                      className="w-5 h-5"
                    />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("footer.instagram")}
                    className={`hover:underline ${focusRing}`}
                  >
                    <img
                      src={IconInstagram}
                      alt={t("footer.instagram")}
                      className="w-5 h-5"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Contact info in orange box */}
          <div
            className="text-lg flex flex-col justify-between py-6 px-6 pb-0 rounded-lg text-[var(--color-text-light)] gap-6 overflow-hidden"
            style={{
              backgroundImage: `url(${BackgroundOrange})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Contact info */}
            <div>
              <h3 className="font-bold mb-2"> {t("footer.contactTitle")}</h3>
              <FooterContact
                emailParts={["cambiar", "@", "cambiar", ".", "com"]}
                phoneParts={["984", "123", "4567"]}
              />
            </div>

            {/* Addresss */}
            <div>
              <h3 className="font-bold">
                {t("footer.visitUs")}{" "}
                <span role="img" aria-label="Location pin">
                  📍
                </span>
              </h3>
              <a
                href="https://maps.app.goo.gl/FQuC9EmCXDDYPBwg9"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.viewExactLocation")}
                className="hover:underline leading-6 mt-2 block focus-visible:outline-none focus:text-[var(--color-focus-secondary)]"
              >
                Av 0000 No.00 Esquina calle <br /> 000 Colonia Centro, Playa del
                Carmen, Q.R.
              </a>
            </div>

            {/*  Decorative image (mobile only)  */}
            <div className="block md:hidden w-[250px] self-center overflow-hidden">
              <img
                src={DecorativeImage}
                alt="Decorative footer mobile"
                className="w-full h-auto -mb-2"
              />
            </div>
          </div>

          {/* Row 4: Rights and creator */}
          <div className="text-xs text-[var(--color-text-dark)] flex justify-between items-start w-full">
            {/* Left side */}
            <div className="flex flex-col md:flex-row gap-2 md:gap-6">
              <p>
                © {t("footer.rights")}, {new Date().getFullYear()}.{" "}
                {t("footer.allRightsReserved")}.
              </p>
              <p>
                <a href="#" className={`hover:underline ${focusTextPrimary}`}>
                  {t("footer.privacyPolicy")}
                </a>
              </p>
            </div>

            {/* Right side */}
            <p className="mt-0 md:mt-0 pl-15">
              {t("footer.developedBy")}{" "}
              <a href="#" className={`hover:underline ${focusTextPrimary}`}>
                Jerry Hernández.
              </a>
            </p>

            {/* Decorative image for desktop (hidden on mobile)  */}
            <div className="relative hidden md:block w-[392px] mt-4">
              <img
                src={DecorativeImage}
                alt="Decorative footer desktop"
                className="w-full h-auto absolute bottom-[74px] right-[-10px]"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
