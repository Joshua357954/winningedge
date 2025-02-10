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
              <div className="profile__meta">
                <div className="profile__info">
                  <div className="profile__info__head">
                    <Avatar name={user?.name} />
                    <div className="profile__head__content">
                      <Link href="/settings">{user?.name}</Link>
                      <p className="tertiary">
                        <a
                          href="mailto:user@example.com"
                          className="__cf_email__"
                        >
                          {user?.email}
                        </a>
                      </p>
                    </div>
                  </div>
                  <button className="logout-button">Logout</button>
                </div>
              </div>
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
          <div
            className="collapse navbar-collapse justify-content-end order-3 order-xl-2"
            id="primaryNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link className="nav-link active" href="/dashboard">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/investment">
                  Investment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/transaction">
                  Transactions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
