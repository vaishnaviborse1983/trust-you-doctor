

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage if available
  const [user, setUser] = useState(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUserRole = localStorage.getItem('userRole');
    const storedUserName = localStorage.getItem('userName');
    const storedUserEmail = localStorage.getItem('userEmail');
    const storedUserMobile = localStorage.getItem('userMobile');
    
    if (storedUserId) {
      return {
        userId: storedUserId,
        userRole: storedUserRole || '',
        userName: storedUserName || '',
        userEmail: storedUserEmail || '',
        userMobile: storedUserMobile || ''
      };
    }
    return null;
  });

  // Login function that accepts all user data
  const login = (userId, userRole = '', userName = '', userEmail = '', userMobile = '') => {
    const userData = {
      userId,
      userRole,
      userName,
      userEmail,
      userMobile
    };
    setUser(userData);
    
    // Store in localStorage
    localStorage.setItem('userId', userId);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('userMobile', userMobile);
  };

  const logout = () => {
    setUser(null);
    // Clear localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userMobile');
  };

  const setUserId = (userId) => {
    if (user) {
      setUser({ ...user, userId });
      localStorage.setItem('userId', userId);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      setUserId,
      isAuthenticated: !!user?.userId
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};