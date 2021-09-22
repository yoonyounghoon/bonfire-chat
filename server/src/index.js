const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
// cors 설정
app.use(cors());
const server = http.createServer(app);
const socketIO = require('socket.io');

const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  // 새로온 유저 이벤트
  socket.on('new user', (name) => {
    console.log(name);
    socket.username = name;
    io.emit('get newUser', {
      type: 'notify',
      text: `${socket.username}님이 입장하셨습니다.`,
    });
    console.log({
      type: 'notify',
      text: `${socket.username}님이 입장하셨습니다.`,
    });
  });

  // 메시지 이벤트
  socket.on('post message', (data) => {
    const { id, text } = data;

    // 자신을 제외한 다른 클라이언트들한테는
    socket.broadcast.emit('get newMessage', {
      type: 'yours',
      text,
    });

    // 요청 보낸 클라이언트에게는
    io.to(id).emit('get newMessage', {
      type: 'me',
      text,
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
