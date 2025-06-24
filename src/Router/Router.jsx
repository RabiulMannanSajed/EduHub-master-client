import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/UnAuthFiles/Home/Home";
import Register from "../Pages/UnAuthFiles/Register/Register";
import Login from "../Pages/UnAuthFiles/Login/Login";
import Payment from "../Pages/AuthFile/Payment/Payment";
import Profile from "../Pages/AuthFile/Profile/Profile";
import BloodCamp from "../Pages/AuthFile/BloodCamp/BloodCamp";
import ProfileOfHelper from "../Pages/AuthFile/ProfileOfHelper/ProfileOfHelper";
import BookBuy from "../Pages/AuthFile/BuyBookAndItems/BookBuy/BookBuy";
import ItemBuy from "../Pages/AuthFile/BuyBookAndItems/ItemBuy/ItemBuy";
import AuthHome from "../Pages/AuthFile/AuthHome/AuthHome/AuthHome";
import ProfileSetting from "../Pages/AuthFile/Profile/ProfileSetting/ProfileSetting";
import Courses from "../Pages/AuthFile/Courses/Courses/Courses";
import CourseDetails from "../Pages/AuthFile/Courses/courseDetails/courseDetails";
import FreelancingInstructor from "../Pages/AuthFile/Freelancing/Freelancing/FreelancingInstructor";

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
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profileSetting",
        element: <ProfileSetting />,
      },
      {
        path: "/bloodCamp",
        element: <BloodCamp />,
      },
      {
        path: "/booksBuySell",
        element: <BookBuy />,
      },
      {
        path: "/itemBuySell",
        element: <ItemBuy />,
      },
      {
        path: "/blood-donor/:id",
        element: <ProfileOfHelper />,
      },
      {
        path: "/authHome",
        element: <AuthHome />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/freelancingInstructor",
        element: <FreelancingInstructor />,
      },
      // use this next
      {
        path: "/courseDetails",
        element: <CourseDetails />,
      },
    ],
  },
]);
