"use client";

import { useEffect, useState } from "react";
import API_BASE_URL from "@/lib/api";

import ProductsTable from "../../../components/ProductsTable";

import { Product } from "../../../types/product";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../services/productService";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [gsm, setGsm] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [printing, setPrinting] = useState("");
  const [lamination, setLamination] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState("Active");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = async () => {
    try {
      let imagePath = image;

      // Upload a new image only if one is selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);

        const uploadResponse = await fetch(
          `${API_BASE_URL}/upload`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
            body: formData,
          }
        );

        const uploadData = await uploadResponse.json();
        imagePath = uploadData.imageUrl;
      }

      const productData = {
        name,
        category,
        gsm,
        size,
        color,
        printing,
        lamination,
        description,
        image: imagePath,
        status,
      };

      if (isEditing && editingId !== null) {
        await updateProduct(editingId, productData);
        alert("Product updated successfully!");
      } else {
        await createProduct(productData);
        alert("Product added successfully!");
      }

      await fetchProducts();

      // Reset form
      setName("");
      setCategory("");
      setGsm("");
      setSize("");
      setColor("");
      setPrinting("");
      setLamination(false);
      setDescription("");
      setImage("");
      setSelectedFile(null);
      setStatus("Active");

      setEditingId(null);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("Failed to save product");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);

    setName(product.name);
    setCategory(product.category);
    setGsm(product.gsm || "");
    setSize(product.size || "");
    setColor(product.color || "");
    setPrinting(product.printing || "");
    setLamination(product.lamination || false);
    setDescription(product.description);
    setImage(product.image);
    setStatus(product.status);

    setSelectedFile(null);

    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      alert("Product deleted successfully!");

      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Products Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all products.
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="GSM"
            value={gsm}
            onChange={(e) => setGsm(e.target.value)}
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Size (e.g. 24x36)"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Printing"
            value={printing}
            onChange={(e) => setPrinting(e.target.value)}
            className="border rounded-lg p-3"
          />

          <div className="flex items-center gap-3 border rounded-lg p-3">
            <label className="font-medium">Lamination</label>

            <input
              type="checkbox"
              checked={lamination}
              onChange={(e) => setLamination(e.target.checked)}
              className="w-5 h-5"
            />
          </div>

          <textarea
            placeholder="Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-lg p-3 md:col-span-2"
          />

          <input
            type="file"
            accept="image/*"
            className="border rounded-lg p-3 md:col-span-2"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setSelectedFile(e.target.files[0]);
              }
            }}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button
          onClick={handleSaveProduct}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          {isEditing ? "Update Product" : "Save Product"}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="🔍 Search by product name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg p-3"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-lg p-3"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No products found.
          </div>
        ) : (
          <ProductsTable
            products={filteredProducts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
}