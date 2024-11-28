import { FaEdit, FaTrash } from "react-icons/fa";

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    image: string;
  };
  onDelete: (id: number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onDelete }) => {
  return (
    <div className="category-card">
      <img src={category.image} alt={category.name} className="category-image" />
      <div className="category-details">
        <h4>{category.name}</h4>
        <div className="actions">
          <FaEdit className="edit-icon" />
          <FaTrash className="delete-icon" onClick={() => onDelete(category.id)} />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
