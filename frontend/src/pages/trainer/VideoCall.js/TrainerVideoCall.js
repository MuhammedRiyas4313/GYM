import React from "react";
import { ContextProvider } from "../../../context/SocketContext";
import NavBar from "../../../components/navbar/Header";
import VideoCall from "../../../components/trainer/videoCall/VideoCall";

function TrainerVideoCall() {
  return (
    <div>
      <ContextProvider>
        <NavBar />
        <VideoCall />
      </ContextProvider>
    </div>
  );
}

export default TrainerVideoCall;
