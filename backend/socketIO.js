const { Server } = require('socket.io')

function socketConnection(server){
    console.log('socket connection calling')
    const io = new Server(server,{
        pingTimeout:60000,
        cors:{
          origin: 'http://localhost:3000',
          methods:["GET","POST"]
        }
      })

      let users = []
      
      io.on('connection',(socket)=>{
        console.log(`socket connection : ${socket.id}`)
       
        
        //socket for chat 

        socket.on('setup',(Id)=>{
          // const id = Id?.toString()
          socket.join(123);
          console.log(`room joined : ${123}`)
          socket.emit('connected')
        })

        socket.on('join room',(room)=>{
          console.log('joined room ')

        })

        socket.on('send_message',(data)=>{
          console.log(data,'on send_message calling')
          socket.to(123).emit('recieve_message',data)
          console.log('recieve_message emited...')
        })


        //socket for videocall

        socket.on('callUser',({ userToCall, from , signalData, name })=>{
          io.to(userToCall).emit('callUser',{ signal: signalData, from , name })
        })

        socket.on('answerCall',(data)=>{
          io.to(data.to).emit('callAccepted',data.signal)
        })

        socket.on('disconnect',()=>{
          console.log(`lost connection : ${socket.id}`)
          socket.broadcast.emit('call ended')
        })

      })
}

module.exports = socketConnection;