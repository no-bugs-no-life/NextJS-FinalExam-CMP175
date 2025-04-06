import { create } from 'zustand';
import axiosInstance from '@/configs/api';

const useAuthStore = create((set) => ({
    isAuthenticated: false,
    user: null,
    checkAuth: async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            set({ isAuthenticated: false, user: null });
            return false;
        }

        try {
            const response = await axiosInstance.get('/v1/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (response.result) {
                set({ isAuthenticated: true, user: response.data });
                return true;
            }
            return false;
        } catch (error) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            set({ isAuthenticated: false, user: null });
            return false;
        }
    },
    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({ isAuthenticated: false, user: null });
    }
}));

export default useAuthStore;