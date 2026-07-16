import React, { useState } from 'react';
import '../../styles/apps/texteditor.css';

export default function TextEditor() {
  const [content, setContent] = useState('Welcome to KrikitOS Text Editor!\n\nStart typing here...');
  const [fileName, setFileName] = useState('untitled.txt');
  const [isSaved, setIsSaved] = useState(true);

  const handleChange = (e) => {
    setContent(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    console.log('File saved:', fileName);
    setIsSaved(true);
  };

  const handleNew = () => {
    setContent('');
    setFileName('untitled.txt');
    setIsSaved(true);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="text-editor">
      <div className="editor-toolbar">
        <div className="editor-file-info">
          <span className="file-name">{fileName}</span>
          {!isSaved && <span className="unsaved-indicator">●</span>}
        </div>
        <div className="editor-buttons">
          <button onClick={handleNew} title="New file">📄 New</button>
          <button onClick={handleSave} title="Save file">💾 Save</button>
          <button onClick={handleDownload} title="Download file">⬇️ Download</button>
        </div>
      </div>

      <textarea
        className="editor-textarea"
        value={content}
        onChange={handleChange}
        spellCheck="false"
      />

      <div className="editor-status">
        <span>Lines: {content.split('\n').length}</span>
        <span>Characters: {content.length}</span>
      </div>
    </div>
  );
}
