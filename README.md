# KrikitOS - Browser Operating System

A full-featured operating system built entirely in the browser using React. KrikitOS provides a complete desktop environment with multiple applications, windowed interface, and a command-line terminal.

## Features

✨ **Core Features:**
- Draggable windowed application system
- Dynamic taskbar with app launcher
- Multi-window management with z-index layering
- Minimize/maximize/close window controls
- System tray with clock and network status

🚀 **Built-in Applications:**
1. **Terminal** - Command emulator with built-in commands (help, ls, pwd, cd, date, echo, neofetch, mkdir, touch)
2. **File Manager** - Browse and navigate the virtual file system
3. **System Monitor** - Real-time CPU, memory, and disk usage monitoring
4. **Network Scanner** - Scan and display network devices
5. **Text Editor** - Create and edit text files with download capability
6. **Settings** - Customize system preferences (username, hostname, theme, language)
7. **Web Browser** - Simulated browser with bookmarks and history
8. **Calculator** - Full-featured calculator with basic operations

## Tech Stack

- **Framework:** React 18.2
- **Build Tool:** Webpack 5
- **Transpiler:** Babel
- **Styling:** Pure CSS with CSS Variables
- **State Management:** React Context API
- **Language:** JavaScript (ES6+)

## Project Structure

```
KrikitOS/
├── public/
│   └── index.html           # HTML template
├── src/
│   ├── index.js            # React entry point
│   ├── App.jsx             # Main app component with window management
│   ├── components/
│   │   ├── Desktop.jsx     # Desktop background and window container
│   │   ├── Taskbar.jsx     # Taskbar with app launcher
│   │   ├── Window.jsx      # Window wrapper with drag functionality
│   │   └── apps/           # Individual app components
│   │       ├── Terminal.jsx
│   │       ├── FileManager.jsx
│   │       ├── SystemMonitor.jsx
│   │       ├── NetworkScanner.jsx
│   │       ├── TextEditor.jsx
│   │       ├── Settings.jsx
│   │       ├── WebBrowser.jsx
│   │       └── Calculator.jsx
│   ├── context/
│   │   └── OSContext.jsx   # Global OS state management
│   └── styles/
│       ├── global.css      # Global styles and CSS variables
│       ├── app.css         # App container styles
│       ├── desktop.css     # Desktop styling
│       ├── taskbar.css     # Taskbar styling
│       ├── window.css      # Window styling
│       └── apps/           # Individual app stylesheets
├── package.json
├── webpack.config.js
└── .babelrc
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/krikitgt/KrikitOS.git
cd KrikitOS
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Available Scripts

- `npm start` - Start development server with auto-reload
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Watch files and rebuild on changes

## Usage

1. **Launch Apps:** Click the dragon logo (🐉 KrikitOS) button in the taskbar to open the app menu
2. **Open Windows:** Click any app icon to open a new window
3. **Manage Windows:** 
   - Drag the titlebar to move windows
   - Click minimize (_) to minimize
   - Click close (✕) to close
4. **Terminal:** Type `help` to see available commands
5. **File Manager:** Double-click folders to navigate

## Color Scheme

KrikitOS uses a Kali Linux-inspired dark theme:
- **Primary Black:** `#0a0e27`
- **Kali Green:** `#00ff41`
- **Kali Cyan:** `#00d9ff`
- **Purple:** `#8b00ff`
- **Accent Orange:** `#ff6600`

## Terminal Commands

```
help       - Show available commands
clear      - Clear terminal
whoami     - Display current user
pwd        - Print working directory
ls         - List files in directory
cd         - Change directory
date       - Show current date/time
echo       - Echo text
neofetch   - System information
mkdir      - Create directory
touch      - Create file
```

## Future Enhancements

- [ ] Real file system integration
- [ ] Persistent storage using localStorage
- [ ] More terminal commands
- [ ] Custom wallpapers
- [ ] Window snapping
- [ ] Keyboard shortcuts
- [ ] Themes (light/dark mode)
- [ ] More applications
- [ ] Application settings persistence
- [ ] Native file upload/download

## Performance Considerations

- Uses React hooks for state management
- CSS Grid and Flexbox for efficient layouts
- Optimized re-renders with useCallback
- Lazy loading of app components

## Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## License

MIT License - feel free to use for personal and commercial projects

## Author

Created by krikitgt

---

**Made with ❤️ in the browser**
