"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import TheHead from "@/components/theHead";
import ProtectedRoute from "@/components/protectedRoute";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true); // Set loading true before request
    toast.loading("Registration In Progress...");

    try {
      const { fullName, email, phone, password, confirmPassword } = formData;

      const requestBody = {
        fullName,
        email,
        phone,
        password,
        confirmPassword,
      };

      const response = await axios.post("/api/auth/register", requestBody);

      if (response.status === 201) {
        toast.dismiss(); // Dismiss loading toast
        toast.success("User Registration Successful");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.dismiss(); // Dismiss loading toast on error
      toast.error(
        error?.response?.data?.message || "An error occurred, please try again."
      );
      console.error("Error during registration:", error);
    } finally {
      setLoading(false); // Reset loading after request
    }
  };

  return (
    <>
      <TheHead />
      <header>
        <Toaster />
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
          <div className="register__area">
            <h3 className="content__space--small text-center">
              Join The Winning Team
            </h3>
            <p className="text-center mb-55">
              Become one of our investors and start making money
            </p>
            <form onSubmit={handleSubmit}>
              <div className="input__grp content__space">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your Full Name"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Phone Number"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="input__grp content__space">
                <div className="show__hide__password">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Define Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <i
                    className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
                <div className="show__hide__password">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Retype Password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <i
                    className={
                      showConfirmPassword ? "fas fa-eye" : "fas fa-eye-slash"
                    }
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  ></i>
                </div>
              </div>
              <div className="input__grp cta__space">
                <input
                  type="email"
                  name="email"
                  placeholder="Your E-mail Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="button content__space"
                disabled={loading} // Disable button while loading
              >
                {loading ? "Signing Up..." : "SIGN UP"}
              </button>
              <p className="text-center">
                Already have an account? <a href="/login">LOGIN</a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProtectedRoute(Register, [], ["/login", "/register"]);
