import { Link } from "react-router-dom";

const Button = ({ to, onClick, children, className = "" }) => {
  // If onClick is provided, render a regular button
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`btn-style ${className}`}
        type="button"
      >
        {children}
      </button>
    );
  }

  // Otherwise render a link (default behavior)
  return (
    <Link to={to} className={`btn-style ${className}`}>
      {children}
    </Link>
  );
};

export default Button;
