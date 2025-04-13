const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function login(credentials) {
  const response = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return await response.json();
}

export async function register(userData) {
  const response = await fetch(`${API_URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return await response.json();
}

export async function saveUserPreference(preferenceData) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`${API_URL}/user/preference`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(preferenceData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to save Username or Preference");
  }

  return await response.json();
}

export function storeToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}