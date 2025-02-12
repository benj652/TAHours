import { Link } from "react-router-dom";

type NavBarButtonProps = {
  buttonPath: string;
  curLocation: string;
  label: string;
};

const NavBarButton: React.FC<NavBarButtonProps> = ({
  buttonPath,
  curLocation,
  label,
}) => {
  const isDisabled = false;

  return isDisabled ? (
    <span className="btn btn-primary opacity-50 cursor-auto">{label}</span>
  ) : (
    <Link to={buttonPath} className="btn btn-primary">
      {label}
    </Link>
  );
};

export default NavBarButton;
