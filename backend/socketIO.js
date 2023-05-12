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

      
      io.on('connection',(socket)=>{
        console.log(`socket connection : ${socket.id}`)
       
        
        //socket for chat 

        socket.on('setup',(Id)=>{
          socket.join(123);
          socket.emit('connected')
        })

        socket.on('send_message',(data)=>{
          socket.to(123).emit('recieve_message',data)
        })


        //socket for videocall
        socket.on('me',(conversation)=>{
          console.log(conversation,'conversationid videocall')
          socket.join(conversation);
          socket.to(conversation).emit('videocall',conversation)
        })

        socket.on('disconnect',()=>{
          socket.broadcast.emit('callended')
        })

        socket.on('calluser',({ userToCall, from , signalData, name })=>{
          console.log('callUser on ')
          io.to(userToCall).emit('calluser',{ signal: signalData, from , name })
        })

        socket.on('answercall',(data)=>{
          console.log('answercall on')
          io.to(data.to).emit('callaccepted',data.signal)
        })

      })
}

module.exports = socketConnection;