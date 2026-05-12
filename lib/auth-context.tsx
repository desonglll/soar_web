"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { login as apiLogin, getUser } from "@/lib/auth";
import type { LoginRequest } from "@/types";

interface CurrentUser {
  id: string;
  name: string;
}

interface AuthContextType {
  token: string | null;
  currentUser: CurrentUser | null;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function decodeJWTPayload(token: string): { sub?: string } {
  try {
    const base64 = token.split(".")[1];
    const json = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return {};
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");
    const savedUserName = localStorage.getItem("userName");
    if (savedToken) {
      setToken(savedToken);
      if (savedUserId && savedUserName) {
        setCurrentUser({ id: savedUserId, name: savedUserName });
      }
    }
    setHydrated(true);
  }, []);

  const login = useCallback(async (data: LoginRequest) => {
    const res = await apiLogin(data);
    if (!res.token) throw new Error("No token returned");
    localStorage.setItem("token", res.token);

    const payload = decodeJWTPayload(res.token);
    const userId = payload.sub;
    if (!userId) throw new Error("Invalid token: no sub");

    const user = await getUser(userId);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("userName", user.userName);

    setToken(res.token);
    setCurrentUser({ id: user.id, name: user.userName });
  }, []);

  const logout = useCallback(() => {
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
