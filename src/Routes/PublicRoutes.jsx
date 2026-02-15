import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/Login/Login";
import Register from "../Pages/Registration/Register";
import AllContest from "../Pages/All-Contest/AllContest";
import DashBoardLayOut from "../Layouts/DashBoardLayOut";
import AddContest from "../Pages/AddContest/AddContest";
import Details from "../Pages/All-Contest/Details-Contest/Details";
import Success from "../Pages/Payment/Success";
import ParticipatedContests from "../Pages/ParticipatedContests/ParticipatedContests";
import ManageContest from "../Pages/Manage-Contest/ManageContest";
import MyProfile from "../Pages/Profile/MyProfile";
import AboutUs from "../Pages/AboutUS/AboutUs ";
import ManageUser from "../Pages/Manage-User/ManageUser";
import BecomeCreator from "../Pages/Creator/BecomeCreator";
import CreatorRequest from "../Pages/Creator-Request/CreatorRequest";

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
      {
        path: "/details/:id",
        element: <Details></Details>,
      },
      {
        path: "/payment-success",
        element: <Success></Success>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
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
      {
        path: "/dashboard/participated-contests",
        Component: ParticipatedContests,
      },
      {
        path: "/dashboard/manage-contests",
        Component: ManageContest,
      },
      {
        index: true,
        Component: MyProfile,
      },
      {
        path: "/dashboard/manage-user",
        Component: ManageUser,
      },
      {
        path: "/dashboard/become-creator",
        Component: BecomeCreator,
      },
      {
        path: "/dashboard/creator-request",
        Component: CreatorRequest,
      },
    ],
  },
]);

export default router;
