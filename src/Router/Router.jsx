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
import CV from "../Pages/AuthFile/CV/CV";
import FIndFreelancer from "../Pages/AuthFile/Freelancing/FIndFreelancer/FIndFreelancer";
import VideoChat from "../Pages/AuthFile/VideoChat/VideoChat";
import Message from "../Pages/AuthFile/Message/Message/Message";
import BlogPost from "../Pages/AuthFile/Blog/BlogPost/BlogPost";
import Blogs from "../Pages/AuthFile/Blog/Blogs/Blogs";
import Jobs from "../Pages/AuthFile/Job/Jobs/Jobs";
import CreateJob from "../Pages/AuthFile/Job/CreateJob/CreateJob";
import JobCard from "../Pages/AuthFile/Job/JobCard/JobCard";
import AboutUs from "../Pages/UnAuthFiles/AboutUs/AboutUs";

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
        path: "/course-details/:id",
        element: <CourseDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/api/v1/courses/${params.id}`),
      },
      {
        path: "/cv",
        element: <CV />,
      },
      {
        path: "/message",
        element: <Message />,
      },
      {
        path: "/findFreelancer",
        element: <FIndFreelancer />,
      },
      {
        path: "/videoChat",
        element: <VideoChat />,
      },
      {
        path: "/blog",
        element: <Blogs />,
      },
      {
        path: "/job",
        element: <CreateJob />,
      },
      {
        path: "/all-jobs",
        element: <Jobs />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/job-details/:id",
        element: <JobCard />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/api/v1/jobs/get-all-job${params.id}`),
      },
    ],
  },
]);
