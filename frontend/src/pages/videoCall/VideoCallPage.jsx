import React from 'react'
import NavBar from '../../components/navbar/Header'
import VideoCallComponent from '../../components/videoCall/VideoCallComponent'
import { ContextProvider } from '../../context/SocketContext'

function VideoCallPage() {
  return (
    <ContextProvider>
      <NavBar />
       <VideoCallComponent />
    </ContextProvider>
  )
}

export default VideoCallPage
