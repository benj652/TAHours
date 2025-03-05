import { useLogout } from "@/hooks";
import { authStore } from "@/store";
import { rolesConfig, routes } from "@/types";
import { Link, useLocation } from "react-router-dom";
import ColbySeal from "../../assets/colbyseal.svg";
import ColbyText from "../../assets/colbytext.svg";
import NavBarButton from "./NavBarButton";

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
            {renderButton(userRole, [
              rolesConfig.student,
              rolesConfig.ta,
              rolesConfig.professor,
              rolesConfig.admin,
            ]) && (
              <li>
                <Link to={routes.main}>TA Hours</Link>
              </li>
            )}
            {renderButton(userRole, [
              rolesConfig.student,
              rolesConfig.ta,
              rolesConfig.professor,
              rolesConfig.admin,
            ]) && (
              <li>
                <Link to={routes.profile}>Profile</Link>
              </li>
            )}
            {renderButton(userRole, [
              rolesConfig.ta,
              rolesConfig.professor,
              rolesConfig.admin,
            ]) && (
              <li>
                <Link to={routes.feed}>Thread</Link>
              </li>
            )}
            {renderButton(userRole, [
              rolesConfig.professor,
              rolesConfig.admin,
            ]) && (
              <li>
                <Link to={routes.analytics}>Professor</Link>
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
            rolesConfig.student,
            rolesConfig.ta,
            rolesConfig.professor,
            rolesConfig.admin,
          ]) && (
            <li>
              <NavBarButton
                curLocation={curPath}
                buttonPath={routes.main}
                label="TA Hours"
                iconName="Binary"
              />
            </li>
          )}
          {renderButton(userRole, [
            rolesConfig.student,
            rolesConfig.ta,
            rolesConfig.professor,
            rolesConfig.admin,
          ]) && (
            <li>
              <NavBarButton
                curLocation={curPath}
                buttonPath={routes.profile}
                label="Profile"
                iconName="UserPen"
              />
            </li>
          )}
          {renderButton(userRole, [
            rolesConfig.ta,
            rolesConfig.professor,
            rolesConfig.admin,
          ]) && (
            <li>
              <NavBarButton
                curLocation={curPath}
                buttonPath={routes.feed}
                label="Thread"
                iconName="Mails"
              />
            </li>
          )}
          {renderButton(userRole, [
            rolesConfig.professor,
            rolesConfig.admin,
          ]) && (
            <li>
              <NavBarButton
                curLocation={curPath}
                buttonPath={routes.analytics}
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
