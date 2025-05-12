import supabase from '../config/supabaseClient';

/**
 * Uploads a file to Supabase storage
 * @param {string} filePath - Destination path for the file (including filename)
 * @param {File|Blob} file - The file to upload
 * @param {string} [bucketName='blog-images'] - Name of the storage bucket
 * @param {Object} [client] - Optional Supabase client instance
 * @param {Boolean} [upsert] - Overwrites the file if true
 * @returns {Promise<string>} Public URL of the uploaded file
 * @throws {Error} If upload fails
 */
export async function uploadFileToSupabase(
  filePath,
  file,
  bucketName,
  client,
  upsert = false
) {
  const sb = client || supabase;

  const { data, error } = await sb.storage
    .from(bucketName)
    .upload(filePath, file, { upsert: upsert });

  if (error) {
    throw error;
  }

  const urlPrefix = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/${bucketName}`;

  return `${urlPrefix}/${data.path}`;
}

/**
 * Deletes a file from Supabase storage
 * @param {string} filePath - Path to the file to delete (including filename)
 * @param {string} [bucketName='blog-images'] - Name of the storage bucket
 * @param {Object} [client] - Optional Supabase client instance
 * @returns {Promise<void>}
 * @throws {Error} If deletion fails
 */
export async function deleteFileFromSupabase(filePath, bucketName, client) {
  const sb = client || supabase;

  //   const completePath = `${
  //     import.meta.env.VITE_SUPABASE_URL
  //   }/storage/v1/object/public/${bucketName}`

  const splitPath =
    filePath.split(`/storage/v1/object/public/${bucketName}/`)[1] || filePath;

  const { error } = await sb.storage.from(bucketName).remove([splitPath]);

  if (error) {
    throw error;
  }
}

export const deleteFolderContentsFromStorage = async (
  folderId,
  bucketName,
  client
) => {
  const sb = client || supabase;

  const { data: files, error: listError } = await sb.storage
    .from(bucketName)
    .list(`${folderId}/`);

  if (listError) throw listError;

  const filesToRemove = files.map((file) => `${folderId}/${file.name}`);
  if (filesToRemove.length > 0) {
    await sb.storage.from(bucketName).remove(filesToRemove);
  }

  const { data: subfolders } = await sb
    .from('folders')
    .select('id')
    .eq('parent_id', folderId);

  for (const subfolder of subfolders || []) {
    await deleteFolderContentsFromStorage(subfolder.id, bucketName, sb);
  }
};
