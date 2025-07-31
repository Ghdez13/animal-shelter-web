import LogoBlack from "../assets/logo/black-logo.webP";
import LogoWhite from "../assets/logo/white-logo.webP";

import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-gray-800 text-white shadow-sm">
      {/* Top bar: logo and hamburger */}
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={() => setIsOpen(false)}>
          <div>
            <img
              src={LogoBlack}
              alt="Animal Shelter logo, go to home page"
              className="hidden md:block w-[150px] h-[150px] lg:w-[180px] lg:h-[180px] xl:w-[221px] xl:h-[221px]"
            />
            <img
              src={LogoWhite}
              alt="Animal Shelter logo, go to home page"
              className="block md:hidden w-[131px] h-[131px]"
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
            className={`absolute w-8 h-1 bg-white rounded transition-transform duration-300 ease-in-out ${
              isOpen ? "rotate-45" : "-translate-y-2"
            }`}
          ></span>

          <span
            className={`absolute w-8 h-1 bg-white rounded transition-opacity duration-300 ease-in-out ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>

          <span
            className={`absolute w-8 h-1 bg-white rounded transition-transform duration-300 ease-in-out ${
              isOpen ? "-rotate-45" : "translate-y-2"
            }`}
          ></span>

          {!isOpen && (
            <span className="absolute top-full mt-2 text-white text-sm tracking-widest select-none">
              MENU
            </span>
          )}
        </button>

        {/* Desktop nav */}
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

      {/* Mobile nav with smooth expand/collapse */}
      <div
        className={`md:hidden overflow-hidden bg-gray-800 px-6 pb-8 transition-all ease-in-out duration-500 opacity-100 ${
          isOpen ? "max-h-screen h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ height: isOpen ? "100vh" : "0" }}
      >
        <div className="flex flex-col items-start space-y-8 mt-6">
          <Link
            to="/services"
            className="text-2xl hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/volunteer"
            className="text-2xl hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Volunteer
          </Link>
          <Link
            to="/donations"
            className="text-2xl hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Donations
          </Link>
          <Link
            to="/about-us"
            className="text-2xl hover:underline"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-2xl hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
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
