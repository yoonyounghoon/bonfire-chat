import React, { useState } from 'react';
import styled from 'styled-components';
import { setTokenSourceMapRange } from 'typescript';

interface LoginProps {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
}

function Login({ setName, name, setIsLogin }: LoginProps) {
  const onChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setIsLogin(true);
  };

  return (
    <LoginForm onSubmit={onSubmit}>
      <Title>이름을 알려주세요</Title>
      <LoginInput value={name} onChange={onChangeName} />
    </LoginForm>
  );
}

export default Login;

const LoginForm = styled.form`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Title = styled.h2`
  margin: 0;
  color: white;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const LoginInput = styled.input`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  color: white;
  background: transparent;
  outline: none;
  border: none;
  border-bottom: 3px solid #ffffff;

  anima
`;
