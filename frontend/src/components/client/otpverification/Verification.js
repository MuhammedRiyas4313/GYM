import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { otpSchema } from "../../../validations/clientOtpValidation";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import Loading from "../../loadingSpinner/Loading";
import { ClientOtpConfirmation } from "../../../axios/services/clientServices/clientServices";
import { ClientResendOtp } from "../../../axios/services/clientServices/clientServices";
import "./Verification.css";


function Verification() {

  const [loader , setLoader] = useState(false)
  const navigate = useNavigate()

  const { id } = useParams()
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

  async function onSubmit() {

    const response = await ClientOtpConfirmation(values,id)
    
    if(response?.data?.status === "User email verified successfully"){
      toast.success(response?.data?.status)
      navigate('/login')
    }else{
      toast.error(response?.data?.status)
    }

  }

  async function resendOTP(){
    console.log('resend otp')
    setLoader(true)
    const response = await ClientResendOtp(values,id)
    if(response?.data?.status === 'User is not verified'){
      setLoader(false)
      toast.success(response?.data?.message)
    }else{
      setLoader(false)
      toast.error(response?.data?.status)
    }

  }

  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();

  const handleKeyUp = (e) => {

    switch (e.target.name) {
      case "otp1":
        input2Ref.current.focus();
        if (!e.target.value) {
          input1Ref.current.focus();
        } else {
          input2Ref.current.focus();
        }
        break;
      case "otp2":
        if (!e.target.value) {
          input1Ref.current.focus();
        } else {
          input3Ref.current.focus();
        }
        break;
      case "otp3":
        if (!e.target.value) {
          input2Ref.current.focus();
        } else {
          input4Ref.current.focus();
        }
        break;
      case "otp4":
        if (!e.target.value) {
          input3Ref.current.focus();
        } else {
          input4Ref.current.focus();
        }
        break;
      default:
        break;
    }
  };

  return (
  <div> 
       {loader ?<div className='spinnerouter bg-black flex justify-center align-middle'><Loading /></div>:<div className="login-form">
    <div className="verificationouter relative flex flex-col justify-center min-h-screen overflow-hidden ">
      <div className="form-data w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-md">
        <div className="flex justify-around text-orange-700 text-3xl">
          Verify Email
        </div>
        <div className="flex justify-around text-orange-700 mt-5 mb-6">
          <p>Please check your registered mail for OTP !</p>
        </div>
        <hr className="bg-orange"/>
        <form className="mt-2 p-5" onSubmit={handleSubmit}>
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
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-800 focus:outline-none focus:bg-orange-700"
            >
              Submit
            </button>
          </div>
          <div className="flex justify-center mt-3">
              <p className="font-medium text-orange-500 hover:underline" onClick={resendOTP}>
                Didn't get OTP !
              </p>
          </div>
        </form>
      </div>
    </div>
  </div>}
  </div>
  );
}

export default Verification;
