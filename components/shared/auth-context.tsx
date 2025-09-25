"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  firstName: string;
  lastName: string;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (token: string) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/profile/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        const parts = data.fullName?.trim().split(" ") || [];
        setFirstName(parts[0] || "");
        setLastName(parts.slice(1).join(" ") || "");
        setIsLoggedIn(true);
      } else {
        console.warn("⚠️ Invalid token or failed to fetch profile");
        localStorage.removeItem("jwtToken");
      }
    } catch (err) {
      console.error("❌ Failed to fetch profile", err);
      localStorage.removeItem("jwtToken");
    } finally {
      setLoading(false);
    }
  };

  // ✅ On mount - check for existing token (manual login)
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      fetchProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  // ✅ Clerk (social login) flow
  useEffect(() => {
    const registerSocialUser = async () => {
      if (!isSignedIn || !user) return;

      const existingToken = localStorage.getItem("jwtToken");
      if (existingToken) return; // already handled above

      try {
        const res = await fetch("http://127.0.0.1:8000/api/social-register/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.primaryEmailAddress?.emailAddress,
            first_name: user.firstName || "",
            last_name: user.lastName || "",
          }),
        });

        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("jwtToken", data.access);
          setFirstName(user.firstName || "");
          setLastName(user.lastName || "");
          setIsLoggedIn(true);
          router.push("/");
        } else {
          console.error("❌ Failed to register social user:", data);
        }
      } catch (error) {
        console.error("❌ Error saving social user:", error);
      } finally {
        setLoading(false);
      }
    };

    registerSocialUser();
  }, [isSignedIn, user]);

  // ✅ Manual login (from form)
  const login = (token: string) => {
    localStorage.setItem("jwtToken", token);
    fetchProfile(token);
  };

  // ✅ Logout
  const logout = async () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
    setFirstName("");
    setLastName("");
    setLoading(false);
    await signOut({ redirectUrl: "/" }); // Clerk logout
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, firstName, lastName, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
