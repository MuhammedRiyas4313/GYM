import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { TrainerLoginWithGoogle } from '../../axios/services/trainerServices/trainerService';
import { ClientLoginWithGoogle } from '../../axios/services/clientServices/clientServices';
import { userLogin } from '../../redux/userSlice';
import { trainerLogin } from '../../redux/trainerSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import * as dotenv from 'dotenv'
// dotenv.config()

const CLIENT_ID = "397923314388-o5r9e2q99aj8mnmfgflm4b4c8lgnru65.apps.googleusercontent.com";
const CLIENT_PASSWORD = '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';


function GoogleButton(props) {


  const dispatch = useDispatch()
  const navigate = useNavigate()

    const onSuccess = (res) => {
        console.log(res?.profileObj?.email,'res from the profileObj google button login in success')
        if(props.loginPerson === 'trainer'){
          const response = TrainerLoginWithGoogle(res?.profileObj?.email)
          if(response?.status === 'Login success'){
            dispatch(userLogin({token:response.data.token , trainer: response.trainer}))
            toast.success(response.status)
            navigate('/');
          }else{
              toast.error(response?.status)
          }
        }else if(props.loginPerson === 'user'){
          const response = ClientLoginWithGoogle (res?.profileObj?.email)
          if(response?.status === 'Login success'){
            dispatch(trainerLogin({token:response.data.token , trainer: response.trainer}))
            toast.success(response.status)
            navigate('/');
          }else{
              toast.error(response?.status)
          }
        }
        
    }
    const onFailure = (res) => {
        console.log(res,'res from the google button onFailure')
    }

  return (
    <div id='signInButton'>
        <GoogleLogin
          className='flex items-center justify-center p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-current hover:bg-orange-200'
          clientId={CLIENT_ID} 
          buttonText='Login with google'
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy='single_host_origin'
          isSignedIn = {true}
        />
    </div>
  )
}

export default GoogleButton
