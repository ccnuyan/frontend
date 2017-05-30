const key = 'id_token';

export const getLocalToken = () => window.localStorage.getItem(key);

export const setLocalToken = (token) => {
  window.localStorage.setItem(key, token);
};

export const clearToken = () => window.localStorage.clear(key);
