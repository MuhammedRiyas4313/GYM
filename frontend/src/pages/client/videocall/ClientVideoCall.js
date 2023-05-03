import React from "react";
import NavBar from "../../../components/navbar/Header";
import VideoCall from "../../../components/client/videocall/VideoCall";
import { ContextProvider } from "../../../context/SocketContext";

function ClientVideoCall() {
  return (
    <ContextProvider>
      <NavBar />
      <VideoCall />
    </ContextProvider>
  );
}

export default ClientVideoCall;
