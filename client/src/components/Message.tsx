import React from 'react';
import styled from 'styled-components';
import { MessageProps } from './Chat';

function Message({ text, type }: MessageProps) {
  return <MessageInfo>{text}</MessageInfo>;
}

export default Message;

const MessageInfo = styled.li`
  width: 100%;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;
