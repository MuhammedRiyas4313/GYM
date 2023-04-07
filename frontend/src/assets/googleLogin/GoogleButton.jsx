import React from 'react'
import { GoogleLogin } from 'react-google-login'

const CLIENT_ID = "397923314388-o5r9e2q99aj8mnmfgflm4b4c8lgnru65.apps.googleusercontent.com";
const CLIENT_PASSWORD = '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';


function GoogleButton() {

    const onSuccess = (res) => {
        console.log(res,'res from the google button login in success')
        
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
