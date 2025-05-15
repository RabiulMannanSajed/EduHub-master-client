import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [],
  },
]);
