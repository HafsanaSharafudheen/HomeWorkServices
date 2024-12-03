import { useState, useEffect } from "react";
import axios from "axios";
import "./Category.css";
import SideBar from '../adminDashboard/SideBar';
import CategoryCard from "../../../components/CategoryCard/CategoryCard";

interface ICategory {
  _id: string;
  categoryName: string;
  categoryImage: string;
  createdAt: string;
  updatedAt: string;
}

const Category = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newCategory, setNewCategory] = useState<{ categoryName: string; categoryImage: File | null }>({
    categoryName: "",
    categoryImage: null,
  });

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get("/api/categories");
  //       setCategories(response.data);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  const handleAddCategory = async () => {
    if (!newCategory.categoryName || !newCategory.categoryImage) {
      alert("Please provide a category name and image.");
      return;
    }

    const formData = new FormData();
    formData.append("categoryName", newCategory.categoryName);
    formData.append("categoryImage", newCategory.categoryImage);

    try {
      const response = await axios.post("/api/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setCategories([...categories, response.data]);
      setShowPopup(false);
      setNewCategory({ categoryName: "", categoryImage: null });
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="category-container row">
      <div className="col-md-2">
        <SideBar />
      </div>
      <div className="col-md-10 content-container">
        <div className="header">
          <button
            className="add-category-button"
            onClick={() => setShowPopup(true)}
          >
            Add New Category
          </button>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              onDelete={handleDeleteCategory}
            />
          ))}
        </div>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>Add New Category</h2>
              <label>
                Category Name:
                <input
                  type="text"
                  value={newCategory.categoryName}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, categoryName: e.target.value })
                  }
                />
              </label>
              <label>
                Upload Image:
                <input
                  type="file"
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      categoryImage: e.target.files ? e.target.files[0] : null,
                    })
                  }
                />
              </label>
              <div className="popup-buttons">
                <button onClick={handleAddCategory}>Save</button>
                <button onClick={() => setShowPopup(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
