import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "./Dashboard";
import styled from "styled-components";

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

const buttonStyles = {
  width: "100px",
  padding: "10px 25px",
  backgroundColor: "rgb(111, 199, 107)",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
  transition: "background-color 0.2s ease-in-out",
  textDecoration: "none",
  display: "inline-block",
  marginRight: "10px",
  marginLeft: "10px",
  marginTop: "10px",
  marginBottom: "10px",
};

export default function Navigation() {
  return (
    <>
      <Container>
        <Title>Welcome To Appium! Aaiye aapka Intejaar tha</Title>
        <Link to="/login">
          <button style={buttonStyles}>Login </button>
        </Link>
        <Link to="/register">
          <button style={buttonStyles}>Register</button>
        </Link>
      </Container>
    </>
  );
}
