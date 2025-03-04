"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import TheHead from "@/components/theHead";
import useUserStore from "@/store/userStore";
import { prettifyAmountInNaira, ToDate, banks } from "@/libs/fn";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/protectedRoute";

const investments = [
  { date: "10th March", amount: "$500" },
  { date: "7th April", amount: "$150" },
];

function Withdraw() {
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [completedInvestments, setCompletedInvestments] = useState([]);

  // Form Data State
  const [formData, setFormData] = useState({
    account_number: "",
    account_name: "",
    bank_name: "",
    depositId: "",
    userId: user?.email || "",
  });

  // Reset Form (Function)
  const resetForm = () => {
    setFormData({
      account_number: "",
      account_name: "",
      bank_name: "",
      depositId: "",
      userId: user?.email || "",
    });
  };

  // Handle Change (for form)
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Set Deposit For Withdrawal
  const handleDepositClick = (deposit) => {
    setFormData((prevState) => ({
      ...prevState,
      depositId: deposit?.id,
      amount: deposit?.amount,
    }));
  };

  // Send Withdrawal Order To Backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.depositId) {
      toast.error("Please select an investment to withdraw.");
      return;
    }
    setLoading(true)
    toast.loading("Withdrawal In Progress..")
    try {
      const response = await axios.post("/api/investment/withdraw", formData);
      toast.success("Withdrawal request submitted successfully!");

      // Remove the investment with matching depositId
      setCompletedInvestments((prevInvestments) =>
        prevInvestments.filter(
          (investment) => investment.depositId !== formData.depositId
        )
      );
      // Clear Input Fields
      resetForm();
      // console.log(response.data);
      setLoading(false)
      toast.dismiss()
      toast.success("Withdrawal Complete")
    } catch (error) {
      toast.dismiss()
      setLoading(false)
      toast.error("An error occurred. Please try again.");
      console.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  // Fetch Available Investments
  useEffect(() => {
    async function getWithdrawalble() {
      toast.loading("Fetching Available Investments");
      setLoading(true)
      try {
        const { data } = await axios.get(
          `/api/investment/get?userId=${user?.email}`
        );
        toast.dismiss();
        toast.success("Completed Check");
        setCompletedInvestments(
          (data?.completedInvestments || []).filter(
            (investment) =>
              investment.withdrawalStatus !== "IN_PROGRESS" &&
              investment.withdrawalStatus !== "SENT_TO_USER"
          )
        );
        setLoading(true)
      } catch (error) {
        setLoading(false)
        toast.dismiss();
        toast.error("Error fetching investments");
      }
    }

    if (user?.email) {
      getWithdrawalble();
    }
  }, [user?.email]);

  return (
    <>
      <TheHead />
      <Navbar />
      <div className="dashboard section__space__bottom">
        <div className="container">
          <div className="dashboard__area">
            <div className="row">
              <div className="col-xxl-3"></div>
              <div className="col-xxl-9">
                <div className="main__content">
                  <div
                    className="open__deposit"
                    style={{ padding: "30px 10px" }}
                  >
                    <h5 className="text-center">WITHDRAW</h5>
                  </div>

                  <section
                    className="group col-md-8"
                    style={{ margin: "30px auto" }}
                  >
                    <form onSubmit={handleSubmit}>
                      <div className="group">
                        <div className="row d-flex align-items-center">
                          <div className="col-lg-12 column__space--secondary">
                            <label className="form-label fw-semibold mb-2">
                              Withdrawal Amount
                            </label>
                            <div className="d-flex flex-wrap gap-3">
                              {completedInvestments?.length > 0 ? (
                                completedInvestments
                                  .filter((inv) => !inv?.reInvested) // Filter out reinvested investments
                                  .map((inv, index) => (
                                    <div
                                      key={index}
                                      className={`btn px-4 py-2 rounded shadow-sm ${
                                        formData?.depositId === inv?.id
                                          ? "button primary"
                                          : "button btn-success"
                                      }`}
                                      style={{ borderRadius: ".3rem" }}
                                      onClick={() => handleDepositClick(inv)}
                                    >
                                      {ToDate(inv.datetime).split(",")[0]} Inv.{" "}
                                      {prettifyAmountInNaira(inv?.totalAmount)}
                                    </div>
                                  ))
                              ) : (
                                <p>No completed investments found.</p>
                              )}
                            </div>
                          </div>

                          <div
                            className="gap"
                            style={{ padding: "10px 0" }}
                          ></div>

                          <div className="col-lg-12 column__space">
                            <label className="form-label fw-semibold mb-2">
                              Account Number
                            </label>
                            <input
                              type="text"
                              name="account_number"
                              className="form-control rounded-3 shadow-sm p-3"
                              required
                              placeholder="Account Number"
                              value={formData.account_number}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div
                          className="gap"
                          style={{ padding: "10px 0" }}
                        ></div>

                        <div className="col-lg-12 column__space">
                          <label className="form-label fw-semibold mb-2">
                            Account Name
                          </label>
                          <input
                            type="text"
                            name="account_name"
                            className="form-control rounded-3 shadow-sm p-3"
                            required
                            placeholder="Account Name"
                            value={formData.account_name}
                            onChange={handleChange}
                          />
                        </div>

                        <div
                          className="gap"
                          style={{ padding: "10px 0" }}
                        ></div>

                        <div className="col-lg-12 column__space--secondary">
                          <label className="form-label fw-semibold mb-2">
                            Bank Name
                          </label>
                          <select
                            name="bank_name"
                            className="form-select rounded-3 shadow-sm p-3"
                            required
                            value={formData.bank_name}
                            onChange={handleChange}
                          >
                            <option value="">Select Bank</option>
                            {banks.map((bank, index) => (
                              <option key={index} value={bank}>
                                {bank}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div
                          className="gap"
                          style={{ padding: "10px 0" }}
                        ></div>

                        <p className="tertiary" style={{ margin: "12px 0" }}>
                          To confirm the operation "Withdrawal of funds" receive
                          a confirmation code to your E-mail address and enter
                          it in the appropriate field. The code is valid for 5
                          minutes from the moment of its receipt.
                        </p>

                        <div className="plan__cta text-start">
                          <button className="button primary" disabled={loading} type="submit">
                            Withdraw Funds
                          </button>
                        </div>
                      </div>
                    </form>
                  </section>
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

export default ProtectedRoute(Withdraw, ["/withdraw"]);
