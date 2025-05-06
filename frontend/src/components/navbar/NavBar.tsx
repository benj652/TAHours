/*
 * NavBar.tsx
 * This file contains the navbar component
 * It is a navigation bar that allows the user to navigate between pages
 */
import { useLogout } from "@/hooks";
import { authStore } from "@/store";
import { RolesConfig, Routes } from "@/types";
import { Binary, ChartLine, Mails, UserPen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ColbySeal from "../../assets/colbyseal.svg";
import ColbyText from "../../assets/colbytext.svg";
import NavBarButton from "./NavBarButton";

/**
 * NavBar component provides a navigation bar for the application.
 * It displays different navigation options based on the user's role.
 * The navigation options include links to Main, Profile, Feed, and Analytics pages.
 * The component also includes a logout button to allow users to log out.
 * The navigation options are conditionally rendered based on the user's role.
 */

export const NavBar = () => {
  const location = useLocation();
  const { logout } = useLogout();
  const curPath = location.pathname;
  const { userItems } = authStore();
  const userRole = userItems?.roles;

  /**
   * Helper function to conditionally render a navbar button based on the user's role
   * @param role - the role of the user
   * @param allowedRoles - an array of allowed roles
   * @returns true if the button should be rendered, false otherwise
   */
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
            {renderButton(userRole, [
              RolesConfig.Student,
              RolesConfig.Ta,
              RolesConfig.Professor,
              RolesConfig.Admin,
            ]) && (
              <li>
                <Link to={Routes.Main} className="flex items-center space-x-2">
                  <Binary size={16} />
                  <span>TA Hours</span>
                </Link>
              </li>
            )}
            {renderButton(userRole, [
              RolesConfig.Student,
              RolesConfig.Ta,
              RolesConfig.Professor,
              RolesConfig.Admin,
            ]) && (
              <li>
                <Link
                  to={Routes.Profile}
                  className="flex items-center space-x-2"
                >
                  <UserPen size={16} />
                  <span>Profile</span>
                </Link>
              </li>
            )}
            {renderButton(userRole, [
              RolesConfig.Ta,
              RolesConfig.Professor,
              RolesConfig.Admin,
            ]) && (
              <li>
                <Link to={Routes.Feed} className="flex items-center space-x-2">
                  <Mails size={16} />
                  <span>Thread</span>
                </Link>
              </li>
            )}
            {renderButton(userRole, [
              RolesConfig.Professor,
              RolesConfig.Admin,
            ]) && (
              <li>
                <Link
                  to={Routes.Analytics}
                  className="flex items-center space-x-2"
                >
                  <ChartLine size={16} />
                  <span>Analytics</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="flex flex-row bg-base-100 p-2 rounded-md space-x-2">
          <img src={ColbySeal} alt="Colby Seal" className="h-10 w-10" />
          <img src={ColbyText} alt="Colby Seal" className="h-10 w-10" />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-1">
          {renderButton(userRole, [
            RolesConfig.Student,
            RolesConfig.Ta,
            RolesConfig.Professor,
            RolesConfig.Admin,
          ]) && (
            <li>
              <NavBarButton
                curLocation={curPath}
                buttonPath={Routes.Main}
                label="TA Hours"
                iconName="Binary"
              />
            </li>
          )}
          {renderButton(userRole, [
            RolesConfig.Student,
            RolesConfig.Ta,
            RolesConfig.Professor,
            RolesConfig.Admin,
          ]) && (
            <li>
              <NavBarButton
                curLocation={curPath}
                buttonPath={Routes.Profile}
                label="Profile"
                iconName="UserPen"
              />
            </li>
          )}
          {renderButton(userRole, [
            RolesConfig.Ta,
            RolesConfig.Professor,
            RolesConfig.Admin,
          ]) && (
            <li>
              <NavBarButton
                curLocation={curPath}
                buttonPath={Routes.Feed}
                label="Thread"
                iconName="Mails"
              />
            </li>
          )}
          {renderButton(userRole, [
            RolesConfig.Professor,
            RolesConfig.Admin,
          ]) && (
            <li>
              <NavBarButton
                curLocation={curPath}
                buttonPath={Routes.Analytics}
                label="Analytics"
                iconName="ChartLine"
              />
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        <button
          className="btn btn-primary bg-accent border border-accent"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
