import { create } from 'zustand';
import { api } from '../../../api/axiosConfig';

interface AuthState {
  user: Record<string, any> | null;
  token: string | null;
  isLoading: boolean;
  
  isAuthenticated: () => boolean;
  userFirstName: () => string;
  
  login: (credentials: any) => Promise<boolean>;
  submitPersonalData: (personalData: any) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,

  isAuthenticated: () => !!get().token,
  userFirstName: () => {
    const user = get().user;
    if (!user?.fullName) return 'Usuario';
    return user.fullName.split(' ')[0];
  },

  login: async (credentials) => {
    set({ isLoading: true });
    
    try {
      const response = await api.post('/auth/login', credentials);
      
      set({
        isLoading: false,
        token: response.data.token,
        user: response.data.user
      });
      return true;

    } catch (error: any) {
      set({ isLoading: false });
      return Promise.reject({
        success: false,
        data: error.response?.data || { name: 'UNKNOWN_ERROR', message: 'Error de red' }
      });
    }
  },

  submitPersonalData: async (personalData) => {
    set({ isLoading: true });
    
    try {
      const response = await api.post('/users/personal-data', personalData);

      set({
        isLoading: false,
        user: response.data.user,
        token: response.data.token
      });
      return true;

    } catch (error: any) {
      set({ isLoading: false });
      return Promise.reject({
        success: false,
        data: error.response?.data || { name: 'UNKNOWN_ERROR', message: 'Error de red' }
      });
    }
  },

  logout: () => set({ user: null, token: null })
}));