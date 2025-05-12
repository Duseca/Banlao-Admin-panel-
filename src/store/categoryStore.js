import { create } from 'zustand';
import { toast } from 'react-toastify';
import supabase from '../config/supabaseClient';

const initialValues = {
  categories: [],
  category: null,
  isLoading: false,
};

const useCategoryStore = create((set, get) => ({
  ...initialValues,

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('categories').select('*');

      if (error) throw error;

      set({ categories: data, isLoading: false });
    } catch (error) {
      toast.error(error.message);
      set({ isLoading: false });
    }
  },

  addCategory: async (categoryData) => {
    set({ isLoading: true });
    try {
      const currentData = { ...categoryData };

      const { data, error } = await supabase
        .from('categories')
        .insert([currentData])
        .select();

      if (error) throw error;

      const { data: folderData, error: folderError } = await supabase
        .from('folders')
        .insert({
          name: categoryData.name,
          parent_id: null,
          category_id: data[0].id,
        })
        .single();

      if (folderError) throw folderError;

      set((state) => ({
        categories: [...state.categories, data[0]],
        isLoading: false,
      }));

      toast.success('Category added successfully!');
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  editCategory: async (categoryData, id) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('categories')
        .update({ ...categoryData })
        .eq('id', id)
        .select();

      if (error) throw error;

      const updatedCategories = get().categories.map((category) =>
        category.id === data[0].id ? data[0] : category
      );

      set({ categories: updatedCategories, isLoading: false });

      toast.success('Category updated successfully!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  removeCategory: async (id) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);

      if (error) throw error;

      set((state) => ({
        categories: state.categories.filter((m) => m.id !== id),
      }));
      toast.success('Category removed successfully!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  setCategory: (category) => {
    set({ category });
  },
}));

export default useCategoryStore;
