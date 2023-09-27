import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/AuthService';
import { User } from '../types';


type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    logout: () => void;
};

type AuthProviderProps = {
    children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            authService
                .getUserDetails()
                .then((userDetails) => {
                    setUser(userDetails);
                })
                .catch((error) => {
                    console.error('Failed to fetch user details:', error);
                });
        }
    }, []);


    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
