const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const PORT = 5500;

const server = http.createServer(app);

app.use(express.static( path.join(__dirname, 'public') )); 

const io = require('socket.io')(server);



io.on('connection', function(socket){
    socket.on('newuser', function(username){
        socket.broadcast.emit('update', username + " joined the conversation");
    });
    socket.on('exituser', function(username){
        socket.broadcast.emit('update', username + " left the conversation");
    });
    socket.on('chat', function(message){
        socket.broadcast.emit('chat', message);
    });
});




server.listen(PORT, () => {
    console.log(`Server Started at Port: ${PORT}`);
});