import { create } from 'zustand';
import { toast } from 'react-toastify';
import supabase from '../config/supabaseClient';
import { deleteFolderContentsFromStorage } from '../utils/storageFunctions';

const initialValues = {
  rootFolders: [],
  folders: [],
  folder: null,
  isLoading: false,
};

const useFolderStore = create((set, get) => ({
  ...initialValues,

  getRootFolders: async () => {
    try {
      let query = supabase
        .from('folders')
        .select('*')
        .is('parent_id', null)
        .order('name', { ascending: true })
        .select();

      const { data, error } = await query;

      if (error) throw error;

      set({ rootFolders: data, isLoading: false });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  getFolderContents: async (folderId = null) => {
    try {
      let query = supabase.from('folders').select('*');
      if (folderId) {
        query = query.eq('parent_id', folderId);
      }
      const { data, error } = await query;

      if (error) throw error;
      set({ folders: data, isLoading: false });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  createFolder: async (name, parentId = null) => {
    try {
      const { data, error } = await supabase
        .from('folders')
        .insert({
          name: name,
          parent_id: parentId,
        })
        .select()
        .single();

      if (error) throw error;

      const completeFolderData = {
        ...data,
        name: data.name || name,
      };

      set((state) => ({
        folders: [completeFolderData, ...state.folders],
        isLoading: false,
      }));
    } catch (error) {
      toast.error(error.message);
      set({ isLoading: false });
    }
  },

  createRootFolder: async (name) => {
    try {
      const { data, error } = await supabase
        .from('folders')
        .insert({
          name: name,
          parent_id: null,
        })
        .single();

      if (error) throw error;
      // return data;

      set({ rootFolders: [data, ...get().rootFolders], isLoading: false });
    } catch (error) {
      toast.error(error.message);
      set({ isLoading: false });
    }
  },

  editFolder: async (id, name) => {
    try {
      const { data, error } = await supabase
        .from('folders')
        .update({ name: name })
        .eq('id', id)
        .select();

      if (error) throw error;
      // return data;

      set({
        folders: get().folders.map((folder) =>
          folder.id === data.id ? data : folder
        ),
        isLoading: false,
      });
    } catch (error) {
      toast.error(error.message);
      set({ isLoading: false });
    }
  },

  deleteFolder: async (id, isRoot) => {
    try {
      set({ isLoading: true });

      await deleteFolderContentsFromStorage(id, 'music-media', supabase);

      const { error } = await supabase.from('folders').delete().eq('id', id);
      if (error) throw error;

      set((state) => ({
        ...(isRoot
          ? { rootFolders: state.rootFolders.filter((f) => f.id !== id) }
          : { folders: state.folders.filter((f) => f.id !== id) }),
        isLoading: false,
      }));
    } catch (error) {
      toast.error(error.message);
      set({ isLoading: false });
      throw error;
    }
  },
  setFolder: (folder) => {
    set({ folder });
  },
}));

export default useFolderStore;
