import React, { useState } from 'react';
import './Settings.css';

/**
 * PUBLIC_INTERFACE
 * Settings component for configuring Pomodoro timer durations
 * @param {number} focusDuration - Current focus duration in minutes
 * @param {number} shortBreakDuration - Current short break duration in minutes
 * @param {number} longBreakDuration - Current long break duration in minutes
 * @param {function} onSave - Function to save settings with new durations
 * @param {function} onCancel - Function to cancel settings changes
 */
const Settings = ({ 
  focusDuration, 
  shortBreakDuration, 
  longBreakDuration, 
  onSave, 
  onCancel 
}) => {
  const [newFocusDuration, setNewFocusDuration] = useState(focusDuration);
  const [newShortBreakDuration, setNewShortBreakDuration] = useState(shortBreakDuration);
  const [newLongBreakDuration, setNewLongBreakDuration] = useState(longBreakDuration);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs - ensure they are within reasonable limits
    const focus = Math.max(1, Math.min(parseInt(newFocusDuration) || focusDuration, 60));
    const shortBreak = Math.max(1, Math.min(parseInt(newShortBreakDuration) || shortBreakDuration, 30));
    const longBreak = Math.max(1, Math.min(parseInt(newLongBreakDuration) || longBreakDuration, 60));
    
    onSave(focus, shortBreak, longBreak);
  };

  return (
    <div className="settings-container">
      <h3>Timer Settings</h3>
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-form-group">
          <label htmlFor="focusDuration">Focus Duration (minutes)</label>
          <input 
            type="number" 
            id="focusDuration" 
            value={newFocusDuration} 
            onChange={(e) => setNewFocusDuration(e.target.value)}
            min="1"
            max="60"
          />
        </div>
        
        <div className="settings-form-group">
          <label htmlFor="shortBreakDuration">Short Break Duration (minutes)</label>
          <input 
            type="number" 
            id="shortBreakDuration" 
            value={newShortBreakDuration} 
            onChange={(e) => setNewShortBreakDuration(e.target.value)}
            min="1"
            max="30"
          />
        </div>
        
        <div className="settings-form-group">
          <label htmlFor="longBreakDuration">Long Break Duration (minutes)</label>
          <input 
            type="number" 
            id="longBreakDuration" 
            value={newLongBreakDuration} 
            onChange={(e) => setNewLongBreakDuration(e.target.value)}
            min="1"
            max="60"
          />
        </div>
        
        <div className="settings-form-actions">
          <button type="button" className="btn cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
