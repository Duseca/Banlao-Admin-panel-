import { create } from 'zustand';
import { toast } from 'react-toastify';
import supabase from '../config/supabaseClient';
import { uploadFileToSupabase } from '../utils/storageFunctions';

const initialValues = {
  banners: [],
  banner: null,
  isLoading: false,
};

const useBannerStore = create((set, get) => ({
  ...initialValues,

  fetchBanners: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('banners').select('*');

      if (error) throw error;

      set({ banners: data, isLoading: false });
    } catch (error) {
      toast.error(error.message);
      set({ isLoading: false });
    }
  },

  addBanner: async (bannerData) => {
    set({ isLoading: true });
    try {
      if (bannerData.imageFile) {
        let imageUrl = '';
        if (imageFile) {
          const filePath = `${Date.now()}-${imageFile.name}`;
          imageUrl = await uploadFileToSupabase(
            filePath,
            bannerData.imageFile,
            'banner-images',
            supabase
          );
        }
      }
      const payload = {
        title: bannerData.title,
        description: bannerData.description,
        image: imageUrl,
      };

      const { data, error } = await supabase
        .from('banners')
        .insert([payload])
        .select();

      if (error) throw error;

      set((state) => ({
        banners: [...state.banners, data[0]],
        isLoading: false,
      }));

      toast.success('Banner added successfully!');
      return data[0]; // Return the new banner
    } catch (error) {
      toast.error(error.message);
      console.error(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  editBanner: async (bannerData, id) => {
    set({ isLoading: true });
    try {
      // Prepare the data based on discount type
      const payload = {
        title: bannerData.title,
        description: bannerData.description,
        howToApply: bannerData.howToApply,
        type: bannerData.type,
        price: bannerData.type === 'fixed' ? bannerData.price : null,
        discount: bannerData.type === 'percentage' ? bannerData.discount : null,
      };

      const { data, error } = await supabase
        .from('banners')
        .update(payload)
        .eq('id', id)
        .select();

      if (error) throw error;

      const updatedBanner = data[0];
      set((state) => ({
        banners: state.banners.map((banner) =>
          banner.id === id ? updatedBanner : banner
        ),
        isLoading: false,
      }));

      toast.success('Banner updated successfully!');
      return updatedBanner;
    } catch (error) {
      toast.error(error.message);
      console.error(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  removeBanner: async (id) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.from('banners').delete().eq('id', id);

      if (error) throw error;

      set((state) => ({
        banners: state.banners.filter((banner) => banner.id !== id),
      }));
      toast.success('Banner removed successfully!');
    } catch (error) {
      toast.error(error.message);
      console.error(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  setBanner: (banner) => {
    set({ banner });
  },
}));

export default useBannerStore;
