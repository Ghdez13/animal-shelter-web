const SectionBackground = ({
  children,
  image,
  alt = "Section background",
  className = "",
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Background image for all screens */}
      {image && (
        <img
          src={image}
          alt={alt}
          className="w-full h-auto lg:h-35 xl:h-40 object-cover"
        />
      )}
      {/* Render children content on top of the background */}
      {children}
    </div>
  );
};

export default SectionBackground;
