import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';

// Platform detection
const isPlatform = Capacitor.isNativePlatform();
console.log('Running on:', isPlatform ? 'Native Platform' : 'Web Platform');

// Initialize PWA elements asynchronously
const initPWAElements = async () => {
  if (isPlatform) {
    try {
      const { defineCustomElements } = await import('@ionic/pwa-elements/loader');
      await defineCustomElements(window);
      // Hide splash screen after initialization
      await SplashScreen.hide();
    } catch (error) {
      console.error('Failed to load PWA elements:', error);
    }
  }
};

// Call the initialization
initPWAElements();

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);