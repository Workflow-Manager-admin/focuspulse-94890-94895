import React from 'react';
import './Timer.css';

/**
 * PUBLIC_INTERFACE
 * Timer component displaying the current time remaining and control buttons
 * @param {number} timeRemaining - Time remaining in seconds
 * @param {boolean} isRunning - Whether the timer is currently running
 * @param {function} onStart - Function to start the timer
 * @param {function} onPause - Function to pause the timer
 * @param {function} onReset - Function to reset the timer
 */
const Timer = ({ timeRemaining, isRunning, onStart, onPause, onReset }) => {
  // Convert seconds to minutes and seconds
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage for the circular timer
  const calculateProgress = () => {
    // We need to know the total time for current session type to calculate progress
    // For now, use a simplified approach that works for visualization
    const circumference = 2 * Math.PI * 45; // Circle radius is 45
    const progress = timeRemaining / (25 * 60); // Assuming 25 minutes max
    return circumference * (1 - progress);
  };

  return (
    <div className="timer-container">
      <div className="timer-circle-container">
        <svg className="timer-circle" viewBox="0 0 100 100">
          <circle
            className="timer-circle-bg"
            cx="50"
            cy="50"
            r="45"
          />
          <circle
            className="timer-circle-progress"
            cx="50"
            cy="50"
            r="45"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={calculateProgress()}
          />
          <text x="50" y="50" className="timer-text">
            {formatTime(timeRemaining)}
          </text>
        </svg>
      </div>
      
      <div className="timer-controls">
        {!isRunning ? (
          <button className="btn timer-btn" onClick={onStart}>
            Start
          </button>
        ) : (
          <button className="btn timer-btn" onClick={onPause}>
            Pause
          </button>
        )}
        <button className="btn timer-btn reset-btn" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
