import React, { useEffect, useRef, useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiViewBoards,
  HiInbox,
  HiShoppingBag,
  HiArrowSmRight,
  HiUser,
  HiTable,
} from "react-icons/hi";

import Logo from "../../../assets/logo/logo.png";
import { Link, useLocation } from "react-router-dom";
import "./SideBar.css";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../../redux/adminSlice";
import LogoutConfoModal from "./LogoutConfoModal";

function SideBar() {

  const [sideShow, setSideShow] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();

  function sideShowUpdater() {
    setSideShow((state) => !state);
    console.log("side show ", sideShow);
  }

  // window.addEventListener("resize", () => {
  //   if (window.innerWidth > 759) {
  //     setSideShow(true);
  //   } else {
  //     setSideShow(false);
  //   }
  // });

  console.log('side bar is rendering.......')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 759) {
        setSideShow(true);
      } else {
        setSideShow(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  

  function isActive(path) {
    return location.pathname === path;
  }

  function logout() {
    setModalShow(true);
  }

  function LogoutConfirmed(status) {
    if (status) {
     dispatch(adminLogout())
    }
  }


  return (
    <div>
      {modalShow ? 
      <LogoutConfoModal
       setModalShow = {setModalShow}
       LogoutConfirmed = {LogoutConfirmed}
      /> : <div></div>}
      <div className="flex md:hidden justify-between p-2 md:p-0 bg-gray-800">
        <a href="" className="flex items-center p-5 justify-center">
          <img src={Logo} className="h-6 sm:h-7" alt="Logo" />
        </a>
        <button
          data-drawer-target="adminsidebar"
          data-drawer-toggle="adminsidebar"
          aria-controls="adminsidebar"
          type="button"
          onClick={sideShowUpdater}
          className="inline-flex z-50 items-center justify-end p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      </div>
      {sideShow ? (
        <div className="bg-gray-800">
          <div
            id="adminsidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen "
            aria-label="adminsidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-900 dark:bg-gray-900">
              <a href="" className="flex items-center p-5 justify-center">
                <img src={Logo} className="h-6 sm:h-7" alt="Logo" />
              </a>
              <hr className="text-white mb-5" />
              <ul className="space-y-4 font-medium">
                <li>
                  <Link
                    to="/admin/dashboard"
                    className={` ${
                      isActive("/admin/dashboard")
                        ? "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-gray-50"
                        : "hover:bg-slate-300 flex items-center p-2 text-white rounded-lg dark:text-white dark:hover:bg-gray-700"
                    }`}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                    </svg>
                    <span className="ml-3 text-gray-500">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/trainers"
                    className={` ${
                      isActive("/admin/trainers")
                        ? "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-gray-50"
                        : "hover:bg-slate-300 flex items-center p-2 text-white rounded-lg dark:text-white dark:hover:bg-gray-700"
                    }`}
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap text-gray-500">
                      Trainers
                    </span>
                    <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                      Pro
                    </span>
                  </Link>
                </li>
                <li className="">
                  <Link
                    to="/admin/users"
                    className={` ${
                      isActive("/admin/users")
                        ? "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-gray-50"
                        : "hover:bg-slate-300 flex items-center p-2 text-white rounded-lg dark:text-white dark:hover:bg-gray-700"
                    }`}
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                      <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap text-gray-500">
                      Users
                    </span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      3
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/transactions"
                    className={` ${
                      isActive("/admin/transactions")
                        ? "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-gray-50"
                        : "hover:bg-slate-300 flex items-center p-2 text-white rounded-lg dark:text-white dark:hover:bg-gray-700"
                    }`}
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap text-gray-500">
                      Transactions
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/messages"
                    className={` ${
                      isActive("/admin/messages")
                        ? "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-gray-50"
                        : "hover:bg-slate-300 flex items-center p-2 text-white rounded-lg dark:text-white dark:hover:bg-gray-700"
                    }`}
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap text-gray-500">
                      Messages
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/courses"
                    className={` ${
                      isActive("/admin/courses")
                        ? "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-gray-50"
                        : " hover:bg-slate-300 flex items-center p-2 text-white rounded-lg dark:text-white dark:hover:bg-gray-700"
                    }`}
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap text-gray-500">
                      Courses
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/notifications"
                    className={` ${
                      isActive("/admin/notifications")
                        ? "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-gray-50"
                        : "hover:bg-slate-300 flex items-center p-2 text-white rounded-lg dark:text-white dark:hover:bg-gray-700"
                    }`}
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap text-gray-500">
                      Notifications
                    </span>
                  </Link>
                </li>
                <li onClick={logout}>
                  <Link className="flex items-center p-2 text-white rounded-lg dark:text-white dark:hover:bg-gray-700 hover:bg-slate-300">
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap text-gray-500">
                      Sign Out
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default SideBar;
