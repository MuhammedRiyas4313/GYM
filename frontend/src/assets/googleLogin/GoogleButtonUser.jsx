import React from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../redux/userSlice";

import { ClientLoginWithGoogle } from "../../axios/services/clientServices/clientServices";

function GoogleButtonUser(props) {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const responseMessage = async (response) => {
    props.setLoader(true);
      const user = jwt_decode(response.credential);
        const loginResponse = await ClientLoginWithGoogle(user.email);
        console.log(loginResponse?.data.status,'login response from google  1')

        if (loginResponse?.data.status === "Login success") {
          console.log(loginResponse?.data.status,'login response from google  2')
          props.setLoader(true);
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
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <>
      <GoogleOAuthProvider clientId="230039992190-7tpf0eapq82majvk7r7uj7c72fqnqtau.apps.googleusercontent.com" >
        <button className="flex items-center  justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black relative">
          <span className="absolute left-4"></span>
          <span className="flex items-center text-black">
            <GoogleLogin
              className="text-black"
              onSuccess={responseMessage}
              onError={errorMessage}
            />
          </span>
        </button>
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleButtonUser;
