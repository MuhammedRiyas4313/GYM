import React, { useState, useEffect, useRef } from "react";
import { Typography , AppBar } from '@material-ui/core'

import VideoPlayer from "./VideoPlayer";
import Notifications from "./Notifications";
import Options from "./Options";

import "./VideoCall.css";

function VideoCall() {
  return (
    <div>
      <AppBar className="pt-20" position="static" color="inherit">
        <Typography variant="h2" align="center">
          Video Chat
        </Typography>
        <VideoPlayer />
        <Options>
          <Notifications />
        </Options>
      </AppBar>
    </div>
  );
}

export default VideoCall;
