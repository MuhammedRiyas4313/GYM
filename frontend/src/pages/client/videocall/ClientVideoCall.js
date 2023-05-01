import React from 'react'
import { ContextProvider } from "../../../context/SocketContext";
import NavBar from '../../../components/navbar/Header'
import VideoCall from '../../../components/client/videoCall/VideoCall'

function ClientVideoCall() {
  return (
    <div>
       <ContextProvider>
        <NavBar />
        <VideoCall />
      </ContextProvider>
    </div>
  )
}

export default ClientVideoCall
