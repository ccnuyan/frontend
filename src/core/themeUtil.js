import _ from 'lodash';

const key = 'mui_theme';
const themes = {
  Dark: 'darkBaseTheme',
  Light: 'lightBaseTheme',
};
const keys = _.invert(themes);

export const getLocalTheme = () => {
  if (keys[window.localStorage.getItem(key)]) {
    return window.localStorage.getItem(key);
  }
  return 'lightBaseTheme';
};

export const setLocalTheme = (Theme) => {
  window.localStorage.setItem(key, Theme);
};

export const getLocalThemeKey = () => {
  if (keys[window.localStorage.getItem(key)]) {
    return keys[window.localStorage.getItem(key)];
  }
  return 'Light';
};

export const setLocalThemeKey = (themekey) => {
  if (themes[themekey]) {
    window.localStorage.setItem(key, themes[themekey]);
  } else {
    window.localStorage.setItem(key, 'Light');
  }
};

