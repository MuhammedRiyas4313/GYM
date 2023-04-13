import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { TrainerLoginWithGoogle } from "../../axios/services/trainerServices/trainerService";
import { ClientLoginWithGoogle } from "../../axios/services/clientServices/clientServices";
import { userLogin } from "../../redux/userSlice";
import { trainerLogin } from "../../redux/trainerSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// const CLIENT_ID = "230039992190-7tpf0eapq82majvk7r7uj7c72fqnqtau.apps.googleusercontent.com";
// const CLIENT_PASSWORD = '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';

function GoogleButtonUser(props) {

  console.log(props.loginPerson,'login person')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleCallbackResponse(response) {
    props.setLoader(true);
    console.log(response.credential, "credential");
    const user = jwt_decode(response.credential);
    console.log(user, "user from the google sign in");
  
      const loginResponse = await ClientLoginWithGoogle(user.email);
      console.log(
        loginResponse,
        " from the clientLoginWithGoogle ... in client login "
      );
      if (loginResponse?.data.status === "Login success") {
        props.setLoader(false);
        dispatch(
          userLogin({ token: loginResponse.data.token, user: loginResponse.data.user })
        );
        toast.success(loginResponse.data.status);
        navigate("/");
      } else if (loginResponse?.data.status === "User is not verified") {
        props.setLoader(false);
        toast.error(loginResponse.data.message);
        navigate(`/verification/${loginResponse.data.data.userId}`);
      } else {
        props.setLoader(false);
        toast.error(loginResponse.data.status);
      }
    
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "230039992190-7tpf0eapq82majvk7r7uj7c72fqnqtau.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInButton"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return <div id="signInButton"></div>;
}

export default GoogleButtonUser;

{
  /* <div id='signInButton'>
        <GoogleLogin
          className='flex items-center justify-center p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-current hover:bg-orange-200'
          clientId={CLIENT_ID} 
          buttonText='Login with google'
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy='single_host_origin'
          isSignedIn = {true}
        />
    </div> */
}

// useEffect(()=>{
//   function start(){
//       gapi.client.init({
//           clientId:CLIENT_ID,
//           scope:""
//       })
//   }
//   gapi.load('client:auth2',start)
// })

// const dispatch = useDispatch()
// const navigate = useNavigate()

//   const onSuccess = async (res) => {
//       console.log(res.profileObj.email,'res from the profileObj google button login in success')
//       if(props.loginPerson === 'trainer'){
//         const response = await TrainerLoginWithGoogle(res.profileObj.email)
//         console.log(response,'response from the TrainerLoginWithGoogle')
//         if(response.status === 'Login success'){
//           dispatch(userLogin({token:response.token , trainer: response.trainer}))
//           toast.success(response.status)
//           navigate('/');
//         }else{
//             toast.error(response.status)
//         }
//       }else if(props.loginPerson === 'user'){
//         const response = await ClientLoginWithGoogle (res.profileObj.email)
//         console.log(response,' from the clientLoginWithGoogle ... in client login ')
//         if(response.data.status === "Login success"){
//           dispatch(trainerLogin({token:response.data.token , user: response.data.user}))
//           toast.success(response.data.status)
//           navigate('/');
//         }else{
//             toast.error(response.data.status)
//         }
//       }

//   }
//   const onFailure = (res) => {
//       console.log(res,'res from the google button onFailure')
//   }
