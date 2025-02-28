"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAddProduct } from "@/hooks/useProduct"; // Import product hook
import toast, { Toaster } from "react-hot-toast";

function ProductPage() {
    const { subId } = useParams(); // Get sub-category ID from URL
    const { getProductsBySubCategory, deleteProductById } = useAddProduct();
    const [products, setProducts] = useState([]);
    const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditProductModalOpen, setEditProductModalOpen] = useState(false);

    useEffect(() => {
        if (subId) {
            fetchProducts(subId);
        }
    }, [subId]);

    const fetchProducts = async (subCategoryId) => {
        const { data, error } = await getProductsBySubCategory(subCategoryId);
        if (error) {
            toast.error("Failed to fetch products.");
        } else {
            setProducts(data || []);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        const { error } = await deleteProductById(productId);
        if (error) {
            toast.error("Error deleting product.");
        } else {
            toast.success("Product deleted successfully!");
            fetchProducts(subId); // Refresh product list
        }
    };

    return (
        <div className="p-6">
            <Toaster position="top-center" />

            {/* Page Header with Add Button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                <button
                    onClick={() => setAddProductModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    + Add Product
                </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="relative bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
                    >
                        {/* Product Image */}
                        <img
                            src={product.image || "https://via.placeholder.com/200"} // Fallback image
                            alt={product.title}
                            className="w-full h-52 object-cover"
                        />

                        {/* Product Details */}
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                            <p className="text-sm text-gray-600 mt-1 truncate">{product.description}</p>

                            <div className="flex justify-between items-center mt-3">
                                <span className="text-xl font-bold text-blue-600">₹{product.price}</span>
                                <div className="flex gap-2">
                                    {/* Edit Button */}
                                    <button
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setEditProductModalOpen(true);
                                        }}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
                                    >
                                        Edit
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Tag or Label */}
                        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                            {product.size}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Product Modal (Placeholder) */}
            {isAddProductModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Add Product</h3>
                        <p className="text-gray-600">Modal content for adding a product...</p>
                        <button
                            onClick={() => setAddProductModalOpen(false)}
                            className="mt-4 w-full bg-gray-400 text-white py-2 rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Product Modal (Placeholder) */}
            {isEditProductModalOpen && selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Edit Product</h3>
                        <p className="text-gray-600">Modal content for editing {selectedProduct.title}...</p>
                        <button
                            onClick={() => setEditProductModalOpen(false)}
                            className="mt-4 w-full bg-gray-400 text-white py-2 rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductPage;
