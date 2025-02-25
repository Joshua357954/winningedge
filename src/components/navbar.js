"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Avatar from "./avatar";
import useUserStore from "@/store/userStore";
import { Toaster } from "react-hot-toast";
import Logo from "./Logo";

export default function Navbar() {
  const { user, logout } = useUserStore();
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef(null);

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      logout();
      router.push("/login");
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowPopover(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header__dashboard header__alt relative">
      <Toaster />
      <nav className="navbar navbar-expand-xl">
        <div className="container">
          <Logo />

          <div className="navbar__out order-2 order-xl-3 relative">
            <div className="dashboard__nav">
              <button
                className="profile__small relative"
                onClick={() => setShowPopover(!showPopover)}
              >
                <Avatar name={user?.name} />
              </button>
              {showPopover && (
                <div
                  ref={popoverRef}
                  className="absolute right-0 top-10 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 z-40"
                >
                  {/* <p className="z-50 font-semibold text-gray-800 mb-1">Name:</p> */}
                  <p className="z-50 font-semibold text-gray-800 mb-4">
                    {user?.name}
                  </p>

                  <p className="text-md text-blue-600 mb-1">Email:</p>
                  <p className="text-sm text-gray-600 mb-2">{user?.email}</p>

                  <hr className="my-2" />

                  <p className="block w-full text-left text-red-500 text-sm mt-2 hover:text-red-600 cursor-pointer" onClick={handleLogout}>
                    Logout
                  </p>
                </div>
              )}
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#primaryNav"
              aria-controls="primaryNav"
              aria-expanded="false"
              aria-label="Toggle Primary Nav"
            >
              <span className="icon-bar top-bar"></span>
              <span className="icon-bar middle-bar"></span>
              <span className="icon-bar bottom-bar"></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
