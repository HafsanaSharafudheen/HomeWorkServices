import React, { useState } from "react";
import "./Category.css";
import { FaImage, FaTimes } from "react-icons/fa";
import { Form } from "react-bootstrap";
import axios from "../../../../utilities/axios";
import SideBar from "../../adminDashboard/page/sideBar/SideBar";
import CategoryCard from "../../../../components/CategoryCard/CategoryCard";
import useCategories from "../hooks/useCategories";

const Category = () => {
  const { categories, loading, error, fetchCategories } = useCategories();
  const [showPopup, setShowPopup] = useState(false);
  const [newCategory, setNewCategory] = useState<{
    categoryName: string;
    categoryImage: File | null;
  }>({
    categoryName: "",
    categoryImage: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleAddCategory = async () => {
    if (!newCategory.categoryName || !newCategory.categoryImage) {
      alert("Please provide a category name and image.");
      return;
    }

    const formData = new FormData();
    formData.append("categoryName", newCategory.categoryName);
    formData.append("categoryImage", newCategory.categoryImage);

    try {
      await axios.post("/addCategories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setShowPopup(false);
      setNewCategory({ categoryName: "", categoryImage: null });
      setImagePreview(null);

      // Refresh category list after adding
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await axios.delete(`/deleteCategories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleImageUpload = (file: File | null) => {
    if (file) {
      setNewCategory({ ...newCategory, categoryImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setNewCategory({ ...newCategory, categoryImage: null });
    setImagePreview(null);
  };

  return (
    <div className="row">
      <div className="col-lg-3 col-md-4 col-sm-12">
        <SideBar />
      </div>
      <div className="col-lg-9 col-md-8 col-sm-12">
      <h2 className="headingStyle mt-4">
        All Categories
      </h2>

        <div className="header">

          <button className="DefaultButton mb-5" onClick={() => setShowPopup(true)}>
            Add New Category
          </button>
        </div>

        {loading && <p>Loading categories...</p>}
        {error && <p className="text-danger">{error}</p>}

        <div className="container">
          <div className="row">
            {categories.map((category) => (
              <CategoryCard
                key={category._id}
                category={category}
                onDelete={handleDeleteCategory}
              />
            ))}
          </div>
        </div>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2 className="headingStyle">Add New Category</h2>
              <div className="form-floating mb-3">
                <Form.Control
                  type="text"
                  name="CategoryName"
                  placeholder="Category Name"
                  className="DefaultInput no-focus"
                  value={newCategory.categoryName}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      categoryName: e.target.value,
                    })
                  }
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
                    <input
                      type="file"
                      className="upload-input"
                      onChange={(e) =>
                        handleImageUpload(e.target.files ? e.target.files[0] : null)
                      }
                    />
                  </label>
                ) : (
                  <div className="image-preview-container">
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                    <div className="close-icon-container" onClick={handleImageRemove}>
                      <span className="tooltip">Remove Image</span>
                      <FaTimes className="close-icon" />
                    </div>
                  </div>
                )}
              </div>

              <div className="popup-buttons">
                <button className="btn-primary" onClick={handleAddCategory}>
                  Save
                </button>
                <button
                  className="btn-danger"
                  onClick={() => {
                    setShowPopup(false);
                    setNewCategory({ categoryName: "", categoryImage: null });
                    setImagePreview(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
