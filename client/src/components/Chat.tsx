import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { socket } from '../App';
import Message from './Message';

type ChatProps = {
  name: string;
};

export type MessageType = 'notify' | 'yours' | 'me';

export type MessageProps = {
  type: MessageType;
  text: string;
};

function Chat({ name }: ChatProps) {
  const [userCount, setUserCount] = useState(0);
  const [messages, setMessages] = useState<MessageProps[] | []>([]);
  const [text, setText] = useState('');
  const messageEnd = useRef<HTMLUListElement | null>(null);

  const handleNewMessage = (data: MessageProps) => {
    setMessages((messages) => [...messages, data]);
    scrollToBottom();
  };

  const handleUserCount = (count: number) => {
    setUserCount(count);
  };

  const chatSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    socket.emit('post message', {
      id: socket.id,
      text,
    });

    setText('');
  };

  const inputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };

  const scrollToBottom = () => {
    messageEnd.current?.scrollTo({
      top: messageEnd.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    socket.emit('new user', name);
    socket.on('get userCount', handleUserCount);
    socket.on('get newUser', handleNewMessage);
    socket.on('get newMessage', handleNewMessage);
  }, []);

  return (
    <ChatWrapper>
      <Header>bonfire-Chat: {userCount}</Header>
      <MessageList ref={messageEnd}>
        {messages.length > 0 &&
          messages.map((message, idx) => (
            <Message key={idx} type={message.type} text={message.text} />
          ))}
      </MessageList>
      <ul></ul>
      <ChatForm onSubmit={chatSubmit}>
        <ChatInput
          placeholder="무엇이든 말해도 괜찮아요"
          value={text}
          onChange={inputChange}
        />
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
  overflow: auto;
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
  outline: none;
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
