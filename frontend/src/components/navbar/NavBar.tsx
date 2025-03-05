import ColbySeal from "../../assets/colbyseal.svg";
import { Link, useLocation } from "react-router-dom";
import ColbyText from "../../assets/colbytext.svg";
import NavBarButton from "./NavBarButton";
import { useLogout } from "@/hooks";
import { Routes } from "@/types";
import { authStore } from "@/store";
import { RolesConfig } from "@/types"; // Assuming the rolesConfig is imported

export const NavBar = () => {
    const location = useLocation();
    const { logout } = useLogout();
    const curPath = location.pathname;
    const { userItems } = authStore();
    const userRole = userItems?.roles;

    const renderButton = (role: string, allowedRoles: string[]): boolean => {
        return allowedRoles.includes(role);
    };

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        {renderButton(userRole, [RolesConfig.Student, RolesConfig.Ta, RolesConfig.Professor, RolesConfig.Admin]) && (
                            <li>
                                <Link to={Routes.Main}>TA Hours</Link>
                            </li>
                        )}
                        {renderButton(userRole, [RolesConfig.Student, RolesConfig.Ta, RolesConfig.Professor, RolesConfig.Admin]) && (
                            <li>
                                <Link to={Routes.Profile}>Profile</Link>
                            </li>
                        )}
                        {renderButton(userRole, [RolesConfig.Ta, RolesConfig.Professor, RolesConfig.Admin]) && (
                            <li>
                                <Link to={Routes.Feed}>Thread</Link>
                            </li>
                        )}
                        {renderButton(userRole, [RolesConfig.Professor, RolesConfig.Admin]) && (
                            <li>
                                <Link to={Routes.Analytics}>Professor</Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex flex-row bg-white p-2 rounded-md space-x-2">
                    <img src={ColbySeal} alt="Colby Seal" className="h-10 w-10" />
                    <img src={ColbyText} alt="Colby Seal" className="h-10 w-10" />
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-1">
                    {renderButton(userRole, [RolesConfig.Student, RolesConfig.Ta, RolesConfig.Professor, RolesConfig.Admin]) && (
                        <li>
                            <NavBarButton
                                curLocation={curPath}
                                buttonPath={Routes.Main}
                                label="TA Hours"
                            />
                        </li>
                    )}
                    {renderButton(userRole, [RolesConfig.Student, RolesConfig.Ta, RolesConfig.Professor, RolesConfig.Admin]) && (
                        <li>
                            <NavBarButton
                                curLocation={curPath}
                                buttonPath={Routes.Profile}
                                label="Profile"
                            />
                        </li>
                    )}
                    {renderButton(userRole, [RolesConfig.Ta, RolesConfig.Professor, RolesConfig.Admin]) && (
                        <li>
                            <NavBarButton
                                curLocation={curPath}
                                buttonPath={Routes.Feed}
                                label="Thread"
                            />
                        </li>
                    )}
                    {renderButton(userRole, [RolesConfig.Professor, RolesConfig.Admin]) && (
                        <li>
                            <NavBarButton
                                curLocation={curPath}
                                buttonPath={Routes.Analytics}
                                label="Professor"
                            />
                        </li>
                    )}
                </ul>
            </div>
            <div className="navbar-end">
                <button className="btn btn-primary" onClick={logout}>Logout</button>
            </div>
        </div>
    );
};
