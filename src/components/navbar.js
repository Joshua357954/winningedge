"use client"
import React from "react";
import Avatar from "./avatar";
import useUserStore from "@/store/userStore";
import { Toaster } from "react-hot-toast";

export default function navbar() {
    const {user} = useUserStore()

  return (
    <header class="header__dashboard header__alt">
      <Toaster/>
      <nav class="navbar navbar-expand-xl">
        <div class="container">
          <a class="navbar-brand" href="/dashboard">
            <img src="/assets/images/logo.png" alt="Logo" class="logo" />
          </a>
          <div class="navbar__out order-2 order-xl-3">
            <div class="dashboard__nav">
              <div class="profile__meta">
                <a href="javascript:void(0)" class="profile__small">
                  <Avatar name={user?.name} />
                </a>
                <div class="profile__info">
                  <div class="profile__info__head">
                    <Avatar name={user?.name} />
                    <div class="profile__head__content">
                      <a href="settings.html">{user?.name}</a>
                      <p class="tertiary">
                        <a
                          href="https://pixner.net/cdn-cgi/l/email-protection"
                          class="__cf_email__"
                          data-cfemail="cfbda0a8aabdf7fb8fa8a2aea6a3e1aca0a2"
                        >
                         {user?.email}
                        </a>
                      </p>
                    </div>
                  </div>
                  <a href="#">Logout</a>
                </div>
              </div>
            </div>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#primaryNav"
              aria-controls="primaryNav"
              aria-expanded="false"
              aria-label="Toggle Primary Nav"
            >
              <span class="icon-bar top-bar"></span>
              <span class="icon-bar middle-bar"></span>
              <span class="icon-bar bottom-bar"></span>
            </button>
          </div>
          <div
            class="collapse navbar-collapse justify-content-end order-3 order-xl-2"
            id="primaryNav"
          >
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a class="nav-link active" href="/dashboard">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/investment">
                  Investment
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/transaction">
                  Transactions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
