import { supabase } from "../database/supabase.js";

export const fetchApplications = async () => {
  const { data, error } = await supabase
    .from("applications")
    .select()
    .order("created_at", { ascending: false });

  if (error) throw error;

  try {
    return data;
  } catch (error) {
    alert(`Failed to load : ${error.message}`);
  }
};
