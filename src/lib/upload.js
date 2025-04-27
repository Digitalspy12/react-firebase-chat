import { supabase } from "./supabaseClient";

const upload = async (file) => {
  // Use a unique file path, e.g. images/timestamp_filename
  const filePath = `images/${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from('chat-files') // Make sure this bucket exists in your Supabase project
    .upload(filePath, file);

  if (error) {
    throw new Error("Something went wrong! " + error.message);
  }

  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from('chat-files')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
};

export default upload;
