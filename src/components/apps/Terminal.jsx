import React, { useState, useRef, useEffect } from 'react';
import '../../styles/apps/terminal.css';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    { type: 'system', text: '╔═══════════════════════════════════╗' },
    { type: 'system', text: '║  KrikitOS v1.0 - Terminal       ║' },
    { type: 'system', text: '║  Type "help" for commands       ║' },
    { type: 'system', text: '╚═══════════════════════════════════╝' },
    { type: 'system', text: '' },
  ]);
  const [currentDir, setCurrentDir] = useState('/home/root');
  const endRef = useRef(null);
  const historyRef = useRef([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const newOutput = [...output];
    historyRef.current.push(trimmedCmd);
    setHistoryIndex(-1);

    newOutput.push({
      type: 'input',
      text: `${currentDir}$ ${trimmedCmd}`,
    });

    const [command, ...args] = trimmedCmd.split(' ');

    if (command === 'help') {
      newOutput.push({
        type: 'output',
        text: `Available commands:
  help       - Show this help message
  clear      - Clear terminal
  whoami     - Display current user
  pwd        - Print working directory
  ls         - List files in directory
  cd         - Change directory
  date       - Show current date/time
  echo       - Echo text
  neofetch   - System information
  mkdir      - Create directory
  touch      - Create file`,
      });
    } else if (command === 'clear') {
      setOutput([]);
      return;
    } else if (command === 'whoami') {
      newOutput.push({ type: 'output', text: 'root' });
    } else if (command === 'pwd') {
      newOutput.push({ type: 'output', text: currentDir });
    } else if (command === 'ls') {
      newOutput.push({
        type: 'output',
        text: 'Documents/  Downloads/  Desktop/  Pictures/  Videos/',
      });
    } else if (command === 'cd') {
      if (args[0] === '..') {
        const parts = currentDir.split('/').filter(Boolean);
        if (parts.length > 1) {
          setCurrentDir('/' + parts.slice(0, -1).join('/'));
        }
      } else if (args[0]) {
        setCurrentDir(currentDir + '/' + args[0]);
      }
    } else if (command === 'date') {
      newOutput.push({ type: 'output', text: new Date().toString() });
    } else if (command === 'neofetch') {
      newOutput.push({
        type: 'output',
        text: `                    ___
                   / __\\
      __ _ ___    / /    ___   ___
     / _  / _ \\  / /    / _ \\ / __|
    | (_| | (_) |/ /___ | (_) | (__ 
     \\__, |\\___/\\____/ \\___/ \\___|  v1.0
     |___/

    OS: KrikitOS
    Kernel: Krikit 1.0
    Memory: 16GB
    CPU: 8-Core Processor
    Browser: Chrome/Firefox`,
      });
    } else if (command === 'echo') {
      newOutput.push({ type: 'output', text: args.join(' ') });
    } else if (command === 'mkdir') {
      newOutput.push({
        type: 'output',
        text: `Directory '${args[0]}' created`,
      });
    } else if (command === 'touch') {
      newOutput.push({
        type: 'output',
        text: `File '${args[0]}' created`,
      });
    } else if (trimmedCmd !== '') {
      newOutput.push({
        type: 'error',
        text: `zsh: command not found: ${command}`,
      });
    }

    setOutput(newOutput);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < historyRef.current.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(historyRef.current[historyRef.current.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(historyRef.current[historyRef.current.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="terminal">
      <div className="terminal-output">
        {output.map((line, idx) => (
          <div key={idx} className={`terminal-line ${line.type}`}>
            {line.text.split('\n').map((t, i) => (
              <div key={i}>{t}</div>
            ))}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="terminal-input-line">
        <span className="terminal-prompt">{currentDir}$ </span>
        <input
          className="terminal-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      </div>
    </div>
  );
}
