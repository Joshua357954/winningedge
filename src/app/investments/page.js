"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TheHead from "@/components/theHead";
import useUserStore from "@/store/userStore";
import { prettifyAmountInNaira, ToDate } from "@/libs/fn";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/protectedRoute";

function Investment() {
  const { user } = useUserStore();
  const [activeInvestments, setActiveInvestments] = useState([]);
  const [completedInvestments, setCompletedInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const { data } = await axios.get(
          `/api/investment/get?userId=${user?.email}`
        );
        // alert(JSON.stringify(data?.activeInvestments));
        toast.success("Investments Fetched");
        setActiveInvestments(data?.activeInvestments);
        setCompletedInvestments(data?.completedInvestments);
      } catch (error) {
        toast.error(`Error fetching investment data: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  const handleReinvest = async (depositId) => {
    const isConfirmed = window.confirm("Are you sure you want to reinvest?");
    if (!isConfirmed) return;

    try {
      toast.loading("Processing reinvestment...");

      const { data } = await axios.post("/api/investment/reInvest", {
        depositId,
      });

      toast.dismiss();
      toast.success("Reinvestment successful!");

      // Optional: Refresh data or update UI here
    } catch (error) {
      toast.dismiss();
      toast.error(
        error.response?.data?.message || "Failed to reinvest. Try again!"
      );
      console.error("Reinvestment error:", error);
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <TheHead />
      <Navbar />

      <div className="dashboard section__space__bottom">
        <div className="container">
          <div className="dashboard__area">
            <div className="row">
              <div className="col-xxl-9">
                <div className="main__content">
                  <div className="dashboard__head">
                    <h5>Investments</h5>
                  </div>

                  {loading ? (
                    <div class="d-flex justify-content-center mt-5 vh-100">
                      <p class="mt-3 fw-semibold text-muted">
                        Loading investments...
                      </p>
                    </div>
                  ) : (
                    <div className="deposit__history">
                      <div className="row">
                        {/* Active Investments */}
                        <div className="col-lg-6">
                          <div className="deposit__history__inner column__space">
                            <div className="deposit__history__head">
                              <h6>Active Investments</h6>
                              <a href="#" className="depo__history__btn">
                                <i className="fas fa-angle-down"></i>
                              </a>
                            </div>

                            <div className="deposit__history__wrapper">
                              {activeInvestments?.length > 0 ? (
                                activeInvestments?.map((investment, index) => (
                                  <div
                                    key={index}
                                    className="deposit__history__single__item"
                                  >
                                    <div className="method__info">
                                      <img
                                        src="assets/images/active.svg"
                                        alt="Investment"
                                      />
                                      <div className="method__info__inner">
                                        <h6>
                                          {ToDate(investment?.datetime)} -
                                          Investment
                                        </h6>
                                        <p
                                          className="tertiary"
                                          style={{ fontSize: "13px" }}
                                        >
                                          Cashout Date -{" "}
                                          {ToDate(investment?.completionDate)}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="method__amount">
                                      <h6>
                                        {prettifyAmountInNaira(
                                          investment?.amount
                                        )}
                                      </h6>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p>No active investments found.</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Completed Investments */}
                        <div className="col-lg-6">
                          <div className="deposit__history__inner">
                            <div className="deposit__history__head">
                              <h6>Completed Investments</h6>
                              <a href="#" className="depo__history__btn">
                                <i className="fas fa-angle-down"></i>
                              </a>
                            </div>
                            <div className="deposit__history__wrapper">
                              {completedInvestments?.length > 0 ? (
                                completedInvestments?.map(
                                  (investment, index) => (
                                    <div
                                      key={index}
                                      className="deposit__history__single__item gap-2"
                                    >
                                      <div className="method__info">
                                        <img
                                          src="assets/images/done2.svg"
                                          alt="Investment"
                                        />
                                        <div className="method__info__inner">
                                          <h6>
                                            {ToDate(investment?.datetime)} -
                                            Investment
                                          </h6>
                                          <p
                                            className="tertiary"
                                            style={{ fontSize: "12px" }}
                                          >
                                            Withdrawal Date -{" "}
                                            {ToDate(investment?.completionDate)}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="d-flex flex-column align-items-center gap-3">
                                        <div>
                                          <h6 className="fw-semibold text-primary fs-7 mb-0 tertiary">
                                            {prettifyAmountInNaira(
                                              investment?.amount
                                            )}
                                          </h6>
                                        </div>
                                        {investment?.reInvested ? <p className="method__amount">ReInvested</p> : (
                                          <div className="d-flex flex-column gap-2">
                                            <button
                                              className="btn btn-primary px-3 py-1 rounded"
                                              onClick={() =>
                                                handleReinvest(investment?.id)
                                              }
                                            >
                                              ReInvest
                                            </button>

                                            <a
                                              href="/withdraw"
                                              className="btn btn-secondary px-3 py-1 rounded"
                                            >
                                              Withdraw
                                            </a>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )
                                )
                              ) : (
                                <p>No completed investments found.</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProtectedRoute(Investment, ["/investments"]);
