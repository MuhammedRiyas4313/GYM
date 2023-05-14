import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { getTransaction } from "../../../axios/services/adminServices/adminServices";
import { getTransactionClients } from "../../../axios/services/adminServices/adminServices";
import { Receipt } from "@material-ui/icons";
import { useSelector } from "react-redux";

export default function TransactionDetails({ transactionId }) {

  const AdminDetails = useSelector((state) => state.adminReducer.admin);
  const adminId = AdminDetails?.admin?._id
  const token = AdminDetails?.token

  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(true);
  const [paye, setPaye] = useState({});
  const [reciever, setReciever] = useState({});
  const [transaction, setTransaction] = useState({});

  useEffect(() => {
    getTransaction(token,transactionId).then((res) => {
      setTransaction(res.data);
      payee(res.data.payee);
      recieved(res.data.reciever);
    });
  }, []);

  async function payee(clientId) {
    const res = await getTransactionClients(token,clientId);
    setPaye(res.data);
  }

  async function recieved(clientId) {
    const res = await getTransactionClients(clientId);
    setReciever(res.data);
  }

  function formateDate(date) {
    const formatDate = new Date(date);
    const formated = `${formatDate.getDate()}-${
    formatDate.getMonth() + 1 }-${formatDate.getFullYear()}`;
    return formated;
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="text-gray-400 md:text-2xl text-lg p-7 flex justify-center">Transaction Details</div>
             <hr />
              <div className="text-gray-700 p-5 md:p-14 pt-0 pb-0">
                  <div className="text-sm">
                    <div className="">
                      <div className="px-4 py-2 font-semibold flex justify-between"><div>Payee</div>:<div>{paye.fname}</div></div>
                      <div className="px-4 py-2 font-semibold flex justify-between"><div>Reciever</div>:<div>{reciever.fname}</div></div>
                      <div className="px-4 py-2 font-semibold flex justify-between"><div>Amount</div>:<div>{transaction.amount}&nbsp;₹</div></div>
                      <div className="px-4 py-2 font-semibold flex justify-between"><div>Status</div>:<div>{transaction.status}</div></div>
                      <div className="px-4 py-2 font-semibold flex justify-between"><div>Date</div>:<div>{formateDate(transaction.createdAt)}</div></div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
