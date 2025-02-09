"use client";

import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";

// State Management
import useUserStore from "@/store/userStore";

// Components
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TheHead from "@/components/theHead";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/protectedRoute";

function Deposit() {
  const { user } = useUserStore();
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeInvestments, setActiveInvestments] = useState([]);
  const [calculatedValues, setCalculatedValues] = useState({
    dailyProfit: "0.00",
    totalProfit: "0.00",
    totalAmount: "0.00",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const numAmount = Number(amount);
      const dailyProfit = (numAmount * 0.02).toFixed(2);
      const totalProfit = (dailyProfit * 30).toFixed(2);
      const totalAmount = (numAmount + Number(totalProfit)).toFixed(2);

      setCalculatedValues({ dailyProfit, totalProfit, totalAmount });
    }
  }, [amount]);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const { data } = await axios.get(
          `/api/investment/get?userId=${user?.email}`
        );
        toast.success("Checking Active Investments Complete");
        setActiveInvestments(data?.activeInvestments);
      } catch (error) {
        toast.error("Checking Investments Error");
        console.error("Error fetching investment data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (activeInvestments?.length > 0)
        return toast.error("You Have A Running Investment");

      const data = { amount, userId: user?.email };

      try {
        toast.loading("Creating Deposit Order");
        const response = await axios.post("/api/investment/deposit", data);
        if (response.data.message) {
          setAmount(0);
          toast.dismiss()
          toast.success("Deposit Complete");
        }
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          toast.dismiss()
          toast.error(
            `Error: ${error.response.data.message || error.response.statusText}`
          );
          console.error("Server error:", error.response);
        } else if (error.request) {
          toast.error("Network error: No response received.");
          console.error("Network error:", error.request);
        } else {
          toast.error(`Error: ${error.message}`);
          console.error("Error:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [amount, user?.email]
  );

  return (
    <section>
      <TheHead />
      <Navbar />
      <div className="dashboard section__space__bottom">
        <div className="container">
          <div className="dashboard__area">
            <div className="row">
              <div className="col-xxl-6">
                <div className="main__content">
                  <div className="open__deposit">
                    <h5 className="text-center">Deposit</h5>
                  </div>
                  <form onSubmit={handleSubmit} className="actionForm">
                    <div className="col-lg-12">
                      <div className="checkbox__investment__plan">
                        <div
                          className="investment__item bg-transparent"
                          style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                        >
                          <div className="investment__item__inner">
                            <div className="investment__item__content text-center">
                              <h4 className="secondary text-center">
                                Bank Name
                              </h4>
                              <p className="tertiary text-center">GT Bank</p>
                              <hr />
                              <h4 className="text-center content__space--small">
                                Account Name
                              </h4>
                              <p className="tertiary text-center">
                                Joshua Boyi Ifeola
                              </p>
                              <hr />
                              <h4 className="text-center content__space--small">
                                Account Number
                              </h4>
                              <p className="tertiary text-center">0498322353</p>
                              <hr />
                              <div className="invest__limit">
                                <div className="d-flex align-items-center justify-content-between">
                                  <p>Min. Invest</p>
                                  <p>₦4000</p>
                                </div>
                              </div>
                              <div className="invest__limit mb-35">
                                <div className="d-flex align-items-center justify-content-between">
                                  <p>Max. Invest</p>
                                  <p>₦4,000,000</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Loader loading={isLoading} />
                    <fieldset style={{ marginTop: "20px" }}>
                      <div>
                        <label className="secondary content__space--extra--small">
                          Enter The Amount
                        </label>
                        <input
                          type="number"
                          name="amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                          placeholder="Enter amount"
                          min="1"
                        />
                        <div className="row cta__space">
                          <div
                            className="col-lg-4"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="daily-profit column">
                              <p className="secondary content__space--small">
                                Daily Profit
                              </p>
                              <h3>₦ {calculatedValues.dailyProfit}</h3>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div
                              className="total-profit column__space"
                              style={{ marginTop: "20px" }}
                            >
                              <p className="secondary content__space--small">
                                Total Profit <small>(In 30 days)</small>
                              </p>
                              <h3>₦ {calculatedValues.totalProfit}</h3>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div
                              className="total-profit column__space"
                              style={{ marginTop: "20px" }}
                            >
                              <p className="secondary content__space--small">
                                Total CashOut{" "}
                                <small>(Initial Deposit + Profit)</small>
                              </p>
                              <h3>₦ {calculatedValues.totalAmount}</h3>
                            </div>
                          </div>
                        </div>
                        <div className="plan__cta text-start">
                          {isLoading ? (
                            <p className="text-primary fw-bold">
                              Processing...
                            </p>
                          ) : activeInvestments?.length > 0 ? (
                            <p className="text-danger fw-bold">
                              You cannot invest (Active Investment Running)
                            </p>
                          ) : (
                            <button
                              className="btn button primary"
                              type="submit"
                            >
                              Start Invest Now
                            </button>
                          )}
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default ProtectedRoute(Deposit, ["/deposit"]);
