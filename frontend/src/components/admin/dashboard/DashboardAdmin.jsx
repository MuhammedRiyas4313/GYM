import React from "react";
import { RevanueChart } from "./RevanueChart";
import { PaymentChart } from "./PaymentChart";

function DashboardAdmin() {
  return (
    <div className="md:ml-64">
      <div className="flex items-center justify-between p-6 bg-gray-900 dark:bg-gray-900">
        <h3 className="text-3xl text-white font-bold">Dashboard</h3>
        <div class="relative">
          
          {/* <input
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search here"
            required
          ></input>
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button> */}
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
                    $349
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    USD
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
                    $349
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    USD
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
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    $349
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    USD
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
        <div className="md:w-1/2 p-5 flex justify-center">
          <RevanueChart />
        </div>
        <div className="md:w-1/2  h-80 p-5 flex justify-center">
          <PaymentChart />
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
