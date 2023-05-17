import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { enrollSchema } from "../../../validations/enrollCourseValidation";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Textarea } from "flowbite-react";
import Loading from "../../loadingSpinner/Loading";
import "./EnrollCourse.css";
import { enrollClient, getCourseDetails } from "../../../axios/services/clientServices/clientServices";
import Paypal from "./Paypal";
import SuccessModal from './SuccessModal'

function EnrollCourse() {

  const [enrollData, setEnrollData] = useState({});
  const [loader, setLoader] = useState(false);
  const [payment, setPayment] = useState(false);
  const [enrolledClient, setEnrolledClient] = useState(false);
  const [feeToPay, setFeeToPay] = useState(false);
  const [slotes, setSlote] = useState([]);
  const [course, setCourse] = useState({});
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const Location = useLocation();

  const client = useSelector((state) => state.userReducer.user);

  const user = client.user
  const clientId = client?.user?._id;
  const token = client.token
  const courseId = Location.state?.courseId;

  function formateDate() {
    const formatDate = new Date();
    const formated = `${formatDate.getDate()}-${formatDate.getMonth() + 1}-${formatDate.getFullYear()}`;
    return formated;
  }

  function chargeTopay(fee) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysLeft = daysInMonth - today.getDate();
    const feePerDay = fee / 30
    const feeForRestDays = Math.ceil(feePerDay * daysLeft)
    setFeeToPay(feeForRestDays)
    return feeForRestDays
  }

  useEffect(() => {
    getCourseDetails(courseId).then((res) => {
      setCourse(res?.data);
      const allSlotes = res?.data?.availableSlots;
      const clients = res?.data?.clients;
      const traineePaid = clients?.filter((val) => val?.user === clientId && val?.status === 'Active' && val?.paymentStatus );
      const trainee = clients?.filter((val) => val?.user === clientId && val?.status === 'Active' && !val?.paymentStatus );
      if(traineePaid?.length) setEnrolledClient(true)
      chargeTopay(res?.data?.charge)
      if (trainee?.length) {
        const slotes = allSlotes.filter((val) => val?.client === clientId);
        setSlote(slotes)
      }else{
        const slotes = allSlotes?.filter((val) => val?.status === "free");
        setSlote(slotes);
      }
      
    });
  }, []);

  const onSubmit = async (values) => {
    setPayment(true);
    const data = {
      ...values,
      clientId,
      courseId,
    };
    setEnrollData(data);
  };

  async function paypalpayment(paymentDetails) {

    const data = { ...enrollData, paymentDetails };
    const response = await enrollClient(token,data);

    if (response) {
      setSuccess(true)
    } else {
      navigate("/course/details", { state: { courseId: courseId } });
    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        weight: "",
        height: "",
        emergencycontact: "",
        slote: "",
        healthinfo: "",
      },
      validationSchema: enrollSchema,
      onSubmit,
    });

  return (
    <div className="signupouter flex justify-center">
      {success ? <SuccessModal setSuccess={setSuccess} client={user} /> : <></>}
      {loader ? (
        <div className="spinnerouter flex justify-center align-middle">
          <Loading />
        </div>
      ) : (<></>)}
        <div className="signupouter w-full h-full flex justify-center items-center mt-20">
          {!payment ? (
            <div className="md:w-1/2">
              <form
                className="signupform md:p-20 p-10 pb-10 "
                onSubmit={handleSubmit}
              >
                <div className="space-y-12 ">
                  <div className="border-b border-gray-900/10 pb-12">
                    {!enrolledClient ? (
                      <h1 className="text-base font-semibold leading-7 text-gray-900 md:text-3xl">
                        Register now
                      </h1>
                    ) : (
                      <div className="badge-info md:p-5 rounded break-words text-center">
                        Your already have an active membership &nbsp;&nbsp;⚠️
                      </div>
                    )}
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Charge / Month &nbsp;(in rupees)
                        </label>
                        <div className="mt-2">
                          <div className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm bg-gray-100  sm:text-sm sm:leading-6 p-2">
                            { feeToPay }&nbsp;₹
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Joining Date
                        </label>
                        <div className="mt-2">
                          <div className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm bg-gray-100  sm:text-sm sm:leading-6 p-2">
                            {formateDate()}&nbsp;
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Weight &nbsp;(in kg)
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="weight"
                            value={values.weight}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.weight && touched.weight && (
                            <p className="text-red-600">{errors.weight}</p>
                          )}
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Height &nbsp; (in cm)
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="height"
                            id="first-name"
                            value={values.height}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.height && touched.height && (
                            <p className="text-red-600">{errors.height}</p>
                          )}
                        </div>
                      </div>
                      <div className="sm:col-span-3 md:mt-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Emergency contact information (Mobile)
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="emergencycontact"
                            value={values.emergencycontact}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.emergencycontact &&
                            touched.emergencycontact && (
                              <p className="text-red-600">
                                {errors.emergencycontact}
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium leading-6 text-gray-900 mt-2 mb-2"
                        >
                          Choose Time Slotes
                        </label>
                        <select
                          name="slote"
                          value={values.slote}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="select w-full "
                        >
                          <option selected>Choose Slote</option>

                          {slotes.map((val) => {
                            return (
                              <option value={val.slote}>{val.slote}</option>
                            );
                          })}
                        </select>
                        {errors.slote && touched.slote && (
                          <p className="text-red-600">{errors.slote}</p>
                        )}
                      </div>
                      <div className="sm:col-span-3 ">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Health information such as any medical conditions,
                          injuries, or allergies
                        </label>
                        <div className="flex md:w-96 flex-col gap-6">
                          <Textarea
                            name="healthinfo"
                            type="string"
                            value={values.healthinfo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            color="blue"
                          />
                          {errors.healthinfo && touched.healthinfo && (
                            <p className="text-red-600">{errors.healthinfo}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {!enrolledClient ? (
                  <div className="mt-6 flex items-center justify-around gap-x-6">
                    <div className="badge-warning md:p-5 rounded break-words">
                      This will direct you to the payment option &nbsp;&nbsp;➡️
                    </div>
                    <button
                      type="submit"
                      className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Confirm
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
              </form>
            </div>
          ) : (
            <div className="w-full h-full">
              <div className="flex justify-center items-center w-full h-full">
                <form className="signupform p-24 pb-10">
                  <div className="">
                    <div className="border-b border-gray-900/10 pb-12">
                      <h1 className="text-base flex justify-center font-semibold leading-7 text-gray-900 md:text-3xl">
                        Pay now
                      </h1>
                      <div className="mt-10 flex justify-center w-full h-full">
                        <Paypal
                          payment={feeToPay}
                          paypalpayment={paypalpayment}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
     
    </div>
  );
}

export default EnrollCourse;
