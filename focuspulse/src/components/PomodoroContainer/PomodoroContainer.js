import React, { useState, useEffect, useRef } from 'react';
import Timer from '../Timer/Timer';
import SessionType from '../SessionType/SessionType';
import Settings from '../Settings/Settings';
import './PomodoroContainer.css';

/**
 * PUBLIC_INTERFACE
 * Main container component for the FocusPulse application
 * Manages the Pomodoro workflow including timer, session types, and settings
 */
const PomodoroContainer = () => {
  // Default settings for Pomodoro technique
  const [focusDuration, setFocusDuration] = useState(25); // 25 minutes default
  const [shortBreakDuration, setShortBreakDuration] = useState(5); // 5 minutes default
  const [longBreakDuration, setLongBreakDuration] = useState(15); // 15 minutes default

  // Session state
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState('focus'); // 'focus', 'shortBreak', 'longBreak'
  const [timeRemaining, setTimeRemaining] = useState(focusDuration * 60); // in seconds
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const timerRef = useRef(null);

  // Update timer when focus duration changes
  useEffect(() => {
    if (sessionType === 'focus') {
      setTimeRemaining(focusDuration * 60);
    }
  }, [focusDuration, sessionType]);

  // Update timer when break durations change
  useEffect(() => {
    if (sessionType === 'shortBreak') {
      setTimeRemaining(shortBreakDuration * 60);
    } else if (sessionType === 'longBreak') {
      setTimeRemaining(longBreakDuration * 60);
    }
  }, [shortBreakDuration, longBreakDuration, sessionType]);

  // Timer functionality
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  // Handle timer completion
  const handleTimerComplete = () => {
    clearInterval(timerRef.current);
    playAlertSound();
    
    if (sessionType === 'focus') {
      const newCompletedSessions = completedSessions + 1;
      setCompletedSessions(newCompletedSessions);
      
      // Every 4 focus sessions, take a long break
      if (newCompletedSessions % 4 === 0) {
        setSessionType('longBreak');
        setTimeRemaining(longBreakDuration * 60);
      } else {
        setSessionType('shortBreak');
        setTimeRemaining(shortBreakDuration * 60);
      }
    } else {
      // After break, go back to focus
      setSessionType('focus');
      setTimeRemaining(focusDuration * 60);
    }
    
    setIsRunning(true); // Auto-start the next session
  };

  // Play sound when timer completes
  const playAlertSound = () => {
    try {
      const audio = new Audio('https://soundbible.com/grab.php?id=1746&type=mp3');
      audio.play();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  // Timer controls
  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    
    if (sessionType === 'focus') {
      setTimeRemaining(focusDuration * 60);
    } else if (sessionType === 'shortBreak') {
      setTimeRemaining(shortBreakDuration * 60);
    } else {
      setTimeRemaining(longBreakDuration * 60);
    }
  };

  // Switch session type manually
  const switchToFocus = () => {
    setIsRunning(false);
    setSessionType('focus');
    setTimeRemaining(focusDuration * 60);
  };

  const switchToShortBreak = () => {
    setIsRunning(false);
    setSessionType('shortBreak');
    setTimeRemaining(shortBreakDuration * 60);
  };

  const switchToLongBreak = () => {
    setIsRunning(false);
    setSessionType('longBreak');
    setTimeRemaining(longBreakDuration * 60);
  };

  // Settings controls
  const toggleSettings = () => setShowSettings(!showSettings);

  const saveSettings = (newFocusDuration, newShortBreakDuration, newLongBreakDuration) => {
    setFocusDuration(newFocusDuration);
    setShortBreakDuration(newShortBreakDuration);
    setLongBreakDuration(newLongBreakDuration);
    setShowSettings(false);
    resetTimer();
  };

  return (
    <div className="pomodoro-container">
      <div className="pomodoro-header">
        <h2>FocusPulse</h2>
        <div className="sessions-counter">
          Completed Sessions: <span>{completedSessions}</span>
        </div>
      </div>
      
      <Timer 
        timeRemaining={timeRemaining} 
        isRunning={isRunning}
        onStart={startTimer}
        onPause={pauseTimer}
        onReset={resetTimer}
      />
      
      <SessionType 
        currentSession={sessionType}
        onSwitchToFocus={switchToFocus}
        onSwitchToShortBreak={switchToShortBreak}
        onSwitchToLongBreak={switchToLongBreak}
      />
      
      <div className="settings-section">
        <button className="btn settings-toggle" onClick={toggleSettings}>
          {showSettings ? 'Hide Settings' : 'Show Settings'}
        </button>
        
        {showSettings && (
          <Settings
            focusDuration={focusDuration}
            shortBreakDuration={shortBreakDuration}
            longBreakDuration={longBreakDuration}
            onSave={saveSettings}
            onCancel={() => setShowSettings(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PomodoroContainer;
