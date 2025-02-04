/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Colors = {
  charcoal: '#2F4858',
  carolinaBlue: '#86BBD8',
  lapisLazuli: '#33658A',
  teaGreen: '#C2EBC1',
  lightYellow: '#FAF8D4',
  white: '#FFFFFF',
  black: '#000000',
  gray050: '#F7F7F7',
  gray100: '#E1E1E1',
  gray200: '#CFCFCF',
  gray300: '#B1B1B1',
  gray400: '#9E9E9E',
  gray500: '#7E7E7E',
  gray600: '#626262',
  gray700: '#515151',
  gray800: '#3B3B3B',
  gray900: '#222222',

}

export const ThemeColors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: Colors.carolinaBlue,
    icon: Colors.gray600,
    tabIconDefault: Colors.gray600,
    tabIconSelected: Colors.carolinaBlue,
  },
  dark: {
    text: 'white',
    background: '#2F4858',
    tint: Colors.gray050,
    icon: Colors.gray400,
    tabIconDefault: Colors.gray400,
    tabIconSelected: Colors.gray050,
  },

};
