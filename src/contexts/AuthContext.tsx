import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'registrationDate' | 'totalEmissions' | 'emissionsSaved' | 'points'> & { password: string }) => Promise<boolean>;
  updateUser: (userData: User) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Base URL from environment (set in .env as VITE_API_BASE_URL)
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const storedUser = localStorage.getItem('foodprint_user');
    const storedToken = localStorage.getItem('foodprint_token');
    const rememberMe = localStorage.getItem('foodprint_remember');

    if (rememberMe === 'true' && storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (
    username: string,
    password: string,
    rememberMe = false
  ): Promise<boolean> => {
    // Clear any stale data
    localStorage.removeItem('foodprint_token');
    localStorage.removeItem('foodprint_user');
    localStorage.removeItem('foodprint_remember');

    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        return false;
      }

      const { token: jwt, user: userData } = await res.json();

      setUser(userData);
      setToken(jwt);
      setIsAuthenticated(true);

      if (rememberMe) {
        localStorage.setItem('foodprint_user', JSON.stringify(userData));
        localStorage.setItem('foodprint_token', jwt);
        localStorage.setItem('foodprint_remember', 'true');
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (
    userData: Omit<User, 'id' | 'registrationDate' | 'totalEmissions' | 'emissionsSaved' | 'points'> & { password: string }
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      return res.ok;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const updateUser = async (updated: User): Promise<void> => {
    setUser(updated);

    if (localStorage.getItem('foodprint_remember') === 'true') {
      localStorage.setItem('foodprint_user', JSON.stringify(updated));
    }
  };

  const logout = (): void => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('foodprint_user');
    localStorage.removeItem('foodprint_token');
    localStorage.removeItem('foodprint_remember');
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, updateUser, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
