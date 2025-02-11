"use client";

import React from "react";
import Link from "next/link";
import Avatar from "./avatar";
import useUserStore from "@/store/userStore";
import { Toaster } from "react-hot-toast";

export default function Navbar() {
  const { user } = useUserStore();

  return (
    <header className="header__dashboard header__alt">
      <Toaster />
      <nav className="navbar navbar-expand-xl">
        <div className="container">
          <Link className="navbar-brand" href="/dashboard">
            <img src="/assets/images/logo.png" alt="Logo" className="logo" />
          </Link>

          <div className="navbar__out order-2 order-xl-3">
            <div className="dashboard__nav">
              <button className="profile__small">
                <Avatar name={user?.name} />
              </button>
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
