
import React, { useEffect, useState } from 'react';
import './Signin.css'
import { ClientLogin } from '../../axios/services/clientServices/clientServices';
import { TrainerLogin } from '../../axios/services/trainerServices/trainerService';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { userSchema } from '../../validations/clientLoginValidation';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/userSlice';
import { trainerLogin } from '../../redux/trainerSlice';
import { toast } from 'react-toastify';
import { gapi } from 'gapi-script'
import GoogleButton from '../../assets/googleLogin/GoogleButton';

const CLIENT_ID = "397923314388-o5r9e2q99aj8mnmfgflm4b4c8lgnru65.apps.googleusercontent.com";

function Signin() {

    useEffect(()=>{
        function start(){
            gapi.client.init({
                clientId:CLIENT_ID,
                scope:""
            })
        }
        gapi.load('client:auth2',start)
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginPerson , setLoginPerson ] = useState('user')

    async function onSubmit (){
    
        console.log('clientlogin called')
       
        if(loginPerson === 'user'){
            console.log('user login called')
            const response = await ClientLogin(values)
            console.log(response,'response in user login ......')
            console.log(response.data.token,'user token in login ......')
            console.log(response.data.user,'user in login ......')
            if(response.data.status === 'Login success'){
                dispatch(userLogin({token:response.data.token , user: response.data.user}))
                toast.success(response.data.status)
                navigate('/');
            }else{
                toast.error(response.data.status)
            }
        }else if(loginPerson === 'trainer'){
            console.log('trainer login called')
            const response = await TrainerLogin(values)
            console.log(response.status,'status  response in trainer login ......')
            console.log(response.token,'trainer token in login ......')
            console.log(response.trainer,'trainer in login ......')
            if(response?.status === 'Login success'){
                console.log('trainer login success')
                dispatch(trainerLogin({token:response.token , trainer: response.trainer}))
                toast.success(response.status)
                navigate('/');
            }else{
                toast.error(response.status)
            }
        }

    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: userSchema,
      onSubmit,
    });

    return (
        <div className="login-form">
            <div className="lottie-container relative flex flex-col justify-center min-h-screen overflow-hidden outer">
            <div className="form-data w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
               <div className='flex justify-around'>
                    <div className={loginPerson=='user'? 'rounded bg-orange-500 p-5':'bg-white p-5'} onClick={()=> setLoginPerson('user')}>
                      <h1 className={loginPerson=='user'? "text-lg md:text-2xl font-bold text-center text-white uppercase md:pl-8 md:pr-8":"text-lg md:pr-8  md:pl-8 md:text-2xl font-bold text-center text-orange-500 uppercase"}>Login User</h1>
                    </div>
                    <div className={loginPerson=='trainer'? 'rounded bg-orange-500 p-5':'bg-white p-5'} onClick={()=> setLoginPerson('trainer')}>
                      <h1 className={loginPerson=='trainer'? "text-lg md:text-2xl font-bold text-center text-white uppercase  md:pl-5  md:pr-5":"text-lg md:text-2xl md:pr-5  md:pl-5 font-bold text-center text-orange-500 uppercase"} >Login Trainer</h1>
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
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-800 focus:outline-none focus:bg-orange-700">
                            Login
                        </button>
                    </div>
                </form>
                <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                    <div className="absolute px-5 bg-white">Or</div>
                </div>
                <div className="flex mt-4 gap-x-2 items-center justify-center">
                    <GoogleButton  loginPerson={loginPerson} />
                </div>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    { loginPerson=='user'? <Link to="/clientregister"> 
                        <p className="font-medium text-orange-500 hover:underline">
                          Register User
                        </p>
                    </Link> :<Link to="/trainerregister"> 
                        <p className="font-medium text-orange-500 hover:underline">
                          Register Trainer
                        </p>
                    </Link>}
                    
                </p>
            </div>
          </div>
        </div>
    );
}


export default Signin