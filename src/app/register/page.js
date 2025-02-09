"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
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
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast("⚠️ Passwords do not match");
      return;
    }

    try {
      const { fullName, email, phone, password, confirmPassword } = formData;

      // Ensure correct field names match the backend expectations
      const requestBody = {
        fullName, // Make sure API expects "fullName"
        email,
        phone,
        password,
        confirmPassword,
      };
      toast.loading("Registeration In Progress");
      const response = await axios.post("/api/auth/register", requestBody);

      if (response.status === 201) {
        toast.dismiss;
        toast.success("User Registeration Successful");
        router.push("/dashboard"); // Redirect after successful registration
      }
    } catch (error) {
      toast.dismiss;
      toast.loading("An Error Occured , Try Again .");
      console.error("Error during registration", error);

      // Log full response for debugging
      if (error.response) {
        console.error("Server Response:", error.response.data);
        toast(error.response.data.error || "Registration failed");
      } else {
        toast("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <TheHead />
      <header></header>

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
              <button type="submit" className="button content__space">
                SIGN UP
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
