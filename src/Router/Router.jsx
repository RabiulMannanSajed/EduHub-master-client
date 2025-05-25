import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/UnAuthFiles/Home/Home";
import Register from "../Pages/UnAuthFiles/Register/Register";
import Login from "../Pages/UnAuthFiles/Login/Login";
import Payment from "../Pages/AuthFile/Payment/Payment";
import Profile from "../Pages/AuthFile/Profile/Profile";
import BloodCamp from "../Pages/AuthFile/BloodCamp/BloodCamp";
import ProfileOfHelper from "../Pages/AuthFile/ProfileOfHelper/ProfileOfHelper";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/bloodCamp",
        element: <BloodCamp />,
      },
      {
        path: "/blood-donor/:id",
        element: <ProfileOfHelper />,
      },
    ],
  },
]);
