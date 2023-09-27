import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/HomePage';
import authService from '../services/AuthService';

const AuthRoutes: React.FC = () => {
    const isAuthenticated = authService.isAuthenticated();

    return (
        <Routes>
            {isAuthenticated ? (
                <Route path="/" element={<Navigate to="/company" />} />
            ) : (
                <Route path="/" element={<Navigate to="/auth" />} />
            )}

            {isAuthenticated ? (
                <Route path="/home" element={<HomePage />} />
            ) : (
                <Route path="/auth" element={<AuthPage />} />
            )}
        </Routes>
    );
};

export default AuthRoutes;
