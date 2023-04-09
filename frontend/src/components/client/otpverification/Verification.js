import React, { useRef } from "react";
import { useFormik } from "formik";
import { otpSchema } from "../../../validations/clientOtpValidation";
// import { useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
import "./Verification.css";

function Verification() {


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
      },
      validationSchema: otpSchema,
      onSubmit,
    });

  function onSubmit() {
    console.log(values, "otp submit");
    
  }

  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();

  const handleKeyUp = (e) => {
    console.log("first");

    console.log("first");
    console.log(e.target.value);

    switch (e.target.name) {
      case "otp1":
        input2Ref.current.focus();
        if (!e.target.value) {
            console.log("ent");
            input1Ref.current.focus();
          } else {
            input2Ref.current.focus();
          }
        break;
      case "otp2":
        if (!e.target.value) {
          console.log("ent");
          input1Ref.current.focus();
        } else {
          input3Ref.current.focus();
        }
        break;
      case "otp3":
        if (!e.target.value) {
            console.log("ent");
            input2Ref.current.focus();
          } else {
            input4Ref.current.focus();
          }
        break;
      case "otp4":
        if (!e.target.value) {
            console.log("ent");
            input3Ref.current.focus();
          } else {
            input3Ref.current.focus();
          }
        break;
      default:
        break;
    }
  };

  return (
    <div className="login-form">
      <div className="verificationouter relative flex flex-col justify-center min-h-screen overflow-hidden ">
        <div className="form-data w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-md">
          <div className="flex justify-around text-orange-700 text-3xl">
            Verify Email
          </div>
          <div className="flex justify-around text-orange-700 mt-5">
            <p>Please check your registered mail for OTP !</p>
          </div>
          <form className="mt-6" onSubmit={handleSubmit}>
          <label
                for="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Enter OTP
              </label>
            <div className="flex justify-between mb-2">
              
              <input
                className="w-full m-2 h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-500 text-md bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="number"
                name="otp1"
                maxLength={1}
                ref={input1Ref}
                value={values.otp1}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                id=""
              />
              <input
                className="w-full m-2 h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-500 text-md bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="number"
                name="otp2"
                maxLength={1}
                ref={input2Ref}
                value={values.otp2}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                id=""
              />
              <input
                className="w-full m-2 h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-500 text-md bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="number"
                name="otp3"
                maxLength={1}
                ref={input3Ref}
                value={values.otp3}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                id=""
              />
              <input
                className="w-full m-2 h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-500 text-md bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="number"
                name="otp4"
                maxLength={1}
                ref={input4Ref}
                value={values.otp4}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                id=""
              />
              
            </div>
            {errors.otp1 || errors.otp2 || errors.otp3 ||errors.otp4 && touched.otp1 || touched.otp2 || touched.otp3 ||touched.otp4 && (
                <p className="text-red-600">{errors.otp1||errors.otp2||errors.otp3||errors.otp4}</p>
              )}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-800 focus:outline-none focus:bg-orange-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Verification;
