import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { TrainerLoginWithGoogle } from "../../axios/services/trainerServices/trainerService";
import { trainerLogin } from "../../redux/trainerSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// const CLIENT_ID = "230039992190-7tpf0eapq82majvk7r7uj7c72fqnqtau.apps.googleusercontent.com";
// const CLIENT_PASSWORD = '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';

function GoogleButtonTrainer(props) {

  console.log(props.loginPerson,'login person')

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  async function handleCallbackResponse(res) {
    props.setLoader(true);
    console.log(res.credential, "credential");
    const user = jwt_decode(res.credential);
    console.log(user, "user from the google sign in");
   
      const response = await TrainerLoginWithGoogle(user.email);
      console.log(response, "response from the TrainerLoginWithGoogle");
      if (response.status === "Login success") {
        props.setLoader(true);
        dispatch(trainerLogin({ token: response.token, trainer: response.trainer }));
        toast.success(response.status);
        navigate("/");
      } else if (response?.status === "Trainer not verified") {
          props.setLoader(false);
          props.setTrainerVerifyStatus(true);
        console.log("trainer not verified");
      } else {
        props.setLoader(false);
        toast.error(response.status);
      }
    
  }

 

  return <div id="signInButton"></div>;
}

export default GoogleButtonTrainer;