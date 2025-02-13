import React, { useState, useEffect } from "react";
import "./Category.css";
import { FaImage, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { Form } from "react-bootstrap";
import axios from "../../../utilities/axios";
import SideBar from "../../adminDashboard/page/sideBar/SideBar";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import useCategories from "../hooks/useCategories";
import ErrorBoundary from '../../../ErrorBoundary/ErrorBoundary';

const Category = () => {
  const { categories, loading, error, fetchCategories } = useCategories();
  const [showPopup, setShowPopup] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    categoryImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (editingCategory) {
      setNewCategory({
        categoryName: editingCategory.categoryName,
        categoryImage: null,
      });
      if (editingCategory.categoryImage) {
        setImagePreview(`${import.meta.env.VITE_API_BASEURL}/${editingCategory.categoryImage}`);
              }
      setShowPopup(true);
    }
  }, [editingCategory]);
  if (loading) return <p>Loading categories...</p>;
  if (error) throw new Error(error); 
  const handleAddOrEditCategory = async () => {
    if (!newCategory.categoryName || !newCategory.categoryImage) {
      alert("Please provide a category name and image.");
      return;
    }

    const formData = new FormData();
    formData.append("categoryName", newCategory.categoryName);
    if (newCategory.categoryImage) {
      formData.append("categoryImage", newCategory.categoryImage);
    }

    try {
      if (editingCategory) {
        await axios.put(`/editCategory/${editingCategory._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("/addCategories", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setShowPopup(false);
      setNewCategory({ categoryName: "", categoryImage: null });
      setImagePreview(null);
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      throw new Error("Error saving category");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.post("/deleteCategories", { categoryId: id }); 
      fetchCategories(); 
    } catch (error) {
      console.error("Error deleting category:", error);
      throw new Error("Error deleting category");
    }
  };
  

  const handleImageUpload = (file) => {
    if (file) {
      setNewCategory({ ...newCategory, categoryImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ErrorBoundary>
    <div className="dashboardContainer">
      <SideBar />
      <div className="mainContent">
        <h2 className="headingStyle mt-4">All Categories</h2>
        <div className="header">
          <button className="DefaultButton mb-5" onClick={() => setShowPopup(true)}>Add New Category</button>
        </div>
        {loading && <p>Loading categories...</p>}
        {error && <p className="text-danger">{error}</p>}
        <div className="container">
          <div className="row">
            {categories.map((category) => (
              <CategoryCard
                key={category._id}
                category={category}
                onDelete={() => handleDeleteCategory(category._id)}
                onEdit={() => setEditingCategory(category)}
              />
            ))}
          </div>
        </div>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2 className="headingStyle">{editingCategory ? "Edit Category" : "Add New Category"}</h2>
              <div className="form-floating mb-3">
                <Form.Control
                  type="text"
                  placeholder="Category Name"
                  className="DefaultInput no-focus"
                  value={newCategory.categoryName}
                  onChange={(e) => setNewCategory({ ...newCategory, categoryName: e.target.value })}
                />
                <Form.Label>Category Name</Form.Label>
              </div>
              <div className="upload-container">
                {!imagePreview ? (
                  <label className="upload-label">
                    <div className="upload-box">
                      <FaImage className="upload-icon" />
                      <p>Click to Upload Image</p>
                    </div>
                    <input type="file" className="upload-input" onChange={(e) => handleImageUpload(e.target.files[0])} />
                  </label>
                ) : (
                  <div className="image-preview-container">
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                    <div className="close-icon-container" onClick={() => setImagePreview(null)}>
                      <FaTimes className="close-icon" />
                    </div>
                  </div>
                )}
              </div>
              <div className="popup-buttons">
                <button className="btn-primary" onClick={handleAddOrEditCategory}>Save</button>
                <button className="btn-danger" onClick={() => { setShowPopup(false); setEditingCategory(null); setNewCategory({ categoryName: "", categoryImage: null }); setImagePreview(null); }}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </ErrorBoundary>

  );
};

export default Category;
