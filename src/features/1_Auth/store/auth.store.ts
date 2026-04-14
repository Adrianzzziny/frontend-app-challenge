import { create } from 'zustand';

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
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { user } = get();
        const validEmail = user?.email || 'test@kambista.com';
        
        // SIMULADOR DE VALIDACIÓN
        if (credentials.email !== validEmail || credentials.password !== '123456') {
          set({ isLoading: false });
          reject({
            success: false,
            data: {
              name: "INVALID_CREDENTIALS",
              message: "Correo o contraseña incorrectos."
            }
          });
          return;
        }

        set({
          isLoading: false,
          token: 'kambista_simulated_token_xyz',
          user: user || { fullName: 'Test Kambista', email: credentials.email }
        });
        resolve(true);
      }, 1200);
    });
  },

  submitPersonalData: async (personalData) => {
    set({ isLoading: true });
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // SIMULACIÓN DE ERROR API
        if (personalData.documentNumber === '12345678') {
          set({ isLoading: false });
          reject({
            success: false,
            data: {
              name: "DUPLICATE_DNI",
              title: "DNI en uso",
              message: "El número de documento registrado ya está en uso."
            }
          });
          return;
        }

        set({
          isLoading: false,
          user: { ...personalData },
          token: 'kambista_simulated_token_new_user'
        });
        resolve(true);
      }, 1500);
    });
  },

  logout: () => set({ user: null, token: null })
}));