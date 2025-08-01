import LogoSmall from "../assets/logo/black-logo.webp";
import DecorativeImage from "../assets/images/footer.webp";

const Footer = () => {
  return (
    <footer className="bg-transparent text-black py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col space-y-10">
        {/* Top section: logo + menu */}
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-6">
          <img src={LogoSmall} alt="Logo footer" className="w-24 h-auto" />
          <nav className="flex flex-wrap justify-center gap-6 text-lg">
            <a href="/services" className="hover:underline">Services</a>
            <a href="/volunteer" className="hover:underline">Volunteer</a>
            <a href="/donations" className="hover:underline">Donations</a>
            <a href="/about-us" className="hover:underline">About Us</a>
            <a href="/contact" className="hover:underline">Contact</a>
          </nav>
        </div>

        {/* Middle section: orange block with contact info */}
        <div className="relative bg-[#FFA641] rounded-xl mt-8">
          {/* Padding wrapper for content only */}
          <div className="p-6 relative z-10">
            <div className="text-white text-sm md:text-base">
              <p className="mb-2">123 Paw Street, Meowtown</p>
              <p className="mb-2">Phone: (123) 456-7890</p>
              <p>Email: info@shelter.org</p>
            </div>
          </div>

          {/* Decorative image for desktop/tablet */}
          <div
            className={`
              absolute bottom-[-24px] right-[-11px] z-0
              max-[639px]:bottom-[-8px] max-[639px]:right-[-7px] max-[639px]:w-[321px]
              max-[525px]:hidden
            `}
          >
            <img
              src={DecorativeImage}
              alt="Peeking cat"
              className="w-[392px] h-auto"
            />
          </div>

          {/* Decorative image for mobile */}
          <div className="hidden max-[525px]:block mt-6 text-center">
            <img
              src={DecorativeImage}
              alt="Peeking cat mobile"
              className="w-[250px] h-auto mx-auto"
            />
          </div>
        </div>

        {/* Bottom section: legal and credits */}
        <div className="text-center text-sm text-gray-600 space-y-2">
          <p>© Refuge Animal, 2021. Tous droits réservés.</p>
          <p>
            <a href="/privacy-policy" className="hover:underline">
              Politique de confidentialité
            </a>
          </p>
          <p>
            Conception Web |{" "}
            <a href="https://cvrsolutions.ca/" className="hover:underline">
              CVR Solutions inc.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;