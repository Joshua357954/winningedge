"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TheHead from "@/components/theHead";
import useUserStore from "@/store/userStore";
import axios from "axios";
import { MyDate, prettifyAmountInNaira } from "@/libs/fn";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/protectedRoute";
import Link from "next/link";

function Dashboard() {
  const { user, loading, dashboardData, setDashboardData } = useUserStore();

  useEffect(() => {
    if (user?.email) {
      fetchDepositData(user?.email);
    }
  }, [user]);

  const fetchDepositData = async (userId) => {
    try {
      console.log(`Fetching Dashboard data for user: ${userId}`);

      const response = await axios.get(`/api/getDashboard?userId=${userId}`);
      console.log("✅ Dashboard Data Fetched:", response.data);

      setDashboardData(response.data);
      toast.success("Dashboard data successfully loaded!");
    } catch (error) {
      if (error.response) {
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
    }
  };

  return (
    <>
      <TheHead />
      <Navbar />

      <div className="dashboard section__space__bottom">
        <div
          className="container"
          data-background="assets/images/ready/line-bg.png"
        >
          <div className="dashboard__area">
            <div className="row">
              <div className="col-xxl-9">
                <div className="main__content">
                  <div className="balance">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="balance__single column__space">
                          <div className="balance__content">
                            <p>Total Balance</p>
                            <h2 style={{ margin: "12px 0" }}>
                              {prettifyAmountInNaira(
                                dashboardData?.balance.bal1
                              )}
                            </h2>

                            {dashboardData?.balance?.bal2 ? (
                              <div className="last__action">
                                <p className="tertiary">
                                  {(() => {
                                    const today = new Date();
                                    const completedDate = MyDate(
                                      dashboardData?.balance?.bal2
                                        ?.completedDate
                                    );
                                    const diffTime = completedDate - today;
                                    const diffDays = Math.ceil(
                                      diffTime / (1000 * 60 * 60 * 24)
                                    );
                                    return diffDays > 0
                                      ? `${diffDays} days to go to finish your current plan`
                                      : "Complete Investment ready to withdraw";
                                  })()}
                                </p>
                                <p className="tertiary">
                                  {prettifyAmountInNaira(
                                    dashboardData.balance.bal2.totalAmount
                                  )}
                                </p>
                              </div>
                            ) : (
                              <p className="tertiary">
                                Build your investment portfolio 👇👇🏽
                              </p>
                            )}

                            <div
                              className="d-flex gap-3"
                              style={{ justifyContent: "start", width: "100%" }}
                            >
                              <a
                                href="/deposit"
                                className="button"
                                style={{
                                  borderRadius: "0.5rem",
                                  width: "50%",
                                  // flexShrink: 0, Prevents the button from shrinking
                                }}
                              >
                                Deposit
                              </a>
                              <a
                                href="/withdraw"
                                className="button"
                                style={{
                                  borderRadius: "0.5rem",
                                  width: "50%",
                                  // flexShrink: 0, Prevents the button from shrinking
                                }}
                              >
                                Withdraw
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <h5 className="mb-0">Investment Details</h5>
                    <Link href="/investments" className="btn btn-primary">
                      View All
                    </Link>
                  </div>

                  <div className="available__balance">
                    <div className="row">
                      <div className="col-md-6 col-lg-4">
                        <div className="available__balance__single column__space">
                          <div className="balance__left">
                            <p className="tertiary">Total Investments</p>
                            <h5>
                              {dashboardData?.dataLevel2?.totalInvestments}
                            </h5>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4">
                        <div className="available__balance__single column__space">
                          <div className="balance__left">
                            <p className="tertiary">Total Earnings</p>
                            <h5>
                              {prettifyAmountInNaira(
                                dashboardData?.dataLevel2?.totalEarnings
                              )}
                            </h5>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4">
                        <div className="available__balance__single column__space">
                          <div className="balance__left">
                            <p className="tertiary">Active Investments</p>
                            <h5>
                              {dashboardData?.dataLevel2?.activeInvestments}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="investment__history">
                    <h4>Latest Transactions</h4>
                    <div className="investment__table__wrapper">
                      <table className="investment__table">
                        <thead>
                          <tr>
                            <th>Date & Time</th>
                            <th>Transaction</th>
                            <th>Amount</th>
                            {/* <th>Payment Method</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {dashboardData?.transactions?.length > 0 ? (
                            dashboardData?.transactions?.map((tx, index) => (
                              <tr key={index}>
                                <td>
                                  {new Date(
                                    tx?.datetime?.seconds * 1000
                                  ).toLocaleString()}
                                </td>
                                <td>
                                  {tx?.reInvested
                                    ? "ReInvested"
                                    : tx?.withdrawalStatus === "IN_PROGRESS"
                                    ? "Withdrawal Pending"
                                    : !tx?.completionDate
                                    ? "Deposit Pending"
                                    : tx?.withdrawalStatus !== ""
                                    ? "Withdrawal"
                                    : "Deposit"}
                                </td>

                                <td>
                                  <h6>
                                    {tx?.withdrawalStatus
                                      ? prettifyAmountInNaira(tx?.totalAmount)
                                      : prettifyAmountInNaira(tx?.amount)}
                                  </h6>
                                </td>
                                {/* <td>
                                  <img
                                    src={`/assets/images/transaction/${
                                      tx?.paymentMethod || "NGN"
                                    }.png`}
                                    // alt={tx.paymentMethod || "Bitcoin"}
                                  />
                                </td> */}
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" style={{ textAlign: "center" }}>
                                No transactions found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overlay"></div>
      <Footer />
    </>
  );
}

export default ProtectedRoute(Dashboard, ["/dashboard"]);
