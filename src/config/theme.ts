import { config as defaultConfig } from '@gluestack-ui/config';
import { createConfig } from '@gluestack-ui/themed';

/*Original colors:
    words1: '#ffffff'
    words2: '#bebebe'
    bg1: '#131313'
    bg2: '#212121'
    bg3: '#252525'
    bg4: '#3b3b3b'
    bg5: '#303030'
 */

//https://gluestack.io/ui/docs/theme-configuration/customizing-theme/eject-library
export const theme = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    fontSizes: {
      ...defaultConfig.tokens.fontSizes,
    },
    lineHeights: {
      ...defaultConfig.tokens.lineHeights,
    },
    colors: {
      ...defaultConfig.tokens.colors,
      // words1: '#ffffff',
      // words2: '#bebebe',
      backgroundDark950: '#131313',
      backgroundDark900: '#212121',
      backgroundDark800: '#252525',
      backgroundDark700: '#303030',
      backgroundDark600: '#3b3b3b',
      borderDark700: '#3b3b3b',
      btn: '#4b9bfc',
    },
  },
});

export const colors = theme.tokens.colors;
