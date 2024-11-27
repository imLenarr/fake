import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersData } from '../data/data';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) setUser(savedUser);
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const loggedInUser = usersData.find(
      (u) => u.username === username && u.password === password
    );

    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      
      // Redirect based on role
      switch (loggedInUser.role) {
        case 'SUPER':
          navigate('/dashboard');
          break;
        case 'ADMIN':
          navigate('/dashboard');
          break;
        case 'USER':
          navigate('/dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    } else {
      return false;
    }
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {/* {!loading && children} */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// สร้าง Hook เพื่อใช้ Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth ต้องใช้ภายใน AuthProvider");
  }
  return context;
};