import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { SocketContext } from '../../../context/SocketContext'

function Notifications() {
  
    const { call, callAccepted,  answerCall } = useContext(SocketContext)
  return (
    <>
     {call.isReceivedCall && !callAccepted && (
      <div style={{display:'flex', justifyContent:'center'}}>
        {console.log('incomingCall....... in notifications...')}
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
