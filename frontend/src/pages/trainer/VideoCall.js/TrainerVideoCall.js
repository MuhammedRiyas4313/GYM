import React from "react";

import NavBar from "../../../components/navbar/Header";
import VideoCall from "../../../components/trainer/videocall/VideoCall";
import { ContextProvider } from "../../../context/SocketContext";

function TrainerVideoCall() {
  return (
    <ContextProvider>
      <NavBar />
      <VideoCall />
    </ContextProvider>
  );
}

export default TrainerVideoCall;
