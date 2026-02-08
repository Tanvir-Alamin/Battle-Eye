import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Routes/PublicRoutes.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider queryClient={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>{" "}
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
