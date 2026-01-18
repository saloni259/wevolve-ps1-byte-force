import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Attempt to hydrate user from localStorage
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post("/user/login", { email, password });
            const { User, accessToken } = response.data.data;
            setUser(User);
            localStorage.setItem("user", JSON.stringify(User));
            localStorage.setItem("accessToken", accessToken);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    };

    const register = async (userData) => {
        try {
            const response = await api.post("/user/register", userData);
            const { User, accessToken } = response.data.data;
            setUser(User);
            localStorage.setItem("user", JSON.stringify(User));
            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    };

    const logout = async () => {
        try {
            await api.post("/user/logout");
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
