"use client";

import React, { useState } from "react";
import axios from "axios";
import TheHead from "@/components/theHead";
import useUserStore from "@/store/userStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/protectedRoute";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useUserStore();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Logging In...");

    try {
      const response = await axios.post("/api/auth/login", { email, password });

      const user = response.data.user;
      toast.dismiss();
      setUser(user);
      toast.success(`Welcome, ${user?.name || "Fam"}!`);
      router.push("/dashboard");
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TheHead />
      <header>
        <nav className="navbar navbar-expand-xl">
          <div className="container">
            <a className="navbar-brand" href="/dashboard">
              <img src="assets/images/logo.png" alt="Logo" className="logo" />
            </a>
          </div>
        </nav>
      </header>

      <section className="register">
        <div className="container">
          <div className="register__area login__area">
            <h3 className="content__space--small text-center">Welcome Back!</h3>
            <p className="text-center mb-55">Enter your details below.</p>

            <form onSubmit={handleSubmit}>
              <div className="input__area text-start content__space">
                <label htmlFor="loginMail" className="content__space--small">
                  Username / Email
                </label>
                <input
                  type="email"
                  id="loginMail"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input__area text-start content__space--small">
                <label htmlFor="loginPass" className="content__space--small">
                  Enter Password
                </label>
                <div className="show__hide__password">
                  <input
                    type="password"
                    id="loginPass"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="button content__space"
                disabled={loading}
              >
                {loading ? "Logging in..." : "LOG IN"}
              </button>

              <p className="text-center">
                Don't have an account? <a href="/register">SIGN UP</a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProtectedRoute(Login, [], ["/login", "/register"]);
