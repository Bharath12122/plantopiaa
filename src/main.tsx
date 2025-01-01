import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import App from './App';
import './index.css';
import { Capacitor } from '@capacitor/core';

// Initialize PWA elements
defineCustomElements(window);

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

// Platform detection
const isPlatform = Capacitor.isNativePlatform();
console.log('Running on:', isPlatform ? 'Native Platform' : 'Web Platform');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);