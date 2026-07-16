import React, { useState, useCallback } from 'react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import { OSProvider } from './context/OSContext';
import './styles/app.css';

function App() {
  const [windows, setWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [windowCounter, setWindowCounter] = useState(0);

  const openApp = useCallback((appId, appName, appIcon) => {
    const newWindow = {
      id: `${appId}-${windowCounter}`,
      appId,
      appName,
      appIcon,
      x: Math.random() * 200 + 50,
      y: Math.random() * 200 + 50,
      isMinimized: false,
    };
    setWindows((prev) => [...prev, newWindow]);
    setActiveWindow(newWindow.id);
    setWindowCounter((prev) => prev + 1);
  }, [windowCounter]);

  const closeWindow = useCallback((windowId) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
    if (activeWindow === windowId) {
      setActiveWindow(null);
    }
  }, [activeWindow]);

  const minimizeWindow = useCallback((windowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, isMinimized: !w.isMinimized } : w))
    );
  }, []);

  const bringToFront = useCallback((windowId) => {
    setActiveWindow(windowId);
  }, []);

  const onWindowClick = useCallback((windowId) => {
    const window = windows.find((w) => w.id === windowId);
    if (window?.isMinimized) {
      setWindows((prev) =>
        prev.map((w) => (w.id === windowId ? { ...w, isMinimized: false } : w))
      );
    }
    setActiveWindow(windowId);
  }, [windows]);

  return (
    <OSProvider>
      <div className="os-container">
        <Desktop
          windows={windows}
          activeWindow={activeWindow}
          onCloseWindow={closeWindow}
          onMinimizeWindow={minimizeWindow}
          onBringToFront={bringToFront}
        />
        <Taskbar
          windows={windows}
          openApp={openApp}
          activeWindow={activeWindow}
          onWindowClick={onWindowClick}
        />
      </div>
    </OSProvider>
  );
}

export default App;
