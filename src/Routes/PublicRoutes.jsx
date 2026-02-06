import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/Login/Login";
import Register from "../Pages/Registration/Register";
import AllContest from "../Pages/All-Contest/AllContest";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => axios("http://localhost:3000/all-contests"),
      },
      {
        path: "home",
        Component: Home,
        loader: () => axios("http://localhost:3000/all-contests"),
      },
      {
        path: "/all-contests",
        Component: AllContest,
        loader: () => axios("http://localhost:3000/all-contests"),
      },
      {
        path: "login",
        element: <LogIn></LogIn>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
