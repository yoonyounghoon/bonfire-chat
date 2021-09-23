import React from 'react';
import styled, { css } from 'styled-components';
import { MessageProps, MessageType } from './Chat';

function Message({ text, type }: MessageProps) {
  return (
    <MessageInfo type={type}>
      <Text>{text}</Text>
    </MessageInfo>
  );
}

export default Message;

const MessageInfo = styled.li<{ type: MessageType }>`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease-in;

  ${({ type }) => {
    switch (type) {
      case 'notify':
        return css`
          text-align: center;
        `;
      case 'yours':
        return css`
          text-align: left;
        `;
      case 'me':
        return css`
          text-align: right;
        `;
    }
  }}
`;

const Text = styled.span`
  display: inline-block;
  background-color: white;
  color: black;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
`;
