import React, { useContext } from "react";
import { Link, Outlet } from "react-router";
import { CgPlayListAdd } from "react-icons/cg";
import { SiRepublicofgamers } from "react-icons/si";
import { FaEdit, FaListOl, FaRegUserCircle, FaUserTag } from "react-icons/fa";
import { GiSpikedDragonHead } from "react-icons/gi";
import useRole from "../Hooks/useRole";
import { FaHeartCircleCheck } from "react-icons/fa6";

import { RiShieldCheckLine, RiUserSettingsFill } from "react-icons/ri";
import { IoCreateSharp } from "react-icons/io5";
import { AuthContext } from "../Context/AuthContext";
import Loader from "../Shared/Loader";
import { MdAdminPanelSettings, MdPendingActions } from "react-icons/md";
import PleaseLoginLoader from "../Shared/PleaseLoginLoader";

const DashBoardLayOut = () => {
  const { user } = useContext(AuthContext);
  const [role] = useRole();
  if (!user) return <PleaseLoginLoader></PleaseLoginLoader>;
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <Link to="/home" className="btn py-6 btn-ghost text-xl">
            <img className="w-10 rounded-xl" src="/logo.png" alt="" />
            BATTLE EYE
          </Link>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu my-5 w-full grow">
            {/* List item */}
            <li>
              <Link
                to="/home"
                className="is-drawer-close:tooltip my-3 is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <img className="w-10 rounded-xl" src="/logo.png" alt="" />

                <span className="is-drawer-close:hidden">BATTLE EYE</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="is-drawer-close:tooltip  my-3 is-drawer-close:tooltip-right"
                data-tip="My Profile"
              >
                {/* Home icon */}
                <FaRegUserCircle size={20} />
                <span className="is-drawer-close:hidden">My Profile</span>
              </Link>
            </li>
            {(role === "Creator" || role === "Admin") && (
              <li>
                <Link
                  to="/dashboard/add-contest"
                  className="is-drawer-close:tooltip  my-3 is-drawer-close:tooltip-right"
                  data-tip="Create Contest"
                >
                  {/* Home icon */}
                  <CgPlayListAdd size={20} />
                  <span className="is-drawer-close:hidden">Create Contest</span>
                </Link>
              </li>
            )}
            {role === "Gamer" && (
              <li>
                <Link
                  to="/dashboard/participated-contests"
                  className="is-drawer-close:tooltip  my-3 is-drawer-close:tooltip-right"
                  data-tip="Participated Contests"
                >
                  {/* Home icon */}
                  <SiRepublicofgamers size={20} />
                  <span className="is-drawer-close:hidden">Participated</span>
                </Link>
              </li>
            )}
            {role === "Admin" && (
              <li>
                <Link
                  to="/dashboard/creator-request"
                  className="is-drawer-close:tooltip  my-3 is-drawer-close:tooltip-right"
                  data-tip="Creator Request"
                >
                  {/* Home icon */}
                  <MdAdminPanelSettings size={20} />
                  <span className="is-drawer-close:hidden">
                    Creator Request
                  </span>
                </Link>
              </li>
            )}
            {role === "Admin" && (
              <li>
                <Link
                  to="/dashboard/approve-contests"
                  className="is-drawer-close:tooltip  my-3 is-drawer-close:tooltip-right"
                  data-tip="Pending Contests"
                >
                  {/* Home icon */}
                  <MdPendingActions size={20} />
                  <span className="is-drawer-close:hidden">
                    Pending Contests
                  </span>
                </Link>
              </li>
            )}
            {role === "Admin" && (
              <li>
                <Link
                  to="/dashboard/manage-contests/all"
                  className="is-drawer-close:tooltip  my-3 is-drawer-close:tooltip-right"
                  data-tip="Approved Contests"
                >
                  {/* Home icon */}
                  <FaHeartCircleCheck size={20} />
                  <span className="is-drawer-close:hidden">
                    Approved Contests
                  </span>
                </Link>
              </li>
            )}
            {role === "Creator" && (
              <li>
                <Link
                  to="/dashboard/manage-contests"
                  className="is-drawer-close:tooltip  my-3 is-drawer-close:tooltip-right"
                  data-tip="Manage Contests"
                >
                  {/* Home icon */}
                  <FaListOl size={20} />
                  <span className="is-drawer-close:hidden">
                    Manage Contests
                  </span>
                </Link>
              </li>
            )}
            {role === "Admin" && (
              <li>
                <Link
                  to="/dashboard/manage-user"
                  className="is-drawer-close:tooltip  my-3 is-drawer-close:tooltip-right"
                  data-tip="Manage Users"
                >
                  {/* Home icon */}
                  <RiUserSettingsFill size={20} />
                  <span className="is-drawer-close:hidden">Manage Users</span>
                </Link>
              </li>
            )}
            {role === "Gamer" && (
              <li>
                <Link
                  to="/dashboard/become-creator"
                  className="is-drawer-close:tooltip  my-3 is-drawer-close:tooltip-right"
                  data-tip="Become a Creator"
                >
                  {/* Home icon */}
                  <IoCreateSharp size={20} />
                  <span className="is-drawer-close:hidden">
                    Become a Creator
                  </span>
                </Link>
              </li>
            )}

            {/* List item */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayOut;
