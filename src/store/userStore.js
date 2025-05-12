import { create } from 'zustand';
import { toast } from 'react-toastify';
import supabase from '../config/supabaseClient';

const initialValues = {
  users: [],
  user: null,
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

  addUserDiet: async (dietData, day) => {
    set({ isLoading: true });
    try {
      const user = get().user;
      if (!user) throw new Error('User not found');

      if (dietData.image_file instanceof File) {
        const { data: imageData, error: imageError } = await supabase.storage
          .from('user-diet-media')
          .upload(
            `${user.user_id}/${dietData.image_file.name}`,
            dietData.image_file
          );

        if (imageError) throw imageError;

        dietData.image_url = `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/user-diet-media/${imageData.path}`;
      }

      const { image_file, ...cleanDietData } = dietData;

      const updatedDietPlan = user.diet_plan.map((dietDay) => {
        if (dietDay.day === day) {
          return {
            ...dietDay,
            diets: [...dietDay.diets, cleanDietData],
          };
        }
        return dietDay;
      });

      const { error: updateError } = await supabase
        .from('users')
        .update({ diet_plan: updatedDietPlan })
        .eq('user_id', user.user_id);

      if (updateError) throw updateError;

      set({ user: { ...user, diet_plan: updatedDietPlan } });

      toast.success('Diet added successfully!');
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  editUserDiet: async (dietData, currentData, day, dietIndex) => {
    set({ isLoading: true });
    try {
      const user = get().user;
      if (!user) throw new Error('User not found');

      if (dietData.image_file instanceof File) {
        if (currentData?.image_url) {
          const oldImagePath = currentData.image_url.split(
            '/storage/v1/object/public/user-diet-media/'
          )[1];
          await supabase.storage.from('user-diet-media').remove([oldImagePath]);
        }

        const { data: imageData, error: imageError } = await supabase.storage
          .from('user-diet-media')
          .upload(
            `${user.user_id}/${dietData.image_file.name}`,
            dietData.image_file
          );

        if (imageError) throw imageError;

        dietData.image_url = `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/user-diet-media/${imageData.path}`;
      }

      const { image_file, ...cleanDietData } = dietData;

      const updatedDietPlan = user.diet_plan.map((dietDay) => {
        if (dietDay.day === day) {
          return {
            ...dietDay,
            diets: dietDay.diets.map((diet, index) =>
              index === dietIndex ? cleanDietData : diet
            ),
          };
        }
        return dietDay;
      });

      const { error: updateError } = await supabase
        .from('users')
        .update({ diet_plan: updatedDietPlan })
        .eq('user_id', user.user_id);

      if (updateError) throw updateError;

      set({ user: { ...user, diet_plan: updatedDietPlan } });

      toast.success('Diet updated successfully!');
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  removeUserDiet: async (day, dietIndex) => {
    set({ isLoading: true });
    try {
      const user = get().user;
      if (!user) throw new Error('User not found');

      const dietToRemove = user.diet_plan.find((dietDay) => dietDay.day === day)
        ?.diets[dietIndex];

      if (!dietToRemove) throw new Error('Diet not found');

      if (dietToRemove.image_url) {
        const imagePath = dietToRemove.image_url.split(
          '/storage/v1/object/public/user-diet-media/'
        )[1];

        if (imagePath) {
          const { error: removeImageError } = await supabase.storage
            .from('user-diet-media')
            .remove([imagePath]);

          if (removeImageError) throw removeImageError;
        }
      }

      const updatedDietPlan = user.diet_plan.map((dietDay) => {
        if (dietDay.day === day) {
          return {
            ...dietDay,
            diets: dietDay.diets.filter((_, index) => index !== dietIndex),
          };
        }
        return dietDay;
      });

      const { error: updateError } = await supabase
        .from('users')
        .update({ diet_plan: updatedDietPlan })
        .eq('user_id', user.user_id);

      if (updateError) throw updateError;

      set({ user: { ...user, diet_plan: updatedDietPlan } });

      toast.success('Diet removed successfully!');
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
