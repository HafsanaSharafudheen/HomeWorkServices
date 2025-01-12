import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import './CatergoryCard.css'
interface ICategoryCardProps {
  category: {
    _id: string;
    categoryName: string;
    categoryImage: string;
  };
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
}

const CategoryCard: React.FC<ICategoryCardProps> = ({
  category,
  onDelete,
  onEdit,
}) => {
  const imageUrl = `${import.meta.env.VITE_API_BASEURL}/${category.categoryImage}`;

  return (
    
  <div className="col-md-3 mb-4 category-card">
      <div className="card" style={{ backgroundColor: "var(--background-color)" }}>
        <img
          src={imageUrl}
          alt={category.categoryName}
          className="card-img-top category-image"
        />
        <div className="card-body text-center">
          <p className="card-title category-name">{category.categoryName}</p>
          <div className="d-flex justify-content-center gap-2 mt-3">
            <button
              className="btn-primary btn-sm"
              onClick={() => onEdit?.(category._id)}
            >
              <FaEdit />
            </button>
            <button
              className="btn-danger btn-sm"
              onClick={() => onDelete(category._id)}
            >
              <FaTrash /> 
            </button>
          </div>
        </div>
      </div>
    </div>
   
  
  );
};

export default CategoryCard;
