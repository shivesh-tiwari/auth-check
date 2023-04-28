import React from 'react';
import { useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import { LoginPage } from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigation />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
