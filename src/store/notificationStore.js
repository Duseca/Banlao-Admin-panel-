import { create } from 'zustand';
import { toast } from 'react-toastify';
import supabase from '../config/supabaseClient';

const initialValues = {
  notifications: [],
  notification: null,
  isLoading: false,
};

const useNotificationStore = create((set, get) => ({
  ...initialValues,

  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('notifications').select('*');

      if (error) throw error;

      set({ notifications: data, isLoading: false });
    } catch (error) {
      toast.error(error.message);
      set({ isLoading: false });
    }
  },

  addNotification: async (notificationData) => {
    set({ isLoading: true });
    try {
      const payload = {
        title: notificationData.title,
        description: notificationData.description,
      };

      const { data, error } = await supabase
        .from('notifications')
        .insert([payload])
        .select();

      // Send NOtification via firebase fcm

      if (error) throw error;

      set((state) => ({
        notifications: [...state.notifications, data[0]],
        isLoading: false,
      }));

      toast.success('Notification added successfully!');
      return data[0]; // Return the new notification
    } catch (error) {
      toast.error(error.message);
      console.error(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  setNotification: (notification) => {
    set({ notification });
  },
}));

export default useNotificationStore;
