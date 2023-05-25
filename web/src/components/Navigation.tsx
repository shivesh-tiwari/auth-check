import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CssStyles from "../CssStyles";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

export default function Navigation() {
  return (
    <>
      <Container>
        <Title>Welcome To Appium!</Title>
        <Link to="/login">
          <button style={CssStyles.buttonStyles}>Login </button>
        </Link>
        <Link to="/register">
          <button style={CssStyles.buttonStyles}>Register</button>
        </Link>
      </Container>
    </>
  );
}
