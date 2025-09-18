// Application State
const AppState = {
  currentView: 'dashboard',
  coins: 1250,
  userName: 'Krishi Mitra',
  userLevel: 8,
  selectedLanguage: 'en',
  
  // Farm Stats
  farmStats: {
    cropsGrown: 127,
    experiencePoints: 8450,
    nextLevelXP: 10000,
    sustainabilityScore: 92,
    dailyStreak: 15,
    plantsWatered: 340,
    co2Reduced: 2.4,
    soilHealth: 88
  },
  
  // Achievements
  achievements: [
    { name: "Green Thumb", description: "Grew 100 plants", icon: "🌱", unlocked: true },
    { name: "Water Wise", description: "Saved 500L of water", icon: "💧", unlocked: true },
    { name: "Soil Master", description: "Improved soil health by 50%", icon: "🌍", unlocked: false },
    { name: "Eco Warrior", description: "Reduced CO2 by 5kg", icon: "🌿", unlocked: false }
  ]
};

// DOM Elements
const elements = {
  navBtns: document.querySelectorAll('.nav-btn, .nav-btn-mobile'),
  views: document.querySelectorAll('.view'),
  coinsAmount: document.getElementById('coins-amount'),
  languageSelect: document.getElementById('language-select'),
  actionBtns: document.querySelectorAll('.action-btn'),
  toastContainer: document.getElementById('toast-container')
};

// Initialize Application
function initApp() {
  setupNavigation();
  setupLanguageSelector();
  setupActionButtons();
  updateUI();
  showToast('Welcome to Krishi Mitra!', 'success');
}

// Navigation Setup
function setupNavigation() {
  elements.navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const view = e.currentTarget.getAttribute('data-view');
      if (view) {
        navigateToView(view);
      }
    });
  });
}

// Language Selector Setup
function setupLanguageSelector() {
  if (elements.languageSelect) {
    elements.languageSelect.addEventListener('change', (e) => {
      AppState.selectedLanguage = e.target.value;
      updateLanguage();
      showToast(`Language changed to ${getLanguageName(e.target.value)}`, 'info');
    });
  }
}

// Action Buttons Setup
function setupActionButtons() {
  elements.actionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = e.currentTarget.getAttribute('data-action');
      if (action) {
        handleAction(action);
      }
    });
  });
}

// Navigation Functions
function navigateToView(viewName) {
  // Update state
  AppState.currentView = viewName;
  
  // Update navigation buttons
  elements.navBtns.forEach(btn => {
    const btnView = btn.getAttribute('data-view');
    if (btnView === viewName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Update views
  elements.views.forEach(view => {
    if (view.id === `${viewName}-view`) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });
  
  // Load enhanced content for non-dashboard views
  if (viewName !== 'dashboard') {
    loadViewContent(viewName);
  }
  
  // Update page title
  document.title = `${getViewTitle(viewName)} - Sustainable Farming Platform`;
  
  // Show toast
  showToast(`Switched to ${getViewTitle(viewName)}`, 'info');
}

// Action Handlers
function handleAction(action) {
  switch (action) {
    case 'game':
      navigateToView('game');
      break;
    case 'library':
      navigateToView('library');
      break;
    case 'leaderboard':
      navigateToView('leaderboard');
      break;
    case 'store':
      navigateToView('store');
      break;
    default:
      console.log(`Unknown action: ${action}`);
  }
}

// UI Update Functions
function updateUI() {
  updateCoinsDisplay();
  updateLanguage();
  updateProgressBars();
}

function updateCoinsDisplay() {
  if (elements.coinsAmount) {
    elements.coinsAmount.textContent = AppState.coins.toLocaleString();
  }
}

function updateLanguage() {
  if (elements.languageSelect) {
    elements.languageSelect.value = AppState.selectedLanguage;
  }
}

function updateProgressBars() {
  // Update experience progress
  const expProgress = document.querySelector('.progress-fill');
  if (expProgress) {
    const expPercentage = (AppState.farmStats.experiencePoints / AppState.farmStats.nextLevelXP) * 100;
    expProgress.style.width = `${expPercentage}%`;
  }
  
  // Update sustainability progress
  const susProgress = document.querySelectorAll('.progress-fill')[1];
  if (susProgress) {
    susProgress.style.width = `${AppState.farmStats.sustainabilityScore}%`;
  }
}

// Utility Functions
function getViewTitle(viewName) {
  const titles = {
    dashboard: 'Dashboard',
    game: 'Farm Game',
    library: 'Farming Library',
    leaderboard: 'Leaderboard',
    store: 'Government Store'
  };
  return titles[viewName] || 'Unknown View';
}

function getLanguageName(langCode) {
  const languages = {
    en: 'English',
    hi: 'हिन्दी',
    ta: 'தமிழ்',
    te: 'తెలుగు'
  };
  return languages[langCode] || 'Unknown Language';
}

// Toast Notification System
function showToast(message, type = 'info', duration = 3000) {
  const toast = createToast(message, type);
  elements.toastContainer.appendChild(toast);
  
  // Auto remove after duration
  setTimeout(() => {
    removeToast(toast);
  }, duration);
}

function createToast(message, type) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = getToastIcon(type);
  const color = getToastColor(type);
  
  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="color: ${color};">${icon}</span>
      <span>${message}</span>
    </div>
  `;
  
  // Add click to dismiss
  toast.addEventListener('click', () => {
    removeToast(toast);
  });
  
  return toast;
}

function removeToast(toast) {
  if (toast && toast.parentNode) {
    toast.style.animation = 'slideOut 0.3s ease-in forwards';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }
}

function getToastIcon(type) {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };
  return icons[type] || icons.info;
}

function getToastColor(type) {
  const colors = {
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  };
  return colors[type] || colors.info;
}

// Game Functions
function startFarmGame() {
  navigateToView('game');
  showToast('Welcome to the Farm Game!', 'success');
}

function openLibrary() {
  navigateToView('library');
  showToast('Opening Farming Library...', 'info');
}

function viewLeaderboard() {
  navigateToView('leaderboard');
  showToast('Loading Leaderboard...', 'info');
}

function openStore() {
  navigateToView('store');
  showToast('Opening Government Store...', 'info');
}

// Enhanced View Content
function loadViewContent(viewName) {
  const viewElement = document.getElementById(`${viewName}-view`);
  if (!viewElement) return;
  
  switch (viewName) {
    case 'game':
      loadGameContent(viewElement);
      break;
    case 'library':
      loadLibraryContent(viewElement);
      break;
    case 'leaderboard':
      loadLeaderboardContent(viewElement);
      break;
    case 'store':
      loadStoreContent(viewElement);
      break;
  }
}

function loadGameContent(container) {
  container.innerHTML = `
    <div class="game-container">
      <h2 class="view-title">🌱 Farm Game</h2>
      <p class="view-subtitle">Virtual farming simulation</p>
      
      <div class="game-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
        <div class="game-card" style="background: rgba(255, 255, 255, 0.9); padding: 1.5rem; border-radius: 0.75rem; border: 1px solid #e5e7eb;">
          <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: #16a34a;">🌾 Crop Management</h3>
          <p style="color: #6b7280; margin-bottom: 1rem;">Plant and manage different crops in your virtual farm.</p>
          <button onclick="simulateCropPlanting()" style="background: #16a34a; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer; font-weight: 500;">Plant Crops</button>
        </div>
        
        <div class="game-card" style="background: rgba(255, 255, 255, 0.9); padding: 1.5rem; border-radius: 0.75rem; border: 1px solid #e5e7eb;">
          <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: #2563eb;">💧 Water Management</h3>
          <p style="color: #6b7280; margin-bottom: 1rem;">Optimize water usage for sustainable farming.</p>
          <button onclick="simulateWatering()" style="background: #2563eb; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer; font-weight: 500;">Water Plants</button>
        </div>
        
        <div class="game-card" style="background: rgba(255, 255, 255, 0.9); padding: 1.5rem; border-radius: 0.75rem; border: 1px solid #e5e7eb;">
          <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: #f97316;">🌍 Soil Health</h3>
          <p style="color: #6b7280; margin-bottom: 1rem;">Monitor and improve soil conditions.</p>
          <button onclick="simulateSoilCare()" style="background: #f97316; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer; font-weight: 500;">Care for Soil</button>
        </div>
      </div>
    </div>
  `;
}

function loadLibraryContent(container) {
  container.innerHTML = `
    <div class="library-container">
      <h2 class="view-title">📚 Farming Library</h2>
      <p class="view-subtitle">Educational resources and guides</p>
      
      <div class="library-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
        <div class="library-card" style="background: rgba(255, 255, 255, 0.9); padding: 1.5rem; border-radius: 0.75rem; border: 1px solid #e5e7eb;">
          <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: #16a34a;">🌱 Sustainable Farming</h3>
          <p style="color: #6b7280; margin-bottom: 1rem;">Learn about eco-friendly farming practices.</p>
          <button onclick="showToast('Opening Sustainable Farming Guide...', 'info')" style="background: #16a34a; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer; font-weight: 500;">Read Guide</button>
        </div>
        
        <div class="library-card" style="background: rgba(255, 255, 255, 0.9); padding: 1.5rem; border-radius: 0.75rem; border: 1px solid #e5e7eb;">
          <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: #2563eb;">💧 Water Conservation</h3>
          <p style="color: #6b7280; margin-bottom: 1rem;">Techniques for efficient water usage.</p>
          <button onclick="showToast('Opening Water Conservation Guide...', 'info')" style="background: #2563eb; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer; font-weight: 500;">Read Guide</button>
        </div>
        
        <div class="library-card" style="background: rgba(255, 255, 255, 0.9); padding: 1.5rem; border-radius: 0.75rem; border: 1px solid #e5e7eb;">
          <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: #f97316;">🌍 Soil Management</h3>
          <p style="color: #6b7280; margin-bottom: 1rem;">Improve soil health and fertility.</p>
          <button onclick="showToast('Opening Soil Management Guide...', 'info')" style="background: #f97316; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer; font-weight: 500;">Read Guide</button>
        </div>
      </div>
    </div>
  `;
}

function loadLeaderboardContent(container) {
  const leaderboardData = [
    { name: 'Green Farmer', level: 15, score: 2500, location: 'Punjab' },
    { name: 'Eco Warrior', level: 12, score: 2200, location: 'Kerala' },
    { name: 'Soil Master', level: 10, score: 2000, location: 'Tamil Nadu' },
    { name: 'Krishi Mitra', level: 8, score: 1800, location: 'Your Location' },
    { name: 'Water Wise', level: 7, score: 1600, location: 'Karnataka' }
  ];
  
  container.innerHTML = `
    <div class="leaderboard-container">
      <h2 class="view-title">🏆 Global Leaderboard</h2>
      <p class="view-subtitle">Top sustainable farmers worldwide</p>
      
      <div class="leaderboard-table" style="background: rgba(255, 255, 255, 0.9); border-radius: 0.75rem; padding: 1.5rem; margin-top: 2rem; border: 1px solid #e5e7eb;">
        <div style="display: grid; grid-template-columns: 60px 1fr 80px 100px; gap: 1rem; padding: 0.75rem; font-weight: 600; color: #6b7280; border-bottom: 1px solid #e5e7eb;">
          <div>Rank</div>
          <div>Farmer</div>
          <div>Level</div>
          <div>Score</div>
        </div>
        ${leaderboardData.map((farmer, index) => `
          <div style="display: grid; grid-template-columns: 60px 1fr 80px 100px; gap: 1rem; padding: 0.75rem; border-bottom: 1px solid #f3f4f6; align-items: center;">
            <div style="font-weight: 600; color: ${index < 3 ? '#f59e0b' : '#6b7280'};">#${index + 1}</div>
            <div>
              <div style="font-weight: 500;">${farmer.name}</div>
              <div style="font-size: 0.875rem; color: #6b7280;">${farmer.location}</div>
            </div>
            <div style="font-weight: 500;">${farmer.level}</div>
            <div style="font-weight: 500;">${farmer.score.toLocaleString()}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function loadStoreContent(container) {
  container.innerHTML = `
    <div class="store-container">
      <h2 class="view-title">🏪 Government Store</h2>
      <p class="view-subtitle">Official resources and tools</p>
      
      <div class="store-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
        <div class="store-card" style="background: rgba(255, 255, 255, 0.9); padding: 1.5rem; border-radius: 0.75rem; border: 1px solid #e5e7eb;">
          <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: #16a34a;">🌾 Seeds & Tools</h3>
          <p style="color: #6b7280; margin-bottom: 1rem;">High-quality seeds and farming equipment.</p>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span style="font-weight: 600; color: #16a34a;">50 coins</span>
            <span style="font-size: 0.875rem; color: #6b7280;">In Stock</span>
          </div>
          <button onclick="purchaseItem('seeds', 50)" style="background: #16a34a; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer; font-weight: 500; width: 100%;">Purchase</button>
        </div>
        
        <div class="store-card" style="background: rgba(255, 255, 255, 0.9); padding: 1.5rem; border-radius: 0.75rem; border: 1px solid #e5e7eb;">
          <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: #2563eb;">💧 Irrigation System</h3>
          <p style="color: #6b7280; margin-bottom: 1rem;">Smart irrigation for water efficiency.</p>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span style="font-weight: 600; color: #2563eb;">200 coins</span>
            <span style="font-size: 0.875rem; color: #6b7280;">In Stock</span>
          </div>
          <button onclick="purchaseItem('irrigation', 200)" style="background: #2563eb; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer; font-weight: 500; width: 100%;">Purchase</button>
        </div>
        
        <div class="store-card" style="background: rgba(255, 255, 255, 0.9); padding: 1.5rem; border-radius: 0.75rem; border: 1px solid #e5e7eb;">
          <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: #f97316;">🌍 Soil Testing Kit</h3>
          <p style="color: #6b7280; margin-bottom: 1rem;">Professional soil analysis tools.</p>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span style="font-weight: 600; color: #f97316;">150 coins</span>
            <span style="font-size: 0.875rem; color: #6b7280;">In Stock</span>
          </div>
          <button onclick="purchaseItem('soil-kit', 150)" style="background: #f97316; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer; font-weight: 500; width: 100%;">Purchase</button>
        </div>
      </div>
    </div>
  `;
}

// Game Simulation Functions
function simulateCropPlanting() {
  AppState.farmStats.cropsGrown += 5;
  updateCoins(25);
  showToast('Planted 5 crops! +25 coins', 'success');
  updateUI();
}

function simulateWatering() {
  AppState.farmStats.plantsWatered += 20;
  updateCoins(15);
  showToast('Watered plants efficiently! +15 coins', 'success');
  updateUI();
}

function simulateSoilCare() {
  AppState.farmStats.soilHealth = Math.min(100, AppState.farmStats.soilHealth + 2);
  updateCoins(20);
  showToast('Improved soil health! +20 coins', 'success');
  updateUI();
}

// Store Functions
function purchaseItem(item, cost) {
  if (AppState.coins >= cost) {
    updateCoins(-cost);
    showToast(`Purchased ${item} for ${cost} coins!`, 'success');
  } else {
    showToast('Not enough coins!', 'error');
  }
}

// Coin Management
function updateCoins(amount) {
  AppState.coins = Math.max(0, AppState.coins + amount);
  updateCoinsDisplay();
  
  if (amount > 0) {
    showToast(`+${amount} coins earned!`, 'success');
  } else if (amount < 0) {
    showToast(`${Math.abs(amount)} coins spent`, 'info');
  }
}

// Achievement System
function checkAchievements() {
  AppState.achievements.forEach(achievement => {
    if (!achievement.unlocked) {
      if (checkAchievementCondition(achievement)) {
        unlockAchievement(achievement);
      }
    }
  });
}

function checkAchievementCondition(achievement) {
  switch (achievement.name) {
    case 'Green Thumb':
      return AppState.farmStats.cropsGrown >= 100;
    case 'Water Wise':
      return AppState.farmStats.plantsWatered >= 500;
    case 'Soil Master':
      return AppState.farmStats.soilHealth >= 95;
    case 'Eco Warrior':
      return AppState.farmStats.co2Reduced >= 5;
    default:
      return false;
  }
}

function unlockAchievement(achievement) {
  achievement.unlocked = true;
  showToast(`Achievement Unlocked: ${achievement.name}!`, 'success');
  updateCoins(100); // Reward coins for achievement
}

// Local Storage Functions
function saveAppState() {
  try {
    localStorage.setItem('krishi-mitra-state', JSON.stringify(AppState));
  } catch (error) {
    console.error('Failed to save app state:', error);
  }
}

function loadAppState() {
  try {
    const savedState = localStorage.getItem('krishi-mitra-state');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      Object.assign(AppState, parsedState);
    }
  } catch (error) {
    console.error('Failed to load app state:', error);
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  loadAppState();
  initApp();
});

// Save state on page unload
window.addEventListener('beforeunload', saveAppState);

// Auto-save state every 30 seconds
setInterval(saveAppState, 30000);

// Add CSS for toast animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .toast {
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .toast:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  }
`;
document.head.appendChild(style);

// Export functions for global access
window.KrishiMitra = {
  navigateToView,
  updateCoins,
  showToast,
  startFarmGame,
  openLibrary,
  viewLeaderboard,
  openStore
};
