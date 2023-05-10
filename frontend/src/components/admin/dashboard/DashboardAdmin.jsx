import React, { useEffect, useState } from "react";
import { RevanueChart } from "./RevanueChart";
import { PaymentChart } from "./PaymentChart";
import { getClients, getTrainers, getWallet } from "../../../axios/services/adminServices/adminServices";
import { useSelector } from "react-redux";

function DashboardAdmin() {

  const [trainers, setTrainers] = useState([])
  const [clients, setClients] = useState([])
  const [wallet, setWallet] = useState({})

  const AdminDetails = useSelector((state) => state.adminReducer.admin);
  const adminId = AdminDetails?.admin?._id

  useEffect(()=>{
    getWallet(adminId).then((res)=>{
      setWallet(res.data)
    })
    getClients().then((res)=>{
      setClients(res.data)
    })
    getTrainers().then((res)=>{
      setTrainers(res.data)
    })
  }, [])

  return (
    <div className="md:ml-64">
      <div className="flex items-center justify-between p-6 bg-gray-900 dark:bg-gray-900">
        <h3 className="text-3xl text-white font-bold">Dashboard</h3>
        <div class="">
          
        </div>
      </div>
      <div className="flex flex-wrap justify-around pt-3">
        <div className="">
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center ">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-2xl font-extrabold text-orange-500">
                  Trainers
                </p>
                <p className="mt-6 flex items-baseline justify-center">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    0{trainers?.length}
                  </span>
                </p>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center ">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-2xl font-extrabold text-orange-500">
                  Clients
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    0{clients?.length}
                  </span>
                </p>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-2xl font-extrabold text-orange-500">
                  Revanue
                </p>
                <p className="mt-6 flex items-baseline justify-center">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    {wallet?.balance}&nbsp;₹
                  </span>
                </p>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-3" />
      <div className="flex flex-wrap p-5 justify-between">
        <div className="md:w-1/2 w-full p-5 flex justify-center">
          <RevanueChart />
        </div>
        <div className="md:w-1/2 w-full h-80 p-5 flex justify-center">
          <PaymentChart />
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
