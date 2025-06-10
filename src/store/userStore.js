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

  blockUser: async (userId, isCurrentlyBlocked) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ isBlocked: !isCurrentlyBlocked })
        .eq('id', userId)
        .select();

      if (error) throw error;

      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId
            ? { ...user, isBlocked: !isCurrentlyBlocked }
            : user
        ),
        user:
          state.user?.id === userId
            ? { ...state.user, isBlocked: !isCurrentlyBlocked }
            : state.user,
        isLoading: false,
      }));

      toast.success(
        `User ${isCurrentlyBlocked ? 'unblocked' : 'blocked'} successfully!`
      );
      return data[0];
    } catch (error) {
      toast.error(error.message);
      console.error(error);
      throw error;
    } finally {
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
