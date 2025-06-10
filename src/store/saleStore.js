import { create } from 'zustand';
import { toast } from 'react-toastify';
import supabase from '../config/supabaseClient';

const initialValues = {
  sales: [],
  sale: null,
  isLoading: false,
};

const useSaleStore = create((set, get) => ({
  ...initialValues,

  fetchSales: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('sales').select('*');
      set({ sales: data, isLoading: false });
    } catch (error) {
      toast.error(error);
      set({ isLoading: false });
    }
  },

  setSale: (sale) => {
    set({ sale: sale });
  },
}));

export default useSaleStore;
