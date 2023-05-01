import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client'
import Peer from 'simple-peer'


import VideoPlayer from "./VideoPlayer";
import Notifications from "./Notifications";
import Options from "./Options";
import { getUser } from "../../../axios/services/chat/trainerChat";

import "./VideoCall.css";

const socket = io('http://localhost:3001');

function VideoCall() {
  const location = useLocation();
  const clientId = location?.state?.clientId;

  const TrainerDetails = useSelector((state) => state.trainerReducer.trainer);
  const trainer = TrainerDetails?.trainer;

  const [clientTocall, setClientTocall] = useState({});

  useEffect(() => {
    getUser(clientId).then((res) => {
      setClientTocall(res);
    });
    setName(trainer.fname)
  }, []);

  const [stream, setStream] = useState(null);
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [callTo, setCallTo] = useState("");
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
    socket.on("me", (id) => {
      console.log('me on...... in trainer ')
      setMe(id);
    });
    socket.on("callUser", ({ from, name: callerName, signal }) => {
      console.log('callUser on ....in trainer .....')
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
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
      console.log('peer on signal trainer')
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
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
    <div className="flex justify-center pt-20 md:pt-10 p-5 mx-auto">
      <div className="mx-auto flex justify-center flex-wrap">
        <h2 className="text-black font-extrabold text-5xl text-center md:mt-10 md:mb-10">
          Video Chat
        </h2>
        <VideoPlayer
          client={clientTocall}
          trainer={trainer}
          call={call}
          callAccepted={callAccepted}
          myVideo={myVideo}
          userVideo={userVideo}
          stream={stream}
          name={name}
          setName={setName}
          callEnded={callEnded}
          me={me}
          callUser={callUser}
          leaveCall={leaveCall}
          answerCall={answerCall}
        />
        <Options
          client={clientTocall}
          trainer={trainer}
          call={call}
          callAccepted={callAccepted}
          myVideo={myVideo}
          userVideo={userVideo}
          stream={stream}
          name={name}
          setName={setName}
          callEnded={callEnded}
          me={me}
          callUser={callUser}
          leaveCall={leaveCall}
          answerCall={answerCall}
        >
          <Notifications
            client={clientTocall}
            trainer={trainer}
            call={call}
            callAccepted={callAccepted}
            myVideo={myVideo}
            userVideo={userVideo}
            stream={stream}
            name={name}
            setName={setName}
            callEnded={callEnded}
            me={me}
            callUser={callUser}
            leaveCall={leaveCall}
            answerCall={answerCall}
          />
        </Options>
      </div>
    </div>
  );
}

export default VideoCall;
