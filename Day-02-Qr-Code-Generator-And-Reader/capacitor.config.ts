import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b639fbb0672b41beb85348d802d757f7',
  appName: 'reel-kitap-yuvam',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'https://b639fbb0-672b-41be-b853-48d802d757f7.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera']
    }
  }
};

export default config;