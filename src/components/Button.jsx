const Button = ({ link, children, className }) => {
  const handleClick = () => {
    if (link) window.location.href = link;
  };

  return (
    <a href={link} className={`btn-style ${className ?? ""}`} onClick={handleClick}>
      {children}
    </a>
  );
};

export default Button;
