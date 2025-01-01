import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Capacitor } from '@capacitor/core';

// Platform detection
const isPlatform = Capacitor.isNativePlatform();
console.log('Running on:', isPlatform ? 'Native Platform' : 'Web Platform');

// Initialize PWA elements - doing this asynchronously to avoid build issues
const initPWAElements = async () => {
  try {
    const { defineCustomElements } = await import('@ionic/pwa-elements/loader');
    defineCustomElements(window);
  } catch (error) {
    console.error('Failed to load PWA elements:', error);
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