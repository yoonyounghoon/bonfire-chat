import React, { useEffect } from 'react';
import styled from 'styled-components';
import { socket } from '../App';

type ChatProps = {
  name: string;
};

function Chat({ name }: ChatProps) {
  useEffect(() => {
    socket.emit('new user', name);
    socket.on('get newUser', (data) => {
      console.log(data);
    });
  }, []);

  return (
    <ChatWrapper>
      <Header>bonfire-Chat</Header>
      <MessageList>메시지 리스트</MessageList>
      <ChatForm>
        <ChatInput />
        <ChatButton>전송</ChatButton>
      </ChatForm>
    </ChatWrapper>
  );
}

export default Chat;

const ChatWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  color: white;
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  background: transparent;
`;

const MessageList = styled.ul`
  flex: 1;
  background-color: transparent;
  color: white; // 나중에 지우기
  overflow: hidden;
  margin: 0;
  padding: 1rem 1rem;
`;

const ChatForm = styled.form`
  position: relative;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
`;
const ChatInput = styled.input`
  flex: 1;
  font-size: 1.5rem;
  padding: 1rem;
`;
const ChatButton = styled.button`
  background-color: #eeab00;
  font-weight: bold;
  font-size: 1.5rem;
  color: white;
  outline: none;
  border: none;
  padding: 1rem;
`;
