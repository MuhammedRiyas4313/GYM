import React, { useState } from "react";
import { useFormik } from "formik";
import { courseSchema } from "../../../validations/addCourseValidation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Textarea } from "@material-tailwind/react";
import Loading from "../../loadingSpinner/Loading";
import { addCourse } from "../../../axios/services/trainerServices/trainerService";

function AddCourse() {

  const [successModal, setSuccessModal] = useState(false);

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [filef, setFilef] = useState([]);
  const [fileb, setFileb] = useState([]);
  const [filev, setFilev] = useState([]);

  const trainerId = useSelector((state) => state.trainerReducer.trainer);
  console.log(trainerId,'trainer id from the useselector')

  const onSubmit = async (values) => {
    setLoader(true);
    console.log("onsubmit working....");
    const response = await addCourse({
      values,
      file1: filef,
      file2: fileb,
      filev: filev,
      trainerId: trainerId.trainer._id
    });
    console.log(response,'this is response');
    setLoader(false)
    // if (response.status === "Successfully created Account") {
    //   setLoader(false);
    //   toast.success(response.status);
    // navigate("/trainersignupsuccess");
    // } else if (response.status) {
    //   setLoader(false);
    //   toast.error(response.status);
    // }
    // console.log(response);
  };

  const handleImage1 = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFilef(reader.result);
    };
  };

  const handleImage2 = (e) => {
    const file = e.target.files[0];
    setFileToBase2(file);
  };

  const handleVideo = (e) => {
    const file = e.target.files[0];
    setFileToBaseV(file);
  };

  const setFileToBase2 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFileb(reader.result);
    };
  };

  const setFileToBaseV = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFilev(reader.result);
    };
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        coursename: "",
        charge: "",
        description: "",
        timing: "",
      },
      validationSchema: courseSchema,
      onSubmit,
    });

  return (
    <div>
      {loader ? (
        <div className="w-full spinnerouter flex justify-center align-middle">
          <Loading />
        </div>
      ) : (
        <div className="signupouter md:pl-64 md:pr-64 p-5 ">
          <form
            className="signupform md:p-20 p-5 mt-20"
            onSubmit={handleSubmit}
          >
            <div className="space-y-12 ">
              <div className="border-b border-gray-900/10 pb-12">
                <h1 className="text-base font-semibold leading-7 text-gray-900 md:text-3xl">
                  New Course
                </h1>
                {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p> */}

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Course name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="coursename"
                        id="course"
                        value={values.coursename}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {/* {errors.fname && touched.fname && (
                        <p className="text-red-600">{errors.fname}</p>
                      )} */}
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Course fee / month
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="charge"
                        id="first-name"
                        value={values.charge}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {/* {errors.fname && touched.fname && (
                        <p className="text-red-600">{errors.fname}</p>
                      )} */}
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Cover Photo - 1
                    </label>
                    <div className="mt-2">
                      <input
                        type="file"
                        id="filef"
                        onChange={handleImage1}
                        onBlur={handleBlur}
                        required
                        accept="image/*"
                        autoComplete="off"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {/* {errors.profile && touched.profile && (
                        <p className="text-red-600">{errors.profile}</p>
                      )} */}
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Cover Photo - 2
                    </label>
                    <div className="mt-2">
                      <input
                        type="file"
                        id="fileb"
                        required
                        accept="image/*"
                        onChange={handleImage2}
                        onBlur={handleBlur}
                        autoComplete="off"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Upload Video ( Introduction of the course. )
                    </label>
                    <div className="mt-2">
                      <input
                        name="video"
                        onChange={handleVideo}
                        onBlur={handleBlur}
                        type="file"
                        accept="video/*"
                        autoComplete="off"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {/* {errors.link && touched.link && (
                        <p className="text-red-600">{errors.link}</p>
                      )} */}
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900 mt-2 mb-2"
                    >
                      Timing
                    </label>
                    <select
                      name="timing"
                      value={values.timing}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="select w-full max-w-xs"
                    >
                      <option disabled selected>
                        Choose Time Slotes
                      </option>
                      <option value="05:00am-06:00am">05:00am-06:00am</option>
                      <option value="06:30am-07:30am">06:30am-07:30am</option>
                      <option value="08:00am-09:00am">08:00am-09:00am</option>
                      <option value="05:00pm-06:00pm">05:00pm-06:00pm</option>
                      <option value="06:30pm-07:30pm">06:30pm-07:30pm</option>
                      <option value="08:00pm-09:00pm">08:00pm-09:00pm</option>
                    </select>
                  </div>
                  <div className="sm:col-span-3 md:mt-6">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="flex w-96 flex-col gap-6">
                      <Textarea
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        color="blue"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddCourse;
