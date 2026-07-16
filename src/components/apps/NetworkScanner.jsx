import React, { useState } from 'react';
import '../../styles/apps/networkscanner.css';

const MOCK_DEVICES = [
  { ip: '192.168.1.1', hostname: 'router.local', status: 'online', mac: '00:1A:2B:3C:4D:5E' },
  { ip: '192.168.1.100', hostname: 'server-01', status: 'online', mac: '00:2B:3C:4D:5E:6F' },
  { ip: '192.168.1.101', hostname: 'workstation-02', status: 'online', mac: '00:3C:4D:5E:6F:7A' },
  { ip: '192.168.1.102', hostname: 'device-03', status: 'offline', mac: '00:4D:5E:6F:7A:8B' },
];

export default function NetworkScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState([]);
  const [network, setNetwork] = useState('192.168.1.0/24');

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setResults(MOCK_DEVICES);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="network-scanner">
      <div className="scanner-header">
        <h2>🔍 Network Scanner</h2>
      </div>

      <div className="scanner-controls">
        <div className="control-group">
          <label>Network Range:</label>
          <input
            type="text"
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            disabled={isScanning}
          />
        </div>
        <button onClick={handleScan} disabled={isScanning} className="scan-btn">
          {isScanning ? '🔄 Scanning...' : '▶️ Start Scan'}
        </button>
      </div>

      {isScanning && <div className="scan-progress">Scanning network...</div>}

      {results.length > 0 && (
        <div className="scanner-results">
          <table className="devices-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Hostname</th>
                <th>IP Address</th>
                <th>MAC Address</th>
              </tr>
            </thead>
            <tbody>
              {results.map((device, idx) => (
                <tr key={idx} className={`device-row ${device.status}`}>
                  <td>{device.status === 'online' ? '🟢' : '🔴'}</td>
                  <td>{device.hostname}</td>
                  <td>{device.ip}</td>
                  <td>{device.mac}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="scanner-stats">
            <span>Total Devices: {results.length}</span>
            <span>Online: {results.filter((d) => d.status === 'online').length}</span>
            <span>Offline: {results.filter((d) => d.status === 'offline').length}</span>
          </div>
        </div>
      )}
    </div>
  );
}
