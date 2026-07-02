import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';
import './App.css';

function Home() {
  return (
    <div className="container py-4">
      <div className="jumbotron">
        <h1 className="display-4">🏋️ OctoFit Tracker</h1>
        <p className="lead">Track your fitness activities, join teams, and compete on the leaderboard!</p>
        <hr className="my-4" />
        <p>
          Welcome to OctoFit Tracker, a multi-tier fitness tracking application built with React, Express, and MongoDB.
        </p>
        <p className="lead">
          <Link to="/users" className="btn btn-primary btn-lg me-2">
            Users
          </Link>
          <Link to="/teams" className="btn btn-info btn-lg me-2">
            Teams
          </Link>
          <Link to="/activities" className="btn btn-success btn-lg me-2">
            Activities
          </Link>
          <Link to="/workouts" className="btn btn-warning btn-lg me-2">
            Workouts
          </Link>
          <Link to="/leaderboard" className="btn btn-danger btn-lg">
            Leaderboard
          </Link>
        </p>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <h3>Features</h3>
          <ul>
            <li>Track fitness activities</li>
            <li>Create and manage teams</li>
            <li>View personalized workouts</li>
            <li>Compete on leaderboards</li>
            <li>Real-time user profiles</li>
          </ul>
        </div>
        <div className="col-md-6">
          <h3>Tech Stack</h3>
          <ul>
            <li>Frontend: React 19 + Vite</li>
            <li>Routing: React Router DOM</li>
            <li>Styling: Bootstrap</li>
            <li>Backend: Express + Node.js</li>
            <li>Database: MongoDB + Mongoose</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand fw-bold">
              🏋️ OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/users" className="nav-link">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/teams" className="nav-link">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/activities" className="nav-link">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/workouts" className="nav-link">
                    Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/leaderboard" className="nav-link">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>

        <footer className="bg-dark text-white text-center py-3 mt-5">
          <p className="mb-0">© 2026 OctoFit Tracker. Built with React, Express, and MongoDB.</p>
        </footer>
      </div>
    </Router>
  );
}
