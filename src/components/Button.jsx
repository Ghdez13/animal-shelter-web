import { Link } from "react-router-dom";

// Button component for internal navigation only
const Button = ({ to, children, className }) => {
  return (
    <Link
      to={to}
      className={`btn-style ${className ?? ""}`}
    >
      {children}
    </Link>
  );
};

export default Button;
