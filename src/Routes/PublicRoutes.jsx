import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/Login/Login";
import Register from "../Pages/Registration/Register";
import AllContest from "../Pages/All-Contest/AllContest";
import DashBoardLayOut from "../Layouts/DashBoardLayOut";
import AddContest from "../Pages/AddContest/AddContest";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "home",
        Component: Home,
      },
      {
        path: "/all-contests",
        Component: AllContest,
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
  {
    path: "/dashboard",
    Component: DashBoardLayOut,
    children: [
      {
        path: "/dashboard/add-contest",
        Component: AddContest,
      },
    ],
  },
]);

export default router;
