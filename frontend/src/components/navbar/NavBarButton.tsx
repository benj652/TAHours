import { cn } from "@/utils";
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
    return curLocation === buttonPath ? (
        <span className={cn("btn btn-primary opacity-50 cursor-auto")}>
            {label}
        </span>
    ) : (
        <Link to={buttonPath} className={cn("btn btn-primary")}>
            {label}
        </Link>
    );
};

export default NavBarButton;
