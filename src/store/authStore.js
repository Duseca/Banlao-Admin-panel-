import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';
import supabase from '../config/supabaseClient';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      admin: null,
      //   currentLang: 'en',
      isLoading: false,
      isAuthenticated: false,

      signIn: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;
          set({
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          toast.error('Sign-in failed: ' + error.message);
          set({ isLoading: false });
        }
      },

      fetchAdmin: async (email) => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase
            .from('admin')
            .select('*')
            .eq('email', email)
            .single();

          if (error) throw error;

          if (data) {
            set({
              admin: data,
              isLoading: false,
              //   currentLang: data.currentLang || 'en',
            });
          }
        } catch (error) {
          toast.error(error.message);
          set({ isLoading: false });
        }
      },

      signOut: async () => {
        try {
          await supabase.auth.signOut();
          set({ user: null, isAuthenticated: false, admin: null });
        } catch (error) {
          toast.error('Sign-out failed: ' + error.message);
        }
      },

      setLanguage: (lang) => {
        set({ currentLang: lang });
      },

      unsubscribeAuth: () => {
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
          if (session) {
            set({ user: session.user, isAuthenticated: true });
          } else {
            set({ user: null, isAuthenticated: false, admin: null });
          }
        });

        return () => subscription.unsubscribe();
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user ? { email: state.user.email } : null,
      }),
    }
  )
);

export default useAuthStore;
