import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedFavs = localStorage.getItem('favorites');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
    setLoading(false);
  }, []);

  const persist = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
  };

  const login = async (credentials) => {
    const userData = await loginUser(credentials);
    setUser(userData);
    persist('user', userData);
    return userData;
  };


  const register = async (credentials) => {
    const userData = await registerUser(credentials);
    setUser(userData);
    persist('user', userData);
    return userData;
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem('user');
    localStorage.removeItem('favorites');
  };

  const addFavorite = (country) => {
    if (!favorites.find(f => f.cca3 === country.cca3)) {
      const next = [...favorites, country];
      setFavorites(next);
      persist('favorites', next);
    }
  };

  const removeFavorite = (country) => {
    const next = favorites.filter(f => f.cca3 !== country.cca3);
    setFavorites(next);
    persist('favorites', next);
  };


  return (
    <AuthContext.Provider value={{ user, favorites, login, register, logout, addFavorite, removeFavorite }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
