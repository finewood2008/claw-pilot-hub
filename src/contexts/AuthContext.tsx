import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

export interface User {
  id: string;
  email: string;
  username: string;
  phone?: string;
  company?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (partial: Partial<User>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

async function fetchProfile(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error || !data) return null;

  const { data: { user: authUser } } = await supabase.auth.getUser();

  return {
    id: userId,
    email: authUser?.email ?? "",
    username: data.username ?? "",
    phone: data.phone ?? "",
    company: data.company ?? "",
    avatar: data.avatar_url ?? "",
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth changes FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Use setTimeout to avoid Supabase deadlock
          setTimeout(async () => {
            const profile = await fetchProfile(session.user.id);
            setUser(profile);
            setLoading(false);
          }, 0);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    // Then check existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setUser(profile);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const register = useCallback(async (email: string, username: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) throw error;
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const updateUser = useCallback(async (partial: Partial<User>) => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) return;

    const profileUpdate: Record<string, string> = {};
    if (partial.username !== undefined) profileUpdate.username = partial.username;
    if (partial.phone !== undefined) profileUpdate.phone = partial.phone;
    if (partial.company !== undefined) profileUpdate.company = partial.company;
    if (partial.avatar !== undefined) profileUpdate.avatar_url = partial.avatar;

    if (Object.keys(profileUpdate).length > 0) {
      const { error } = await supabase
        .from("profiles")
        .update(profileUpdate)
        .eq("id", authUser.id);
      if (error) throw error;
    }

    setUser((prev) => (prev ? { ...prev, ...partial } : prev));
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    if (error) throw error;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, register, logout, updateUser, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
