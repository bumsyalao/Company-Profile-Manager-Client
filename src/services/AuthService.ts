
import axios from 'axios';
import { User } from '../types';

class AuthService {
    async register(user: {
        username: string;
        email: string;
        password: string;
    }): Promise<void> {
        try {
            const response = await axios.post('/auth/signup', user);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async login(user: { email: string; password: string }): Promise<void> {
        try {
            const response = await axios.post('/auth/signin', user);
            const { accessToken: token, user: userDetails } = response.data;
            localStorage.setItem('token', token);
            return userDetails;
        } catch (error) {
            throw error;
        }
    }
    async getUserDetails(): Promise<User | null> {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return null;
            }

            const response = await axios.get('/auth/user-details', {
                headers: {
                    authorization: token,
                },
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !!token;
    }
}

const authService = new AuthService();

export default authService;