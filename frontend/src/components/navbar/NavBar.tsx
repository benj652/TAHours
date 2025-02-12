import ColbySeal from "../../assets/colbyseal.svg";
import { Link } from "react-router-dom";
import ColbyText from "../../assets/colbytext.svg";
import NavBarButton from "./NavBarButton";

const NavBar = () => {
  const curPath = location.pathname;
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/main">TA Hours</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/feed">Thread</Link>
            </li>
            <li>
              <Link to="/analytics">Professor</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-row bg-white p-2 rounded-md space-x-2">
          <img src={ColbySeal} alt="Colby Seal" className="h-10 w-10" />
          <img src={ColbyText} alt="Colby Seal" className="h-10 w-10" />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-1">
          <li>
            <NavBarButton
              curLocation={curPath}
              buttonPath="/main"
              label="TA Hours"
            />
          </li>
          <li>
            <NavBarButton
              curLocation={curPath}
              buttonPath="/profile"
              label="Profile"
            />
          </li>
          <li>
            <NavBarButton
              curLocation={curPath}
              buttonPath="/feed"
              label="Thread"
            />
          </li>
          <li>
            <NavBarButton
              curLocation={curPath}
              buttonPath="/analytics"
              label="Professor"
            />
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-primary">Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
