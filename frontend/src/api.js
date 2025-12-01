import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Set JWT token globally
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
}
