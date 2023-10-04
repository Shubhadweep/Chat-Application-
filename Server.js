const { Socket } = require('dgram');
const express = require ('express');
const app = express();
app.use(express.static("Front-end"));
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server);

// Creating Socket Connection
io.on('connection', (socket)=>{
    console.log("A new user has Connected");
    socket.on('message',(sms)=>{
        socket.broadcast.emit('message',sms);
    })
})

app.get("/LetsChat", function(req,res){
    res.sendFile(__dirname+"/Front-end/index.html");
})

server.listen(5500, function(){
    console.log("Server is Running on Port 5500");
    
})