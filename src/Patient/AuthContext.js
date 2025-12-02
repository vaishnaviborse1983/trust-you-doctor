// AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');

  const login = (userId) => {
    setUser({ userId });
  };

  const logout = () => {
    setUser('');
  };

  const setUserId = (userId) => {
    setUser({ userId });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
