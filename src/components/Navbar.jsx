import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
      <div className="text-2xl font-bold"> Animal Shelter</div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="services/" className="hover:underline">
          Services
        </Link>
        <Link to="volunteer/" className="hover:underline">
          Volunteer
        </Link>
        <Link to="donations/" className="hover:underline">
          Donations
        </Link>
        <Link to="about-us/" className="hover:underline">
          About Us
        </Link>
        <Link to="contact/" className="hover:underline">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar
