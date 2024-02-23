import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.artp.myapp',
  appName: 'myApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
