const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
// cors 설정
app.use(cors());
const server = http.createServer(app);
const socketIO = require('socket.io');

const io = socketIO(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
});


io.on("connection", (socket)=>{
    console.log("User connected", socket.id);
    io.emit("connection", 'hello')
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> {
    console.log(`Server is up on port ${PORT}`);
})


