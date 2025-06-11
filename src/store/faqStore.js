import { create } from 'zustand';
import { toast } from 'react-toastify';
import supabase from '../config/supabaseClient';

const initialValues = {
  faqs: [],
  faq: null,
  isLoading: true,
};

const useFaqStore = create((set, get) => ({
  ...initialValues,

  fetchFaqs: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('faqs').select('*');
      if (error) throw error;
      set({ faqs: data, isLoading: false });
    } catch (error) {
      toast.error(error.message);
      set({ isLoading: false });
    }
  },

  addFaq: async (faq) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('faqs')
        .insert([faq])
        .select()
        .single();
      if (error) throw error;

      const newFaq = { id: data.id, ...faq };
      const updatedFaqs = [...get().faqs, newFaq];
      set({ faqs: updatedFaqs, isLoading: false });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      set({ isLoading: false });
    }
  },

  editFaq: async (faq) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase
        .from('faqs')
        .update(faq)
        .eq('id', faq.id);

      if (error) throw error;

      const updatedFaqs = get().faqs.map((cat) =>
        cat.id === faq.id ? { ...cat, ...faq } : cat
      );
      set({ faqs: updatedFaqs, isLoading: false });
    } catch (error) {
      toast.error(error.message);
      set({ isLoading: false });
    }
  },

  deleteFaq: async (faqId) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.from('faqs').delete().eq('id', faqId);

      if (error) throw error;

      const updatedFaqs = get().faqs.filter((faq) => faq.id !== faqId);
      set({ faqs: updatedFaqs, isLoading: false });
    } catch (error) {
      toast.error(error.message);
      set({ isLoading: false });
    }
  },

  setFaq: (faq) => {
    set({ faq: faq });
  },
}));

export default useFaqStore;
