import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Textarea } from "flowbite-react";
import { registerAttendance } from "../../../axios/services/trainerServices/trainerService";
import { toast } from "react-toastify";

export default function TransactionDetails({ setAttendanceModal,objectAttendance, courseAttendance, clientAttendance, token}) {

  const cancelButtonRef = useRef(null);
  const reason = useRef(null);
  const [open, setOpen] = useState(true);
  const [currentData, setCurrentDate] = useState('')

  useEffect(()=>{
    setCurrentDate( new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear())
  }, [])
  
  function formateDate(date) {
    const formatDate = new Date(date);
    const formated = `${formatDate.getDate()}-${
    formatDate.getMonth() + 1 }-${formatDate.getFullYear()}`;
    return formated;
  }
function markPresent(){
  const data = { 
    courseId: courseAttendance,
    clientId: clientAttendance,
    objectId: objectAttendance,
    date: currentData,
    status: 'present',
    reason: ''
  }
  registerAttendance(token,data).then((res)=>{
    if(res.data.status === 'already marked'){
    toast.warn(res.data.status)
    }else{
      toast.success(res.data.status)
    }
  })
  setAttendanceModal(state => !state)

}
function markAbsent(){
  if(reason.current.value){
    const data = { 
      courseId: courseAttendance,
      clientId: clientAttendance,
      objectId: objectAttendance,
      date: currentData,
      status: 'absent',
      reason: reason.current.value
    }
    registerAttendance(data).then((res)=>{
      if(res.data.status === 'already marked'){
        toast.warn(res.data.status)
        }else{
          toast.success(res.data.status)
        }
    })
    setAttendanceModal(state => !state)
    
  }else{
    reason.current.focus()
  }
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
              <div className="text-gray-900 md:text-2xl text-lg p-7 flex justify-center">{currentData}</div>
             <hr />
              <div className="text-gray-700 p-5 md:p-8 pt-0 pb-0">
                  <div className="text-sm">
                    <div className="">
                      <div className=" font-semibold flex justify-around"><button className="btn btn-success" onClick={markPresent}>Present</button><button onClick={markAbsent} className="btn btn-error">Absent</button></div>
                      <div className="px-4 py-2 font-semibold flex justify-center"><div className="sm:col-span-3 ">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Reason...
                        </label>
                        <div className="flex md:w-96 flex-col gap-6">
                          <Textarea
                            name="healthinfo"
                            type="string"
                            color="blue"
                            ref={reason}
                          />
                        </div>
                      </div></div>
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
