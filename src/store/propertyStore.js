import { create } from 'zustand';
import { toast } from 'react-toastify';
import supabase from '../config/supabaseClient';

const initialValues = {
  properties: [],
  property: null,
  isLoading: false,
};

const usePropertyStore = create((set, get) => ({
  ...initialValues,

  fetchProperties: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('properties').select('*');
      set({ properties: data, isLoading: false });
    } catch (error) {
      toast.error(error);
      set({ isLoading: false });
    }
  },

  setProperty: (property) => {
    set({ property: property });
  },

  blockProperty: async (propertyId, isCurrentlyBlocked) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('properties')
        .update({ isBlocked: !isCurrentlyBlocked })
        .eq('id', propertyId)
        .select();

      if (error) throw error;

      const updatedProperty = data[0];
      set((state) => ({
        properties: state.properties.map((property) =>
          property.id === propertyId ? updatedProperty : property
        ),
        property:
          state.property?.id === propertyId ? updatedProperty : state.property,
        isLoading: false,
      }));

      toast.success(
        `Property ${isCurrentlyBlocked ? 'unblocked' : 'blocked'} successfully!`
      );
      return updatedProperty;
    } catch (error) {
      toast.error(error.message);
      console.error(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default usePropertyStore;
