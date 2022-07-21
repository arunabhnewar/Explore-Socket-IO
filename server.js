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
    console.log("New Fucker Connected!");
    socket.on("new-message", (data) => {
        
        socket.broadcast.emit("received-message", data)
        // socket.emit("received-message", data)
    })
})


// Server listening
expressHTTPServer.listen(3000, () => {
    console.log("Server has been running on port 3000");
})