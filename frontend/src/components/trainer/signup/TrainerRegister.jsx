import React, { useState } from "react";
import { useFormik } from "formik";
import { Label, Radio } from "flowbite-react";
import { trainerSchema } from "../../../validations/trainerSignupValidation";
import { trainerRegister } from "../../../axios/services/trainerServices/trainerService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../loadingSpinner/Loading";
import SuccessModal from "./SuccessModal";
import "./TrainerRegister.css";

function TrainerRegister() {

  const [successModal , setSuccessModal] = useState(false)

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [filef, setFilef] = useState([]);
  const [fileb, setFileb] = useState([]);

  const onSubmit = async (values) => {
    setLoader(true);
    const response = await trainerRegister({
      values,
      file1: filef,
      file2: fileb,
    });
    console.log(response);
    if (response.status === "Successfully created Account") {
      setLoader(false);
      toast.success(response.status);
      navigate("/trainersignupsuccess");
    } else if (response.status) {
      setLoader(false);
      toast.error(response.status);
    }
    console.log(response);
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

  const setFileToBase2 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFileb(reader.result);
    };
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        fname: "",
        lname: "",
        dob: "",
        gender: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
        link: "",
        profile: null,
        certificate: null,
      },
      validationSchema: trainerSchema,
      onSubmit,
    });

  return (
    <div>
      { loader ? (
        <div className='spinnerouter bg-black flex justify-center align-middle'><Loading /></div>
      ) : (
        
        <div className="signupouter md:pl-64 md:pr-64 p-5 ">
          <form
            className="signupform md:p-20 p-5 mt-20"
            onSubmit={handleSubmit}
          >
            <div className="space-y-12 ">
              <div className="border-b border-gray-900/10 pb-12">
                <h1 className="text-base font-semibold leading-7 text-gray-900 md:text-3xl">
                  Trainer Registration
                </h1>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="fname"
                        id="first-name"
                        value={values.fname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.fname && touched.fname && (
                        <p className="text-red-600">{errors.fname}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="lname"
                        id="last-name"
                        value={values.lname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.lname && touched.lname && (
                        <p className="text-red-600">{errors.lname}</p>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="last-name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.phone && touched.phone && (
                        <p className="text-red-600">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  <fieldset
                    className="flex flex-row gap-4"
                    id="radio"
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <legend>Gender</legend>
                    <div className="flex items-center gap-2">
                      <Radio id="united-state" name="gender" value="male" />
                      <Label htmlFor="united-state">Male</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Radio id="germany" name="gender" value="female" />
                      <Label htmlFor="germany">Female</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Radio id="spain" name="gender" value="other" />
                      <Label htmlFor="spain">Others</Label>
                    </div>
                    {errors.gender && (
                      <p className="text-red-600">{errors.gender}</p>
                    )}
                  </fieldset>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Date Of Birth
                    </label>
                    <div className="mt-2">
                      <input
                        type="date"
                        name="dob"
                        id="last-name"
                        value={values.dob}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.dob && touched.dob && (
                        <p className="text-red-600">{errors.dob}</p>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.password && touched.password && (
                        <p className="text-red-600">{errors.password}</p>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.email && touched.email && (
                        <p className="text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="cpassword"
                        value={values.cpassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.cpassword && touched.cpassword && (
                        <p className="text-red-600">{errors.cpassword}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ProfilePhoto
                    </label>
                    <div className="mt-2">
                      <input
                        type="file"
                        id="filef"
                        onChange={handleImage1}
                        required
                        accept="image/*"
                        autoComplete="off"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.profile && touched.profile && (
                        <p className="text-red-600">{errors.profile}</p>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Certificate
                    </label>
                    <div className="mt-2">
                      <input
                        type="file"
                        id="fileb"
                        required
                        accept=".pdf"
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
                      Upload Video Link <br></br>(Paste a link to your youtube
                      video introducing yourself and training a client.)
                    </label>
                    <div className="mt-2">
                      <input
                        id="link"
                        name="link"
                        value={values.link}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        autoComplete="off"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.link && touched.link && (
                        <p className="text-red-600">{errors.link}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
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

export default TrainerRegister;
