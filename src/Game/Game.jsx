import Header from '../Header/Header';
import wallyImg from '../assets/wally.jpg';
import waldo from '../assets/waldo.png';
import odlaw from '../assets/odlaw.png';
import wizard from '../assets/wizard.png';
import styled from 'styled-components';
import waldoFace from '../assets/wall_face.png';
import odlawFace from '../assets/odlaw_face.jpg';
import wizardFace from '../assets/wizard_face.png';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Timer from './Timer';
import TimedMsg from './TimedMsg';
import { Link } from 'react-router-dom';

const StartDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 50px;
  border-radius: 10px;
  border: 2px solid #646cff;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.8);
  background-color: #363333;
`;

const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #686464;
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: background-color 0.3s;
  &:focus {
    background-color: #444;
  }
`;
const EndDiv = styled(StartDiv)``;

const EndMsg = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 50px;
  border-radius: 10px;
  border: 2px solid #646cff;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.8);
  background-color: #363333;
`;

const GameDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const GameSectionDiv = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ImgDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 1200px;
`;
const StyledImg = styled.img`
  width: 100%;
  max-width: 1200px;
  cursor: pointer;
`;

const WantedDiv = styled.div`
  width: 200px;
  position: absolute;
  right: 0px;
  display: flex;
  flex-direction: column;
  align-self: start;
  align-items: center;
  gap: 20px;
  @media (max-width: 1488px) {
    position: static;
    flex-direction: row;
    width: 100%;
    justify-content: center;
  }
`;

const CharacterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isFound ? 0.4 : 1)}; /* Make it faded */
  filter: ${(props) =>
    props.isFound ? 'grayscale(0%)' : 'grayscale(0%)'}; /* Remove color */
`;

const WantedImg = styled.img`
  width: 100px;
  height: 100px;
`;

const BigP = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
  color: #fff;
  text-align: center;
  margin: 0;
`;

const Options = styled.div`
  background-color: #363333;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  border-radius: 5px;
`;

const OptionBtn = styled.button`
  width: 100%;
  display: flex;
  gap: 20px;
  padding: 7px 15px;
  border: 0.5px solid black;
  margin: 0;
  border-radius: 0px;
  background-color: #363333;
  opacity: ${(props) => (props.isFound ? 0.4 : 1)}; /* Make it faded */
  filter: ${(props) =>
    props.isFound ? 'grayscale(0%)' : 'grayscale(0%)'}; /* Remove color */
`;

const FaceImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid #646cff;
  background-color: #363333;
  margin: 0;
`;

const BtnLink = styled(Link)`
  text-decoration: none;
  color: white;
  background-color: #646cff;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s;
  &:hover {
    color: white;
    background-color: #4a56a5;
  }
`;

function isFound(character, game) {
  return game.foundCharacters.some((ch) => ch === character);
}

function Game() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [game, setGame] = useState(null);
  const [relClickPosition, setRelClickPosition] = useState(null);
  const [optionsPos, setOptionsPos] = useState(null);
  const [msg, setMsg] = useState(null);
  const runId = useParams().id;

  const handleClick = (e) => {
    const y = e.clientY;
    const x = e.clientX;
    const bounding = document
      .querySelector('.game-img')
      .getBoundingClientRect();
    const rationalWidth = 1200 / bounding.width;
    const rationalHeight = 900 / bounding.height;
    // calculated on the rational image size:
    const imgX = x - bounding.left;
    const imgY = y - bounding.top;
    const ratX = imgX * rationalWidth;
    const ratY = imgY * rationalHeight;
    setRelClickPosition({ top: ratY, left: ratX });
    const newOptionsPos =
      optionsPos === null ? { top: imgY - 20, left: imgX + 20 } : null;
    setOptionsPos(newOptionsPos);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/runs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        setError('Error creating game');
        return;
      }
      const data = await res.json();
      navigate('/game/' + data.id);
      setGame(data);
    } catch (error) {
      setError('Error creating game');
    }
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleClickOption = async (e) => {
    // get the p inside the button
    setOptionsPos(null);
    const target = e.target.closest('button').querySelector('p').innerText;
    const pos = relClickPosition;
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/runs/' + runId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target, pos }),
      });
      if (!res.ok) {
        setError('Error submitting answer');
        return;
      }
      const data = await res.json();
      console.log(data);
      setGame(data.run);
      setMsg({ content: data.message, isPositive: data.success });
    } catch (error) {
      setError('Error submitting answer');
    }
  };
  console.log(game);
  let formattedTime = null;
  if (game && game.status === 'finished') {
    const time = new Date(game.end) - new Date(game.start);
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    formattedTime = `${minutes}m ${secondsLeft}s`;
  }

  return (
    <>
      <Header />
      {game && game.status === 'running' ? (
        <>
          <GameDiv>
            <Timer start={game.start} />
            <GameSectionDiv>
              <WantedDiv>
                {console.log('Found waldo: ' + isFound('Waldo', game))}
                <h2>Wanted:</h2>
                <CharacterDiv isFound={isFound('Waldo', game)}>
                  <WantedImg src={waldo} alt="" />
                  <BigP>Waldo</BigP>
                </CharacterDiv>
                <CharacterDiv isFound={isFound('Odlaw', game)}>
                  <WantedImg src={odlaw} alt="" />
                  <BigP>Odlaw</BigP>
                </CharacterDiv>
                <CharacterDiv isFound={isFound('Wizard', game)}>
                  <WantedImg src={wizard} alt="" />
                  <BigP>Wizard</BigP>
                </CharacterDiv>
              </WantedDiv>
              <ImgDiv>
                <StyledImg
                  className="game-img"
                  src={wallyImg}
                  alt=""
                  onClick={handleClick}
                />
                {optionsPos && (
                  <Options style={optionsPos}>
                    <OptionBtn
                      onClick={handleClickOption}
                      isFound={isFound('Waldo', game)}
                    >
                      <p>Waldo</p>
                      <FaceImg src={waldoFace} alt="" />
                    </OptionBtn>
                    <OptionBtn
                      onClick={handleClickOption}
                      isFound={isFound('Odlaw', game)}
                    >
                      <p>Odlaw</p>
                      <FaceImg src={odlawFace} alt="" />
                    </OptionBtn>
                    <OptionBtn
                      onClick={handleClickOption}
                      isFound={isFound('Wizard', game)}
                    >
                      <p>Wizard</p>
                      <FaceImg src={wizardFace} alt="" />
                    </OptionBtn>
                  </Options>
                )}
              </ImgDiv>
            </GameSectionDiv>
          </GameDiv>
          {msg && (
            <TimedMsg
              resetMsg={() => setMsg(null)}
              msg={msg.content}
              isPositive={msg.isPositive}
              duration={1000}
            />
          )}
        </>
      ) : game === null ? (
        <StartDiv>
          <Form onSubmit={handleSubmit}>
            <InputDiv>
              <label htmlFor="name">Username:</label>
              <Input type="text" id="name" required onChange={handleChange} />
            </InputDiv>
            <button>Click to start</button>
          </Form>
        </StartDiv>
      ) : (
        <EndDiv>
          <EndMsg>
            <h2>Congrats! You did it!</h2>
            <p>
              Your Time: <b>{formattedTime}</b>
            </p>
            <BtnLink to={'/leaderboard'}>See Scores</BtnLink>
          </EndMsg>
        </EndDiv>
      )}
    </>
  );
}

export default Game;
