import { createContext, useContext, useState, useEffect } from 'react';
import { getUserProfile } from '../api/auth';

// 📌 Create Authentication Context
const AuthContext = createContext(null);

// 📌 Auth Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // 🔍 Load user details when token is available
  useEffect(() => {
    if (token) {
      getUserProfile(token)
        .then((userData) => setUser(userData))
        .catch(() => {
          logout();
        });
    }
  }, [token]);

  // 🆕 Login function (stores token in localStorage)
  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  // 🚪 Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
  