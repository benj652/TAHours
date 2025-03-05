import { cn } from "@/utils";
import * as Icons from "lucide-react";
import { Link } from "react-router-dom";

type NavBarButtonProps = {
  buttonPath: string;
  curLocation: string;
  label: string;
  iconName: keyof typeof Icons; // Icon name as a prop
};

const NavBarButton: React.FC<NavBarButtonProps> = ({
  buttonPath,
  curLocation,
  label,
  iconName,
}) => {
  const IconComponent = Icons[iconName];

  return curLocation === buttonPath ? (
    <span
      className={cn(
        "btn btn-primary opacity-50 cursor-auto flex items-center gap-2"
      )}
    >
      {label}
      {IconComponent && <IconComponent size={18} />}
    </span>
  ) : (
    <Link
      to={buttonPath}
      className={cn("btn btn-primary flex items-center gap-2")}
    >
      {label}
      {IconComponent && <IconComponent size={18} />}
    </Link>
  );
};

export default NavBarButton;
