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
  socket.on(console.log('SOCKET ON'));

  socket.broadcast.emit('hi');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});