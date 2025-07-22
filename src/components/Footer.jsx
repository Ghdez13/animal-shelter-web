const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy;{new Date().getFullYear()} Animal Shelter. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
