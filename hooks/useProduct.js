import { supabaseClient } from "@/utlis/SupabaseClient";

export function useAddProduct() {
  const addProduct = async (productData) => {
    console.log(productData ,"productData");
    const { data, error } = await supabaseClient
      .from("product") // Table name in Supabase
      .insert([
        {
          ...productData,
          color: productData.color ? JSON.stringify(productData.color) : "[]", // Store colors as JSON
        },
      ]);

    return { data, error };
  };

  return { addProduct };
}
