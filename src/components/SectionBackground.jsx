const SectionBackground = ({ children, image }) => {
  return (
    <div className="relative w-full">
      <img
        src={image}
        alt="Background"
        className="lg:hidden w-full h-auto object-cover"
      />
      {children}
    </div>
  );
};

export default SectionBackground;