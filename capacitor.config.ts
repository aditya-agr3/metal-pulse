import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b2ac82a7b8454e53b6638ad2f84ce17f',
  appName: 'Metal Price Tracker',
  webDir: 'dist',
  server: {
    url: 'https://b2ac82a7-b845-4e53-b663-8ad2f84ce17f.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a0f0a',
      showSpinner: false
    }
  }
};

export default config;