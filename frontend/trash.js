// Server-side code
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', socket => {
  socket.on('join room', roomID => {
    socket.join(roomID);
    socket.on('disconnect', () => {
      socket.to(roomID).broadcast.emit('user disconnected');
    });
    socket.on('stream', stream => {
      socket.to(roomID).broadcast.emit('stream', stream);
    });
  });
});

http.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Client-side code
const socket = io('http://localhost:3000');
const roomID = '123';

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    const video = document.querySelector('video');
    video.srcObject = stream;
    video.play();
    socket.emit('join room', roomID);
    socket.emit('stream', stream);

    socket.on('stream', stream => {
      const peer = new SimplePeer({ initiator: false, stream });
      peer.on('signal', signal => {
        socket.emit('signal', signal);
      });
      peer.on('connect', () => {
        console.log('Connected');
      });
      peer.on('stream', stream => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        document.body.appendChild(video);
      });
      socket.on('signal', signal => {
        peer.signal(signal);
      });
    });

    socket.on('user disconnected', () => {
      console.log('User disconnected');
    });
  })
  .catch(error => {
    console.error(error);
  });


  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const currentMonth = months[currentDate.getMonth()];