import React, { useState } from 'react'
import TrainerRegister from '../../../components/trainer/signup/TrainerRegister'
import NavBar from '../../../components/navbar/Header'
import Loading from '../../../components/loadingSpinner/Loading'
import './Register.css'

function Register() {

  const [loader , setLoader] = useState(false)

  return (
    <div className={loader? 'signuppageouter fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' : 'signuppageouter'}>
      { loader && <div className='spinnerouter  flex justify-center items-center'><Loading /></div>}
    <NavBar />
      <TrainerRegister setLoader={setLoader}/>
    </div>
  )
}

export default Register
