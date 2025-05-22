import React from 'react';
import './App.css';
import PomodoroContainer from './components/PomodoroContainer/PomodoroContainer';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">⏱️</span> FocusPulse
            </div>
            <div className="nav-subtitle">Maximize your productivity</div>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="hero">
            <div className="subtitle">Pomodoro Technique Timer</div>
            
            <h1 className="title">FocusPulse</h1>
            
            <div className="description">
              Boost your productivity with focused work sessions and structured breaks.
              FocusPulse helps you maintain concentration and prevent burnout.
            </div>
            
            <div className="pomodoro-wrapper">
              <PomodoroContainer />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;