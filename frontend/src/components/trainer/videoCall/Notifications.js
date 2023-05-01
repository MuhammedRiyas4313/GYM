import React, { useContext } from 'react'
import { Button } from '@material-ui/core'

function Notifications({ call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, me, callUser, leaveCall, answerCall }) {
  
  return (
    <>
     {call.isReceivedCall && !callAccepted && (
      <div style={{display:'flex', justifyContent:'center'}}>
        <h1><span className='font-extrabold uppercase'>{call.name} </span>is calling: </h1>
        <Button variant='contained' color='primary' onClick={answerCall}>
          Answer
        </Button>
      </div>
     )}
    </>
  )
}

export default Notifications
