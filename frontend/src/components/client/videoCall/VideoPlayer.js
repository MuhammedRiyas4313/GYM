import React, { useContext, useEffect } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SocketContext } from "../../../context/SocketContext";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  videoContainer:{
    display:'flex',
    justifyContent:'center',
    backgroundColor:'black'
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "5px",
    border: "1px solid black",
    margin: "10px",
    width:'350px'
  },
}));

function VideoPlayer({user}) {
  const {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
  } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid videoContainer>
            <Typography className="text-center font-extrabold  uppercase" variant="h5" gutterBottom>
               {user?.fname}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              controls
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid>
            <Typography className="text-center" variant="h5" gutterBottom>
              Trainer
            </Typography>
            <video
              playsInline
              muted
              ref={userVideo}
              autoPlay
              controls
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
}

export default VideoPlayer;
