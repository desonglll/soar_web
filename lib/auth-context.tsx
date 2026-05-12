"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { login as apiLogin, getMe, logout as apiLogout } from "@/lib/auth";
import type { LoginRequest } from "@/types";

interface CurrentUser {
  id: string;
  userName: string;
}

interface AuthContextType {
  token: string | null;
  currentUser: CurrentUser | null;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      getMe()
        .then((user) => {
          setCurrentUser({ id: user.id, userName: user.userName });
          localStorage.setItem("userId", user.id);
          localStorage.setItem("userName", user.userName);
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("userName");
          setToken(null);
          setCurrentUser(null);
        })
        .finally(() => setHydrated(true));
    } else {
      setHydrated(true);
    }
  }, []);

  const login = useCallback(async (data: LoginRequest) => {
    const res = await apiLogin(data);
    if (!res.token) throw new Error("No token returned");
    localStorage.setItem("token", res.token);

    const user = await getMe();
    localStorage.setItem("userId", user.id);
    localStorage.setItem("userName", user.userName);

    setToken(res.token);
    setCurrentUser({ id: user.id, userName: user.userName });
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      // still clear local state even if API fails
    }
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setToken(null);
    setCurrentUser(null);
  }, []);

  if (!hydrated) return null;

  return (
    <AuthContext.Provider
      value={{
        token,
        currentUser,
        isAuthenticated: !!token && !!currentUser,
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
