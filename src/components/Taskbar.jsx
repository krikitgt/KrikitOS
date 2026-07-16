import React, { useState, useEffect } from 'react';
import '../styles/taskbar.css';

const APPS = [
  { id: 'terminal', name: 'Terminal', icon: '⌨️' },
  { id: 'files', name: 'File Manager', icon: '📁' },
  { id: 'monitor', name: 'System Monitor', icon: '📊' },
  { id: 'scanner', name: 'Network Scanner', icon: '🔍' },
  { id: 'editor', name: 'Text Editor', icon: '📝' },
  { id: 'settings', name: 'Settings', icon: '⚙️' },
  { id: 'browser', name: 'Web Browser', icon: '🌐' },
  { id: 'calculator', name: 'Calculator', icon: '🧮' },
];

export default function Taskbar({ windows, openApp, activeWindow, onWindowClick }) {
  const [showAppMenu, setShowAppMenu] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAppClick = (app) => {
    openApp(app.id, app.name, app.icon);
    setShowAppMenu(false);
  };

  return (
    <div className="taskbar">
      <div className="taskbar-left">
        <button
          className="menu-button"
          onClick={() => setShowAppMenu(!showAppMenu)}
          title="Applications"
        >
          🐉 KrikitOS
        </button>

        {showAppMenu && (
          <div className="app-menu">
            <div className="app-menu-header">📱 Applications</div>
            <div className="app-menu-grid">
              {APPS.map((app) => (
                <button
                  key={app.id}
                  className="app-menu-item"
                  onClick={() => handleAppClick(app)}
                  title={app.name}
                >
                  <span className="app-icon">{app.icon}</span>
                  <span className="app-name">{app.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="taskbar-center">
        {windows
          .filter((w) => !w.isMinimized)
          .slice(0, 5)
          .map((win) => (
            <button
              key={win.id}
              className={`taskbar-item ${activeWindow === win.id ? 'active' : ''}`}
              onClick={() => onWindowClick(win.id)}
              title={win.appName}
            >
              <span className="taskbar-icon">{win.appIcon}</span>
              <span className="taskbar-label">{win.appName}</span>
            </button>
          ))}
      </div>

      <div className="taskbar-right">
        <div className="system-tray">
          <span className="system-info">📶 Network</span>
          <span className="system-info">🔋 Power</span>
          <span className="clock">
            {time.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}
