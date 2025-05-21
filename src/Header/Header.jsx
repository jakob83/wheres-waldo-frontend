import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  padding-right: 10%;
  background-color: #282c34;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 60px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: color 0.3s;

  &:hover {
    color: #61dafb;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>Where's Wally?</Title>
      <NavLinks>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/leaderboard">Leaderboard</StyledLink>
        <StyledLink to="/game/new">Game</StyledLink>
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
