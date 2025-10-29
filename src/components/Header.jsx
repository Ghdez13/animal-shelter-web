import Navbar from "./Navbar";

const Header = ({ className = "", ...props }) => {
  return (
    <header
      className={`absolute top-0 left-0 w-full z-50 ${className}`}
      role="banner"
      {...props}
    >
      {/* Main navigation bar */}
      <Navbar />
    </header>
  );
};

export default Header;
