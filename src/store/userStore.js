import { create } from 'zustand';
import { toast } from 'react-toastify';
import supabase from '../config/supabaseClient';

const initialValues = {
  users: [],
  messsages: [],
  queries: [],
  user: null,
  query: null,
  isLoading: false,
};

const useUserStore = create((set, get) => ({
  ...initialValues,

  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('users').select('*');
      set({ users: data, isLoading: false });
    } catch (error) {
      toast.error(error);
      set({ isLoading: false });
    }
  },

  setUser: (user) => {
    set({ user: user });
  },

  setQuery: (query) => {
    set({ query: query });
  },
}));

export default useUserStore;
