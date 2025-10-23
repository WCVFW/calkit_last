import axios from "axios";

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  delete axios.defaults.headers.common["Authorization"];
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

export function initAuth() {
  const t = getToken();
  if (t) axios.defaults.headers.common["Authorization"] = `Bearer ${t}`;
  return getUser();
}
