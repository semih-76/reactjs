import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/clients/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
          },
        );

        if (response.ok) {
          const data = await response.json();
          const client = data.client;
          setUser({ ...client, id: client.ID_Client });
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("id_client");
        }
      } catch (error) {
        console.error("Erreur vérification session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = (userData, token) => {
    const id = userData.ID_Client || userData.id;
    setUser({ ...userData, id });
    if (token) localStorage.setItem("token", token);
    if (id) localStorage.setItem("id_client", id);
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${import.meta.env.VITE_API_URL}/api/clients/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("id_client");
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
