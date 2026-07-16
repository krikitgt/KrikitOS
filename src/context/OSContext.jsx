import React, { createContext, useState, useContext } from 'react';

const OSContext = createContext();

export const OSProvider = ({ children }) => {
  const [files, setFiles] = useState({
    '/home/user': {
      name: 'user',
      type: 'folder',
      children: {
        'Documents': { name: 'Documents', type: 'folder', children: {} },
        'Downloads': { name: 'Downloads', type: 'folder', children: {} },
        'Desktop': { name: 'Desktop', type: 'folder', children: {} },
        'Pictures': { name: 'Pictures', type: 'folder', children: {} },
        'notes.txt': { name: 'notes.txt', type: 'file', content: 'Welcome to KrikitOS!' },
        'script.sh': { name: 'script.sh', type: 'file', content: '#!/bin/bash\\necho "Hello from KrikitOS"' },
      },
    },
  });

  const [settings, setSettings] = useState({
    theme: 'dark',
    username: 'root',
    hostname: 'KrikitOS',
    language: 'en',
    autoSave: true,
  });

  const [systemStats, setSystemStats] = useState({
    cpuUsage: Math.random() * 100,
    memoryUsage: Math.random() * 100,
    diskUsage: Math.random() * 100,
    uptime: Math.floor(Math.random() * 1000),
  });

  return (
    <OSContext.Provider value={{ files, setFiles, settings, setSettings, systemStats, setSystemStats }}>
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within OSProvider');
  }
  return context;
};
