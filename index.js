const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path')

app.use(express.static(path.join(__dirname, '/static')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  // console.log('connection')
  socket.on('updatePosition', (checkerData) => {
    console.log(checkerData)
    io.emit('updatePosition', checkerData)
  })
  socket.on('capture', (captureData) =>{
    io.emit('capture', captureData)
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});