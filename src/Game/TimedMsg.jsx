import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from{
    opacity: 0;
    transform: translate(-50%, -200px);
  }
  to{
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const Msg = styled.p`
  font-size: 1.1rem;
  color: #fff;
  text-align: center;
  margin: 0;
  padding: 10px 20px;
  background-color: ${(props) => (props.isPositive ? '#0e6311' : '#85130b')};
  border-radius: 5px;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform-origin: center;
  animation: ${fadeIn} 0.15s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
`;

function TimedMsg({ msg, duration = 1000, resetMsg, isPositive }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      resetMsg();
    }, duration);
    return () => {
      clearTimeout(timer);
    };
  });

  return <Msg isPositive={isPositive}>{msg}</Msg>;
}

export default TimedMsg;
