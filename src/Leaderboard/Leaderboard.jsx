import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../Header/Header';

// Styled components
const LeaderboardContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #e0d5d5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8rem;
`;

const List = styled.ol`
  list-style-type: decimal; /* Ensure numbers are shown */
  color: black;
`;

const Li = styled.li``;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Username = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const Time = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: #d9534f;
  font-size: 1rem;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #666;
  font-size: 1rem;
`;

function Leaderboard() {
  const [runs, setRuns] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRuns() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/runs`, {
          method: 'GET',
        });
        if (!res.ok) {
          setError('Problem getting runs from database');
          return;
        }
        const runs = await res.json();
        setRuns(runs);
      } catch (err) {
        setError('Failed to fetch runs');
      }
    }
    fetchRuns();
  }, []);

  let runElements;
  if (runs !== null) {
    runElements = runs.map((run) => {
      const time = (new Date(run.end) - new Date(run.start)) / 1000;
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      const milliseconds = time.toString().split('.')[1]?.slice(0, 2) || '00';
      const formattedTime = `${
        minutes <= 0 ? '00' : minutes <= 9 ? '0' + minutes : minutes
      }:${
        seconds <= 0 ? '00' : seconds <= 9 ? '0' + seconds : seconds
      }:${milliseconds}`;

      return (
        <Li key={run.id}>
          <Div>
            <Username>{run.username}</Username>
            <Time>{formattedTime}</Time>
          </Div>
        </Li>
      );
    });
  }

  return (
    <>
      <Header />
      <LeaderboardContainer>
        <Title>Leaderboard</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {runs ? (
          <List>{runElements}</List>
        ) : (
          <LoadingMessage>Loading...</LoadingMessage>
        )}
      </LeaderboardContainer>
    </>
  );
}

export default Leaderboard;
