// Gère l'authentification dans toute l'application
// Le Context permet de partager l'état d'authentificatiion
// entre les composants

import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext(null);

export function AuthProvider ({children}) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);


    //Au montage du composant on restauras la session si elle existe
    // du localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    //Syncronise le localstorage pour chaque changement de token ou de user
    useEffect(() => {
        if (user && token) {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }, [user, token]);

    const login = (jwt, userData) => {
        setUser(userData);
        setToken(jwt);
    };
    const logout = () => {
        setUser(null);
        setToken(null);
    };

    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
