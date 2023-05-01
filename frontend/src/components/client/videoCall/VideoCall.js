import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import VideoPlayer from "./VideoPlayer";
import Notifications from "./Notifications";
import Options from "./Options";
import { getUser } from "../../../axios/services/chat/trainerChat";

import "./VideoCall.css";

function VideoCall() {
  // const location = useLocation()
  // const clientId = location?.state?.clientId

  const UserDetails = useSelector((state) => state.userReducer.user);
  const client = UserDetails?.user;

  const [clientTocall, setClientTocall] = useState({});

  // useEffect(()=>{
  //   getUser(clientId).then((res)=>{
  //     setClientTocall(res)
  //   })
  // }, [])

  return (
    <div className="flex justify-center pt-20 md:pt-10 p-5 mx-auto">
      <div className="mx-auto flex justify-center flex-wrap">
        <h2 className="text-black font-extrabold text-5xl text-center md:mt-10 md:mb-10">
          Video Chat
        </h2>
        <VideoPlayer user={client}/>
        <Options>
          <Notifications />
        </Options>
      </div>
    </div>
  );
}

export default VideoCall;
