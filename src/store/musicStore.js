import { create } from 'zustand';
import { toast } from 'react-toastify';
import supabase from '../config/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import {
  deleteFileFromSupabase,
  uploadFileToSupabase,
} from '../utils/storageFunctions';

const initialValues = {
  music: [],
  musicItem: null,
  isLoading: false,
};

const useMusicStore = create((set, get) => ({
  ...initialValues,

  fetchAllMusic: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('music_files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ music: data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchFolderMusic: async (folderId) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('music_files')
        .select('*')
        .eq('folder_id', folderId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ music: data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  // Add new music item
  addMusicItem: async (musicData, folderId = null) => {
    set({ isLoading: true });
    try {
      const id = uuidv4();

      let audioUrl = '';

      if (musicData.audio_file) {
        const fileName = `${musicData.audio_file.name}`;
        const filePath = `${id}/${fileName}`;
        audioUrl = await uploadFileToSupabase(
          filePath,
          musicData.audio_file,
          'music-media',
          supabase
        );
      }

      const { data: createdRecord, error: createError } = await supabase
        .from('music_files')
        .insert({
          id: id,
          name: musicData.name,
          folder_id: folderId,
          audio_url: audioUrl,
          size_bytes: musicData.audio_file.size,
        })
        .select()
        .single();

      if (createError) throw createError;

      set((state) => ({
        music: [createdRecord, ...state.music],
        isLoading: false,
      }));

      return createdRecord;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  editMusicItem: async (musicData, prevData) => {
    set({ isLoading: true });
    try {
      let audioUrl = '';

      if (musicData.audio_file) {
        if (prevData.audio_url) {
          await deleteFileFromSupabase(
            prevData.audio_url,
            'music-media',
            supabase
          );
        }

        const fileName = `${musicData.audio_file.name}`;
        const filePath = `${prevData.id}/${fileName}`;

        audioUrl = await uploadFileToSupabase(
          filePath,
          musicData.audio_file,
          'music-media',
          supabase
        );
      }

      let updateData = {
        name: musicData.name,
        audio_url: audioUrl,
      };

      const { data, error } = await supabase
        .from('music_files')
        .update(updateData)
        .eq('id', prevData.id)
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        music: state.music.map((item) =>
          item.id === prevData.id ? data : item
        ),
        isLoading: false,
      }));
      return data;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  deleteMusicItem: async (musicItem) => {
    set({ isLoading: true });
    try {
      const directoryPath = `${musicItem.id}`;
      const { data: files, error: listError } = await supabase.storage
        .from('music-media')
        .list(directoryPath);

      if (!listError && files.length > 0) {
        const filesToDelete = files.map(
          (file) => `${directoryPath}/${file.name}`
        );
        await supabase.storage.from('music-media').remove(filesToDelete);
      }

      const { error } = await supabase
        .from('music_files')
        .delete()
        .eq('id', musicItem.id);

      if (error) throw error;

      set((state) => ({
        music: state.music.filter((item) => item.id !== musicItem.id),
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  setMusicItem: (musicItem) => {
    set({ musicItem });
  },
}));

export default useMusicStore;
