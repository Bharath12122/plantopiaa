import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.plantopiaa.app',
  appName: 'Plantopiaa',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    // Add any required Capacitor plugins configuration here
  }
};

export default config;