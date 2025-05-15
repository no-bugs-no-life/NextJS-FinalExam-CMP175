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
            const response = await axiosInstance.get('/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (response.data.success) {
                set({ isAuthenticated: true, user: response.data.data });
                return true;
            }
            return false;
        } catch (error) {
            localStorage.removeItem('accessToken');
            set({ isAuthenticated: false, user: null });
            return false;
        }
    },
    logout: () => {
        localStorage.removeItem('accessToken');
        set({ isAuthenticated: false, user: null });
    },
    updateProfile: async (userData) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axiosInstance.put(`/users/${userData._id}`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (response.data.success) {
                set((state) => ({ 
                    user: { ...state.user, ...response.data.data }
                }));
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    },
    changePassword: async (oldPassword, newPassword) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axiosInstance.post('/users/change-password', 
                { oldPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            return response.data.success;
        } catch (error) {
            return false;
        }
    }
}));

export default useAuthStore;