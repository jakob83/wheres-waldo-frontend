import { useEffect, useState } from 'react';

function Timer({ start }) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(Math.floor((new Date() - new Date(start)) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  });

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTime = `${
    minutes <= 0 ? '00' : minutes <= 9 ? '0' + minutes : minutes
  }:${seconds <= 0 ? '00' : seconds <= 9 ? '0' + seconds : seconds}`;

  return <h2>{formattedTime}</h2>;
}

export default Timer;
