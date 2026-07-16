import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import '../../styles/apps/systemmonitor.css';

export default function SystemMonitor() {
  const { systemStats } = useOS();
  const [stats, setStats] = useState(systemStats);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpuUsage: Math.random() * 100,
        memoryUsage: Math.random() * 100,
        diskUsage: Math.random() * 100,
        uptime: Math.floor(Math.random() * 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ label, value, unit, color }) => (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={{ color }}>
        {value.toFixed(1)}{unit}
      </div>
      <div className="stat-bar">
        <div
          className="stat-fill"
          style={{ width: `${value}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="system-monitor">
      <div className="monitor-header">
        <h2>📊 System Monitor</h2>
      </div>

      <div className="stats-grid">
        <StatCard label="CPU Usage" value={stats.cpuUsage} unit="%" color="#00ff41" />
        <StatCard label="Memory" value={stats.memoryUsage} unit="%" color="#00d9ff" />
        <StatCard label="Disk" value={stats.diskUsage} unit="%" color="#8b00ff" />
      </div>

      <div className="system-info">
        <div className="info-section">
          <h3>🖥️ System Information</h3>
          <div className="info-item">
            <span className="info-label">OS:</span>
            <span className="info-value">KrikitOS v1.0</span>
          </div>
          <div className="info-item">
            <span className="info-label">Uptime:</span>
            <span className="info-value">{stats.uptime} minutes</span>
          </div>
          <div className="info-item">
            <span className="info-label">Kernel:</span>
            <span className="info-value">Krikit 1.0</span>
          </div>
          <div className="info-item">
            <span className="info-label">Shell:</span>
            <span className="info-value">zsh</span>
          </div>
        </div>

        <div className="info-section">
          <h3>💾 Storage</h3>
          <div className="info-item">
            <span className="info-label">Total RAM:</span>
            <span className="info-value">16 GB</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total Storage:</span>
            <span className="info-value">512 GB</span>
          </div>
          <div className="info-item">
            <span className="info-label">CPU Cores:</span>
            <span className="info-value">8</span>
          </div>
          <div className="info-item">
            <span className="info-label">CPU Speed:</span>
            <span className="info-value">3.6 GHz</span>
          </div>
        </div>
      </div>
    </div>
  );
}
