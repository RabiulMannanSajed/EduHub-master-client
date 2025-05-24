import { Link, NavLink } from "react-router-dom";
import Eduhub from "../assets/images/image.png";
const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-base-100 w-[80%] mx-auto">
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
                <a>Explore</a>
              </li>

              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <img className="w-[14%]" src={Eduhub} alt="" />
          <h1 class="text-2xl font-semibold text-gray-800">EDUHUB</h1>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Explore</a>
            </li>

            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <NavLink to="/login">
            <a className="btn btn-info text-xl">Login</a>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
