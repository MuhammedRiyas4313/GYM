import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { enrollSchema } from "../../../validations/enrollCourseValidation";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Textarea } from "flowbite-react";
import Loading from "../../loadingSpinner/Loading";
import "./EnrollCourse.css";
import {
  enrollClient,
  getCourseDetails,
} from "../../../axios/services/clientServices/clientServices";
import { Payment } from "@material-ui/icons";
import Paypal from "./Paypal";

function EnrollCourse() {

  const [enrollData, setEnrollData] = useState({})
  const [successModal, setSuccessModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [payment, setPayment] = useState(false);

  const navigate = useNavigate();
  const Location = useLocation();
  const [slotes, setSlote] = useState([]);
  const [course, setCourse] = useState({});

  const client = useSelector((state) => state.userReducer.user);

  const clientId = client?.user?._id;
  const courseId = Location.state?.courseId;

  function formateDate() {
    const formatDate = new Date();
    const formated = `${formatDate.getDate()}-${
      formatDate.getMonth() + 1
    }-${formatDate.getFullYear()}`;

    return formated;
  }

  useEffect(() => {
    getCourseDetails(courseId).then((res) => {
      console.log(res.data, "getCourseDetails from the enroll compo");
      setCourse(res.data);
      const allSlotes = res.data.availableSlots;
      const slotes = allSlotes.filter((val) => val.status === "free");
      console.log(slotes, "free slotes.......");
      setSlote(slotes);
    });
  }, []);

  const onSubmit = async (values) => {
    setPayment(true);
    console.log("onsubmit working.... enroll fn");
    console.log(values, "values from the form");
    const data = {
      ...values,
      clientId,
      courseId,
    };
    setEnrollData(data)
  };

 async function paypalpayment (paymentDetails){

    console.log('payment is calling..')
    console.log(enrollData,'before payment ')
    const data = {...enrollData,paymentDetails}
    console.log(data,'before payment ')

    const response = await enrollClient(data)

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
      {loader ? (
        <div className="w-full spinnerouter flex justify-center align-middle">
          <Loading />
        </div>
      ) : (
       <div className="w-full h-full flex justify-center items-center">
         {!payment ? (
            <div className="md:w-1/2 ">
            <form
              className="signupform p-20 pb-10 mt-20"
              onSubmit={handleSubmit}
            >
              <div className="space-y-12 ">
                <div className="border-b border-gray-900/10 pb-12">
                  <h1 className="text-base font-semibold leading-7 text-gray-900 md:text-3xl">
                    Register now
                  </h1>
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
                          {course.charge}&nbsp;₹
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
                          return <option value={val.slote}>{val.slote}</option>;
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
                      <Paypal payment={course.charge}  paypalpayment={paypalpayment}/>
                    </div>
                  </div>
                </div>
              </form>
            </div>
        </div>
          )}
       </div>
      )}
    </div>
  );
}

export default EnrollCourse;