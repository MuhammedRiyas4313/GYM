import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTransactions } from "../../axios/services/trainerServices/trainerService";

function Transaction() {
  const location = useLocation();
  const userId = location?.state?.userId;

  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    getTransactions(userId).then((res) => {
        console.log(res.data,'transactions...')
      setTransaction(res.data);
    });
  }, []);

  function transId(id){
  const ID = id.slice(-6)
   return ID
  }

  function formatDate(date) {
    const formatDate = new Date(date);
    const formated = `${formatDate.getDate()}-${
      formatDate.getMonth() + 1
    }-${formatDate.getFullYear()}`;

    return formated;
  }

  return (
    <div className="md:p-36 pt-20 pb-10 transaction">
      <div className="flex justify-center md:text-3xl text-lg mb-10 uppercase font-extrabold">
        Transaction History
      </div>
      <div className="overflow-y-scroll max-h-screen">
        <table className="table w-full border border-gray-900">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transaction?.map((transaction) => {
              return (
                <tr>
                  <td></td>
                  <td>{transId(transaction._id)}</td>
                  <td>{formatDate(transaction.createdAt)}</td>
                  <td>{transaction.amount}&nbsp;₹</td>
                  <th>
                    <div className={transaction.payee === userId ? 'badge badge-error':'badge badge-success'}>{transaction.status}</div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transaction;
