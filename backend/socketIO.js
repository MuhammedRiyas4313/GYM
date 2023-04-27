const { Server } = require('socket.io')

function socketConnection(server){
    console.log('socket connection calling')
    const io = new Server(server,{
        cors:{
          origin: 'http://localhost:3000',
          methods:["GET","POST"]
        }
      })
      
      io.on('connection',(socket)=>{
        console.log(`user connected socket ${socket.id}`)
        socket.on('disconnect',()=>{
          console.log(`user disconnected socket ${socket.id}`)
        })
      })

 
}

module.exports = socketConnection;