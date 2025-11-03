const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

/**
 * Sets the auth token in localStorage. The API interceptor 
 * in lib/api.js will automatically pick this up for all future requests.
 * @param {string} token 
 */
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Removes the auth token from localStorage.
 */
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function setUser(user) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
}

export function getUser() {
  const v = localStorage.getItem(USER_KEY);
  return v ? JSON.parse(v) : null;
}

export function clearUser() {
  localStorage.removeItem(USER_KEY);
}

/**
 * This function is now simplified. It only returns the user profile 
 * from localStorage.
 * @returns {object | null}
 */
export function initAuth() {
  return getUser();
}