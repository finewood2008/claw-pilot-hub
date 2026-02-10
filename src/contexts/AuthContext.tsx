import React, { createContext, useContext, useState, useCallback } from "react";

export interface User {
  email: string;
  username: string;
  phone?: string;
  company?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (partial: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("openclaw_user");
    return saved ? JSON.parse(saved) : null;
  });

  const persist = (u: User) => {
    setUser(u);
    localStorage.setItem("openclaw_user", JSON.stringify(u));
  };

  const login = useCallback(async (email: string, _password: string) => {
    persist({ email, username: email.split("@")[0] });
  }, []);

  const register = useCallback(async (email: string, username: string, _password: string) => {
    persist({ email, username });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("openclaw_user");
  }, []);

  const updateUser = useCallback((partial: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...partial };
      localStorage.setItem("openclaw_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
