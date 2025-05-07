/*
 * NavBarButton.tsx
 * This file contains the navbar button component
 * It is a button that allows the user to navigate to a different page
 */

import { cn } from "@/utils";
import { Binary, ChartLine, Mails, UserPen } from "lucide-react";
import { Link } from "react-router-dom";

const Icons = { ChartLine, Mails, Binary, UserPen };

/**
 * Props for the NavBarButton component
 */
type NavBarButtonProps = {
  buttonPath: string;
  curLocation: string;
  label: string;
  iconName: keyof typeof Icons; // Icon name as a prop
};

/**
 * A button component used in the navbar to navigate to a different page
 * @param {{ buttonPath: string; curLocation: string; label: string; iconName: keyof typeof Icons }}
 * @returns A button element if the current location matches the button path, or a link element otherwise
 */
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
