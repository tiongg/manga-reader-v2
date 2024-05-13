import { LogBox } from 'react-native';

//https://docs.swmansion.com/react-native-reanimated/docs/guides/troubleshooting/#reduced-motion-setting-is-enabled-on-this-device
LogBox.ignoreLogs([
  '[Reanimated] Reduced motion setting is enabled on this device.',
]);
