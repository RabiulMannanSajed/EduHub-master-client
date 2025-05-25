import { Outlet, useLocation } from "react-router";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import AuthNavbar from "../Pages/AuthFile/AuthNavbar/AuthNavbar";

const Main = () => {
  const location = useLocation();

  // Define the paths where Navbars should be shown
  const showNavRoutes = ["/", "/register", "/login"];
  const showNavbar = showNavRoutes.includes(location.pathname);
  return (
    <div>
      {showNavbar || <AuthNavbar />}
      {showNavbar && <Navbar />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
