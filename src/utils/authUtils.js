import { useState, useEffect } from 'react';

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return null;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      setCurrentUser(userData);
      setLoading(false);
      return userData;
    } catch (err) {
      console.error("Error fetching user:", err);
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return { currentUser, loading, error, fetchCurrentUser, setCurrentUser };
};

export const evaluatePasswordStrength = (password) => {
  const lengthCriteria = password.length >= 6;
  const uppercaseCriteria = /[A-Z]/.test(password);
  const numberCriteria = /[0-9]/.test(password);
  const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (lengthCriteria && uppercaseCriteria && numberCriteria && specialCharCriteria) {
    return 'Strong';
  } else if (lengthCriteria && (uppercaseCriteria || numberCriteria || specialCharCriteria)) {
    return 'Medium';
  } else {
    return 'Weak';
  }
};