# Sustainable Farming Platform - HTML/CSS/JavaScript Version

This is a converted version of the React/TypeScript Sustainable Farming Platform, now built with pure HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, modern interface with smooth animations
- **Multi-language Support**: English, Hindi, Tamil, and Telugu
- **Interactive Dashboard**: Real-time stats and progress tracking
- **Achievement System**: Gamified farming experience
- **Toast Notifications**: User feedback system
- **Local Storage**: Persistent data storage
- **Progressive Enhancement**: Works without JavaScript (basic functionality)

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # All CSS styles and responsive design
├── script.js           # JavaScript application logic
└── README.md          # This file
```

## Getting Started

1. **Clone or download** the files to your local machine
2. **Open `index.html`** in any modern web browser
3. **No build process required** - it's ready to run!

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Features Implemented

### ✅ Completed
- [x] Main HTML structure with header, navigation, and content areas
- [x] CSS conversion from Tailwind to vanilla CSS with custom properties
- [x] JavaScript application state management and routing
- [x] Dashboard component functionality
- [x] Responsive design and mobile navigation
- [x] Interactive features and animations

### 🚧 Placeholder Views
- [ ] Farm Game component functionality
- [ ] Library component functionality  
- [ ] Leaderboard component functionality
- [ ] Government Store component functionality

## Key Components

### Header
- Logo and branding
- Navigation menu (desktop and mobile)
- Language selector
- User profile and coins display

### Dashboard
- Welcome section with user stats
- Statistics cards (crops grown, water saved, CO₂ reduced, soil health)
- Progress bars for experience and sustainability
- Achievement system
- Quick action buttons

### Navigation
- Single Page Application (SPA) routing
- Active state management
- Mobile-responsive hamburger menu

### State Management
- Application state in JavaScript
- Local storage persistence
- Real-time UI updates

## Customization

### Colors
All colors are defined as CSS custom properties in `:root`:
```css
:root {
  --color-green-600: #16a34a;
  --color-blue-600: #2563eb;
  /* ... more colors */
}
```

### Typography
Font sizes and weights are customizable:
```css
:root {
  --font-size-lg: 1.125rem;
  --font-weight-semibold: 600;
  /* ... more typography */
}
```

### Spacing
Consistent spacing system:
```css
:root {
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  /* ... more spacing */
}
```

## JavaScript API

The application exposes a global `KrishiMitra` object with useful methods:

```javascript
// Navigate to different views
KrishiMitra.navigateToView('game');

// Update coins
KrishiMitra.updateCoins(100);

// Show notifications
KrishiMitra.showToast('Hello World!', 'success');

// Access game functions
KrishiMitra.startFarmGame();
```

## Performance

- **No external dependencies** (except Google Fonts)
- **Optimized CSS** with custom properties
- **Efficient JavaScript** with event delegation
- **Responsive images** and SVG icons
- **Minimal bundle size** (~50KB total)

## Future Enhancements

1. **Farm Game**: Interactive farming simulation
2. **Library**: Educational content and resources
3. **Leaderboard**: Global rankings and competitions
4. **Store**: Government resources and tools
5. **Offline Support**: Service worker for offline functionality
6. **PWA Features**: Installable web app

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests!