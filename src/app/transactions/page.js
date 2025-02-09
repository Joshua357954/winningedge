'use client'
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TheHead from "@/components/theHead";
import useUserStore from "@/store/userStore";

export default function Transaction() {
  const { user } = useUserStore();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Replace with your API endpoint
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `/api/transaction/get?userId=${user?.email}`
        );
        const data = await response.json().transactions;
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <>
      <TheHead />
      {/* Navbar Section */}
      <Navbar />

      <div className="dashboard section__space__bottom">
        <div className="container">
          <div className="dashboard__area">
            <div className="row">
              <div className="col-xxl-3">
                <div className="sidebar">
                  <a href="javascript:void(0)" className="close__sidebar">
                    <i className="fas fa-times"></i>
                  </a>
                </div>
              </div>
              <div className="col-xxl-9">
                <div className="main__content">
                  <div className="transaction__history">
                    <div className="history__head">
                      <h5>Transactions History</h5>
                      <div className="history__input__wrapper">
                        <input
                          type="text"
                          name="search__history"
                          id="transactionHistoryFilter"
                        />
                        <i className="fas fa-search"></i>
                      </div>
                    </div>
                    <div className="history__table__wrapper">
                      <table>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Payment Method</th>
                            <th>Amount</th>
                            <th>Wallet ID</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions?.length > 0 ? (
                            transactions?.map((transaction, index) => (
                              <tr key={index}>
                                <td>{transaction?.date}</td>
                                <td>{transaction?.paymentMethod}</td>
                                <td>{transaction?.amount}</td>
                                <td>{transaction?.walletId}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4">No transactions found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <nav aria-label="Page navigation example">
                      <ul className="pagination justify-content-center">
                        <li className="page-item">
                          <a className="page-link" href="javascript:void(0)">
                            <img
                              src="assets/images/icons/left-arrow.png"
                              alt="Previous"
                            />
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="javascript:void(0)">
                            01
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="javascript:void(0)">
                            02
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="javascript:void(0)">
                            03
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="javascript:void(0)">
                            04
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="javascript:void(0)">
                            <img
                              src="assets/images/icons/right-arrow.png"
                              alt="Next"
                            />
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </>
  );
}
