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
    <div className="min-h-screen flex flex-col">
      {showNavbar || <AuthNavbar />}
      {showNavbar && <Navbar />}

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Main;
