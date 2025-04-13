const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`${API_URL}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("Your session has expired. Please log in again.");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch user data");
  }

  return await response.json();
}

export async function updateUserProfile(userData) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`${API_URL}/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update profile");
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
    throw new Error(errorData.message || "Failed to save preference");
  }

  return await response.json();
}