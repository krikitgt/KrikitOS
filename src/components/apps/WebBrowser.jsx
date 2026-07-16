import React, { useState } from 'react';
import '../../styles/apps/webbrowser.css';

const BOOKMARKS = [
  { title: 'Google', url: 'https://google.com' },
  { title: 'GitHub', url: 'https://github.com' },
  { title: 'MDN', url: 'https://developer.mozilla.org' },
  { title: 'Stack Overflow', url: 'https://stackoverflow.com' },
];

export default function WebBrowser() {
  const [url, setUrl] = useState('https://google.com');
  const [history, setHistory] = useState([url]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = (newUrl) => {
    setIsLoading(true);
    setTimeout(() => {
      setUrl(newUrl);
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newUrl);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setIsLoading(false);
    }, 500);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setUrl(history[historyIndex - 1]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setUrl(history[historyIndex + 1]);
    }
  };

  return (
    <div className="web-browser">
      <div className="browser-toolbar">
        <button onClick={handleBack} disabled={historyIndex === 0} className="browser-btn">◀</button>
        <button onClick={handleForward} disabled={historyIndex === history.length - 1} className="browser-btn">▶</button>
        <button onClick={() => handleNavigate(url)} className="browser-btn">🔄</button>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleNavigate(url)}
          className="address-bar"
          placeholder="Enter URL..."
        />
      </div>

      <div className="browser-bookmarks">
        {BOOKMARKS.map((bookmark, idx) => (
          <button
            key={idx}
            className="bookmark"
            onClick={() => handleNavigate(bookmark.url)}
            title={bookmark.url}
          >
            ⭐ {bookmark.title}
          </button>
        ))}
      </div>

      {isLoading && <div className="browser-loading">Loading...</div>}

      <div className="browser-content">
        <div className="browser-message">
          <p>🌐 Web Browser</p>
          <p>This is a simulated browser for demonstration</p>
          <p>Current URL: <code>{url}</code></p>
        </div>
      </div>
    </div>
  );
}
