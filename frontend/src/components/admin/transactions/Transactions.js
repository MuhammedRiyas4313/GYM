import React, { useEffect, useState } from "react";
import avatar1 from "../../../assets/images/avatars/1.jpg";
import { getTransactions } from "../../../axios/services/adminServices/adminServices";
import { useLocation } from "react-router-dom";
import TransactionDetails from "./TransactionDetails";

function Transactions() {
  const [transaction, setTransaction] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    getTransactions().then((res) => {
      setTransaction(res.data);
    });
  }, []);

  function transId(id) {
    const ID = id.slice(-6);
    return ID;
  }

  function formatDate(date) {
    const formatDate = new Date(date);
    const formated = `${formatDate.getDate()}-${
      formatDate.getMonth() + 1
    }-${formatDate.getFullYear()}`;

    return formated;
  }

  function viewDetails(transactionId) {
    setShowDetails((state) => !state);
    setTransactionId(transactionId);
  }

  return (
    <div>
      {showDetails ? (
        <TransactionDetails transactionId={transactionId} />
      ) : (
        <></>
      )}
      <div className="flex  flex-wrap items-center justify-center md:justify-between p-6   bg-gray-900 dark:bg-gray-900 md:ml-64">
        <h3 className="md:text-3xl text-lg text-white font-bold">
          Transactions
        </h3>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search here"
            required
          ></input>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md md:ml-64">
        <div className="overflow-y-scroll max-h-screen">
          <table className="table w-full border border-gray-900">
            {/* head */}
            <thead>
              <tr>
                <th className="z-0"></th>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Payee</th>
                <th>Reciever</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {transaction?.map((transaction) => {
                return (
                  <tr key={transaction._id}>
                    <td></td>
                    <td>{transId(transaction._id)}</td>
                    <td>{formatDate(transaction.createdAt)}</td>
                    <td>{transaction.amount}&nbsp;₹</td>
                    <td>{transaction.payee}</td>
                    <td>{transaction.reciever}</td>
                    <th>
                      <div
                        className={
                          transaction.payee === "64300ee00b649a2abb940de1"
                            ? "badge badge-error"
                            : "badge badge-success"
                        }
                      >
                        {transaction.status}
                      </div>
                    </th>
                    <td>
                      <button
                        onClick={() => viewDetails(transaction._id)}
                        className="btn btn-ghost btn-xs bg-slate-300"
                      >
                        details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
