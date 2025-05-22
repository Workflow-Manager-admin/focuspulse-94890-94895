import React from 'react';
import './SessionType.css';

/**
 * PUBLIC_INTERFACE
 * SessionType component for displaying and switching between focus and break sessions
 * @param {string} currentSession - Current session type ('focus', 'shortBreak', or 'longBreak')
 * @param {function} onSwitchToFocus - Function to switch to focus session
 * @param {function} onSwitchToShortBreak - Function to switch to short break session
 * @param {function} onSwitchToLongBreak - Function to switch to long break session
 */
const SessionType = ({ 
  currentSession, 
  onSwitchToFocus, 
  onSwitchToShortBreak, 
  onSwitchToLongBreak 
}) => {
  return (
    <div className="session-type-container">
      <h3>Session Type</h3>
      
      <div className="session-type-buttons">
        <button 
          className={`session-btn ${currentSession === 'focus' ? 'active' : ''}`} 
          onClick={onSwitchToFocus}
        >
          Focus
        </button>
        <button 
          className={`session-btn ${currentSession === 'shortBreak' ? 'active' : ''}`} 
          onClick={onSwitchToShortBreak}
        >
          Short Break
        </button>
        <button 
          className={`session-btn ${currentSession === 'longBreak' ? 'active' : ''}`} 
          onClick={onSwitchToLongBreak}
        >
          Long Break
        </button>
      </div>
      
      <div className="session-info">
        {currentSession === 'focus' && (
          <p>Focus session: Stay concentrated on your task</p>
        )}
        {currentSession === 'shortBreak' && (
          <p>Short break: Quick rest to refresh your mind</p>
        )}
        {currentSession === 'longBreak' && (
          <p>Long break: Rest longer after completing multiple focus sessions</p>
        )}
      </div>
    </div>
  );
};

export default SessionType;
