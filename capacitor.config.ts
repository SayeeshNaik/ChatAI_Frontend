import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.chatapp.app',
  appName: 'chatapp',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
