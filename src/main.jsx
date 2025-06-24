import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { route } from "./Router/Router.jsx";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./Pages/AuthFile/CustomProvider/userContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={route} />
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);
