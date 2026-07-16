import React, { useState } from 'react';
import Terminal from './apps/Terminal';
import FileManager from './apps/FileManager';
import SystemMonitor from './apps/SystemMonitor';
import NetworkScanner from './apps/NetworkScanner';
import TextEditor from './apps/TextEditor';
import Settings from './apps/Settings';
import WebBrowser from './apps/WebBrowser';
import Calculator from './apps/Calculator';
import '../styles/window.css';

const APP_COMPONENTS = {
  terminal: Terminal,
  files: FileManager,
  monitor: SystemMonitor,
  scanner: NetworkScanner,
  editor: TextEditor,
  settings: Settings,
  browser: WebBrowser,
  calculator: Calculator,
};

export default function Window({
  window,
  isActive,
  onClose,
  onMinimize,
  onBringToFront,
}) {
  const [position, setPosition] = useState({ x: window.x, y: window.y });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onBringToFront();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const AppComponent = APP_COMPONENTS[window.appId] || Terminal;

  return (
    <div
      className={`window ${isActive ? 'active' : ''} ${
        window.isMinimized ? 'minimized' : ''
      }`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: isActive ? 1000 : 100,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="window-titlebar" onMouseDown={handleMouseDown}>
        <div className="window-title">
          <span className="window-icon">{window.appIcon}</span>
          <span className="window-name">{window.appName}</span>
        </div>
        <div className="window-controls">
          <button className="window-btn minimize-btn" onClick={onMinimize} title="Minimize">
            _
          </button>
          <button className="window-btn maximize-btn" title="Maximize">
            □
          </button>
          <button className="window-btn close-btn" onClick={onClose} title="Close">
            ✕
          </button>
        </div>
      </div>
      {!window.isMinimized && (
        <div className="window-content">
          <AppComponent windowId={window.id} />
        </div>
      )}
    </div>
  );
}
