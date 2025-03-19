import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// 📌 Register a new user
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

// 📌 Log in a user
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data; // { token, message }
};

// 📌 Get logged-in user profile (Protected Route)
export const getUserProfile = async (token) => {
  const response = await axios.get(`${API_URL}/users/me`, { 
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
