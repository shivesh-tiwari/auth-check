import React from 'react';
import { Link } from 'react-router-dom';
// import Dashboard from './Dashboard';
import './Navigation.css';
import styled from 'styled-components';

export default function Navigation() {
  return (
    <div className="container">
      <div>
        <form className="login">
          <div className="login-field">
            <div className="header">
              <div className="fixed">Appium</div>
              <ul className="typed">
                <li>
                  <span>Dashboard</span>
                </li>
                <li>
                  <span>and</span>
                </li>
                <li>
                  <span>Device Farm</span>
                </li>
              </ul>
            </div>
            <div>
              <Link
                style={{ textDecoration: 'none' }}
                to="/login"
              >
                <button className="button login__submit">
                  <span className="button__text">Log In </span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              </Link>
            </div>
            <div>
              <Link
                style={{ textDecoration: 'none' }}
                to="/register"
              >
                <button className="button login__submit">
                  <span className="button__text">Register </span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
