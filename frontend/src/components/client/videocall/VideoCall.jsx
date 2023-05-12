import React, { useState, useRef, useEffect } from "react";
import { Typography, AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import Peer from "simple-peer";

import Player from "./Player";
import Notifications from "./Notifications";
import Options from "./Options";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "90px 0px 0px 0px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",
    border: "1px solid black",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  image: {
    marginLeft: "15px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const socket = io("http://localhost:3001");

function VideoCall() {

  const location = useLocation();

  const clientToCall = location?.state?.clientId;
  const conversation = location?.state?.conversationId;

  const classes = useStyles();

  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });
      console.log(conversation,'conversation from the useeffect')
    socket.emit("me", conversation);
    setMe(conversation)
    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  useEffect(()=>{
    socket.on('videocall', conversation => {
      console.log('videocall on....',conversation)
    })
  })

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
      console.log("call user emited");
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <div className={classes.wrapper}>
      <AppBar
        className={classes.appBar}
        position="static"
        style={{ zIndex: "-1" }}
        color="inherit"
      >
        <Typography variant="h2" align="center">
          Video Chat
        </Typography>
      </AppBar>
      <Player 
        name={name}
        call={call}
        myVideo={myVideo}
        callAccepted={callAccepted}
        userVideo={userVideo}
        stream={stream}
        callEnded={callEnded}
      />
      <Options
        callAccepted={callAccepted}
        name={name}
        setName={setName}
        callEnded={callEnded}
        me={me}
        callUser={callUser}
        leaveCall={leaveCall}
      >
        <Notifications
          call={call}
          callAccepted={callAccepted}
          answerCall={answerCall}
        />
      </Options>
    </div>
  );
}

export default VideoCall;
