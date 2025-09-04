import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalizeUser = (rawUser) => {
    if (!rawUser) return null;
    const normalizedId = rawUser._id || rawUser.id || rawUser.userId;
    return { ...rawUser, _id: normalizedId, id: normalizedId };
  };

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      const normalized = normalizeUser(parsed);
      setUser(normalized);
      if (normalized !== parsed) {
        localStorage.setItem("user", JSON.stringify(normalized));
      }
      console.log("Loaded user from localStorage:", normalized);
    } else {
      console.log("No user found in localStorage");
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const normalized = normalizeUser(data.user);
        setUser(normalized);
        localStorage.setItem("user", JSON.stringify(normalized));
        return { success: true, user: normalized };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Network error occurred" };
    }
  };

  const signup = async (name, email, password, role = "patient") => {
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        const normalized = normalizeUser(data.user);
        setUser(normalized);
        localStorage.setItem("user", JSON.stringify(normalized));
        return { success: true, user: normalized };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Network error occurred" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAdmin = () => {
    return user && user.role === "admin";
  };

  const isPatient = () => {
    return user && user.role === "patient";
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAdmin,
    isPatient,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
