import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import '../../styles/apps/filemanager.css';

export default function FileManager() {
  const { files } = useOS();
  const [currentPath, setCurrentPath] = useState('/home/user');
  const [selected, setSelected] = useState(null);

  const getCurrentItems = () => {
    const keys = currentPath.split('/').filter(Boolean);
    let current = files['/home/user'];
    for (let key of keys.slice(2)) {
      current = current.children?.[key];
      if (!current) return [];
    }
    return Object.values(current.children || {});
  };

  const handleDoubleClick = (item) => {
    if (item.type === 'folder') {
      setCurrentPath(`${currentPath}/${item.name}`);
      setSelected(null);
    }
  };

  const handleBack = () => {
    const parts = currentPath.split('/').filter(Boolean);
    if (parts.length > 2) {
      const newPath = '/' + parts.slice(0, -1).join('/');
      setCurrentPath(newPath);
      setSelected(null);
    }
  };

  const items = getCurrentItems();

  return (
    <div className="file-manager">
      <div className="fm-toolbar">
        <button onClick={handleBack} className="fm-btn" title="Go back">
          ← Back
        </button>
        <div className="fm-breadcrumb">
          <span className="fm-path">{currentPath}</span>
        </div>
        <div className="fm-actions">
          <button className="fm-btn" title="Refresh">🔄</button>
          <button className="fm-btn" title="New folder">+</button>
        </div>
      </div>

      <div className="fm-content">
        {items.length === 0 ? (
          <div className="fm-empty">
            <div>📡</div>
            <p>No files or folders</p>
          </div>
        ) : (
          <div className="fm-grid">
            {items.map((item) => (
              <div
                key={item.name}
                className={`fm-item ${selected === item.name ? 'selected' : ''}`}
                onClick={() => setSelected(item.name)}
                onDoubleClick={() => handleDoubleClick(item)}
              >
                <div className="fm-icon">
                  {item.type === 'folder' ? '📁' : '📄'}
                </div>
                <div className="fm-name">{item.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fm-status">
        <span>Showing {items.length} item(s)</span>
        {selected && <span className="fm-selected">Selected: {selected}</span>}
      </div>
    </div>
  );
}
