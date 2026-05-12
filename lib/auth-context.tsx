"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { login as apiLogin } from "@/lib/auth";
import type { LoginRequest } from "@/types";

interface AuthContextType {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUsername(localStorage.getItem("username"));
    setHydrated(true);
  }, []);

  const login = useCallback(async (data: LoginRequest) => {
    const res = await apiLogin(data);
    if (!res.token) throw new Error("No token returned");
    localStorage.setItem("token", res.token);
    localStorage.setItem("username", data.username);
    setToken(res.token);
    setUsername(data.username);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
  }, []);

  if (!hydrated) return null;

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
