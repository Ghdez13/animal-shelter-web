const SectionBackground = ({
  children,
  image,
  alt = "Section background",
  className = "",
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Background image for mobile/small screens */}
      {image && (
        <img
          src={image}
          alt={alt}
          className="w-full h-auto object-cover"
        />
      )}
      {/* Render children content on top of the background */}
      {children}
    </div>
  );
};

export default SectionBackground;
