import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const userData = await loginUser(credentials);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const register = async (credentials) => {
    const userData = await registerUser(credentials);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addFavorite = (country) => {
    if (!favorites.some(fav => fav.cca3 === country.cca3)) {
      setFavorites([...favorites, country]);
    }
  };

  const removeFavorite = (country) => {
    setFavorites(favorites.filter(fav => fav.cca3 !== country.cca3));
  };

  const getFavorites = () => favorites;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, favorites, addFavorite, removeFavorite, getFavorites }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
