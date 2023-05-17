import React, { useState } from "react";
import { useFormik } from "formik";
import { Label, Radio } from "flowbite-react";
import { userSchema } from "../../../validations/clientSignupValidation";
import { clientRegister } from "../../../axios/services/clientServices/clientServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../loadingSpinner/Loading";
import "./ClientRegister.css";

function ClientRegister() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setLoading(true)
    const response = await clientRegister(values);
    if (response?.status === "New account Created successfully") {
      toast.success(response?.status);
      navigate("/login");
      setLoading(false)
    } else {
      toast.error(response?.status);
      setLoading(false)
    }
  }
  
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        fname: "",
        dob: "",
        gender: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
      },
      validationSchema: userSchema,
      onSubmit,
    });

  return (
    <div className="signupouter md:pl-64 md:pr-64 p-5 ">
      {loading ? (
        <div className="spinnerouter flex justify-center align-middle">
          <Loading />
        </div>
      ) : (<></>)}
      <form className="signupform md:p-14 p-5 mt-20" onSubmit={handleSubmit}>
        <div className="space-y-12 ">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-base font-semibold leading-7 text-gray-900 md:text-3xl">
              User Registration
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
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="fname"
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
              <fieldset
                className="flex flex-row gap-4"
                id="radio"
                name="gender"
                value={values.gender}
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
  );
}

export default ClientRegister;
