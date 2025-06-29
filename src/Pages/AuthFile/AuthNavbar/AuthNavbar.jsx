import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../CustomProvider/userContext";
import useBloodDonors from "../../../hooks/useBloodDonners";
import message from "../../../../src/assets/images/message.jpg";
import { FaRegCircleUser } from "react-icons/fa6";
import Message from "../Message/Message/Message";
import { FiMessageSquare } from "react-icons/fi";
const AuthNavbar = () => {
  const { userEmail } = useUser();
  const [users] = useBloodDonors(); // get the data array from the object
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (userEmail && users?.data?.length > 0) {
      const foundUser = users.data.find((user) => user?.email === userEmail);
      setCurrentUser(foundUser || null);
    }
  }, [userEmail, users]);

  return (
    <div>
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
            ></ul>
          </div>
          <a className="btn btn-ghost text-xl">NextGen Learner</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/authHome">Home</NavLink>
            </li>
            <li>
              <NavLink to="/courses">Courses</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <details>
                <summary>MARKETPLACE</summary>
                <ul className="p-2">
                  <li>
                    <NavLink to="/booksBuySell">Books</NavLink>
                  </li>
                  <li>
                    <NavLink to="/itemBuySell">Items</NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Freelancing</summary>
                <ul className="p-2">
                  <li>
                    <NavLink to="/freelancingInstructor">
                      Apply for Instructor
                    </NavLink>
                  </li>{" "}
                  <NavLink to="/findFreelancer">Find Freelancer</NavLink>
                  <li></li>
                </ul>
              </details>
            </li>
            <li>
              <NavLink to="/bloodCamp">Blood Camp</NavLink>
            </li>
            <li>
              <details>
                <summary>Job</summary>
                <ul className="p-2">
                  <li>
                    <NavLink to="/job">Create Job</NavLink>
                  </li>{" "}
                  <NavLink to="/all-jobs">All Jobs</NavLink>
                  <li></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div>
            <div>
              {/* Button to open the modal */}
              <button onClick={() => setShowModal(true)}>
                <FiMessageSquare className="text-3xl mr-4 " />
              </button>

              {/* Render the modal if showModal is true */}
              {showModal && <Message onClose={() => setShowModal(false)} />}
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {currentUser?.photoUrl ? (
                <img
                  src={currentUser?.photoUrl}
                  alt="User Image"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <>
                  {" "}
                  <FaRegCircleUser className="w-24 h-24 rounded-full object-cover" />
                </>
              )}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/profileSetting">Setting</NavLink>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthNavbar;
