import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import Chat from './components/Chat';
import Login from './components/Login';

export const socket = io('http://localhost:5000');

function App() {
  const [name, setName] = useState('');

  const [isLogin, setIsLogin] = useState(false);
  const [videoStart, setVideoStart] = useState(false);

  return (
    <Container>
      <ReactPlayer
        url="https://youtu.be/e7xYgbsbImA"
        playing={true}
        muted={true}
        loop={true}
        controls={false}
        width="100%"
        height="100%"
        onReady={() => {
          console.log('video ready');
        }}
        onPlay={() => {
          console.log('video play');
          setTimeout(() => {
            setVideoStart(true);
          }, 2500);
        }}
        style={{
          transition: '3s ease-in-out',
          overflow: 'hidden',
          position: 'absolute',
          zIndex: -1,
          filter: `blur(2px) brightness(${videoStart ? 1 : 0})`,
        }}
      />
      {isLogin ? (
        <Chat name={name} />
      ) : (
        <Login setName={setName} name={name} setIsLogin={setIsLogin} />
      )}
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
