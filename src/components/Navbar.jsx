import LogoBlack from "../assets/logo/black-logo.webP";

import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-transparent text-black">
      {/* Top bar: logo and hamburger menu */}
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={() => setIsOpen(false)}>
          <div>
            <img
              src={LogoBlack}
              alt="Animal Shelter logo, go to home page"
              className="w-[150px] h-[150px] lg:w-[180px] lg:h-[180px] xl:w-[221px] xl:h-[221px]"
            />
          </div>
        </Link>

        {/* Hamburger / Close Button */}
        <button
          onClick={toggleMenu}
          className="relative w-10 h-10 flex items-center justify-center md:hidden focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span
            className={`absolute w-8 h-1 rounded transition-transform duration-300 ease-in-out ${
              isOpen ? "bg-black rotate-45" : "bg-black -translate-y-2"
            }`}
          ></span>

          <span
            className={`absolute w-8 h-1 rounded transition-opacity duration-300 ease-in-out ${
              isOpen ? "opacity-0" : "opacity-100 bg-black"
            }`}
          ></span>

          <span
            className={`absolute w-8 h-1 rounded transition-transform duration-300 ease-in-out ${
              isOpen ? "bg-black -rotate-45" : "bg-black translate-y-2"
            }`}
          ></span>

          {!isOpen && (
            <span className="absolute top-full mt-2 text-black text-sm tracking-widest select-none">
              MENU
            </span>
          )}
          {isOpen && (
            <span className="absolute top-full mt-2 text-black text-sm tracking-widest select-none">
              CLOSE
            </span>
          )}
        </button>

        {/* Desktop navigation links */}
        <div className="hidden md:flex md:space-x-6 items-center">
          <Link to="/services" className="text-2xl hover:underline">
            Services
          </Link>
          <Link
            to="/volunteer"
            aria-label="Learn about volunteer opportunities"
            className="text-2xl hover:underline"
          >
            Volunteer
          </Link>
          <Link
            to="/donations"
            aria-label="Donate to the Animal Shelter"
            className="text-2xl hover:underline"
          >
            Donations
          </Link>
          <Link to="/about-us" className="text-2xl hover:underline">
            About Us
          </Link>
          <Link to="/contact" className="text-2xl hover:underline">
            Contact
          </Link>
        </div>
      </div>

      {/* Mobile navigation with smooth expand/collapse */}
      <div
        className={`md:hidden overflow-hidden transition-all ease-in-out duration-500 ${
          isOpen
            ? "max-h-screen h-screen opacity-100 bg-gray-800 px-6 pb-8"
            : "max-h-0 opacity-0 bg-transparent px-0 pb-0"
        }`}
        style={{ height: isOpen ? "100vh" : "0" }}
      >
        <div className="flex flex-col items-start space-y-8 mt-6">
          {["services", "volunteer", "donations", "about-us", "contact"].map(
            (path) => (
              <Link
                key={path}
                to={`/${path}`}
                className="text-2xl hover:underline text-white"
                onClick={() => setIsOpen(false)}
              >
                {path.charAt(0).toUpperCase() +
                  path.slice(1).replace("-", " ")}
              </Link>
            )
          )}
        </div>
      </div>

      {/* Reduced motion preference */}
      <style>
        {`
          @media (prefers-reduced-motion: reduce) {
            .transition-all {
              transition-duration: 0 !important;
            }
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
