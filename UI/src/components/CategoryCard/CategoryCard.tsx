import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

interface ICategoryCardProps {
  category: {
    _id: string;
    categoryName: string;
    categoryImage: string;
  };
  onDelete: (id: string) => void;
}

const CategoryCard: React.FC<ICategoryCardProps> = ({ category, onDelete }) => {
  return (
    <div className="category-card">
      <img src={category.categoryImage} alt={category.categoryName} className="category-image" />
      <div className="category-details">
        <h4>{category.categoryName}</h4>
        <div className="actions">
          <FaEdit className="edit-icon" />
          <FaTrash className="delete-icon" onClick={() => onDelete(category._id)} />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
