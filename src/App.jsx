import { useEffect, useState } from 'react';
import './App.css';
import styled from 'styled-components';
import Header from './Header/Header';
import welcome from './assets/welcome.png';

const WelcomePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  font-family: inherit;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  max-width: 600px;
  line-height: 1.5;
`;

const GameImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
`;

const PlayButton = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

function App() {
  return (
    <>
      <Header />
      <WelcomePage>
        <Title>Welcome to Where's Waldo!</Title>
        <GameImage src={welcome} alt="Where's Waldo Scene" />
        <Description>
          Test your observation skills in this fun and challenging game. Your
          goal is to find Waldo, a character hidden in a busy and colorful
          scene. Look closely and see if you can spot him!
        </Description>
        <PlayButton href="/game/new">Start Playing</PlayButton>
      </WelcomePage>
    </>
  );
}

export default App;
