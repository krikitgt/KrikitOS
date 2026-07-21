import React from 'react';
import Window from './Window';
import '../styles/desktop.css';

export default function Desktop({
  windows,
  activeWindow,
  onCloseWindow,
  onMinimizeWindow,
  onBringToFront,
}) {
  return (
    <div className="desktop">
      <div className="desktop-background">
        <div className="desktop-grid"></div>
        <div className="desktop-logo">Krikit-OS</div>
      </div>
      <div className="windows-container">
        {windows.map((win) => (
          <Window
            key={win.id}
            window={win}
            isActive={activeWindow === win.id}
            onClose={() => onCloseWindow(win.id)}
            onMinimize={() => onMinimizeWindow(win.id)}
            onBringToFront={() => onBringToFront(win.id)}
          />
        ))}
      </div>
    </div>
  );
}
