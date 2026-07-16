import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import '../../styles/apps/settings.css';

export default function Settings() {
  const { settings, setSettings } = useOS();
  const [activeTab, setActiveTab] = useState('general');

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="settings">
      <div className="settings-sidebar">
        <button
          className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          ⚙️ General
        </button>
        <button
          className={`settings-tab ${activeTab === 'display' ? 'active' : ''}`}
          onClick={() => setActiveTab('display')}
        >
          🎨 Display
        </button>
        <button
          className={`settings-tab ${activeTab === 'system' ? 'active' : ''}`}
          onClick={() => setActiveTab('system')}
        >
          🖥️ System
        </button>
        <button
          className={`settings-tab ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          ℹ️ About
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'general' && (
          <div className="settings-panel">
            <h2>General Settings</h2>
            <div className="setting-item">
              <label>Username</label>
              <input
                type="text"
                value={settings.username}
                onChange={(e) => handleChange('username', e.target.value)}
              />
            </div>
            <div className="setting-item">
              <label>Hostname</label>
              <input
                type="text"
                value={settings.hostname}
                onChange={(e) => handleChange('hostname', e.target.value)}
              />
            </div>
            <div className="setting-item">
              <label>Language</label>
              <select value={settings.language} onChange={(e) => handleChange('language', e.target.value)}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'display' && (
          <div className="settings-panel">
            <h2>Display Settings</h2>
            <div className="setting-item">
              <label>Theme</label>
              <select value={settings.theme} onChange={(e) => handleChange('theme', e.target.value)}>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <div className="setting-item">
              <label>
                <input type="checkbox" defaultChecked /> Enable Animations
              </label>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="settings-panel">
            <h2>System Settings</h2>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.autoSave}
                  onChange={(e) => handleChange('autoSave', e.target.checked)}
                />
                Auto-save files
              </label>
            </div>
            <div className="setting-item">
              <label>Max Log Size (MB)</label>
              <input type="number" defaultValue="100" />
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="settings-panel">
            <h2>About KrikitOS</h2>
            <div className="about-info">
              <p><strong>KrikitOS v1.0</strong></p>
              <p>A feature-rich browser-based operating system</p>
              <p>Built with React and modern web technologies</p>
              <hr />
              <p><strong>Features:</strong></p>
              <ul>
                <li>Windowed application system</li>
                <li>Terminal emulator with commands</li>
                <li>File manager</li>
                <li>System monitoring</li>
                <li>Network scanner</li>
                <li>Text editor</li>
                <li>Web browser</li>
                <li>Calculator</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
