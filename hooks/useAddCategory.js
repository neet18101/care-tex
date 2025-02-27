import { supabaseClient } from "@/utlis/SupabaseClient";

// Fetch all categories
export const getCategories = async () => {
  let { data, error } = await supabaseClient.from("categories").select("id, name").is("parent_id", null).order("created_at", { ascending: true });
  return { data, error };
};

// Insert a new category
export const addCategory = async (name, parentId) => {
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  const { data, error } = await supabaseClient
    .from("categories")
    .insert([{ name, slug, parent_id: parentId || null }]);

  return { data, error };
};

// Update a category
export const updateCategory = async (id, name, parentId) => {
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  const { data, error } = await supabaseClient
    .from("categories")
    .update({ name, slug, parent_id: parentId, updated_at: new Date() })
    .eq("id", id);

  return { data, error };
};

// Delete a category
export const deleteCategory = async (id) => {
  const { data, error } = await supabaseClient.from("categories").delete().eq("id", id);
  return { data, error };
};

export const useAddCategory = () => {
  return {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};