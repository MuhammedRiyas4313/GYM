import React, { useState } from 'react';
import './Login.css'
import { AdminLogin } from '../../../axios/services/adminServices/adminServices';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { adminSchema } from '../../../validations/adminLoginValidation';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../../../redux/adminSlice';
import { toast } from 'react-toastify';

function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function onSubmit (){
    
        console.log(values,'adminlogin called')
        const response = await AdminLogin(values)
        console.log(response,'response ......')
        console.log(response.data.token,'token......')
        console.log(response.data.status,'status ......')
        console.log(response.data.admin,'admin ......')

        if(response.data.status === 'Login success'){
            console.log(response.data.status,'status in if condition......')
            dispatch(adminLogin({token:response.data.token , admin: response.data.admin}))
            toast.success(response.data.status)
            navigate('/admin/dashboard');
        }else{
            toast.error(response.data.status)
        }

    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: adminSchema,
      onSubmit,
    });

  return (
      <div className="login-form">
            <div className="lottie-container relative flex flex-col justify-center min-h-screen overflow-hidden outer">
            <div className="form-data w-full p-10 pb-20 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
               <div className='flex justify-around'>
                    <div className= 'bg-white p-5'>
                      <h1 className="text-lg md:pr-8  md:pl-8 md:text-2xl font-bold text-center text-orange-500 uppercase">Welcome Admin</h1>
                    </div>
               </div>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label
                            for="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type='email'
                            name='email'
                            onChange={handleChange}
                            value={values.email}
                            onBlur={handleBlur}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                         { errors.email && touched.email && <p className="text-red-600">{errors.email}</p>}
                    </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name='password'
                            onChange={handleChange}
                            value={values.password}
                            onBlur={handleBlur}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                         { errors.password && touched.password && <p className="text-red-600">{errors.password}</p>}
                    </div>
                    <a
                        
                        className="text-xs text-purple-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-800 focus:outline-none focus:bg-red-800">
                            Login
                        </button>
                    </div>
                </form>
            </div>
          </div>
        </div>
  )
}
export default Login
