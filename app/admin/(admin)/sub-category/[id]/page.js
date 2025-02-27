"use client";

import { useSubCategory } from "@/hooks/useSubCategory";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function SubCategoryPage() {
  const { getSubCategories, addSubCategory, updateSubCategory, deleteSubCategory } = useSubCategory();
  const { id } = useParams(); // Get id from URL
  console.log(id);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modals
  const [isSubCategoryModalOpen, setSubCategoryModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isProductModalOpen, setProductModalOpen] = useState(false);

  // Inputs
  const [name, setName] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [editSubCategoryName, setEditSubCategoryName] = useState("");
  const [productTitle, setProductTitle] = useState("");
const [productDescription, setProductDescription] = useState("");
const [productImage, setProductImage] = useState(null);
const [productColor, setProductColor] = useState("");
const [productSize, setProductSize] = useState("");
const [productPrice, setProductPrice] = useState("");
const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);

  // Fetch subcategories when the component mounts
  useEffect(() => {
    fetchSubCategories();
  }, [id]);

  const fetchSubCategories = async () => {
    setLoading(true);
    const { data, error } = await getSubCategories(id);

    if (error) {
      toast.error("Failed to fetch subcategories.");
    } else {
      setSubCategories(data || []);
    }
    setLoading(false);
  };

  // Handle Add Sub-Category
  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await addSubCategory(name, id);
    if (error) {
      toast.error("Error adding sub-category.");
    } else {
      toast.success("Sub-category added successfully!");
      setName("");
      await fetchSubCategories();
    }

    setLoading(false);
    setSubCategoryModalOpen(false);
  };

  // Handle Edit Sub-Category
  const handleEditSubCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await updateSubCategory(selectedSubCategory.id, editSubCategoryName);
    if (error) {
      toast.error("Error updating sub-category.");
    } else {
      toast.success("Sub-category updated successfully!");
      await fetchSubCategories();
    }

    setLoading(false);
    setEditModalOpen(false);
  };

  // Handle Delete Sub-Category
  const handleDeleteSubCategory = async (subCategoryId) => {
    if (!confirm("Are you sure you want to delete this sub-category?")) return;

    const { error } = await deleteSubCategory(subCategoryId);
    if (error) {
      toast.error("Error deleting sub-category.");
    } else {
      toast.success("Sub-category deleted successfully!");
      await fetchSubCategories();
    }
  };

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  setProductImage(file);
};

// Handle Add Product
const handleAddProduct = async (e) => {
  e.preventDefault();
  setLoading(true);

  let imageUrl = "";

  // Upload image to Supabase Storage
  if (productImage) {
    const fileName = `${Date.now()}-${productImage.name}`;
    const { data, error } = await supabase.storage
      .from("assets") // Storage bucket name
      .upload(`images/${fileName}`, productImage);

    if (error) {
      toast.error("Failed to upload image.");
      setLoading(false);
      return;
    }

    imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/images/${fileName}`;
  }

  // Save product details
  const { error } = await addProduct({
    title: productTitle,
    description: productDescription,
    image: imageUrl,
    color: productColor,
    size: productSize,
    price: parseFloat(productPrice),
    sub_cate_id: selectedSubCategoryId,
  });

  if (error) {
    toast.error("Error adding product.");
  } else {
    toast.success("Product added successfully!");
    // Reset form
    setProductTitle("");
    setProductDescription("");
    setProductImage(null);
    setProductColor("");
    setProductSize("");
    setProductPrice("");
    setProductModalOpen(false);
  }

  setLoading(false);
};


  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg mt-10">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Top Bar with Add Sub-Category Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Sub-Categories</h2>
        <button
          onClick={() => setSubCategoryModalOpen(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          + Add Sub-Category
        </button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {subCategories.map((sub) => (
            <div key={sub.id} className="bg-gray-100 p-4 rounded-lg shadow-md w-full">
              <h3 className="text-lg font-semibold">{sub.name}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSelectedSubCategory(sub);
                    setEditSubCategoryName(sub.name);
                    setEditModalOpen(true);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button className="bg-green-500 text-white px-3 py-1 rounded">Add Product</button>
                <button
                  onClick={() => handleDeleteSubCategory(sub.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Sub-Category Modal */}
      {isSubCategoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white p-6 rounded-md shadow-lg w-96 animate-fadeIn">
            <h3 className="text-xl font-bold mb-4">Add Sub-Category</h3>
            <form onSubmit={handleAddSubCategory} className="space-y-4">
              <input
                type="text"
                placeholder="Enter sub-category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
                Save Sub-Category
              </button>
            </form>
            <button
              onClick={() => setSubCategoryModalOpen(false)}
              className="mt-2 w-full bg-gray-400 text-white py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isEditModalOpen && selectedSubCategory && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
    <div className="bg-white p-6 rounded-md shadow-lg w-96 animate-fadeIn">
      <h3 className="text-xl font-bold mb-4">Edit Sub-Category</h3>
      <form onSubmit={handleEditSubCategory} className="space-y-4">
        <input
          type="text"
          placeholder="Edit sub-category name"
          value={editSubCategoryName}
          onChange={(e) => setEditSubCategoryName(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
          Update Sub-Category
        </button>
      </form>
      <button
        onClick={() => {
          setEditModalOpen(false);
          setSelectedSubCategory(null);
        }}
        className="mt-2 w-full bg-gray-400 text-white py-2 rounded-md"
      >
        Cancel
      </button>
    </div>
  </div>
)}
    </div>
  );
}
