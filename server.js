// Dependencies
const express = require('express');
const http = require('http');
const socket = require('socket.io');


// App Initialize
const app = express();
const expressHTTPServer = http.createServer(app);

const io = new socket.Server(expressHTTPServer);


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})


io.on('connection', (socket) => {
    io.to(socket.id).emit('getName');


    socket.on("new-message", (data, callback) => {
        socket.broadcast.emit("received-message", data, socket.name)
        // socket.emit("received-message", data)
        callback();
    })

    socket.on("setName", (name, cb) => {
        socket.name = name;
        cb()
    })
})


// Server listening
expressHTTPServer.listen(3000, () => {
    console.log("Server has been running on port 3000");
})