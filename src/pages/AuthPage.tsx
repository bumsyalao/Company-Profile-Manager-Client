import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/AuthService';

const AuthPage: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [isRegistering, setIsRegistering] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await authService.register(formData);
            // redirect to homepage 

        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await authService.login(formData);
            // redirect to homepage 
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <h2>{isRegistering ? 'Register' : 'Login'}</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>

                        {isRegistering && (
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        {isRegistering ? (
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleRegister}
                            >
                                Register
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="btn btn-success mx-2"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        )}
                    </form>
                    <p className="mt-3">
                        {isRegistering ? (
                            <>
                                Already have an account?{' '}
                                <button onClick={() => setIsRegistering(false)}>
                                    Login here
                                </button>
                            </>
                        ) : (
                            <>
                                Don't have an account?{' '}
                                <button onClick={() => setIsRegistering(true)}>
                                    Register here
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div >
    );
};

export default AuthPage;
