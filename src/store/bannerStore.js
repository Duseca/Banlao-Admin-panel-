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

  editBanner: async (bannerData, id) => {
    set({ isLoading: true });
    try {
      let imageUrl = bannerData.image;
      if (bannerData.imageFile) {
        if (bannerData.image) {
          try {
            const oldImagePath = bannerData.image.split(
              '/storage/v1/object/public/banner-images/'
            )[1];
            await deleteFileFromSupabase(
              oldImagePath,
              'banner-images',
              supabase
            );
          } catch (error) {
            console.error('Failed to delete old image:', error);
          }
        }

        const filePath = `${Date.now()}-${bannerData.imageFile.name}`;
        imageUrl = await uploadFileToSupabase(
          filePath,
          bannerData.imageFile,
          'banner-images',
          supabase
        );
      }

      const payload = {
        title: bannerData.title,
        description: bannerData.description,
        image: imageUrl,
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

  removeBanner: async (banner) => {
    set({ isLoading: true });
    try {
      if (banner.image) {
        try {
          const imagePath = banner.image.split(
            '/storage/v1/object/public/banner-images/'
          )[1];
          await deleteFileFromSupabase(imagePath, 'banner-images', supabase);
        } catch (error) {
          console.error('Failed to delete banner image:', error);
        }
      }

      const { error } = await supabase
        .from('banners')
        .delete()
        .eq('id', banner.id);
      if (error) throw error;

      set((state) => ({
        banners: state.banners.filter((b) => b.id !== banner.id),
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
